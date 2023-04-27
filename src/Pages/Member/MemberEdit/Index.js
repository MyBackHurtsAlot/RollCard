import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { onAuthStateChanged } from "firebase/auth";

import { query, collection, getDocs, where } from "firebase/firestore";

import { db } from "../../../Firebase-config";

import { useNavigate } from "react-router-dom";
import { auth } from "../../../Firebase-config";
import { UserContext } from "../../../Context/userContext";
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
    const [videoDescriptionAll, setVideoDescriptionAll] = useState([]);
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
                setVideoDescriptionAll(newDescriptionList);
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
                <MemberEditPageVideoSection>
                    <MemberEditPageVideoSectionTitle>
                        你的影片
                    </MemberEditPageVideoSectionTitle>
                    <MemberEditVideo
                        videoNameAll={videoNameAll}
                        memberVideoAll={memberVideoAll}
                        videoCategoryAll={videoCategoryAll}
                        videoDescriptionAll={videoDescriptionAll}
                        setVideoNameAll={setVideoNameAll}
                        setVideoCategoryAll={setVideoCategoryAll}
                        setVideoDescriptionAll={setVideoDescriptionAll}
                    />
                    <MemberEditPageVideoWrapper
                        style={{ display: displayNone }}
                    >
                        <Loading progress={`${editor} 傳支影片吧`} />
                    </MemberEditPageVideoWrapper>
                </MemberEditPageVideoSection>
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

const MemberEditPageVideoSectionTitle = styled.div`
    color: ${(props) => props.theme.colors.primary_white};
    font-size: 1.3em;
    font-weight: 100;
    margin-top: 30px;
    position: absolute;
    left: 0;
    top: 0;
`;
const MemberEditPageVideoSection = styled.div`
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

const MemberEditPageVideoWrapper = styled.div`
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
    @media ${device.underDesktop} {
        width: 90%;
    }
`;
