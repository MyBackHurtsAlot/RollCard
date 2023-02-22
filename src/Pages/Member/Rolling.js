import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { NavLink, useParams } from "react-router-dom";

const Rolling = ({ memberVideoAll, videoNameAll }) => {
    const videoRefs = useRef([]);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (videoRefs.current) {
            const x = Math.floor(Math.random() * 100) + 1;
            const y = Math.floor(Math.random() * 100) + 1;
            setPosition({ x, y });
        }
    }, []);
    console.log("position.x", position.x, "position.y", position.y);
    return (
        <>
            <RollingWrapper>
                {memberVideoAll.map((url, index) => {
                    const splitUrl = url.split("&token=")[1];
                    return (
                        <VideoName
                            key={uuidv4()}
                            ref={(el) => (videoRefs.current[index] = el)}
                            x={position.x}
                            y={position.y}
                        >
                            <NavLink to={`/watch/${splitUrl}`}>
                                {videoNameAll[index]}
                            </NavLink>
                        </VideoName>
                    );
                })}
            </RollingWrapper>
        </>
    );
};

export default Rolling;

const RollingWrapper = styled.div`
    position: relative;
    outline: 1px solid red;
    width: 100%;
    height: 600px;
`;
const VideoName = styled.div`
    outline: 1px solid blue;
    width: 20%;
    position: fixed;

    animation: random 5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-play-state: running;
    @keyframes random {
        0% {
            transform: translate(${({ x }) => `${x}`}%, ${({ y }) => `${y}`}%);
        }
        50% {
            left: ${({ y }) => `${y}`}+60%;
            top: ${({ x }) => `${x}`}+40%;
            transform: translate(translate(-100%, -100%));
        }
        80% {
            left: ${({ y }) => `${y}`}+80%;
            top: ${({ x }) => `${x}`}+80%;
            transform: translate(translate(-100%, -100%));
        }
        100% {
            transform: translate(
                ${({ y }) => `${y}`}+10%,
                ${({ x }) => `${x}`}+10%
            );
        }
    }
`;
