import React from "react";
import styled from "styled-components";

const Card = ({ message }) => {
    return (
        <>
            <CardWrapper>
                <CardContextTop>{message}</CardContextTop>
                <CardContextMid>{message}</CardContextMid>
                <CardContextBot>{message}</CardContextBot>
            </CardWrapper>
        </>
    );
};

export default Card;

const CardWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
`;
const CardContextTop = styled.div`
    position: relative;
    font-size: 7em;

    color: ${(props) => props.theme.colors.primary_white};
    -webkit-text-stroke: 1px;
    -webkit-text-fill-color: transparent;
    animation: slideInLeft 2s linear forwards;

    @keyframes slideInLeft {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(200%);
            /* opacity: 0; */
        }
    }
`;

const CardContextMid = styled.div`
    font-size: 7em;
    color: ${(props) => props.theme.colors.highLight};
    animation: slideInOut 3s linear forwards;
    @keyframes slideInOut {
        0% {
            transform: translateX(100%);
        }
        100% {
            transform: translateX(-200%);
            /* opacity: 0; */
        }
    }
`;

const CardContextBot = styled.div`
    font-size: 7em;
    color: ${(props) => props.theme.colors.highLight};
    -webkit-text-stroke: 1px;
    -webkit-text-fill-color: transparent;
    animation: slideInLeft 2s linear forwards;

    @keyframes slideInLeft {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(200%);
        }
    }
`;
