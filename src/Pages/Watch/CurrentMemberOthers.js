import React, { useEffect, useState, useRef, useContext } from "react";
import { UserContext } from "../../Context/userContext";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { query, collection, getDocs, where, limit } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../Firebase-config";
import { db } from "../../Firebase-config";
import { v4 as uuidv4 } from "uuid";

const CurrentMemberOthers = ({ videoEditor }) => {
    const { user } = useContext(UserContext);
    const [memberVideo, setMemberVideo] = useState([]);
    const [videoNameList, setVideoNameList] = useState([]);
    const [videoCategoryList, setVideoCategoryList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            async function getVideos(videoEditor) {
                const response = await listAll(
                    ref(storage, `videosForHomePage`)
                );

                response.items.forEach(async (videos) => {
                    const url = await getDownloadURL(videos);
                    // setMemberVideoAll(url);
                    const fileName = videos.name;

                    const data = query(
                        collection(db, "videoForAll"),
                        where("userName", "==", videoEditor),
                        limit(3)
                    );
                    const docSnap = await getDocs(data);
                    docSnap.forEach((doc) => {
                        const originalVideoName = doc.data().originalVideoName;
                        const videoName = doc.data().videoName;
                        const category = doc.data().videoCategory;
                        if (originalVideoName === fileName) {
                            setMemberVideo((prev) =>
                                !prev.includes(url) ? [...prev, url] : prev
                            );
                            setVideoNameList((prev) =>
                                !prev.includes(videoName)
                                    ? [...prev, videoName]
                                    : prev
                            );
                            setVideoCategoryList((prev) =>
                                !prev.includes(category)
                                    ? [...prev, category]
                                    : prev
                            );
                        }
                    });
                });
            }
            getVideos(videoEditor);
        } catch (error) {
            console.log(error);
        }
    }, [videoEditor]);
    // console.log("asdf", memberVideo);
    // console.log(videoCategoryList);
    return (
        <>
            <VideoWapper>
                <VideoTitle> {videoEditor} 的其他作品</VideoTitle>
                <VideoSectionWrapper>
                    {memberVideo.map((url, index) => {
                        const splitUrl = url.split("&token=")[1];
                        // console.log("member", splitUrl);
                        return (
                            <VideoContainer key={uuidv4()}>
                                <video
                                    src={url}
                                    onClick={() => {
                                        navigate(`/watch/${splitUrl}`);
                                        window.location.reload();
                                        // console.log(splitUrl);
                                        // console.log("navigate");
                                    }}
                                />
                                <p>{videoNameList[index]}</p>
                                <p>{videoCategoryList[index]}</p>
                            </VideoContainer>
                        );
                    })}
                </VideoSectionWrapper>
            </VideoWapper>
        </>
    );
};

export default CurrentMemberOthers;

const VideoWapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    gap: 30px;
    outline: 1px solid #404040;
    border-radius: 15px;
    padding: 15px;
`;
const VideoTitle = styled.div`
    font-size: 1.5rem;
    font-weight: 200;
`;

const VideoSectionWrapper = styled.section`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;
`;
const VideoContainer = styled.div`
    width: 100%;
    /* height: 324px; */
    /* outline: 1px solid red; */
    cursor: pointer;
    video {
        margin-top: 5px;
        width: 100%;
        border-radius: 15px;
        /* max-width: 45%; */
        aspect-ratio: 16/9;
        outline: 1px solid ${(props) => props.theme.colors.primary_white};
        transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        &:hover {
            transform: translateX(5px);
            transform: translateY(-5px);
            box-shadow: 5px 5px 0px 0px #a6a6a6;
        }
    }

    p {
        margin-top: 5px;
    }
    & > p:first-child {
        font-weight: 700;
    }
`;
