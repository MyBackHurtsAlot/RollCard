import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

import Nav from "./Nav";
import Category from "./Category";

const NavOrCategory = ({ setSelectedCategory, setVideoCategoryList }) => {
    // const [videoCategoryList, setVideoCategoryList] = useState([]);
    //=============
    const [showCategory, setShowCategory] = useState(false);
    const handleShowCategory = () => {
        setTimeout(() => {
            setShowCategory(true);
        }, 200);
    };
    const handleHideCategory = () => {
        setTimeout(() => {
            setShowCategory(false);
        }, 200);
    };
    // ==============

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

    // ============== Enterprise ===============
    useEffect(() => {
        async function getVideo() {
            const data = query(
                collection(db, "videoForAll"),
                where("videoCategory", "==", "企業形象")
            );
            const docSnap = await getDocs(data);
            const newVideoList = [];

            docSnap.forEach((doc) => {
                // console.log("query");
                const url = doc.data().videoUrlForHome;

                newVideoList.push(url);
            });
            setShowEnterprise(newVideoList[0]);
        }
        getVideo();
    }, []);
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
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, []);
    // // console.log("List", showEnterpriseList[0]);

    // useEffect(() => {
    //     async function getEnterpriseVideo(enterprise) {
    //         // console.log("inside", enterprise);
    //         const response = await listAll(videoListRef, false);
    //         // console.log(response);
    //         const tempArray = [];
    //         response.items.forEach(async (videos) => {
    //             const url = await getDownloadURL(videos);
    //             const fileName = videos.name;
    //             if (enterprise === fileName) setShowEnterprise(url);
    //             // tempArray.push(fileName);
    //             /*
    //             // console.log(tempArray);
    //             // tempArray.map((item) => {
    //             tempArray.forEach((item) => {
    //                 // console.log("item", item);
    //                 if (item === enterprise) {
    //                     console.log(item, enterprise);
    //                     // console.log("after map", url);
    //                     console.log(url);
    //                     setShowEnterprise(url);
    //                     return;
    //                 }
    //             });
    //             */
    //         });
    //     }
    //     getEnterpriseVideo(showEnterpriseList[0]);
    // }, [showEnterpriseList]);
    // console.log("enter", showEnterprise);
    // ================= Animation ==================
    useEffect(() => {
        async function getVideo() {
            const data = query(
                collection(db, "videoForAll"),
                where("videoCategory", "==", "動畫")
            );
            const docSnap = await getDocs(data);
            const newVideoList = [];

            docSnap.forEach((doc) => {
                // console.log("query");
                const url = doc.data().videoUrlForHome;

                newVideoList.push(url);
            });
            setShowAnimation(newVideoList[0]);
        }
        getVideo();
    }, []);
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
    //                 // console.log(animation);
    //                 animationList.push(animation.originalVideoName);
    //                 setShowAnimationList(animationList);
    //             });
    //         }
    //         getAnimation();
    //     } catch (error) {}
    // }, []);
    // // console.log("showAnimation", showAnimation);
    // useEffect(() => {
    //     async function getAnimationVideo(animation) {
    //         const response = await listAll(videoListRef, false);
    //         const tempArray = [];
    //         response.items.forEach(async (videos) => {
    //             const url = await getDownloadURL(videos);
    //             const fileName = videos.name;
    //             if (animation === fileName) setShowAnimation(url);
    //             //         tempArray.push(fileName);
    //             //         tempArray.map((item) => {
    //             //             if (item === animation) {
    //             //                 setShowAnimation(url);
    //             //             }
    //             //         });
    //         });
    //     }
    //     getAnimationVideo(showAnimationList[0]);
    // }, [showAnimationList]);
    // console.log("ani", showAnimation);
    // ================= Event ==================
    useEffect(() => {
        async function getVideo() {
            const data = query(
                collection(db, "videoForAll"),
                where("videoCategory", "==", "活動紀錄")
            );
            const docSnap = await getDocs(data);
            const newVideoList = [];

            docSnap.forEach((doc) => {
                // console.log("query");
                const url = doc.data().videoUrlForHome;

                newVideoList.push(url);
            });
            setShowEvent(newVideoList[0]);
        }
        getVideo();
    }, []);
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
    //         const tempArray = [];
    //         response.items.forEach(async (videos) => {
    //             const url = await getDownloadURL(videos);
    //             const fileName = videos.name;
    //             if (event === fileName) setShowEvent(url);
    //             // tempArray.push(fileName);
    //             // tempArray.map((item) => {
    //             //     if (item === event) {
    //             //         setShowEvent(url);
    //             //     }
    //             // });
    //         });
    //     }
    //     getEventVideo(showEventList[0]);
    // }, [showEventList]);
    // console.log(showEvent);
    // ================= Trailer ==================
    useEffect(() => {
        async function getVideo() {
            const data = query(
                collection(db, "videoForAll"),
                where("videoCategory", "==", "預告片")
            );
            const docSnap = await getDocs(data);
            const newVideoList = [];

            docSnap.forEach((doc) => {
                // console.log("query");
                const url = doc.data().videoUrlForHome;

                newVideoList.push(url);
            });
            setShowTrailer(newVideoList[0]);
        }
        getVideo();
    }, []);
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
    //         const tempArray = [];
    //         response.items.forEach(async (videos) => {
    //             const url = await getDownloadURL(videos);
    //             const fileName = videos.name;
    //             if (trailer === fileName) setShowTrailer(url);
    //             // tempArray.push(fileName);
    //             // tempArray.map((item) => {
    //             //     if (item === trailer) {
    //             //         setShowTrailer(url);
    //             //     }
    //             // });
    //         });
    //     }
    //     getTrailerVideo(showTrailerList[0]);
    // }, [showTrailerList]);
    // console.log("showTrailer", showTrailer);

    // ================= Documentory ==================
    useEffect(() => {
        async function getVideo() {
            const data = query(
                collection(db, "videoForAll"),
                where("videoCategory", "==", "紀錄片")
            );
            const docSnap = await getDocs(data);
            const newVideoList = [];

            docSnap.forEach((doc) => {
                // console.log("query");
                const url = doc.data().videoUrlForHome;

                newVideoList.push(url);
            });
            setShowDocumentory(newVideoList[0]);
        }
        getVideo();
    }, []);
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
    //         // console.log(documentory);
    //         const response = await listAll(videoListRef, false);
    //         const tempArray = [];
    //         response.items.forEach(async (videos) => {
    //             const url = await getDownloadURL(videos);
    //             const fileName = videos.name;
    //             if (documentory === fileName) setShowDocumentory(url);
    //             // tempArray.push(fileName);
    //             // tempArray.map((item) => {
    //             //     if (item === documentory) {
    //             //         setShowDocumentory(url);
    //             //     }
    //             // });
    //         });
    //     }
    //     getDocumentoryVideo(showDocumentoryList[0]);
    // }, [showDocumentoryList]);
    // console.log(showDocumentory);
    // ================= Others ==================
    useEffect(() => {
        async function getVideo() {
            const data = query(
                collection(db, "videoForAll"),
                where("videoCategory", "==", "其他")
            );
            const docSnap = await getDocs(data);
            const newVideoList = [];

            docSnap.forEach((doc) => {
                // console.log("query");
                const url = doc.data().videoUrlForHome;

                newVideoList.push(url);
            });
            setShowOthers(newVideoList[0]);
        }
        getVideo();
    }, []);
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
    //         const tempArray = [];
    //         response.items.forEach(async (videos) => {
    //             const url = await getDownloadURL(videos);
    //             const fileName = videos.name;
    //             tempArray.push(fileName);
    //             tempArray.map((item) => {
    //                 if (item === others) {
    //                     setShowOthers(url);
    //                 }
    //             });
    //         });
    //     }
    //     getOthersVideo(showOthersList[0]);
    // }, [showOthersList]);

    return (
        <div>
            <NavOrCategoryComp
                onMouseEnter={handleShowCategory}
                onMouseLeave={handleHideCategory}
            >
                {/* {console.log("top")} */}
                {showCategory ? (
                    <Category
                        // selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        showEnterprise={showEnterprise}
                        showAnimation={showAnimation}
                        showEvent={showEvent}
                        showTrailer={showTrailer}
                        showDocumentory={showDocumentory}
                        showOthers={showOthers}
                        setVideoCategoryList={setVideoCategoryList}
                    />
                ) : (
                    <Nav />
                )}
            </NavOrCategoryComp>
        </div>
    );
};

export default NavOrCategory;

const NavOrCategoryComp = styled.div`
    width: 100%;
    height: 400;
`;
