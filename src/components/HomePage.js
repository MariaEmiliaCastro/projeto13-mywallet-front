import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import Registro from "./Registro";

export default function HomePage () {

    const { token, name, url } = React.useContext(UserContext);
    const [ meusRegistros, setMeusRegistros ] = React.useState('');
    const [saldo, setSaldo] = React.useState(null);
    

    const navigate = useNavigate();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    React.useEffect(() => {

        const promise = axios.get(`${url}/registro`, config);
        promise.then( res => {
            if(res.data.length > 0 || res !== undefined){
                setMeusRegistros(res.data.userData);     
                setSaldo(res.data.total);
            }else{
                console.log("Sem Atividades Cadastradas!");
            }
            
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const novaEntrada = () => {
        navigate('/entrada');
    }

    const novaSaida = () => {
        navigate('/saida');
    }

    const logout = () => {
        axios.delete(`${url}/signout`, config)
            .then(res => {
                console.log("Usuario deslogou!");
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            })
    }

    function loadRegistros() {
        if(meusRegistros.length === 0 || meusRegistros === undefined || saldo === undefined){
            return <div className="no-registry">Não há registros de<br/>entrada ou saída</div>
        }else{  
            console.log(saldo);
            return (meusRegistros.map((registro, index) => <Registro date={registro.date} description={registro.description} value={registro.value} type={registro.type} key={index}/>))
        }            
    }

    const saldoColor = () => {
        if(saldo >= 0){
            return '#03AC00';
        }else{
            return '#C70000';
        }
    }
    const mostraRegistros = loadRegistros();

    return (
        <>
            <Container>
                <div className="topBar">
                    <h1>Olá, {name}!</h1>
                    <ion-icon name="log-out-outline" style={{color: 'white', fontSize: '26px'}} onClick={logout}></ion-icon>
                </div>                
                <RegistrosCard>
                    <ListaRegistros>
                        {mostraRegistros}
                    </ListaRegistros>
                    
                    <Saldo>
                        <span className="saldo-name">Saldo</span>
                        <span className="saldo-value" style={{color: saldoColor()}}>{saldo === null ? '0,00' : String(saldo.toFixed(2)).replace('.', ',')}</span>
                    </Saldo>
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
    padding: 16px 12px 13px 12px;

    .no-registry {
        display: flex;
        height: 100%;
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

const ListaRegistros = styled.div`

    width: 100%;
    height: 95%;
    overflow-y: scroll;
`

const Saldo = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    /* identical to box height */
    width: 100%;
    display: flex;
    justify-content: space-between;

    .saldo-name {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        color: #000000;
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