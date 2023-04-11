import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../Firebase-config";
import { device } from "../../Components/Rwd";
import { VideoStyle } from "../../GlobalStyle/SharedStyles";

const VideoSearchSection = ({
    selectedCategory,
    videoCategoryList,
    setVideoCategoryList,
}) => {
    const [videoList, setVideoList] = useState([]);
    const navigate = useNavigate();
    const [videoNameList, setVideoNameList] = useState([]);
    const [userIdList, setUserIdList] = useState([]);
    const [editorName, setEditorName] = useState([]);

    useEffect(() => {
        setVideoCategoryList([]);
        async function getVideo(selectedCategory) {
            const data = query(
                collection(db, "videoForAll"),
                where("videoCategory", "==", selectedCategory)
            );
            const docSnap = await getDocs(data);
            const newVideoList = [];
            const newEditorNameList = [];
            const newVideoNameList = [];
            const newUserIdList = [];
            docSnap.forEach((doc) => {
                const url = doc.data().videoUrlForHome;
                const editor = doc.data().userName;
                const videoName = doc.data().videoName;
                const id = doc.data().user;
                newVideoList.push(url);
                newEditorNameList.push(editor);
                newVideoNameList.push(videoName);
                newUserIdList.push(id);
            });
            setVideoList(newVideoList);
            setEditorName(newEditorNameList);
            setVideoNameList(newVideoNameList);
            setUserIdList(newUserIdList);
            setVideoCategoryList(newVideoList);
        }
        getVideo(selectedCategory);
    }, [selectedCategory]);

    return (
        <>
            <HomeVideoSectionWrapper>
                {videoCategoryList.map((url, index) => {
                    const splitUrl = url.split("&token=")[1];
                    return (
                        <HomeVideoContainer
                            key={index}
                            editor={editorName[index]}
                        >
                            <video
                                src={url}
                                onClick={() => {
                                    navigate(`/watch/${splitUrl}`);
                                }}
                            />
                            <h1>{videoNameList[index]}</h1>
                            <p
                                onClick={() =>
                                    navigate(`/member/${userIdList[index]}`)
                                }
                            >
                                {editorName[index]}
                            </p>
                        </HomeVideoContainer>
                    );
                })}
            </HomeVideoSectionWrapper>
        </>
    );
};

export default VideoSearchSection;

// ================ Styled =================
const HomeVideoSectionWrapper = styled.section`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 20px;
`;
const HomeVideoContainer = styled.div`
    width: 23%;
    position: relative;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    cursor: pointer;
    video {
        ${VideoStyle}
    }
    img {
        width: 50px;
    }
    h1 {
        font-size: 18px;
        font-weight: 500;
        margin: 5px 0 10px 0;
        line-height: 38px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    p {
        font-weight: 200;
        &:hover::after {
            content: ${({ editor }) => `"${editor} 的所有作品"`};
            position: absolute;
            top: 110%;
            left: 0;
            border-radius: 5px;
            background-color: #a6a6a6;
            color: #f2f2f2;
            padding: 5px;
        }
    }
    @media ${device.smallest} {
        width: 90%;
        margin-top: 40px;
    }
    @media ${device.mobile} {
        width: 90%;
        margin-top: 40px;
    }
    @media ${device.tablet} {
        width: 45%;
    }
    @media ${device.desktop} {
        width: 23%;
    }
`;
