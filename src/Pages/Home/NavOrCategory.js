import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../Firebase-config";
import { storage } from "../../Firebase-config";

import { ref } from "firebase/storage";

import Nav from "./Nav";
import Category from "./Category";

const NavOrCategory = ({ setSelectedCategory, setVideoCategoryList }) => {
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

    const [showEnterprise, setShowEnterprise] = useState();
    const [showAnimation, setShowAnimation] = useState();
    const [showEvent, setShowEvent] = useState();
    const [showTrailer, setShowTrailer] = useState();
    const [showDocumentary, setShowDocumentary] = useState();
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
                const url = doc.data().videoUrlForHome;
                newVideoList.push(url);
            });
            setShowEnterprise(newVideoList[0]);
        }
        getVideo();
    }, []);

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
                const url = doc.data().videoUrlForHome;

                newVideoList.push(url);
            });
            setShowAnimation(newVideoList[0]);
        }
        getVideo();
    }, []);
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
                const url = doc.data().videoUrlForHome;

                newVideoList.push(url);
            });
            setShowEvent(newVideoList[0]);
        }
        getVideo();
    }, []);
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
                const url = doc.data().videoUrlForHome;

                newVideoList.push(url);
            });
            setShowTrailer(newVideoList[0]);
        }
        getVideo();
    }, []);

    // ================= Documentary ==================
    useEffect(() => {
        async function getVideo() {
            const data = query(
                collection(db, "videoForAll"),
                where("videoCategory", "==", "紀錄片")
            );
            const docSnap = await getDocs(data);
            const newVideoList = [];

            docSnap.forEach((doc) => {
                const url = doc.data().videoUrlForHome;

                newVideoList.push(url);
            });
            setShowDocumentary(newVideoList[0]);
        }
        getVideo();
    }, []);

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
                const url = doc.data().videoUrlForHome;

                newVideoList.push(url);
            });
            setShowOthers(newVideoList[0]);
        }
        getVideo();
    }, []);

    return (
        <div>
            <NavOrCategoryComp
                onMouseEnter={handleShowCategory}
                onMouseLeave={handleHideCategory}
            >
                {showCategory ? (
                    <Category
                        setSelectedCategory={setSelectedCategory}
                        showEnterprise={showEnterprise}
                        showAnimation={showAnimation}
                        showEvent={showEvent}
                        showTrailer={showTrailer}
                        showDocumentary={showDocumentary}
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
