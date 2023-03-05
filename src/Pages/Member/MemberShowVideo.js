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
import { device, useWindowResize } from "../../Components/Rwd";
const MemberShowVideo = ({
    memberVideoAll,
    videoNameAll,
    videoCategoryAll,
    currentMemberAbout,
    currentMemberName,
}) => {
    const [showVideo, setShowVideo] = useState(-1);

    const [showsmallVideo, setShowSmallVideo] = useState(false);

    const videoRef = useRef(null);

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

    const isTablet = useWindowResize(767, 767);

    return (
        <>
            {isTablet ? (
                <MemberShowVideoWrapper>
                    <VideoTitle> {currentMemberName}的</VideoTitle>
                    <JobOrVideo showsmallVideo={showsmallVideo}>
                        <p
                            onClick={() => {
                                setShowSmallVideo(false);
                            }}
                        >
                            介紹
                        </p>
                        <p
                            onClick={() => {
                                setShowSmallVideo(true);
                            }}
                        >
                            作品
                        </p>
                    </JobOrVideo>
                    {showsmallVideo ? (
                        <SmallVideo>
                            {memberVideoAll.map((url, index) => {
                                const splitUrl = url.split("&token=")[1];
                                return (
                                    <SmallVideoContainer key={uuidv4()}>
                                        <NavLink to={`/watch/${splitUrl}`}>
                                            <video src={url} ref={videoRef} />

                                            <h1>{videoNameAll[index]}</h1>
                                        </NavLink>
                                    </SmallVideoContainer>
                                );
                            })}
                        </SmallVideo>
                    ) : (
                        <SmallAbout>{currentMemberAbout}</SmallAbout>
                    )}
                </MemberShowVideoWrapper>
            ) : (
                <MemberShowVideoWrapper>
                    <VideoTitle>更多 {currentMemberName} 的作品</VideoTitle>
                    {memberVideoAll.map((url, index) => {
                        const splitUrl = url.split("&token=")[1];
                        return (
                            <VideoContainer
                                key={uuidv4()}
                                onMouseEnter={() => handleShowVideo(index)}
                                onMouseLeave={() => handleHideVideo(index)}
                            >
                                <NavLink to={`/watch/${splitUrl}`}>
                                    {showVideo === index ? (
                                        <video src={url} ref={videoRef} />
                                    ) : (
                                        <video
                                            src={url}
                                            style={{ display: "none" }}
                                        />
                                    )}

                                    <h1>{videoNameAll[index]}</h1>
                                </NavLink>
                            </VideoContainer>
                        );
                    })}
                </MemberShowVideoWrapper>
            )}
        </>
    );
};

export default MemberShowVideo;
const MemberShowVideoWrapper = styled.div`
    width: 100%;
    line-height: 26px;
`;
const VideoTitle = styled.div`
    font-size: 1.3em;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
`;

const SmallVideo = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const SmallAbout = styled.div`
    font-size: 1.2em;
    margin-top: 20px;
    line-height: 26px;
`;
const JobOrVideo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1px;
    border-radius: 5px;
    cursor: pointer;
    p {
        text-align: center;
        padding: 5px;

        outline: 1px solid ${(props) => props.theme.colors.primary_Lightgrey};
        border-radius: 5px;
        width: 48%;
        font-size: 1.2em;
        transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        &:hover {
            transform: translateX(5px);
            transform: translateY(-5px);
            box-shadow: 5px 5px 0px 0px #a6a6a6;
        }
    }
    & > p:first-child {
        color: ${(props) => (props.showsmallVideo ? "" : "#0d0d0d")};
        background-color: ${(props) => (props.showsmallVideo ? "" : "#F2B705")};
    }
    & > p:nth-child(2) {
        background-color: ${(props) => (props.showsmallVideo ? "#F2B705" : "")};
        color: ${(props) => (props.showsmallVideo ? "#0d0d0d" : "")};
    }
`;
const SmallVideoContainer = styled.div`
    margin: 20px 0 10px 0;
    display: flex;

    width: 48%;
    gap: 10px;
    video {
        margin-bottom: 5px;
        width: 100%;
        border-radius: 5px;
        aspect-ratio: 16/9;
        outline: 1px solid ${(props) => props.theme.colors.primary_white};
        transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        &:hover {
            transform: translateX(5px);
            transform: translateY(-5px);
            box-shadow: 5px 5px 0px 0px #a6a6a6;
        }
    }
    a {
        color: ${(props) => props.theme.colors.primary_white};
    }
    @media ${device.underMobile} {
        width: 90%;
    }
`;

const VideoContainer = styled.div`
    width: 90%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-between;
    cursor: pointer;
    z-index: 2;
    a {
        color: ${(props) => props.theme.colors.primary_white};
    }
    video {
        position: absolute;
        right: 50px;
        top: -80px;
        width: 60%;
        border-radius: 5px;
        z-index: 3;
        width: 30%;
        aspect-ratio: 16/9;
        outline: 1px solid ${(props) => props.theme.colors.primary_white};
        animation: slideInFromTop 0.5s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        animation: moveToMouse 0.5s cubic-bezier(0.34, -0.28, 0.7, 0.93);
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
    h1 {
        width: 90%;
        line-height: 45px;
        font-size: 1.2em;
        font-weight: 300;
        transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        border-bottom: 1px solid #a6a6a660;
        &:hover {
            color: #f2b705;
        }
    }
`;
