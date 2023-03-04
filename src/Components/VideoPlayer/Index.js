import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Controller from "./Controller";
import { FaPlay, FaPause } from "react-icons/fa";
import { ImVolumeHigh, ImVolumeMute2 } from "react-icons/im";
import { RiFullscreenLine } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";
import { CgMiniPlayer } from "react-icons/cg";

const VideoPlayer = ({ videoList, doNotPlay }) => {
    const videoRef = useRef(null);
    const fullScreenRef = useRef(null);
    const url = videoList;
    const {
        togglePlay,
        handleOnTimeUpdate,
        currentTime,
        duration,
        handleVideoProgress,
        handleLoadedData,
        handleVideoSpeed,
        toggleMute,
        playing,
        progress,
        speed,
        muted,
        handleOnVolumeUpdate,
        handleVolumeChange,
        volume,
        toggleFullScreen,
        toggleMiniPlayer,
    } = Controller(videoRef, fullScreenRef);
    const [showControls, setShowControls] = useState(false);
    const [showSpeedControl, setShowSpeedControl] = useState(false);
    const [speedDisplay, setSpeedDisplay] = useState(false);
    const [volumeDisplay, setVolumeDisplay] = useState(false);
    const [showVolumeControl, setShowVolumeControl] = useState(false);
    const [showMiniPlayer, setShowMiniPlayer] = useState(false);
    const [showFullScreen, setShowFullScreen] = useState(false);
    const [showVolume, setShowVolume] = useState(false);
    const [showSetting, setShowSetting] = useState(false);
    const [showPlaying, setShowPlaying] = useState(false);

    const formatDuration = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const handleIconEnter = () => {
        setShowMiniPlayer(true);
    };

    const handleIconLeave = () => {
        setShowMiniPlayer(false);
    };
    const handleVolumeEnter = () => {
        setShowVolume(true);
    };
    const handleVolumeLeave = () => {
        setShowVolume(false);
    };

    const handleSettingEnter = () => {
        setShowSetting(true);
    };
    const handleSettingLeave = () => {
        setShowSetting(false);
    };

    const handlePlayingEnter = () => {
        setShowPlaying(true);
    };

    const handlePlayingLeave = () => {
        setShowPlaying(false);
    };

    useEffect(() => {
        if (!doNotPlay) {
            const handleKeyDown = (event) => {
                if (event.code === "Space") {
                    event.preventDefault();
                    togglePlay();
                    setShowControls(!showControls);
                }
            };

            window.addEventListener("keydown", handleKeyDown);
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [togglePlay]);
    return (
        <>
            <Video_Wrapper
                ref={fullScreenRef}
                onMouseEnter={() => {
                    setShowControls(true);
                }}
                onMouseLeave={() => {
                    setShowControls(false);
                    setShowSpeedControl(false);
                    setShowVolumeControl(false);
                }}
                // onKeyPress={handleSpaceBar}
            >
                <video
                    src={url}
                    ref={videoRef}
                    onLoadedData={handleLoadedData}
                    onTimeUpdate={handleOnTimeUpdate}
                    onVolumeChange={handleOnVolumeUpdate}
                    onClick={togglePlay}
                />
                <Video_Controller_Wrapper isHovered={showControls}>
                    <IsPlaying
                        onClick={togglePlay}
                        onMouseEnter={handlePlayingEnter}
                        onMouseLeave={handlePlayingLeave}
                        showPlaying={!showPlaying}
                    >
                        {!playing ? (
                            showPlaying ? (
                                <PlayIcon />
                            ) : (
                                "播"
                            )
                        ) : !showPlaying ? (
                            "止"
                        ) : (
                            <PauseIcon />
                        )}
                    </IsPlaying>
                    <TimelineWapper>
                        <TimeCode>{formatDuration(currentTime)}</TimeCode>
                        <Timeline
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={(e) => handleVideoProgress(e)}
                        />
                        <Duration>{formatDuration(duration)}</Duration>
                    </TimelineWapper>
                    <SettingsWrapper
                        onMouseEnter={() => {
                            setShowSpeedControl(true);
                            setSpeedDisplay(true);
                        }}
                        onMouseLeave={() => {
                            setShowSpeedControl(false);
                        }}
                    >
                        <Settings
                            onMouseEnter={handleSettingEnter}
                            onMouseLeave={handleSettingLeave}
                            showSetting={!showSetting}
                        >
                            {showSetting ? <SettingsIcon /> : "速"}
                        </Settings>
                        <SpeedController
                            onMouseLeave={() => {
                                setSpeedDisplay(false);
                            }}
                            showSpeedControl={showSpeedControl}
                            speedDisplay={speedDisplay}
                        >
                            <li
                                onClick={() => handleVideoSpeed(0.5)}
                                // showSelected={showSelected}
                                className={speed === 0.5 ? "selected" : ""}
                            >
                                0.5
                            </li>
                            <li
                                onClick={() => handleVideoSpeed(0.75)}
                                className={speed === 0.75 ? "selected" : ""}
                            >
                                0.75
                            </li>
                            <li
                                onClick={() => handleVideoSpeed(1)}
                                className={speed === 1 ? "selected" : ""}
                            >
                                Normal
                            </li>
                            <li
                                onClick={() => handleVideoSpeed(1.5)}
                                className={speed === 1.5 ? "selected" : ""}
                            >
                                1.5
                            </li>
                            <li
                                onClick={() => handleVideoSpeed(2)}
                                className={speed === 2 ? "selected" : ""}
                            >
                                2.0
                            </li>
                        </SpeedController>
                    </SettingsWrapper>
                    <VolumeWrapper
                        onMouseEnter={() => {
                            setShowVolumeControl(true);
                            setVolumeDisplay(true);
                        }}
                        onMouseLeave={() => {
                            setShowVolumeControl(false);
                        }}
                        volumeDisplay={volumeDisplay}
                    >
                        <VolumeContainer
                            onClick={toggleMute}
                            onMouseEnter={handleVolumeEnter}
                            onMouseLeave={handleVolumeLeave}
                            showVolume={!showVolume}
                        >
                            {!muted && volume !== 0 ? (
                                showVolume ? (
                                    <VolumeOn />
                                ) : (
                                    "音"
                                )
                            ) : (
                                <VolumeOff />
                            )}
                        </VolumeContainer>
                        <VolumeBar
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onMouseLeave={() => {
                                setVolumeDisplay(false);
                            }}
                            showVolumeControl={showVolumeControl}
                            volumeDisplay={volumeDisplay}
                            onChange={handleVolumeChange}
                        />
                    </VolumeWrapper>
                    <MiniPlayer
                        onMouseEnter={handleIconEnter}
                        onMouseLeave={handleIconLeave}
                        onClick={toggleMiniPlayer}
                        showMiniPlayer={!showMiniPlayer}
                    >
                        {showMiniPlayer ? <MiniPlayerIcon /> : "小"}
                    </MiniPlayer>
                    {/* <MiniPlayer onClick={toggleMiniPlayer} /> */}
                    <FullScreen
                        onClick={toggleFullScreen}
                        onMouseEnter={() => setShowFullScreen(true)}
                        onMouseLeave={() => setShowFullScreen(false)}
                        showFullScreen={!showFullScreen}
                    >
                        {showFullScreen ? <FullScreenIcon /> : "全"}
                    </FullScreen>
                </Video_Controller_Wrapper>
            </Video_Wrapper>
        </>
    );
};

export default VideoPlayer;
// ========= Styled =========
const Video_Wrapper = styled.div`
    position: relative;
    width: 100%;
    margin: 70px auto 20px auto;
    aspect-ratio: 16/9;
    text-shadow: 1px 1.3px 2px rgba(64, 64, 64, 0.45);
    video {
        width: 100%;

        aspect-ratio: 16/9;
    }
`;

const Video_Controller_Wrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    bottom: ${(props) => (props.isHovered ? "15px" : "5px")};
    width: 100%;
    height: 50px;
    z-index: 5;
    opacity: ${(props) => (props.isHovered ? 100 : 0)};
    transition: all 0.5s cubic-bezier(0.34, -0.28, 0.7, 0.93);
`;
const IsPlaying = styled.div`
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        color: ${(props) => props.theme.colors.highLight};
    }
`;
const PlayIcon = styled(FaPlay)`
    width: 20px;
    height: 20px;
`;

const PauseIcon = styled(FaPause)`
    width: 20px;
    height: 20px;
`;
const TimelineWapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    width: 70%;
`;
const Timeline = styled.input`
    width: 100%;
    height: 3px;
    cursor: pointer;
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: ${(props) => props.theme.colors.highLight};
        color: ${(props) => props.theme.colors.highLight};
    }
`;
const Duration = styled.div`
    font-size: 16px;
    font-weight: 200;
    cursor: default;
`;
const TimeCode = styled(Duration)``;

const SettingsWrapper = styled.div`
    cursor: pointer;
    position: relative;
`;

const Settings = styled.div`
    width: 20px;
    height: 20px;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        color: ${(props) => props.theme.colors.highLight};
    }
`;

const SettingsIcon = styled(AiFillSetting)`
    width: 20px;
    height: 20px;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        transform: rotate(30deg);
        color: ${(props) => props.theme.colors.highLight};
    }
`;
const SpeedController = styled.ul`
    width: 100px;
    height: 150px;
    position: absolute;
    transform: translate(-44%, 10px);
    bottom: ${(props) => (props.showSpeedControl ? "55px" : "50px")};
    opacity: ${(props) => (props.showSpeedControl ? 100 : 0)};
    display: flex;
    pointer-events: ${(props) => (props.speedDisplay ? "auto" : "none")};
    flex-direction: column;
    transition: all 0.5s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    gap: 10px;
    justify-content: center;
    align-items: center;
    background-color: #40404070;
    border-radius: 15px;
    cursor: pointer;
    li {
        width: 100%;
        font-weight: 200;
        color: ${(props) => props.theme.colors.primary_white};
        text-align: center;
        position: relative;
        &:hover {
            font-weight: 700;
            font-size: 1.2em;
        }
    }
    li.selected {
        color: ${(props) => props.theme.colors.highLight};
        font-weight: 500;
        font-size: 1.1em;
        &:hover {
            font-weight: 700;
            font-size: 1.2em;
        }
    }
`;
const VolumeWrapper = styled.div`
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: relative;
`;
const VolumeContainer = styled.div`
    display: flex;
    align-items: center;
    width: 20px;
`;
const VolumeOn = styled(ImVolumeHigh)`
    width: 20px;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        color: ${(props) => props.theme.colors.highLight};
    }
`;
const VolumeOff = styled(ImVolumeMute2)`
    width: 20px;
    height: 20px;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);

    color: ${(props) => props.theme.colors.highLight};
`;
const VolumeBar = styled.input`
    transform: rotate(-90deg) translate(-50%, 10px);

    width: 100px;
    height: 5px;
    position: absolute;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: ${(props) => props.theme.colors.highLight};
    }
    bottom: ${(props) => (props.showVolumeControl ? "80px" : "70px")};
    opacity: ${(props) => (props.showVolumeControl ? 110 : 0)};
    pointer-events: ${(props) => (props.volumeDisplay ? "pointer" : "none")};
    transition: all 0.5s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    transform-origin: 0 0;
`;

const FullScreen = styled.div`
    cursor: pointer;
    width: 20px;
    height: 20px;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        color: ${(props) => props.theme.colors.highLight};
    }
`;

const FullScreenIcon = styled(RiFullscreenLine)`
    cursor: pointer;
    width: 20px;
    height: 20px;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        color: ${(props) => props.theme.colors.highLight};
    }
`;
const MiniPlayer = styled.div`
    cursor: pointer;
    width: 20px;
    height: 20px;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        color: ${(props) => props.theme.colors.highLight};
    }
`;
const MiniPlayerIcon = styled(CgMiniPlayer)`
    cursor: pointer;
    width: 22px;
    height: 22px;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        color: ${(props) => props.theme.colors.highLight};
    }
`;
