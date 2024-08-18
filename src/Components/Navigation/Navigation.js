import React, { useState } from 'react'
import styled from 'styled-components'
import { signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'

function Navigation({ active, setActive, setIsAuthenticated, setView, userFullName }) { // Add userFullName prop
    const handleSignOut = () => {
        setIsAuthenticated(false); // Set the authentication state to false
        setView('login'); // Redirect to the login page by changing the view state
    };

    return (
        <NavStyled>
            <div className="user-con">
                <div className="text">
                    <h2>{userFullName}</h2> {/* Display the user's full name here */}
                    <p>Your Money</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active' : ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>
            <div className="bottom-nav">
                <li onClick={handleSignOut}> {/* Add onClick to handle sign out */}
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;

    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            
            color: #000000;
            font-size: 1.5rem;
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;

        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color:#000000
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }


    .bottom-nav {
        display: flex;
        justify-content: center;
        padding: 1rem;

        li {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem 1rem;
            background-color: #808080;  /* Dark green background */
            color: #ffffff; /* White text */
            font-size: 1rem; /* Font size */
            border: none;
            border-radius: 5px;
            cursor: pointer;
            list-style: none; /* Remove bullet points */
            transition: background-color 0.3s ease;

            &:hover {
                background-color:black; /* Darker green on hover */
            }
        }
    }
`;

export default Navigation;
