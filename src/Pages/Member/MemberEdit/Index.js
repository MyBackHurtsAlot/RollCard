import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { query, collection, getDocs, where, limit } from "firebase/firestore";

import { db } from "../../../Firebase-config";

import { useNavigate, navLink } from "react-router-dom";
import { auth } from "../../../Firebase-config";
import { UserContext, VideoContext } from "../../../Context/userContext";
import Profile from "./Profile";
import MemberEditVideo from "./MemberEditVideo";
import Loading from "../../Loading/Index";
import { device } from "../../../Components/Rwd";

const MemberEditPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
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
        const fetchData = async (userUid) => {
            try {
                const data = query(
                    collection(db, "videoForAll"),
                    where("user", "==", userUid)
                );
                const docSnap = await getDocs(data);
                const newDescriptionList = [];
                const newVideoNameList = [];
                const newVideoList = [];
                const newCategoryList = [];
                docSnap.forEach((doc) => {
                    const userInfo = doc.data();
                    const url = doc.data().videoUrlForHome;
                    const videoName = doc.data().videoName;
                    const category = doc.data().videoCategory;
                    const description = doc.data().videoDescription;
                    newDescriptionList.push(description);
                    newVideoList.push(url);
                    newVideoNameList.push(videoName);
                    newCategoryList.push(category);
                    setEditor(userInfo.userName);
                });
                setVideoNameAll(newVideoNameList);
                setMemberVideoAll(newVideoList);
                setVideoCategoryAll(newCategoryList);
                setVideoDiscriptionAll(newDescriptionList);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData(user);
    }, [user]);
    useEffect(() => {
        if (memberVideoAll.length === 0) {
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
                        setVideoNameAll={setVideoNameAll}
                        setVideoCategoryAll={setVideoCategoryAll}
                        setVideoDiscriptionAll={setVideoDiscriptionAll}
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
    @media ${device.underW1000} {
        flex-direction: column;
    }
`;

const Member_EditPage_Video_Section_Title = styled.div`
    color: ${(props) => props.theme.colors.primary_white};
    font-size: 1.3em;
    font-weight: 100;
    margin-top: 30px;
    position: absolute;
    left: 0;
    top: 0;
`;
const Member_EditPage_Video_Section = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    margin: 70px auto auto 0;
    position: relative;
    @media ${device.underW1000} {
        width: 80%;
        margin: 70px auto auto auto;
    }
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
        border-radius: 5px;
        outline: 1px solid ${(props) => props.theme.colors.primary_white};
        aspect-ratio: 16/9;
        margin: 20px;
    }
`;
