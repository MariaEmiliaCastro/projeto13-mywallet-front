import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import Registro from "./Registro";

export default function HomePage () {

    const { token, name } = React.useContext(UserContext);
    const [ meusRegistros, setMeusRegistros ] = React.useState('');

    const navigate = useNavigate();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    React.useEffect(() => {

        const promise = axios.get("http://localhost:5000/registro", config);
        promise.then( res => {
            if(res.data.length > 0 || res !== undefined){
                setMeusRegistros(res.data);
                console.log(meusRegistros);
            }else{
                console.log("Sem Atividades Cadastradas!");
            }
            
        })
        .then(err => {
            console.log(err);
        })
    }, []);

    const novaEntrada = () => {
        navigate('/entrada');
    }

    const novaSaida = () => {
        navigate('/saida');
    }

    function loadRegistros() {
        if(meusRegistros.length === 0 || meusRegistros === undefined){
            return <div className="no-registry">Não há registros de<br/>entrada ou saída</div>
        }else{
            return (meusRegistros.map(registro => <Registro date={registro.date} description={registro.description} value={registro.value} type={registro.type}/>))
        }            
    }

    const mostraRegistros = loadRegistros();

    return (
        <>
            <Container>
                <div className="topBar">
                    <h1>Olá, {name}!</h1>
                    <ion-icon name="log-out-outline" style={{color: 'white', fontSize: '26px'}}></ion-icon>
                </div>                
                <RegistrosCard>
                    {mostraRegistros}
                    <div className="bottom">
                        <span className="saldo-name">Saldo</span>
                        <span className="saldo-value"></span>
                    </div>
                </RegistrosCard>
                <BottomPart>
                    <BottomBtn onClick={novaEntrada}>
                        <ion-icon name="add-circle-outline" style={{color: 'white', fontSize: '26px'}}></ion-icon>
                        <span>Nova entrada</span>
                    </BottomBtn>
                    <BottomBtn onClick={novaSaida}>
                        <ion-icon name="remove-circle-outline" style={{color: 'white', fontSize: '26px'}}></ion-icon>
                        <span>Nova saida</span>                        
                    </BottomBtn>
                </BottomPart>    
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


    .topBar {
        width: 326px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 22px;
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
`

const RegistrosCard = styled.div`
    width: 326px;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 16px;
    box-sizing: border-box;
    padding: 24px 12px 13px 12px;
    overflow-y: scroll;
    .registry {
        width: 326px;
        height: 446px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;

        color: #868686;
    }
`

const BottomPart = styled.div`
    width: 326px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const BottomBtn = styled.div`
    box-sizing: border-box;
    width: 155px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    padding: 12px;
    color: #FFFFFF;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`