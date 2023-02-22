import { async } from "@firebase/util";
import React, { useState, useEffect } from "react";

const Controller = (videoRef, fullScreenRef) => {
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(100);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [fullScreen, setFullScreen] = useState(false);
    const [miniPlayer, setMiniPlayer] = useState(false);

    const toggleMiniPlayer = () => {
        setMiniPlayer(!miniPlayer);
    };
    useEffect(() => {
        miniPlayer
            ? videoRef.current.requestPictureInPicture()
            : document.exitPictureInPicture();
    }, [miniPlayer, videoRef]);

    const toggleFullScreen = () => {
        setFullScreen(!fullScreen);
    };
    useEffect(() => {
        fullScreen
            ? fullScreenRef.current.requestFullscreen()
            : document.exitFullscreen();
    }, [fullScreen, fullScreenRef]);
    console.log(fullScreen);
    const togglePlay = () => {
        setPlaying(!playing);
    };

    useEffect(() => {
        playing ? videoRef.current.play() : videoRef.current.pause();
    }, [playing, videoRef]);

    const handleOnTimeUpdate = () => {
        const progress =
            (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(progress);
        setCurrentTime(videoRef.current.currentTime);
        // setDuration(videoRef.current.duration);
    };
    const handleLoadedData = () => {
        setDuration(videoRef.current.duration);
    };
    const handleVideoProgress = (e) => {
        const manualChange = Number(e.target.value);
        videoRef.current.currentTime =
            (videoRef.current.duration / 100) * manualChange;
        setProgress(manualChange);
    };

    const handleVideoSpeed = (speed) => {
        videoRef.current.playbackRate = speed;
        setSpeed(speed);
    };

    const toggleMute = () => {
        setMuted(!muted);
    };
    useEffect(() => {
        videoRef.current.muted = muted;
        // videoRef.current.volume = 0;
        !muted ? (videoRef.current.volume = 1) : (videoRef.current.volume = 0);
        videoRef.current.volume !== 0 ? !muted : muted;
    }, [muted, videoRef]);

    const handleOnVolumeUpdate = () => {
        const volume = videoRef.current.volume * 100;
        setVolume(volume);
    };
    const handleVolumeChange = (e) => {
        const manualChange = Number(e.target.value);
        videoRef.current.volume = manualChange / 100;
        setVolume(manualChange);
    };

    return {
        togglePlay,
        handleOnTimeUpdate,
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
        fullScreen,
        currentTime,
        duration,
        toggleMiniPlayer,
    };
};

export default Controller;
