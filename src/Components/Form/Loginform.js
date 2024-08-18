import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../Button/Button'; // Assuming you have a Button component

const LoginForm = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/token', {
                username: formData.email,  // FastAPI expects 'username' for OAuth2PasswordRequestForm
                password: formData.password,
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',  // Required by OAuth2PasswordRequestForm
                },
            });

            setMessage('Login successful!');
            setError(false);
            localStorage.setItem('token', response.data.access_token);  // Store the token
            onLogin();  // Notify parent of successful login

        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage('Login failed: Incorrect email or password.');
            } else {
                setMessage('Login failed: ' + error.message);
            }
            setError(true);
        }
    };

    return (
        <LoginFormContainer>
            <LoginFormStyled onSubmit={handleSubmit} error={error}>
                {message && <p className="message">{message}</p>}
                <h2>Login</h2>
                <div className="input-control">
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required 
                    />
                </div>
                <div className="input-control">
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required 
                    />
                </div>
                <div className="submit-btn">
                    <Button 
                        name={'Log in'}
                        bPad={'0.8rem 1.6rem'}
                        bRad={'30px'}
                        bg={'#d3d3d3'} 
                        color={'#000'}
                    />
                </div>
            </LoginFormStyled>
        </LoginFormContainer>
    );
};

const LoginFormContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100;  // Full height of the viewport
    background-color: #f8f9fa;  // Light grey background color
    width: 400px;
`;

const LoginFormStyled = styled.form`
    background: #fff;  // White background for the form
    padding: 2rem;  // Add some padding inside the form
    border-radius: 8px;  // Rounded corners
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);  // Slight shadow for depth
    width: 100%;
    max-width: 1000px;  // Limit form width to 400px for a medium size

    .input-control {
        margin-bottom: 1.5rem;
    }

    .message {
        color: ${props => (props.error ? 'red' : 'green')};
        margin-bottom: 1rem;
    }

    h2 {
        margin-bottom: 1.5rem;
        text-align: center;
        color: #333;
    }

    .submit-btn {
        display: flex;
        justify-content: center;
    }

    input {
        width: 100%;
        padding: 0.75rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 1rem;
    }

    input:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
`;

export default LoginForm;
