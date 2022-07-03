import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function LoginPage (){
    
    const { token, setToken, name, setName } = React.useContext(UserContext);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigate = useNavigate();

    const loginUser = (event) => {
        event.preventDefault();
        const payload = {
            email,
            password
        };

        const promise = axios.post("http://localhost:5000/signin", payload);
        promise.then( response => {
            
            console.log(response.data);
            setToken(response.data.token);
            setName(response.data.name);
            navigate("/home");

        })
        .catch(err => {
            alert(err.response.data);
            console.log(err.response);
        })
    }
    return (
        <>
            <Container>
                <h1>MyWallet</h1>
                <form onSubmit={loginUser}>
                    <input type="text" required placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" required placeholder="senha" value={password} onChange={e => setPassword(e.target.value)}/>
                    <button type="submit">Entrar</button>
                </form>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                    <div className="link">Não tem uma conta? Cadastre-se!</div>
                </Link>
            </Container>
        </>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #8C11BE;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        font-family: 'Saira Stencil One';
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
        margin-bottom: 24px;

        color: #FFFFFF;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    form > input {
        width: 326px;
        height: 58px;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 5px;
        border: none;
        margin-bottom: 15px;
        padding-left: 15px;
    
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        
        color: #000000;
    }

    form > input::placeholder {
        color: #000000;
    }

    form > button {
        width: 326px;
        height: 46px;
        background: #A328D6;
        border-radius: 5px;
        border: none;

        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;

        color: #FFFFFF;
    }

    .link {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        margin-top: 36px;
        text-align: center;
        color: #FFFFFF;
    }
`