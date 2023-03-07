import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";
import {
    UserInfoContext,
    UserContext,
    VideoContext,
} from "../../../Context/userContext";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";

import { db } from "../../../Firebase-config";
import VideoDropDown from "../../../Components/DropDown/VideoDropDown";
import { device } from "../../../Components/Rwd";
import Card from "../../../Components/Card";

const UploadVideoInfo = ({
    videoName,
    originalVideoName,
    homePageUrl,
    memberUrl,
}) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [videoTempCategory, setTempVideoCategory] = useState("");
    const [videoDescriptionTemp, setVideoDescriptionTemp] = useState("");
    const [videoNameTemp, setVideoNameTemp] = useState("");
    const { videoDescription } = useContext(VideoContext);
    const { userName, userJob, userEmail, setUserEmail, userAbout } =
        useContext(UserInfoContext);
    const [showCard, setShowCard] = useState(false);
    const id = uuidv4();
    const submitVideoContent = async () => {
        try {
            await addDoc(collection(db, "videoForAll"), {
                user: user,
                userEmail: userEmail,
                userName: userName,
                userJob: userJob,
                userAbout: userAbout,
                videoName: videoNameTemp,
                videoCategory: videoTempCategory,
                originalVideoName: originalVideoName,
                videoDescription: videoDescriptionTemp,
                videoUrlForHome: homePageUrl,
                videoUrlForMember: memberUrl,
                videoId: id,
            });
            setShowCard(true);
            setTimeout(() => {
                navigate(`/member/profile/${user}`);
            }, 2500);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        setVideoNameTemp(videoName || "檔案名稱");
    }, [videoName]);
    useEffect(() => {
        setVideoDescriptionTemp(videoDescription);
    }, []);
    return (
        <>
            <UploadFileSectionWrapper>
                <UploadFileName
                    html={`${videoNameTemp}`}
                    onChange={(e) => {
                        setVideoNameTemp(e.target.value);
                    }}
                />
                <UploadFiledescription
                    html={`${videoDescriptionTemp}`}
                    onChange={(e) => {
                        setVideoDescriptionTemp(e.target.value);
                    }}
                />
                <VideoDropDown
                    videoTempCategory={videoTempCategory}
                    setTempVideoCategory={setTempVideoCategory}
                />
                <UploadFileConfirm onClick={submitVideoContent}>
                    上傳
                </UploadFileConfirm>
                {showCard ? <Card message={"成功上傳"} /> : ""}
            </UploadFileSectionWrapper>
        </>
    );
};

export default UploadVideoInfo;

const UploadFileSectionWrapper = styled.div`
    position: relative;
    width: 70%;
    margin: 30px auto auto auto;
    display: flex;

    flex-direction: column;
    justify-content: center;
    gap: 15px;
`;

const UploadFileName = styled(ContentEditable)`
    font-size: 1.5em;
    font-weight: 700;
    outline: none;
    padding: 10px;
    border: 1px solid #f2f2f2;
    border-radius: 15px;
    color: ${(props) => props.theme.colors.primary_white};
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:focus {
        border: 1px solid ${(props) => props.theme.colors.highLight};
    }
`;
const UploadFiledescription = styled(ContentEditable)`
    font-size: 16px;
    font-weight: 400;
    min-height: 100px;
    white-space: pre-wrap;
    word-wrap: break-word;
    outline: none;
    padding: 10px;
    border: 1px solid #f2f2f2;
    border-radius: 15px;
    color: ${(props) => props.theme.colors.primary_white};
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:focus {
        border: 1px solid ${(props) => props.theme.colors.highLight};
    }
`;
const UploadFileConfirm = styled.div`
    color: ${(props) => props.theme.colors.primary_Dark};
    cursor: pointer;
    width: 60px;
    height: 40px;
    margin-left: auto;
    border-radius: 15px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.colors.highLight};
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        transform: translateX(5px);
        transform: translateY(-5px);
        box-shadow: 5px 5px 0px 0px #a6a6a6;
    }
    @media ${device.underDesktop} {
        width: 100%;
    }
`;
