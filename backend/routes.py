from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from bson import ObjectId
from models import User, UserInDB, Token, Income, Expense
from config import users_collection, incomes_collection, expenses_collection
from security import (
    authenticate_user, create_access_token, 
    get_password_hash, get_current_active_user, ACCESS_TOKEN_EXPIRE_MINUTES
)
from typing import List
from datetime import datetime, timedelta

router = APIRouter()

# Auth routes
@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# User routes
@router.post("/register", response_model=User)
async def register(user: UserInDB):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.hashed_password)
    new_user = {
        "email": user.email,
        "full_name": user.full_name,
        "hashed_password": hashed_password,
        "disabled": False,
    }
    
    users_collection.insert_one(new_user)
    return User(**new_user)

@router.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

# Income routes
@router.post("/incomes/", response_model=Income)
async def create_income(income: Income, current_user: UserInDB = Depends(get_current_active_user)):
    income_data = income.dict()
    income_data["user_id"] = str(current_user.email)
    result = incomes_collection.insert_one(income_data)
    
    created_income = incomes_collection.find_one({"_id": result.inserted_id})
    created_income["id"] = str(created_income["_id"])
    return created_income

@router.get("/incomes/", response_model=List[Income])
async def get_incomes(current_user: UserInDB = Depends(get_current_active_user)):
    incomes = list(incomes_collection.find({"user_id": current_user.email}))
    
    for income in incomes:
        income["id"] = str(income["_id"])
    
    return incomes

@router.delete("/incomes/{income_id}")
async def delete_income(income_id: str, current_user: UserInDB = Depends(get_current_active_user)):
    result = incomes_collection.delete_one({"_id": ObjectId(income_id), "user_id": current_user.email})
    if result.deleted_count == 1:
        return {"message": "Income deleted successfully"}
    raise HTTPException(status_code=404, detail="Income not found")

# Expense routes
@router.post("/expenses/", response_model=Expense)
async def create_expense(expense: Expense, current_user: UserInDB = Depends(get_current_active_user)):
    expense_data = expense.dict()
    expense_data["user_id"] = str(current_user.email)
    result = expenses_collection.insert_one(expense_data)
    
    created_expense = expenses_collection.find_one({"_id": result.inserted_id})
    created_expense["id"] = str(created_expense["_id"])
    created_expense.pop("_id", None)
    
    return created_expense

@router.get("/expenses/", response_model=List[Expense])
async def get_expenses(current_user: UserInDB = Depends(get_current_active_user)):
    expenses = list(expenses_collection.find({"user_id": current_user.email}))
    
    for expense in expenses:
        expense["id"] = str(expense["_id"])
        expense.pop("_id", None)
    
    return expenses

@router.delete("/expenses/{expense_id}")
async def delete_expense(expense_id: str, current_user: UserInDB = Depends(get_current_active_user)):
    result = expenses_collection.delete_one({"_id": ObjectId(expense_id), "user_id": current_user.email})
    if result.deleted_count == 1:
        return {"message": "Expense deleted successfully"}
    raise HTTPException(status_code=404, detail="Expense not found")
