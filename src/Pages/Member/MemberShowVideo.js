import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { v4 as uuidv4 } from "uuid";

const MemberShowVideo = ({ memberVideoAll, videoNameAll }) => {
    const [showVideo, setShowVideo] = useState(-1);
    const handleShowVideo = (index) => {
        setShowVideo(index);
    };
    const handleHideVideo = (index = -1) => {
        setTimeout(() => {
            if (index !== -1) {
                setShowVideo(-1);
            } else {
                setShowVideo(index);
            }
        }, 200);
    };
    return (
        <>
            <MemberShowVideoWrapper>
                {memberVideoAll.map((url, index) => {
                    const splitUrl = url.split("&token=")[1];
                    // console.log(splitUrl);
                    return (
                        <VideoContainer
                            key={uuidv4()}
                            onMouseLeave={() => handleHideVideo(index)}
                        >
                            <NavLink to={`/watch/${splitUrl}`}>
                                {showVideo === index ? (
                                    <video
                                        src={url}
                                        style={{ display: "block" }}
                                    />
                                ) : (
                                    <video
                                        src={url}
                                        style={{ display: "none" }}
                                    />
                                )}
                            </NavLink>
                            <p onMouseEnter={() => handleShowVideo(index)}>
                                {videoNameAll[index]}
                            </p>
                        </VideoContainer>
                    );
                })}
            </MemberShowVideoWrapper>
        </>
    );
};

export default MemberShowVideo;
const MemberShowVideoWrapper = styled.div`
    width: 100%;
    /* display: flex;
    justify-content: space-between; */
`;

const VideoContainer = styled.div`
    width: 100%;
    position: relative;
    /* height: 324px; */
    /* outline: 1px solid blue; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-between;
    cursor: pointer;
    video {
        position: absolute;
        right: 50px;
        top: -80px;
        width: 60%;
        border-radius: 15px;
        z-index: 3;
        /* max-width: 45%; */
        aspect-ratio: 16/9;
        /* transform: rotate(5deg); */
        outline: 1px solid ${(props) => props.theme.colors.primary_white};
        animation: slideInFromTop 0.5s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        opacity: 100;
        @keyframes slideInFromTop {
            from {
                transform: translateX(-80%);
                transform: rotate(5deg);
                opacity: 0;
            }
            to {
                transform: translateX(1);
                transform: rotate(0);
                opacity: 100;
            }
        }
        transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        &:hover {
            transform: translateX(5px);
            transform: translateY(-5px);
            box-shadow: 5px 5px 0px 0px #a6a6a6;
        }
    }
    p {
        width: 90%;
        line-height: 100px;
        font-size: 1.5em;
        transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        border-bottom: 1px solid #a6a6a6;
        &:hover {
            color: #f2b705;
        }

        /* outline: 1px solid red; */
    }
`;
