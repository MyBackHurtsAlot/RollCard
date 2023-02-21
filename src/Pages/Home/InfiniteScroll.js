import React, { useState, useEffect, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { ref, getDownloadURL, listAll, list } from "firebase/storage";
import {
    query,
    collection,
    setDoc,
    getDocs,
    where,
    addDoc,
    updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase-config";
import { storage } from "../../Firebase-config";
import styled from "styled-components";

const InfiniteScroll = () => {
    const [videoList, setVideoList] = useState([]);
    const [videoNameList, setVideoNameList] = useState([]);
    const [videoFileNameList, setVideoFileNameList] = useState([]);
    const [userIdList, setUserIdList] = useState([]);
    const [editorName, setEditorName] = useState([]);
    const videoListRef = ref(storage, `videosForHomePage/`);

    useEffect(() => {
        async function getVideos() {
            // const response = await listAll(videoListRef, false);
            console.log("ReRENDERED");
            const response = await list(videoListRef, { maxResults: 2 });

            response.items.forEach(async (videos) => {
                const url = await getDownloadURL(videos);
                const fileName = videos.name;
                setVideoFileNameList((prev) =>
                    !prev.includes(fileName) ? [...prev, fileName] : prev
                );
                // setVideoFileName(fileName);
                setVideoList((prev) =>
                    !prev.includes(url) ? [...prev, url] : prev
                );
            });
            // if (nextPage) {
            //     console.log(response.nextPageToken);
            //     const nextPage = await list(videoListRef, {
            //         maxResults: 2,
            //         pageToken: response.nextPageToken,
            //     });

            //     nextPage.items.forEach(async (videos) => {
            //         const url = await getDownloadURL(videos);
            //         const fileName = videos.name;
            //         setVideoFileNameList((prev) =>
            //             !prev.includes(fileName) ? [...prev, fileName] : prev
            //         );
            //         // setVideoFileName(fileName);
            //         setVideoList((prev) =>
            //             !prev.includes(url) ? [...prev, url] : prev
            //         );
            //         setIsEnd(false);
            //     });
            // }
        }
        getVideos();
    }, []);
    // console.log("next", nextPage);
    useEffect(() => {
        if (videoList.length === 0) {
            return;
        }
        try {
            async function getMemberInfo(videoFileName) {
                const data = query(
                    collection(db, "videoForAll"),
                    where("originalVideoName", "==", videoFileName)
                );
                const docSnap = await getDocs(data);
                const videoInfoArray = [];
                docSnap.forEach((doc) => {
                    videoInfoArray.push(doc.data());
                });
                return videoInfoArray;
            }
            Promise.all(
                videoFileNameList.map((fileName) => {
                    return getMemberInfo(fileName);
                })
            )
                .then((results) => {
                    const videoNameArray = [];
                    const EditorNameArray = [];
                    const userIdArray = [];
                    results.forEach((allNames) => {
                        videoNameArray.push(allNames[0].videoName);
                        EditorNameArray.push(allNames[0].userName);
                        userIdArray.push(allNames[0].user);
                        setVideoNameList(videoNameArray);
                        setEditorName(EditorNameArray);
                        setUserIdList(userIdArray);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }, [videoList]);

    return <div>InfiniteScroll</div>;
};

export default InfiniteScroll;
