import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function EntradasPage () {
    const { token } = React.useContext(UserContext);
    const [ value, setValue ] = React.useState('');
    const [ description, setDescription] = React.useState('');

    const navigate = useNavigate();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const registrar = (event) => {
        event.preventDefault();

        const payload = {
            type: 'entrada',
            value,
            description
        }

        const promise = axios.post("http://localhost:5000/registro", payload, config);
        promise.then( response => {
            console.log(response.data);
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
                <div className="topBar">
                    <h1>Entrada</h1>
                </div>
                
                <form onSubmit={registrar}>
                    <input type="text" required placeholder="Valor" value={value} onChange={e => setValue(e.target.value)}/>
                    <input type="text" required placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}/>
                    <button type="submit">Atualizar Entrada</button>
                </form>
            </Container>
        </>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #8C11BE;
    box-sizing: border-box;
    padding-top: 26px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    .topBar {
        width: 326px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40px;
    }

    h1 {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
        align-text: start;
        
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

`