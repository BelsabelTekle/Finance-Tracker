from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router

app = FastAPI()

# Allow CORS for your frontend application
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://10.0.0.211:3001"  # Add this specific IP origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the combined router
app.include_router(router)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the Personal Finance API"}
