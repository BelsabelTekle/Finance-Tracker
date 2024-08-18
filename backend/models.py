from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class User(BaseModel):
    email: str
    full_name: Optional[str] = None
    disabled: Optional[bool] = None

class UserInDB(User):
    hashed_password: str

class Income(BaseModel):
    id: Optional[str] = None
    title: str = Field(..., max_length=50)
    amount: float = Field(..., gt=0)
    type: str = Field(default="income")
    date: datetime
    category: str
    description: str = Field(..., max_length=20)

    class Config:
        orm_mode = True

class Expense(BaseModel):
    id: Optional[str] = None
    title: str = Field(..., max_length=50)
    amount: float = Field(..., gt=0)
    type: str = Field(default="expense")
    date: datetime
    category: str
    description: Optional[str] = Field(None, max_length=20)

    class Config:
        orm_mode = True
