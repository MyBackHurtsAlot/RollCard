import React, { useState, useEffect, useContext, useRef } from "react";
import { CSSTransition } from "react-transition-group";
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
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase-config";
import { storage } from "../../Firebase-config";
import styled from "styled-components";
import Nav from "./Nav";
import VideoSection from "./VideoSection";
import Category from "./Category";
import VideoSearchSection from "./VideoSearchSection";
import NavOrCategory from "./NavOrCategory";

const HomePage = ({ selectedCategory, setSelectedCategory }) => {
    // const [showCategory, setShowCategory] = useState(false);
    const [videoCategoryList, setVideoCategoryList] = useState([]);
    // const handleShowCategory = () => {
    //     setTimeout(() => {
    //         setShowCategory(true);
    //     }, 200);
    // };
    // const handleHideCategory = () => {
    //     setTimeout(() => {
    //         setShowCategory(false);
    //     }, 200);
    // };
    const [showEnterpriseList, setShowEnterpriseList] = useState([]);
    const [showAnimationList, setShowAnimationList] = useState([]);
    const [showEventList, setShowEventList] = useState([]);
    const [showTrailerList, setShowTrailerList] = useState([]);
    const [showDocumentoryList, setShowDocumentoryList] = useState([]);
    const [showOthersList, setShowOthersList] = useState([]);

    const [showEnterprise, setShowEnterprise] = useState();
    const [showAnimation, setShowAnimation] = useState();
    const [showEvent, setShowEvent] = useState();
    const [showTrailer, setShowTrailer] = useState();
    const [showDocumentory, setShowDocumentory] = useState();
    const [showOthers, setShowOthers] = useState();
    const videoListRef = ref(storage, `videosForHomePage/`);

    // ============================VIDEOSECTION===========================
    const [videoList, setVideoList] = useState([]);
    const [videoNameList, setVideoNameList] = useState([]);
    const [videoFileNameList, setVideoFileNameList] = useState([]);
    const [userIdList, setUserIdList] = useState([]);
    const [editorName, setEditorName] = useState([]);
    const [editorAvator, setEditorAvator] = useState([]);
    const navigate = useNavigate();

    const [isEnd, setIsEnd] = useState(false);

    // const nextPage = useRef(null);
    const pageToken = useRef(null);
    const [nextPage, setNextPage] = useState();
    const observer = useRef(null);
    const lastVideoRef = useRef(null);

    const [lastDoc, setLastDoc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [endOfData, setEndOfData] = useState(false);

    // async function getVideos(pageToken) {
    //     const options = { maxResults: 8 };
    //     if (pageToken) {
    //         options.pageToken = pageToken;
    //     }
    //     const response = await list(videoListRef, options);
    //     response.items.forEach(async (videos) => {
    //         const url = await getDownloadURL(videos);
    //         const fileName = videos.name;
    //         setVideoFileNameList((prev) =>
    //             !prev.includes(fileName) ? [...prev, fileName] : prev
    //         );
    //         setVideoList((prev) =>
    //             !prev.includes(url) ? [...prev, url] : prev
    //         );
    //     });
    //     if (response.nextPageToken) {
    //         setPageToken(response.nextPageToken);
    //     } else {
    //         setIsEnd(true);
    //     }
    // }

    useEffect(() => {
        async function getVideo() {
            const data = query(collection(db, "videoForAll"));
            const docSnap = await getDocs(data);
            const newEditorNameList = [];
            const newVideoNameList = [];
            const newVideoList = [];
            const newUserIdList = [];
            docSnap.forEach((doc) => {
                console.log("query");
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
            setVideoList(newVideoList);
            setEditorName(newEditorNameList);
            setVideoNameList(newVideoNameList);
            setUserIdList(newUserIdList);
        }
        getVideo();
    }, []);
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!SCROLL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // useEffect(() => {
    // async function getVideo(nextPage) {
    //     console.log("query");
    //     let data;
    //     if (nextPage) {
    //         data = query(
    //             startAfter(nextPage),
    //             orderBy("videoUrlForHome"),
    //             limit(4)
    //         );
    //     } else {
    //         data = query(
    //             collection(db, "videoForAll"),
    //             orderBy("videoUrlForHome"),
    //             limit(4)
    //         );
    //     }
    //     const docSnap = await getDocs(data);

    //     const newEditorNameList = [];
    //     const newVideoNameList = [];
    //     const newVideoList = [];
    //     const newUserIdList = [];

    //     docSnap.forEach((doc) => {
    //         const url = doc.data().videoUrlForHome;
    //         const editor = doc.data().userName;
    //         const videoName = doc.data().videoName;
    //         const category = doc.data().videoCategory;
    //         const id = doc.id;
    //         newVideoList.push(url);
    //         newEditorNameList.push(editor);
    //         newVideoNameList.push(videoName);
    //         newUserIdList.push(id);
    //     });

    //     setVideoList((prev) => [...prev, ...newVideoList]);
    //     setEditorName((prev) => [...prev, ...newEditorNameList]);
    //     setVideoNameList((prev) => [...prev, ...newVideoNameList]);
    //     setUserIdList((prev) => [...prev, ...newUserIdList]);

    //     const next = docSnap.docs[docSnap.docs.length - 1];

    //     if (!next) {
    //         setIsEnd(true);
    //     } else {
    //         setNextPage(next);
    //     }
    // }
    // useEffect(() => {
    //     async function init() {
    //         await getVideo();
    //     }
    //     init();
    // }, []);
    // console.log(nextPage);
    // console.log(isEnd);
    // useEffect(() => {
    //     const observer = new IntersectionObserver(async (entries) => {
    //         if (entries.isIntersecting && isEnd) {
    //             await getVideo(nextPage);
    //         }
    //     });

    //     const lastVideo = lastVideoRef.current;
    //     if (lastVideo) {
    //         observer.observe(lastVideo);
    //     }

    //     return () => {
    //         observer.disconnect();
    //     };
    // }, [nextPage]);
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! END !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // useEffect(() => {
    //     if (videoList.length === 0) {
    //         return;
    //     }
    //     try {
    //         async function getMemberInfo(videoFileName) {
    //             const data = query(
    //                 collection(db, "videoForAll"),
    //                 where("originalVideoName", "==", videoFileName)
    //             );
    //             const docSnap = await getDocs(data);
    //             const videoInfoArray = [];
    //             docSnap.forEach((doc) => {
    //                 videoInfoArray.push(doc.data());
    //             });
    //             return videoInfoArray;
    //         }
    //         Promise.all(
    //             videoFileNameList.map((fileName) => {
    //                 // console.log("1234", fileName);
    //                 return getMemberInfo(fileName);
    //             })
    //         )
    //             .then((results) => {
    //                 // console.log(results);
    //                 const videoNameArray = [];
    //                 const EditorNameArray = [];
    //                 const userIdArray = [];
    //                 results.forEach((allNames) => {
    //                     // console.log(allNames);
    //                     videoNameArray.push(allNames[0].videoName);
    //                     EditorNameArray.push(allNames[0].userName);
    //                     userIdArray.push(allNames[0].user);
    //                     setVideoNameList(videoNameArray);
    //                     setEditorName(EditorNameArray);
    //                     setUserIdList(userIdArray);
    //                 });
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [videoList]);

    return (
        <>
            <Main>
                <NavOrCategory
                    setSelectedCategory={setSelectedCategory}
                    setVideoCategoryList={setVideoCategoryList}
                    // onMouseEnter={handleShowCategory}
                    // onMouseLeave={handleHideCategory}
                >
                    {/* 1234
                    {console.log("top")} */}
                    {/* {showCategory ? (
                        <Category
                        // selectedCategory={selectedCategory}
                        // setSelectedCategory={setSelectedCategory}
                        // showEnterprise={showEnterprise}
                        // showAnimation={showAnimation}
                        // showEvent={showEvent}
                        // showTrailer={showTrailer}
                        // showDocumentory={showDocumentory}
                        // showOthers={showOthers}
                        // setVideoCategoryList={setVideoCategoryList}
                        />
                    ) : (
                        <Nav />
                    )} */}
                </NavOrCategory>
                {/* <Nav /> */}
                <Section>
                    {/* {console.log("bot")} */}
                    {/* <Category
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    /> */}
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
                    {/* {console.log(videoList.length)} */}
                </Section>
            </Main>
        </>
    );
};

export default HomePage;

//Styled Component
const Main = styled.main`
    width: 100%;
    margin-top: 66px;
`;

// const NavOrCategory = styled.div`
//     width: 100%;
//     height: 400;
// `;
const Section = styled.section`
    width: 80%;
    /* background-color: coral; */
    /* height: 900px; */
    margin: 0 auto;
`;
