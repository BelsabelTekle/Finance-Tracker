import React, { useCallback, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "http://localhost:8000/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Utility function to get the Authorization header
    const getAuthHeader = () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    };

    // Fetch incomes
    const getIncomes = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}incomes`, getAuthHeader());
            setIncomes(response.data);
            console.log(response.data);
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to fetch incomes");
        } finally {
            setLoading(false);
        }
    }, []);

    // Add income
    const addIncome = async (income) => {
        setError(null);
        setLoading(true);
        try {
            await axios.post(`${BASE_URL}incomes`, income, getAuthHeader());
            getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add income");
        } finally {
            setLoading(false);
        }
    };

    // Delete income
    const deleteIncome = async (id) => {
        setError(null);
        setLoading(true);
        try {
            await axios.delete(`${BASE_URL}incomes/${id}`, getAuthHeader());
            getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete income");
        } finally {
            setLoading(false);
        }
    };

    // Calculate total income
    const totalIncome = useCallback(() => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    }, [incomes]);

    // Fetch expenses
    const getExpenses = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}expenses`, getAuthHeader());
            setExpenses(response.data);
            console.log(response.data);
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to fetch expenses");
        } finally {
            setLoading(false);
        }
    }, []);

    // Add expense
    const addExpense = async (expense) => {
        setError(null);
        setLoading(true);
        try {
            await axios.post(`${BASE_URL}expenses`, expense, getAuthHeader());
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add expense");
        } finally {
            setLoading(false);
        }
    };

    // Delete expense
    const deleteExpense = async (id) => {
        setError(null);
        setLoading(true);
        try {
            await axios.delete(`${BASE_URL}expenses/${id}`, getAuthHeader());
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete expense");
        } finally {
            setLoading(false);
        }
    };

    // Calculate total expenses
    const totalExpenses = useCallback(() => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    }, [expenses]);

    // Calculate total balance
    const totalBalance = useCallback(() => {
        return totalIncome() - totalExpenses();
    }, [totalIncome, totalExpenses]);

    // Get transaction history (latest 3 transactions)
    const transactionHistory = useCallback(() => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    }, [incomes, expenses]);

    // Initial fetch of incomes and expenses
    useEffect(() => {
        getIncomes();
        getExpenses();
    }, [getIncomes, getExpenses]);

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            loading,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
