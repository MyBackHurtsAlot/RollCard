import React, { useState, useEffect, useContext, useRef } from "react";
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

    // // ============== Enterprise ===============
    // useEffect(() => {
    //     try {
    //         async function getEnterprise() {
    //             const data = query(
    //                 collection(db, `videoForAll`),
    //                 where("videoCategory", "==", "企業形象")
    //             );
    //             const docSnap = await getDocs(data);
    //             const enterpriseList = [];
    //             docSnap.forEach((doc) => {
    //                 const enterprise = doc.data();
    //                 enterpriseList.push(enterprise.originalVideoName);

    //                 setShowEnterpriseList(enterpriseList);
    //             });
    //         }
    //         getEnterprise();
    //     } catch (error) {}
    // }, []);

    // useEffect(() => {
    //     async function getEnterpriseVideo(enterprise) {
    //         // console.log(enterprise);
    //         const response = await listAll(videoListRef, false);
    //         response.items.forEach(async (videos) => {
    //             const url = await getDownloadURL(videos);
    //             const fileName = videos.name;
    //             if (fileName === enterprise) {
    //                 setShowEnterprise(url);
    //             }
    //         });
    //     }
    //     getEnterpriseVideo(showEnterpriseList[0]);
    // }, [showEnterpriseList]);
    // // ================= Animation ==================
    // useEffect(() => {
    //     try {
    //         async function getAnimation() {
    //             const data = query(
    //                 collection(db, `videoForAll`),
    //                 where("videoCategory", "==", "動畫")
    //             );
    //             const docSnap = await getDocs(data);
    //             const animationList = [];
    //             docSnap.forEach((doc) => {
    //                 const animation = doc.data();
    //                 animationList.push(animation.originalVideoName);
    //                 setShowAnimationList(animationList);
    //             });
    //         }
    //         getAnimation();
    //     } catch (error) {}
    // }, []);

    // useEffect(() => {
    //     async function getAnimationVideo(animation) {
    //         // console.log(animation);
    //         const response = await listAll(videoListRef, false);
    //         response.items.forEach(async (videos) => {
    //             const url = await getDownloadURL(videos);
    //             const fileName = videos.name;
    //             if (fileName === animation) {
    //                 setShowAnimation(url);
    //             }
    //         });
    //     }
    //     getAnimationVideo(showAnimationList[0]);
    // }, [showAnimationList]);

    // // ================= Event ==================
    // useEffect(() => {
    //     try {
    //         async function getEvent() {
    //             const data = query(
    //                 collection(db, `videoForAll`),
    //                 where("videoCategory", "==", "活動紀錄")
    //             );
    //             const docSnap = await getDocs(data);
    //             const eventList = [];
    //             docSnap.forEach((doc) => {
    //                 const event = doc.data();
    //                 eventList.push(event.originalVideoName);
    //                 setShowEventList(eventList);
    //             });
    //         }
    //         getEvent();
    //     } catch (error) {}
    // }, []);

    // useEffect(() => {
    //     async function getEventVideo(event) {
    //         // console.log(event);
    //         const response = await listAll(videoListRef, false);
    //         response.items.forEach(async (videos) => {
    //             const url = await getDownloadURL(videos);
    //             const fileName = videos.name;
    //             if (fileName === event) {
    //                 setShowEvent(url);
    //             }
    //         });
    //     }
    //     getEventVideo(showEventList[0]);
    // }, [showEventList]);
    // // console.log(showEvent);
    // // ================= Trailer ==================
    // useEffect(() => {
    //     try {
    //         async function getTrailer() {
    //             const data = query(
    //                 collection(db, `videoForAll`),
    //                 where("videoCategory", "==", "預告片")
    //             );
    //             const docSnap = await getDocs(data);
    //             const trailerList = [];
    //             docSnap.forEach((doc) => {
    //                 const trailer = doc.data();
    //                 trailerList.push(trailer.originalVideoName);
    //                 setShowTrailerList(trailerList);
    //             });
    //         }
    //         getTrailer();
    //     } catch (error) {}
    // }, []);

    // useEffect(() => {
    //     async function getTrailerVideo(trailer) {
    //         // console.log(trailer);
    //         const response = await listAll(videoListRef, false);
    //         response.items.forEach(async (videos) => {
    //             const url = await getDownloadURL(videos);
    //             const fileName = videos.name;
    //             if (fileName === trailer) {
    //                 setShowTrailer(url);
    //             }
    //         });
    //     }
    //     getTrailerVideo(showTrailerList[0]);
    // }, [showTrailerList]);
    // // console.log(showTrailer);

    // // useEffect(() => {
    // //     async function getEventVideo(event) {
    // //         console.log(event);
    // //         const response = await listAll(videoListRef, false);
    // //         response.items.forEach(async (videos) => {
    // //             const url = await getDownloadURL(videos);
    // //             const fileName = videos.name;
    // //             if (fileName === event) {
    // //                 setShowEventList(url);
    // //             }
    // //         });
    // //     }
    // //     getEventVideo(showEventList[0]);
    // // }, [showEventList]);
    // // console.log(showEvent);

    // // ================= Documentory ==================
    // useEffect(() => {
    //     try {
    //         async function getDocumentory() {
    //             const data = query(
    //                 collection(db, `videoForAll`),
    //                 where("videoCategory", "==", "紀錄片")
    //             );
    //             const docSnap = await getDocs(data);
    //             const documentoryList = [];
    //             docSnap.forEach((doc) => {
    //                 const documentory = doc.data();
    //                 documentoryList.push(documentory.originalVideoName);
    //                 setShowDocumentoryList(documentoryList);
    //             });
    //         }
    //         getDocumentory();
    //     } catch (error) {}
    // }, []);

    // useEffect(() => {
    //     async function getDocumentoryVideo(documentory) {
    //         console.log(documentory);
    //         const response = await listAll(videoListRef, false);
    //         response.items.forEach(async (videos) => {
    //             const url = await getDownloadURL(videos);
    //             const fileName = videos.name;
    //             if (fileName === documentory) {
    //                 setShowDocumentory(url);
    //             }
    //         });
    //     }
    //     getDocumentoryVideo(showDocumentoryList[0]);
    // }, [showDocumentoryList]);
    // // console.log(showDocumentory);
    // // ================= Others ==================
    // useEffect(() => {
    //     try {
    //         async function getOthers() {
    //             const data = query(
    //                 collection(db, `videoForAll`),
    //                 where("videoCategory", "==", "其他")
    //             );
    //             const docSnap = await getDocs(data);
    //             const othersList = [];
    //             docSnap.forEach((doc) => {
    //                 const others = doc.data();
    //                 othersList.push(others.originalVideoName);
    //                 setShowOthersList(othersList);
    //             });
    //         }
    //         getOthers();
    //     } catch (error) {}
    // }, []);

    // useEffect(() => {
    //     async function getOthersVideo(others) {
    //         // console.log(others);
    //         const response = await listAll(videoListRef, false);
    //         response.items.forEach(async (videos) => {
    //             const url = await getDownloadURL(videos);
    //             const fileName = videos.name;
    //             if (fileName === others) {
    //                 setShowOthers(url);
    //             }
    //         });
    //     }
    //     getOthersVideo(showOthersList[0]);
    // }, [showOthersList]);

    // ============================VIDEOSECTION===========================
    const [videoList, setVideoList] = useState([]);
    const [videoNameList, setVideoNameList] = useState([]);
    const [videoFileNameList, setVideoFileNameList] = useState([]);
    const [userIdList, setUserIdList] = useState([]);
    const [editorName, setEditorName] = useState([]);
    const [editorAvator, setEditorAvator] = useState([]);
    const navigate = useNavigate();

    const [isEnd, setIsEnd] = useState(false);
    const [nextPage, setNextPage] = useState(false);
    const [pageToken, setPageToken] = useState(null);
    const observer = useRef(null);
    const lastVideoRef = useRef(null);

    async function getVideos(pageToken) {
        const options = { maxResults: 8 };
        if (pageToken) {
            options.pageToken = pageToken;
        }
        const response = await list(videoListRef, options);
        response.items.forEach(async (videos) => {
            const url = await getDownloadURL(videos);
            const fileName = videos.name;
            setVideoFileNameList((prev) =>
                !prev.includes(fileName) ? [...prev, fileName] : prev
            );
            setVideoList((prev) =>
                !prev.includes(url) ? [...prev, url] : prev
            );
        });
        if (response.nextPageToken) {
            setPageToken(response.nextPageToken);
        } else {
            setIsEnd(true);
        }
    }

    useEffect(() => {
        async function init() {
            await getVideos();
        }
        init();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting && !isEnd) {
                setPageToken((prevToken) => {
                    getVideos(prevToken);
                });
            }
        });
        const lastVideo = lastVideoRef.current;
        if (lastVideo) {
            observer.observe(lastVideo);
        }
        return () => {
            observer.disconnect();
        };
    }, [lastVideoRef, isEnd, setPageToken]);

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
                    {console.log(videoList.length)}
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
