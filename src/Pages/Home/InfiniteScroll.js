import React, {
    useState,
    useEffect,
    useContext,
    useRef,
    useMemo,
    useCallback,
} from "react";
import { ref, getDownloadURL, listAll, list } from "firebase/storage";
import {
    query,
    collection,
    getDocs,
    where,
    limit,
    orderBy,
    startAt,
    startAfter,
} from "firebase/firestore";

import { db } from "../../Firebase-config";
import { storage } from "../../Firebase-config";

function InfiniteScroll({
    videoList,
    editorName,
    videoNameList,
    userIdList,
    setIsEnd,
    setNextPage,
    setVideoList,
    setEditorName,
    setVideoNameList,
    setUserIdList,
    isEnd,
    nextPage,
}) {
    const lastVideoRef = useRef(null);

    async function getVideo(nextPage) {
        console.log("START", nextPage);
        let data;
        if (nextPage) {
            console.log("ifNextPage", nextPage);
            data = query(
                collection(db, "videoForAll"),
                orderBy("videoUrlForHome"),
                startAfter(nextPage),
                limit(4)
            );
        } else {
            console.log("else");
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
            const id = doc.id;
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
        console.log("last", last);
        if (!last) {
            setIsEnd(true);
        } else {
            setNextPage(last);
        }
    }

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
    }, [isEnd, nextPage]);

    return (
        <>
            {videoList.map((url, i) => (
                <video key={i} src={url} controls />
            ))}
            <div ref={lastVideoRef} />
        </>
    );
}
export default InfiniteScroll;
