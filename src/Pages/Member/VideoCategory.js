import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import ThisMemberCategory from "./ThisMemberCategory";
import { device } from "../../Components/Rwd";

const VideoCategory = ({
    memberVideoAll,
    videoNameAll,
    videoCategoryAll,
    currentMemberName,
    videoEditorAll,
}) => {
    const videoRefs = useRef([]);
    const [positionsX, setPositionsX] = useState([]);
    const [positionsY, setPositionsY] = useState([]);
    const [randomAnimations, setRandomAnimations] = useState([]);
    const [showCategory, setShowCategory] = useState(false);
    const [memberSelectedCategory, setMemberSelectedCategory] = useState("");

    useEffect(() => {
        const newAnimations = videoCategoryAll.map(() => ({
            randomAnimation: Math.ceil(Math.random() * 6),
        }));
        setRandomAnimations(newAnimations);
    }, [videoCategoryAll]);

    useEffect(() => {
        const newPositionsX = videoCategoryAll.map(() => ({
            x: Math.floor(Math.random() * 100) + 1,
        }));
        setPositionsX(newPositionsX);
        const newPositionsY = videoCategoryAll.map(() => ({
            y: Math.floor(Math.random() * 100) + 1,
        }));
        setPositionsY(newPositionsY);
    }, [videoCategoryAll]);

    const handleClick = (category) => {
        setMemberSelectedCategory(category);
        setShowCategory(true);
    };
    const filteredCategoryName = Array.from(new Set(videoCategoryAll));

    return (
        <>
            <RandomTitle>{currentMemberName} 的作品分類</RandomTitle>
            {showCategory ? (
                <ThisMemberCategory
                    memberVideoAll={memberVideoAll}
                    videoNameAll={videoNameAll}
                    videoCategoryAll={videoCategoryAll}
                    setShowCategory={setShowCategory}
                    memberSelectedCategory={memberSelectedCategory}
                    videoEditorAll={videoEditorAll}
                />
            ) : (
                <RandomWrapper>
                    {filteredCategoryName.map((category) => {
                        const index = videoCategoryAll.indexOf(category);
                        return (
                            <Random
                                key={uuidv4()}
                                ref={(el) => (videoRefs.current[index] = el)}
                                x={positionsX[index]?.x}
                                y={positionsY[index]?.y}
                                animation={
                                    randomAnimations[index]?.randomAnimation
                                }
                                onClick={() => {
                                    handleClick(
                                        videoRefs.current[index]?.innerHTML
                                    );
                                }}
                            >
                                {videoCategoryAll[index]}
                            </Random>
                        );
                    })}
                </RandomWrapper>
            )}
        </>
    );
};

export default VideoCategory;
const RandomTitle = styled.div`
    font-size: 1.3em;
    font-weight: 200;
    margin-left: 33%;
    @media ${device.underDesktop} {
        margin: 15px auto 5px 10%;
        color: ${(props) => props.theme.colors.primary_white};
        margin-left: 5%;
    }
    @media ${device.underTablet} {
        display: none;
    }
`;
const RandomWrapper = styled.div`
    width: 60%;
    height: 600px;

    position: relative;
    margin-left: 33%;
    @media ${device.underDesktop} {
        width: 90%;
        margin: 15px auto;
        border-radius: 5px;
        background-color: ${(props) => props.theme.colors.primary_white};
    }
    @media ${device.underTablet} {
        display: none;
    }
`;
const Random = styled.div`
    font-size: 1.8em;

    white-space: nowrap;
    position: absolute;
    left: ${({ x }) => `${x}%`};
    top: ${({ y }) => `${y}%`};
    transform: translate(-${({ x }) => `${x}%`}, -${({ y }) => `${y}%`});
    color: ${(props) => props.theme.colors.primary_white};
    outline: 1px solid ${(props) => props.theme.colors.primary_white};
    padding: 5px;
    border-radius: 20px;
    width: 200px;
    text-align: center;
    cursor: pointer;
    &:hover {
        animation-play-state: paused;
        color: ${(props) => props.theme.colors.primary_Dark};
        background-color: ${(props) => props.theme.colors.highLight};
    }
    animation: ${(props) =>
        props.animation === 1 &&
        css`
      random1 15s linear infinite alternate running 0.5s
    `};
    animation: ${(props) =>
        props.animation === 2 &&
        css`
      random2 15s linear infinite alternate running 0.5s
    `};
    animation: ${(props) =>
        props.animation === 3 &&
        css`
      random3 15s linear infinite alternate running 0.5s
    `};
    animation: ${(props) =>
        props.animation === 4 &&
        css`
      random4 15s linear infinite alternate running 0.5s
    `};
    animation: ${(props) =>
        props.animation === 5 &&
        css`
      random5 15s linear infinite alternate running 0.5s
    `};
    animation: ${(props) =>
        props.animation === 6 &&
        css`
      random6 15s linear infinite alternate running 0.5s
    `};
    @keyframes random1 {
        to {
            left: ${({ x }) => `${x}%`};
            top: 100%;
            transform: translate(0, -100%);
        }
    }
    @keyframes random2 {
        to {
            left: 100%;
            top: 0;
            transform: translate(-100%, 0);
        }
    }
    @keyframes random3 {
        to {
            left: 50%;
            top: 0;
            transform: translate(-50%, 0);
        }
    }
    @keyframes random4 {
        to {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
    @keyframes random5 {
        to {
            left: 0;
            top: 0;
            transform: translate(0, 0);
        }
    }
    @keyframes random6 {
        to {
            left: 0;
            top: 100%;
            transform: translate(0, -100%);
        }
    }
    @media ${device.underDesktop} {
        outline: 1px solid ${(props) => props.theme.colors.primary_Dark};
        padding: 5px;
        border-radius: 20px;
        width: 200px;
        text-align: center;
        color: ${(props) => props.theme.colors.primary_Dark};
    }
`;
