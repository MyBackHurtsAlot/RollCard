import React, {
    useContext,
    useState,
    useEffect,
    useRef,
    useCallback,
} from "react";
import { NavLink, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { device } from "../../Components/Rwd";
const MemberShowVideo = ({ memberVideoAll, videoNameAll }) => {
    const [showVideo, setShowVideo] = useState(-1);
    const [mousex, setMousex] = useState(0);
    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);
    const mouse = useRef({ x: 0 });

    const handleShowVideo = (index) => {
        setShowVideo(index);
    };
    const handleMouseMove = (e) => {
        const container = e.currentTarget.getBoundingClientRect();
        const distanceFromLeft = e.clientX - container.left;
        const distanceFromRight = container.right - e.clientX;
        const containerWidth = container.right - container.left;
        const videoWidth = 0.45 * containerWidth;
        const maxDistance = containerWidth - videoWidth;

        const videoX =
            distanceFromLeft < maxDistance
                ? -distanceFromLeft
                : maxDistance - distanceFromRight;

        setMousex(videoX);
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
                                {/* {showVideo === index ? ( */}
                                <video
                                    src={url}
                                    ref={videoRef}
                                    style={{
                                        display:
                                            showVideo === index
                                                ? "block"
                                                : "none",
                                        transform: `translateX(${mousex}px)`,
                                    }}
                                />

                                {/* ) : (
                                    <video
                                        src={url}
                                        style={{ display: "none" }}
                                    />
                                )} */}
                            </NavLink>
                            <p
                                onMouseEnter={() => handleShowVideo(index)}
                                onMouseMove={(e) => handleMouseMove(e)}
                            >
                                {videoNameAll[index]}
                                {console.log(showVideo)}
                                {console.log(mousex)}
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
    /* @media ${device.underDesktop} {
        width: 50%;
    } */
`;

const VideoContainer = styled.div`
    width: 90%;
    position: relative;
    /* height: 324px; */
    /* outline: 1px solid blue; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-between;
    cursor: pointer;
    z-index: 2;
    video {
        position: absolute;
        right: 50px;
        top: -80px;
        width: 60%;
        border-radius: 15px;
        z-index: 3;
        width: 45%;
        aspect-ratio: 16/9;
        /* transform: rotate(5deg); */
        outline: 1px solid ${(props) => props.theme.colors.primary_white};
        animation: slideInFromTop 0.5s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        animation: moveToMouse 0.5s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        opacity: 100;
        /* transform: translateX(-${(props) => props.mousex}px); */
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
        /* @keyframes moveToMouse {
            from {
                transform: translateX(1);
            }
            to {
                transform: translateX(${(props) => props.mousex}px);
            }
        } */
        transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        &:hover {
            transform: translateX(5px);
            transform: translateY(-5px);
            box-shadow: 5px 5px 0px 0px #a6a6a6;
        }
    }
    p {
        width: 90%;
        line-height: 50px;
        font-size: 1.3em;
        transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        border-bottom: 1px solid #a6a6a660;
        &:hover {
            color: #f2b705;
        }
    }

    /* outline: 1px solid red; */
`;
