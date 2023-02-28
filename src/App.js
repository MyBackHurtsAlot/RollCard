import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db } from "./Firebase-config";

import {
    LoginContext,
    UserContext,
    UserInfoContext,
    VideoContext,
} from "./Context/userContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase-config";
import { storage } from "./Firebase-config";
import Header from "./Components/Header/Index";
import HomePage from "./Pages/Home/Index";
import MemberEditPage from "./Pages/Member/MemberEdit/Index";
import MemberPage from "./Pages/Member/MemberPage";
import VideoUpload from "./Pages/Upload/Video/index";
import Watch from "./Pages/Watch/Index";
import VideoPlayer from "./Components/VideoPlayer/Index";
import SendEmail from "./Pages/Member/SendEmail";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState("");
    const [displayNone, setDisplayNone] = useState("none");
    const [displayBlock, setDisplayBlock] = useState("block");
    const [visibility, setVisability] = useState("visable");

    // ====== UserInfoContext ======
    const [userName, setUserName] = useState("你的名字");
    const [userEmail, setUserEmail] = useState("");
    const [userJob, setUserJob] = useState("你的職業");
    const [userAbout, setUserAbout] = useState("關於你");
    const [avator, setAvator] = useState(null);
    const [avatorPreview, setAvatorPreview] = useState(null);
    // const [video, setVideo] = useState(null);
    const [originalVideoName, setOriginalVideoName] = useState("");
    const [memberVideo, setMemberVideo] = useState([]);
    const [videoUrl, setVideoUrl] = useState("");
    const [videoName, setVideoName] = useState("檔案名稱");
    const [videoDescription, setVideoDescription] = useState("介紹你的影片");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        if (user) {
            const fetchData = async (userUid) => {
                try {
                    const data = query(
                        collection(db, "User"),
                        where("userUid", "==", userUid)
                    );
                    const docSnap = await getDocs(data);
                    docSnap.forEach((doc) => {
                        const userInfo = doc.data();
                        setUserName(userInfo.userName || "你的名字");
                        setUserJob(userInfo.userJob || "你的職業");
                        setUserAbout(userInfo.userAbout || "About you");
                    });
                    const avatorPath = `avators/${userUid}/${
                        "avator" + userUid
                    }`;
                    const avator = await getDownloadURL(
                        ref(storage, avatorPath)
                    );
                    setAvatorPreview(() => avator || null);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData(user);
        }
    }, [user]);

    return (
        <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
            <UserContext.Provider value={{ user, setUser }}>
                <UserInfoContext.Provider
                    value={{
                        userName,
                        setUserName,
                        userJob,
                        setUserJob,
                        userAbout,
                        setUserAbout,
                        avator,
                        setAvator,
                        avatorPreview,
                        setAvatorPreview,
                        userEmail,
                        setUserEmail,
                    }}
                >
                    <VideoContext.Provider
                        value={{
                            videoName,
                            setVideoName,
                            videoDescription,
                            setVideoDescription,
                            videoUrl,
                            setVideoUrl,
                            displayNone,
                            setDisplayNone,
                            displayBlock,
                            setDisplayBlock,
                            visibility,
                            setVisability,
                            memberVideo,
                            setMemberVideo,
                            originalVideoName,
                            setOriginalVideoName,
                            // video,
                            // setVideo,
                        }}
                    >
                        <BrowserRouter>
                            <Header setSelectedCategory={setSelectedCategory} />
                            <Routes>
                                {/* <Route
                                    path="/"
                                    element={<Header key={location.pathname} />}
                                /> */}

                                <Route
                                    path="/"
                                    element={
                                        <HomePage
                                            selectedCategory={selectedCategory}
                                            setSelectedCategory={
                                                setSelectedCategory
                                            }
                                        />
                                    }
                                />
                                <Route
                                    path="/member/profile/:uid"
                                    element={
                                        <MemberEditPage
                                            loggedIn={loggedIn}
                                            setLoggedIn={setLoggedIn}
                                            user={user}
                                            setUser={setUser}
                                        />
                                    }
                                />
                                <Route
                                    path="/member/:memberId"
                                    element={<MemberPage />}
                                ></Route>
                                <Route
                                    path="/upload"
                                    element={
                                        <VideoUpload
                                            selectedCategory={selectedCategory}
                                            setSelectedCategory={
                                                setSelectedCategory
                                            }
                                        />
                                    }
                                ></Route>
                                <Route
                                    path="/watch/:splitUrl"
                                    element={<Watch />}
                                ></Route>
                                <Route
                                    path="/contact"
                                    element={<SendEmail />}
                                ></Route>
                            </Routes>
                        </BrowserRouter>
                    </VideoContext.Provider>
                </UserInfoContext.Provider>
            </UserContext.Provider>
        </LoginContext.Provider>
    );
};

export default App;
