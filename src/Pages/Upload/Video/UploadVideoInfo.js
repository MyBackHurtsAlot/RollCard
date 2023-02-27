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
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../Firebase-config";
import { db } from "../../../Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../Firebase-config";
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
    const { userName, userJob, userEmail, setUserEmail } =
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
    console.log(showCard);
    // console.log(videoName);
    return (
        <>
            <Upload_File_Section_Wrapper>
                <Upload_File_Name
                    html={`${videoNameTemp}`}
                    onChange={(e) => {
                        setVideoNameTemp(e.target.value);
                    }}
                />
                <Upload_File_description
                    html={`${videoDescriptionTemp}`}
                    onChange={(e) => {
                        setVideoDescriptionTemp(e.target.value);
                    }}
                />
                <VideoDropDown
                    videoTempCategory={videoTempCategory}
                    setTempVideoCategory={setTempVideoCategory}
                />
                <Upload_File_Confirm onClick={submitVideoContent}>
                    上傳
                </Upload_File_Confirm>
                {/* <Card /> */}
                {showCard ? <Card message={"成功上傳"} /> : ""}
            </Upload_File_Section_Wrapper>
        </>
    );
};

export default UploadVideoInfo;

const Upload_File_Section_Wrapper = styled.div`
    position: relative;
    width: 70%;
    margin: 30px auto auto auto;
    display: flex;

    flex-direction: column;
    justify-content: center;
    gap: 15px;
`;

const Upload_File_Name = styled(ContentEditable)`
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
const Upload_File_description = styled(ContentEditable)`
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
const Upload_File_Confirm = styled.div`
    color: ${(props) => props.theme.colors.primary_Dark};
    cursor: pointer;
    width: 60px;
    height: 40px;
    margin-left: auto;
    /* direction: rtl; */
    /* outline: 1px solid #f2f2f2; */
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
const Upload_Video = styled.video`
    margin: 0 auto;
    width: 100%;
    height: 100%;
`;
