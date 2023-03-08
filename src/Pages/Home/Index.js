import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    query,
    collection,
    getDocs,
    limit,
    orderBy,
    startAfter,
} from "firebase/firestore";
import { db } from "../../Firebase-config";
import styled from "styled-components";
import VideoSection from "./VideoSection";
import VideoSearchSection from "./VideoSearchSection";
import NavOrCategory from "./NavOrCategory";

const HomePage = ({ selectedCategory, setSelectedCategory }) => {
    const [videoCategoryList, setVideoCategoryList] = useState([]);

    // ============================VIDEOSECTION===========================
    const [videoList, setVideoList] = useState([]);
    const [videoNameList, setVideoNameList] = useState([]);

    const [userIdList, setUserIdList] = useState([]);
    const [editorName, setEditorName] = useState([]);

    const [nextPage, setNextPage] = useState();
    const [isEnd, setIsEnd] = useState(false);
    const lastVideoRef = useRef(null);

    async function getVideo(nextPage) {
        let data;
        if (nextPage) {
            data = query(
                collection(db, "videoForAll"),
                orderBy("videoUrlForHome"),
                startAfter(nextPage),
                limit(4)
            );
        } else {
            data = query(
                collection(db, "videoForAll"),
                orderBy("videoUrlForHome"),
                limit(4)
            );
        }
        const docSnap = await getDocs(data);

        const newEditorNameList = [];
        const newVideoNameList = [];
        const newVideoList = [];
        const newUserIdList = [];

        docSnap.forEach((doc) => {
            const url = doc.data().videoUrlForHome;
            const editor = doc.data().userName;
            const videoName = doc.data().videoName;
            const category = doc.data().videoCategory;
            const id = doc.data().user;
            newVideoList.push(url);
            newEditorNameList.push(editor);
            newVideoNameList.push(videoName);
            newUserIdList.push(id);
        });

        setVideoList((prev) => [...prev, ...newVideoList]);
        setEditorName((prev) => [...prev, ...newEditorNameList]);
        setVideoNameList((prev) => [...prev, ...newVideoNameList]);
        setUserIdList((prev) => [...prev, ...newUserIdList]);

        const last = docSnap.docs[docSnap.docs.length - 1];
        if (!last) {
            setIsEnd(true);
        } else {
            setNextPage(last);
        }
    }
    const getVideoCallback = useCallback(async (nextPage) => {
        await getVideo(nextPage);
    }, []);
    useEffect(() => {
        const option = {
            threshold: 0,
        };
        const observer = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting && !isEnd) {
                await getVideo(nextPage);
            }
        }, option);

        const lastVideo = lastVideoRef.current;
        if (lastVideo) {
            observer.observe(lastVideo);
        }

        return () => {
            observer.disconnect();
        };
    }, [isEnd, nextPage, getVideoCallback]);

    return (
        <>
            <Main>
                <NavOrCategory
                    setSelectedCategory={setSelectedCategory}
                    setVideoCategoryList={setVideoCategoryList}
                ></NavOrCategory>
                <Section>
                    {selectedCategory ? (
                        <VideoSearchSection
                            selectedCategory={selectedCategory}
                            setVideoCategoryList={setVideoCategoryList}
                            videoCategoryList={videoCategoryList}
                        />
                    ) : (
                        <VideoSection
                            videoList={videoList}
                            videoNameList={videoNameList}
                            userIdList={userIdList}
                            editorName={editorName}
                        />
                    )}
                    {videoList.length >= 0 && <div ref={lastVideoRef}></div>}
                </Section>
            </Main>
        </>
    );
};

export default HomePage;

//Styled
const Main = styled.main`
    width: 100%;
    margin-top: 66px;
`;
const Section = styled.section`
    width: 80%;
    min-height: calc(100vh - 500px - 66px);
    margin: 0 auto;
`;
