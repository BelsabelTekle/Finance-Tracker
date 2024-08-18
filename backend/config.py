import os
from pymongo import MongoClient
import certifi
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
ca = certifi.where()

# Ensure MongoClient is using the correct SSL/TLS parameters
client = MongoClient(MONGODB_URL, tls=True, tlsCAFile=ca)
database = client['personal_finance_db']

users_collection = database['users']
incomes_collection = database['incomes']
expenses_collection = database['expenses']

# Verify MongoDB connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(f"Could not connect to MongoDB: {e}")
