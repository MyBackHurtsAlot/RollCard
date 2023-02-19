import { connectStorageEmulator } from "firebase/storage";

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
    UserInfoContext,
    UserContext,
    VideoContext,
} from "../../Context/userContext";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { query, collection, getDocs, where, limit } from "firebase/firestore";
import { storage } from "../../Firebase-config";
import { db } from "../../Firebase-config";
import { v4 as uuidv4 } from "uuid";

const ThisCategory = ({ videoCategory }) => {
    const [thisCategory, setThisCategory] = useState([]);
    const [videoList, setVideoList] = useState([]);
    const videoListRef = ref(storage, `videosForHomePage/`);
    const navigate = useNavigate();
    const [videoNameList, setVideoNameList] = useState([]);
    const [videoFileNameList, setVideoFileNameList] = useState([]);
    const [userIdList, setUserIdList] = useState([]);
    const [editorName, setEditorName] = useState([]);
    const [editorAvator, setEditorAvator] = useState([]);
    const [originalVideoName, setOriginalVideoName] = useState([]);
    useEffect(() => {
        async function getVideos() {
            const response = await listAll(videoListRef, false);
            response.items.forEach(async (videos) => {
                const url = await getDownloadURL(videos);

                const fileName = videos.name;
                // console.log(fileName);
                setVideoFileNameList((prev) =>
                    !prev.includes(fileName) ? [...prev, fileName] : prev
                );
                // setVideoFileName(fileName);
                setVideoList((prev) =>
                    !prev.includes(url) ? [...prev, url] : prev
                );
            });
        }
        getVideos();
    }, [videoCategory]);

    useEffect(() => {
        if (videoList.length === 0) {
            return;
        }
        setVideoNameList([]);
        try {
            async function getMemberInfo(videoFileName, videoCategory) {
                const data = query(
                    collection(db, "videoForAll"),
                    where("originalVideoName", "==", videoFileName),
                    where("videoCategory", "==", videoCategory),
                    limit(3)
                );
                const docSnap = await getDocs(data);
                const videoInfoArray = [];
                docSnap.forEach((doc) => {
                    videoInfoArray.push(doc.data());
                });
                if (videoInfoArray.length === 0) {
                    return [];
                }
                return videoInfoArray;
            }
            Promise.all(
                videoFileNameList.map((fileName) => {
                    return getMemberInfo(fileName, videoCategory);
                })
            )
                .then((results) => {
                    const videoNameArray = [];
                    const EditorNameArray = [];
                    const userIdArray = [];
                    const originalVideoNameArray = [];
                    // console.log(results);
                    results.forEach((allNames) => {
                        if (allNames.length === 0) {
                            return;
                        } else {
                            videoNameArray.push(allNames[0].videoName);
                            EditorNameArray.push(allNames[0].userName);
                            userIdArray.push(allNames[0].user);
                            originalVideoNameArray.push(
                                allNames[0].originalVideoName
                            );
                            setVideoNameList(videoNameArray);
                            setEditorName(EditorNameArray);
                            setUserIdList(userIdArray);
                            setOriginalVideoName(originalVideoNameArray);
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }, [videoList, videoCategory]);
    // console.log(originalVideoName);
    // console.log(thisCategory);
    useEffect(() => {
        async function filteredVideo(filteredName) {
            // console.log(filteredName);
            const response = await listAll(videoListRef, false);
            response.items.forEach(async (videos) => {
                const url = await getDownloadURL(videos);

                const fileName = videos.name;
                // console.log(filteredName);
                if (fileName === filteredName) {
                    setThisCategory((prev) =>
                        !prev.includes(url) ? [...prev, url] : prev
                    );
                }
            });
        }
        originalVideoName.map((filteredName) => {
            return filteredVideo(filteredName);
        });
    }, [originalVideoName]);
    return (
        <div>
            <ThisCat_Section_Wrapper>
                <ThisCat_Title>更多 {videoCategory} 分類的作品</ThisCat_Title>
                {thisCategory.map((url, index) => {
                    const splitUrl = url.split("&token=")[1];
                    // console.log(splitUrl);
                    return (
                        <Home_Video_Container key={uuidv4()}>
                            <VideoContent>
                                <video
                                    src={url}
                                    onClick={() => {
                                        navigate(`/watch/${splitUrl}`);
                                        window.location.reload();
                                    }}
                                />
                                <p>{videoNameList[index]}</p>
                                <p>{editorName[index]}</p>
                            </VideoContent>
                        </Home_Video_Container>
                    );
                })}
            </ThisCat_Section_Wrapper>
        </div>
    );
};

export default ThisCategory;
const ThisCat_Section_Wrapper = styled.section`
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    outline: 1px solid #404040;
    border-radius: 15px;
    padding: 15px;
`;
const ThisCat_Title = styled.div`
    margin: 0 auto;
    font-size: 1.5rem;
    font-weight: 200;
`;

const VideoContent = styled.div`
    width: 30%;
    padding: 10px;
`;
const Home_Video_Container = styled.div`
    width: 100%;
    min-height: 250px;

    /* outline: 1px solid ${(props) => props.theme.colors.primary_white}; */
    cursor: pointer;
    video {
        margin-top: 5px;
        width: 100%;
        border-radius: 15px;
        /* max-width: 45%; */
        aspect-ratio: 16/9;
        outline: 1px solid ${(props) => props.theme.colors.primary_white};
    }

    p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 5px;
    }
`;
