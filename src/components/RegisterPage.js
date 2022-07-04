import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function RegisterPage () {

    const [email, setEmail] = React.useState ('');
    const [password, setPassword] = React.useState ('');
    const [retypePassword, setRetypePassword] = React.useState('');
    const [name, setName] = React.useState('');
    const {url} = React.useContext(UserContext);

    const navigate = useNavigate();

    const sendForm = (event) => {
        event.preventDefault();
        if(password !== retypePassword){
            alert("Senhas não são iguais!");
        }else{
            const data = {
                email,
                name,
                password
            }
    
            const promise = axios.post(`${url}/signup`, data);
            promise.then(response => {
                navigate("/");
            })
    
            promise.catch(err => {
                alert(err.response.data);
                console.log(err.response);
            })
        }
        
    }
    return (
        <>
            <Container>
                <h1>MyWallet</h1>
                <form onSubmit={sendForm}>
                    <input type="text" required placeholder="Nome" value={name} onChange={e => setName(e.target.value)}/>
                    <input type="text" required placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" required placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}/>
                    <input type="password"  required placeholder="Confirme a senha" value={retypePassword} onChange={e => setRetypePassword(e.target.value)}/>
                    <button type="submit">Cadastrar</button>
                </form>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <div className="link">Já tem uma conta? Entre agora!</div>
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
