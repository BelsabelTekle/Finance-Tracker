import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    :root {
        --primary-color: #1A535C; /* Dark teal */
        --secondary-color: #4ECDC4; /* Light teal */
        --accent-color: #FF6B6B; /* Coral */
        --background-color: #F7FFF7; /* Light green */
        --text-color: #2F2F2F; /* Dark grey */
        --color-success: #38A1DB; /* Sky blue */
        --color-warning: #F4A261; /* Orange */
        --color-error: #E63946; /* Red */
    }

    body {
        font-family: "Open Sans", sans-serif;
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        background-color: var(--background-color);
        color: var(--text-color);
    }

    h1, h2, h3, h4, h5, h6 {
        color: var(--primary-color);
    }

    a {
        text-decoration: none;
        color: var(--secondary-color);
        transition: color 0.3s ease;
    }

    a:hover {
        color: var(--accent-color);
    }

    .button {
        background-color: var(--primary-color);
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .button:hover {
        background-color: var(--secondary-color);
    }

    .success {
        color: var(--color-success);
    }

    .warning {
        color: var(--color-warning);
    }

    .error {
        color: var(--color-error);
        animation: shake 0.5s ease-in-out;
        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(10px); }
            50% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
            100% { transform: translateX(0); }
        }
    }
`;
