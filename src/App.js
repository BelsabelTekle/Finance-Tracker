import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { MainLayout } from './styles/Layouts';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import LoginForm from './Components/Form/Loginform'; 
import RegistrationForm from './Components/Form/RegistrationForm'; 
import { useGlobalContext } from './context/globalContext';

function App() {
  const [active, setActive] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [view, setView] = useState('login');
  const [userFullName, setUserFullName] = useState(''); // State to store the user's full name

  const handleLogin = () => {
    setIsAuthenticated(true);
    setView('dashboard'); // Switch to dashboard after login
  };

  const handleRegister = (fullName) => {
    console.log("Full Name during registration:", fullName);
    setUserFullName(fullName); // Set the user's full name after registration
    setIsAuthenticated(true);
    setView('dashboard');
  };

  const displayData = () => {
    if (!isAuthenticated) {
      if (view === 'login') {
        return (
          <CenteredContainer>
            <LoginForm onLogin={handleLogin} />
            <p>Don't have an account? <button onClick={() => setView('register')}>Create Account</button></p>
          </CenteredContainer>
        );
      } else if (view === 'register') {
        return (
          <CenteredContainer>
            <RegistrationForm onRegister={handleRegister} />
            <p>Already have an account? <button onClick={() => setView('login')}>Return to Log In</button></p>
          </CenteredContainer>
        );
      }
    } else {
      switch (active) {
        case 1:
          return <Dashboard />;
        case 2:
          return <Dashboard />;
        case 3:
          return <Income />;
        case 4:
          return <Expenses />;
        default:
          return <Dashboard />;
      }
    }
  };

  return (
    <AppStyled className="App">
      <MainLayoutStyled>
        {!isAuthenticated && displayData()}
        {isAuthenticated && (
          <>
            <Navigation 
              active={active} 
              setActive={setActive} 
              setIsAuthenticated={setIsAuthenticated} 
              setView={setView} 
              userFullName={userFullName}  // Pass the full name to Navigation
            />
            <main>{displayData()}</main>
          </>
        )}
      </MainLayoutStyled>
    </AppStyled>
  );
}


const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: rgba(252, 246, 249, 0.78);
  
  p {
    margin-top: 1rem;
    button {
      background: none;
      border: none;
      color: black;
      cursor: pointer;
      text-decoration: underline;
      padding: 0;
    }
  }
`;

const MainLayoutStyled = styled(MainLayout)`
  flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
`;

const AppStyled = styled.div`
  height: 100vh;
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
