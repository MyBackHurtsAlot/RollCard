import React, { useEffect, useContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../../Firebase-config";
import { v4 as uuidv4 } from "uuid";

import { useNavigate } from "react-router-dom";
import { auth } from "../../../Firebase-config";
import {
    UserInfoContext,
    UserContext,
    VideoContext,
} from "../../../Context/userContext";
import styled from "styled-components";
// import Header from "../../../Components/Header/Index";
import Profile from "./Profile";

const MemberEditPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { memberVideo, setMemberVideo } = useContext(VideoContext);

    const videoListRef = ref(storage, `videos/${user}/`);
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            navigate("/");
        }
    });
    useEffect(() => {
        async function getVideos() {
            const response = await listAll(videoListRef);
            response.items.forEach(async (videos) => {
                const url = await getDownloadURL(videos);
                setMemberVideo(
                    (prev) => (!prev.includes(url) ? [...prev, url] : prev)
                    // console.log(url)
                );
            });
        }
        getVideos();
    }, [user]);

    return (
        <>
            <MemberPageWrapper>
                <Profile />
                <Member_EditPage_Video_Section>
                    <Member_EditPage_Video_Section_Title>
                        Your Videos
                    </Member_EditPage_Video_Section_Title>
                    <Member_EditPage_Video_Wrapper>
                        {memberVideo.map((url) => {
                            return <video src={url} key={uuidv4()} controls />;
                        })}
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
    font-size: 2em;
    font-weight: 100;
`;
const Member_EditPage_Video_Section = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin: 20px auto;
`;

const Member_EditPage_Video_Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 15px;
    video {
        width: 25%;
        border-radius: 15px;
        outline: 1px solid ${(props) => props.theme.colors.primary_white};
        aspect-ratio: 16/9;
        margin-top: 20px;
    }
`;
