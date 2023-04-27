import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import styled from "styled-components";
import { UserContext } from "../../Context/userContext";
import { query, collection, getDocs, where } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../Firebase-config";
import { db } from "../../Firebase-config";

import MemberPageInfo from "./MemberPageInfo";
import MemberShowVideo from "./MemberShowVideo";
import { device } from "../../Components/Rwd";
import VideoCategory from "./VideoCategory";

const MemberPage = () => {
    const { user, setUser } = useContext(UserContext);
    const [currentMember, setCurrentMember] = useState("");
    const [currentAvatar, setCurrentAvatar] = useState("");
    const [currentMemberName, setCurrentMemberName] = useState("");
    const [currentMemberAbout, setCurrentMemberAbout] = useState("");
    const [memberVideoAll, setMemberVideoAll] = useState([]);
    const [videoNameAll, setVideoNameAll] = useState([]);
    const [videoCategoryAll, setMemberCategoryAll] = useState([]);
    const [videoEditorAll, setVideoEditorAll] = useState([]);

    const { memberId } = useParams();

    useEffect(() => {
        setCurrentMember(memberId);
    }, [memberId]);

    useEffect(() => {
        async function getVideo(memberId) {
            const data = query(
                collection(db, "videoForAll"),
                where("user", "==", memberId)
            );
            const docSnap = await getDocs(data);
            const newVideoNameList = [];
            const newVideoList = [];
            const newCategoryList = [];

            docSnap.forEach((doc) => {
                const url = doc.data().videoUrlForHome;
                const editor = doc.data().userName;
                const videoName = doc.data().videoName;
                const category = doc.data().videoCategory;
                const userJob = doc.data().userJob;
                const about = doc.data().userAbout;

                newVideoList.push(url);
                newVideoNameList.push(videoName);
                newCategoryList.push(category);
                setVideoEditorAll(editor);
                setCurrentMemberAbout(parse(about.toString()));
            });

            setMemberVideoAll(newVideoList);
            setVideoNameAll(newVideoNameList);
            setMemberCategoryAll(newCategoryList);
        }
        getVideo(memberId);
    }, [memberId]);

    useEffect(() => {
        const getAvatar = async (memberId) => {
            const storageRef = await listAll(
                ref(storage, `/Avatars/${memberId}/`),
                false
            );
            storageRef.items.forEach(async (Avatar) => {
                const url = await getDownloadURL(Avatar);
                setCurrentAvatar(url);
            });
        };
        getAvatar(memberId);
    }, [memberId]);
    return (
        <>
            <MemberPageWrapper>
                <MemberPageInfo
                    currentMemberName={currentMemberName}
                    currentMember={currentMember}
                    setCurrentMemberName={setCurrentMemberName}
                    memberId={memberId}
                    currentAvatar={currentAvatar}
                    setCurrentAvatar={setCurrentAvatar}
                    currentMemberAbout={currentMemberAbout}
                />
                <VideoCategory
                    memberVideoAll={memberVideoAll}
                    videoNameAll={videoNameAll}
                    videoCategoryAll={videoCategoryAll}
                    currentMemberName={currentMemberName}
                    videoEditorAll={videoEditorAll}
                />
                <VideoWrapper>
                    <VideoSectionWrapper>
                        <MemberShowVideo
                            memberVideoAll={memberVideoAll}
                            videoNameAll={videoNameAll}
                            videoCategoryAll={videoCategoryAll}
                            currentMemberAbout={currentMemberAbout}
                            currentMemberName={currentMemberName}
                        />
                    </VideoSectionWrapper>
                </VideoWrapper>
            </MemberPageWrapper>
        </>
    );
};

export default MemberPage;
const MemberPageWrapper = styled.section`
    width: 80%;
    margin: 100px auto auto auto;
    position: relative;

    @media ${device.underDesktop} {
        width: 90%;
    }
`;

const VideoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-left: 32%;
    @media ${device.underDesktop} {
        margin: 0 auto;
        width: 90%;
    }
`;

const VideoSectionWrapper = styled.section`
    margin-top: 20px;
    width: 100%;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 50px;
`;
