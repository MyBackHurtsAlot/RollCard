import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { device } from "../../Components/Rwd";

const Loading = ({ style, progress }) => {
    return <Preload style={style}>{`${progress}`}</Preload>;
};

export default Loading;

const Preload = styled.div`
    position: absolute;
    font-size: 2em;
    font-weight: 500;
    white-space: nowrap;
    top: 0;
    left: 0;
    color: ${(props) => props.theme.colors.highLight};
    animation: preload-animation 10s linear infinite;

    @keyframes preload-animation {
        0% {
            transform: translate(0, 0);
            color: #b30000;
        }
        25% {
            left: 100%;
            top: 90%;
            transform: translate(-100%, -90%);
            color: #fe4f4f;
        }
        30% {
            left: 90%;
            top: 100%;
            transform: translate(-90%, -100%);
            color: #dc4949;
        }

        50% {
            left: 0;
            top: 10%;
            transform: translate(0, -10%);
            color: #ffbb5c;
        }
        65% {
            left: 10%;
            top: 100%;
            transform: translate(-10%, -100%);
            color: #ffa750;
        }
        80% {
            left: 100%;
            top: 10%;
            transform: translate(-100%, -10%);
            color: #ffac38;
        }
    }
    @media ${device.underDesktop} {
        font-size: 1em;
    }
`;
