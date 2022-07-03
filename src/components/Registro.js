import React from "react";
import styled from "styled-components";

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      padTo2Digits(date[0]),
      padTo2Digits((Number(date[1] )+ 1).toString()),
    ].join('/');
  }

export default function Registro (props) {
    
    
    const data = props.date.split('/');

    return (
        <>
            <Container >
                <div className="description">
                    <div className="data">{formatDate(data)}</div>
                    <div className="nome">{props.description}</div>
                </div>
                <div className={props.type}>
                    {props.value}
                </div>
            </Container>
        </>        
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 12px;

    .description {
        width: 194px;
        display: flex;
    }

    .data {
        color: #C6C6C6;
        padding-right: 5px;
    }

    .entrada {
        color: #03AC00;
    }

    .saida {
        color: #C70000;
    }

`