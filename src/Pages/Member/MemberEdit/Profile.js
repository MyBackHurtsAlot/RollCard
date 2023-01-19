import React, { useContext, useEffect, useState } from "react";
import {
    getFirestore,
    doc,
    setDoc,
    query,
    collection,
    getDocs,
    where,
} from "firebase/firestore";
import { db } from "../../../Firebase-config";
import { UserInfoContext, UserContext } from "../../../Context/userContext";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";
import img from "../../../Assets/SH.png";

const Profile = () => {
    const { user } = useContext(UserContext);
    const {
        userName,
        setUserName,
        userJob,
        setUserJob,
        userAbout,
        setUserAbout,
    } = useContext(UserInfoContext);

    const submitUserInfo = async () => {
        try {
            await setDoc(doc(db, "User", user), {
                userUid: user,
                userName: userName,
                userJob: userJob,
                userAbout: userAbout,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Profile_Section>
            <Profile_Section_Left_Wrapper>
                <Profile_Section_Left_Avator_Container>
                    Customized position <br />
                    Customize border-radius?
                </Profile_Section_Left_Avator_Container>
            </Profile_Section_Left_Wrapper>
            <Profile_Section_Right_Wrapper>
                <Profile_Section_Right_Name_Editor
                    html={`${userName}`}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <Profile_Section_Right_Job_Editor
                    html={`${userJob}`}
                    onChange={(e) => setUserJob(e.target.value)}
                />
                <Profile_Section_Right_About_Editor
                    html={`${userAbout}`}
                    onChange={(e) => setUserAbout(e.target.value)}
                />
                <Profile_Section_Right_Editor_Confirm onClick={submitUserInfo}>
                    編輯
                </Profile_Section_Right_Editor_Confirm>
            </Profile_Section_Right_Wrapper>
        </Profile_Section>
    );
};

export default Profile;

//Style
const Profile_Section = styled.section`
    /* position: relative; */
    margin-top: 66px;
    width: 100%;
    height: 400px;
    background-color: ${(props) => props.theme.colors.primary_white};
    display: flex;
    z-index: 1;
`;
const Profile_Section_Left_Wrapper = styled.div`
    width: 45%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.primary_Dark};
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Profile_Section_Left_Avator_Container = styled.div`
    width: 50%;
    height: 75%;
    background-color: ${(props) => props.theme.colors.primary_white};
    background-image: url(${img});
    background-size: cover;
    background-position: center;
    cursor: pointer;
    &:hover::after {
        content: "1234";
    }
`;
const Profile_Section_Right_Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;
const Profile_Section_Right_Name_Editor = styled(ContentEditable)`
    font-size: 36px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.primary_Dark};
`;

const Profile_Section_Right_Job_Editor = styled(ContentEditable)`
    font-size: 24px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.primary_Dark};
`;

const Profile_Section_Right_About_Editor = styled(ContentEditable)`
    font-size: 16px;
    font-weight: 400;
    color: ${(props) => props.theme.colors.primary_Dark};
`;
const Profile_Section_Right_Editor_Confirm = styled.div`
    position: absolute;
    font-size: 14px;
    top: 370px;
    right: 1%;
    width: 60px;
    height: 50px;
    letter-spacing: 3px;
    border-radius: 87% 13% 92% 8% / 30% 70% 30% 70%;
    transition: border-radius 0.4s cubic-bezier(0.42, 0, 0.58, 1);
    color: ${(props) => props.theme.colors.primary_white};
    background-color: ${(props) => props.theme.colors.primary_Dark};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
        border-radius: 52% 48% 17% 83% / 51% 21% 79% 49%;
    }
`;
