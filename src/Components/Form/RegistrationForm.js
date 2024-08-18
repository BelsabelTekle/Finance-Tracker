import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../Button/Button'; // Assuming you have a Button component


const Register = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/register', {
                email,
                full_name: fullName,
                hashed_password: password,
            });

            if (response.status === 200) {
                setSuccess("Registration successful!");
                setEmail('');
                setFullName('');
                setPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.detail);
            } else {
                setError("An error occurred during registration");
            }
        }
    };

    return (
        <RegisterFormContainer>
            <RegisterFormStyled onSubmit={handleSubmit}>
                <h2>Register</h2>
                {error && <div className="message error">{error}</div>}
                {success && <div className="message success">{success}</div>}
                <div className="input-control">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email"
                        required 
                    />
                </div>
                <div className="input-control">
                    <label>Full Name:</label>
                    <input 
                        type="text" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        placeholder="Full Name"
                        required 
                    />
                </div>
                <div className="input-control">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password"
                        required 
                    />
                </div>
                <div className="input-control">
                    <label>Confirm Password:</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="Confirm Password"
                        required 
                    />
                </div>
                <div className="submit-btn">
                    <Button 

                        name={'Register'} 
                        bPad={'0.8rem 1.6rem'}
                        bRad={'30px'}
                        bg={'#000'}  // Black background color
                        color={'#fff'}  // White text color
                    />
                </div>
            </RegisterFormStyled>
        </RegisterFormContainer>
    );
};

// Applying the same styles as in LoginForm

const RegisterFormContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;  // Full height of the viewport
    background-color: #f8f9fa;  // Light grey background color
    width: 100%;
`;

const RegisterFormStyled = styled.form`
    background: #fff;  // White background for the form
    padding: 2rem;  // Add some padding inside the form
    border-radius: 8px;  // Rounded corners
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);  // Slight shadow for depth
    width: 100%;
    max-width: 400px;  // Limit form width

    .input-control {
        margin-bottom: 1.5rem;

        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
        }

        input {
            width: 100%;
            padding: 0.75rem;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 1rem;
            box-sizing: border-box;
        }

        input:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
        }
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
`;

export default Register;
