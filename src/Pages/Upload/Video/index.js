import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
    UserInfoContext,
    UserContext,
    VideoContext,
} from "../../../Context/userContext";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../../Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../Firebase-config";
import UploadVideoInfo from "./UploadVideoInfo";
import Loading from "../../Loading/Index";
import { v4 as uuidv4 } from "uuid";
import VideoPlayer from "../../../Components/VideoPlayer/Index";

const VideoUpload = (selectedCategory) => {
    const id = uuidv4();
    const navigate = useNavigate();
    const [video, setVideo] = useState(null);
    const [memberUrl, setMemberUrl] = useState();
    const [homePageUrl, setHomePageUrl] = useState();
    const [videoCategory, setVideoCategory] = useState("");
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState("");

    const [displayNone, setDisplayNone] = useState("none");
    const [displayBlock, setDisplayBlock] = useState("block");
    const [visibility, setVisability] = useState("visible");
    const [notLoading, setNotLoading] = useState("none");
    const [noUpload, setNoUpload] = useState(false);

    const { setUserEmail } = useContext(UserInfoContext);
    const { user } = useContext(UserContext);
    const metadata = {
        contentType: "video/*",
    };
    const [videoName, setVideoName] = useState("");
    const [originalVideoName, setOriginalVideoName] = useState("");

    useEffect(() => {
        const email = auth.currentUser;
        if (email) {
            setUserEmail(email.email);
        }
    }, [user]);

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            navigate("/");
        }
    });

    const handleDrop = async (e) => {
        e.preventDefault();
        if (e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setVideoName(file.name);
            try {
                const videoRefForMember = ref(
                    storage,
                    `videos/${user}/${file.name + user}`
                );
                const videoRefForHomePage = ref(
                    storage,
                    `videosForHomePage/${file.name + user}`
                );

                if (videoRefForHomePage) {
                    const task = uploadBytesResumable(
                        videoRefForHomePage,
                        file,
                        metadata
                    );
                    setNotLoading("block");
                    setDisplayBlock("none");
                    task.on("state_changed", (snapshot) => {
                        let progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        setProgress(progress);
                    });
                    await uploadBytesResumable(
                        videoRefForMember,
                        file,
                        metadata
                    );

                    const urlForMember = await getDownloadURL(
                        ref(storage, videoRefForMember)
                    );
                    const urlRefForHomePage = await getDownloadURL(
                        ref(storage, videoRefForMember)
                    );

                    setMemberUrl(urlForMember);
                    setHomePageUrl(urlRefForHomePage);
                    setOriginalVideoName(`${file.name + user}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    const uploadVideo = async (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setVideoName(file.name);
            try {
                const videoRefForMember = ref(
                    storage,
                    `videos/${user}/${file.name + user}`
                );
                const videoRefForHomePage = ref(
                    storage,
                    `videosForHomePage/${file.name + user}`
                );

                if (videoRefForHomePage) {
                    const task = uploadBytesResumable(
                        videoRefForHomePage,
                        file,
                        metadata
                    );
                    setNotLoading("block");
                    setDisplayBlock("none");
                    task.on("state_changed", (snapshot) => {
                        let progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;

                        setProgress(progress);
                    });
                    await uploadBytesResumable(
                        videoRefForMember,
                        file,
                        metadata
                    );

                    const urlForMember = await getDownloadURL(
                        ref(storage, videoRefForMember)
                    );
                    const urlRefForHomePage = await getDownloadURL(
                        ref(storage, videoRefForMember)
                    );
                    setMemberUrl(urlForMember);
                    setHomePageUrl(urlRefForHomePage);
                    setOriginalVideoName(`${file.name + user}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        if (progress === 100) {
            setDisplayNone("flex");
            setNoUpload(true);
            setDisplayBlock("none");
            setVisability("hidden");
            setNotLoading("none");
            setVideoName(videoName);
        } else {
        }
    }, [progress]);
    const [doNotPlay, setDoNotPlay] = useState(false);
    useEffect(() => {
        setDoNotPlay(true);
    }, []);

    const fileName = `${videoName + user}`;

    return (
        <>
            <UploadAreaWrapper
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                {noUpload ? (
                    <VideoPlayer
                        videoList={memberUrl}
                        key={id}
                        doNotPlay={doNotPlay}
                    />
                ) : (
                    <UploadFileInput style={{ display: displayBlock }}>
                        {progress}
                        <h1>上傳影片</h1>
                        <p>或把檔案拖進來</p>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={uploadVideo}
                        />
                    </UploadFileInput>
                )}
                <Loading
                    style={{ display: notLoading }}
                    progress={`${Math.ceil(progress)}%`}
                />
            </UploadAreaWrapper>
            <UploadVideoInfo
                fileName={fileName}
                videoName={videoName}
                originalVideoName={originalVideoName}
                homePageUrl={homePageUrl}
                memberUrl={memberUrl}
            />
        </>
    );
};

export default VideoUpload;

// =========== Styled ============

const UploadAreaWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    margin: 66px auto 0 auto;
    aspect-ratio: 16/9;
    position: relative;
    z-index: 1;
    outline: 1px solid #a6a6a6;
    border-radius: 5px;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:focus {
        outline: 1px solid ${(props) => props.theme.colors.highLight};
    }
`;
const UploadFileInput = styled.label`
    cursor: pointer;
    text-align: center;
    h1 {
        text-align: center;
        color: ${(props) => props.theme.colors.primary_Dark};
        background-color: ${(props) => props.theme.colors.highLight};
        border-radius: 5px;
        padding: 10px;
        font-size: 1.5em;
        letter-spacing: 6px;
        font-weight: 700;
        margin-bottom: 10px;
        transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        &:hover {
            transform: translateX(5px);
            transform: translateY(-5px);
            box-shadow: 5px 5px 0px 0px #a6a6a6;
        }
    }
    p {
        letter-spacing: 5px;
    }
    input {
        display: none;
        width: 100%;
        height: 100%;
    }
`;
