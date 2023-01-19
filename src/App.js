import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "./Firebase-config";
import {
    LoginContext,
    UserContext,
    UserInfoContext,
} from "./Context/userContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase-config";

import HomePage from "./Pages/Home/Index";
import MemberEditPage from "./Pages/Member/MemberEdit/Index";
import MemberPage from "./Pages/Member/MemberPage";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState("");

    const [userName, setUserName] = useState("Name Here");
    const [userJob, setUserJob] = useState("What you do");
    const [userAbout, setUserAbout] = useState("About you");

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
                        setUserName(userInfo.userName || "Name Here");
                        setUserJob(userInfo.userJob || "What you do");
                        setUserAbout(userInfo.userAbout || "About you");
                    });
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
                    }}
                >
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
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
                                path="/memberPage/:uid"
                                element={<MemberPage />}
                            ></Route>
                        </Routes>
                    </BrowserRouter>
                </UserInfoContext.Provider>
            </UserContext.Provider>
        </LoginContext.Provider>
    );
};

export default App;
