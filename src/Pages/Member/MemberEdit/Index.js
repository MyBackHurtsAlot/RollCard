import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { query, collection, getDocs, where, limit } from "firebase/firestore";
import { storage } from "../../../Firebase-config";

import { db } from "../../../Firebase-config";
import { v4 as uuidv4 } from "uuid";

import { useNavigate } from "react-router-dom";
import { auth } from "../../../Firebase-config";
import {
    UserInfoContext,
    UserContext,
    VideoContext,
} from "../../../Context/userContext";
import Profile from "./Profile";
import MemberEditVideo from "./MemberEditVideo";
import Loading from "../../Loading/Index";

const MemberEditPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { memberVideo, setMemberVideo } = useContext(VideoContext);

    // const videoListRef = ref(storage, `videos/${user}/`);
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            navigate("/");
        }
    });

    const [videoNameAll, setVideoNameAll] = useState([]);
    const [memberVideoAll, setMemberVideoAll] = useState([]);
    const [videoCategoryAll, setVideoCategoryAll] = useState([]);
    const [videoDiscriptionAll, setVideoDiscriptionAll] = useState([]);
    const [displayNone, setDisplayNone] = useState("none");
    const [editor, setEditor] = useState("");

    useEffect(() => {
        try {
            async function getVideos(user) {
                const response = await listAll(
                    ref(storage, `videosForHomePage`)
                );

                response.items.forEach(async (videos) => {
                    const url = await getDownloadURL(videos);
                    // setMemberVideoAll(url);
                    const fileName = videos.name;

                    const data = query(
                        collection(db, "videoForAll"),
                        where("user", "==", user)
                    );
                    const docSnap = await getDocs(data);
                    docSnap.forEach((doc) => {
                        const originalVideoName = doc.data().originalVideoName;
                        const videoName = doc.data().videoName;
                        const videoCategory = doc.data().videoCategory;
                        const videoDescription = doc.data().videoDescription;
                        const userName = doc.data().userName;
                        console.log(doc.data().userName);
                        setEditor(userName);
                        if (originalVideoName === fileName) {
                            setMemberVideoAll((prev) =>
                                !prev.includes(url) ? [...prev, url] : prev
                            );
                            setVideoNameAll((prev) =>
                                !prev.includes(videoName)
                                    ? [...prev, videoName]
                                    : prev
                            );
                            setVideoCategoryAll((prev) =>
                                !prev.includes(videoCategory)
                                    ? [...prev, videoCategory]
                                    : prev
                            );
                            setVideoDiscriptionAll((prev) =>
                                !prev.includes(videoDescription)
                                    ? [...prev, videoDescription]
                                    : prev
                            );
                        }
                    });
                });
            }
            getVideos(user);
        } catch (error) {
            console.log(error);
        }
    }, [user]);
    useEffect(() => {
        console.log("called");
        if (memberVideoAll.length === 0) {
            console.log(videoNameAll.length);
            const fetchData = async (userUid) => {
                try {
                    const data = query(
                        collection(db, "User"),
                        where("userUid", "==", userUid)
                    );
                    const docSnap = await getDocs(data);
                    docSnap.forEach((doc) => {
                        const userInfo = doc.data();
                        setEditor(userInfo.userName);
                    });
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData(user);
            setDisplayNone("block");
        } else {
            setDisplayNone("none");
        }
    }, [memberVideoAll]);
    console.log(videoNameAll.length);
    return (
        <>
            <MemberPageWrapper>
                <Profile />
                <Member_EditPage_Video_Section>
                    <Member_EditPage_Video_Section_Title>
                        你的影片
                    </Member_EditPage_Video_Section_Title>
                    <MemberEditVideo
                        videoNameAll={videoNameAll}
                        memberVideoAll={memberVideoAll}
                        videoCategoryAll={videoCategoryAll}
                        videoDiscriptionAll={videoDiscriptionAll}
                    />
                    <Member_EditPage_Video_Wrapper
                        style={{ display: displayNone }}
                    >
                        <Loading progress={`${editor} 傳支影片吧`} />
                        {/* {memberVideo.map((url) => {
                            return <video src={url} key={uuidv4()} controls />;
                        })} */}
                    </Member_EditPage_Video_Wrapper>
                </Member_EditPage_Video_Section>
            </MemberPageWrapper>
        </>
    );
};

export default MemberEditPage;

// =================== Styled ==========================
const MemberPageWrapper = styled.section`
    display: flex;
`;

const Member_EditPage_Video_Section_Title = styled.div`
    color: ${(props) => props.theme.colors.primary_white};
    font-size: 1.5em;
    font-weight: 100;
    margin-top: 70px;
    position: absolute;
    left: 0;
    top: 0;
`;
const Member_EditPage_Video_Section = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    margin: 70px auto auto auto;
    position: relative;
`;

const Member_EditPage_Video_Wrapper = styled.div`
    width: 100%;
    min-height: 580px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    position: relative;
    video {
        width: 40%;
        border-radius: 15px;
        outline: 1px solid ${(props) => props.theme.colors.primary_white};
        aspect-ratio: 16/9;
        margin: 20px;
    }
`;
