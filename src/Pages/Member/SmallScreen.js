import React, { useState } from "react";
import styled from "styled-components";
import img from "../../Assets/SH.png";
import SendEmail from "./SendEmail";
import { device } from "../../Components/Rwd";
const SmallScreen = ({
    currentMemberName,
    currentMemberJob,
    currentMemberEmail,
    currentMemberAbout,
    currentAvator,
}) => {
    const [sendEmail, setSendEmail] = useState(false);
    return (
        <>
            <SmallScreenWrapper>
                <TopWrapper>
                    <Avator currentAvator={currentAvator}></Avator>
                    <NameAndJob>
                        <UserName>{currentMemberName}</UserName>
                        <UserJob>{currentMemberJob}</UserJob>
                        <UserAbout>{currentMemberAbout}</UserAbout>
                        <Contact
                            onClick={() => {
                                setSendEmail(true);
                            }}
                        >
                            聯絡{currentMemberName}
                        </Contact>
                    </NameAndJob>
                </TopWrapper>
            </SmallScreenWrapper>
            {sendEmail ? (
                <SendEmail
                    setSendEmail={setSendEmail}
                    sendEmail={sendEmail}
                    currentMemberName={currentMemberName}
                    currentMemberEmail={currentMemberEmail}
                />
            ) : (
                ""
            )}
        </>
    );
};

export default SmallScreen;
const SmallScreenWrapper = styled.div`
    width: 90%;
    display: flex;
    margin: 0 auto;
    /* outline: 1px solid red; */
`;
const TopWrapper = styled.div`
    width: 100%;
    display: flex;
    margin: 0 auto;
`;
const NameAndJob = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-left: 15px;
`;
const UserName = styled.div`
    font-size: 2em;
    font-weight: 700;
`;
const UserJob = styled.div`
    font-size: 1.5em;
`;
const UserAbout = styled.div`
    line-height: 23px;
    @media ${device.underTablet} {
        display: none;
    }
`;
const Contact = styled.div`
    padding: 10px;
    background-color: ${(props) => props.theme.colors.highLight};
    color: ${(props) => props.theme.colors.primary_Dark};
    border-radius: 10px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        transform: translateX(5px);
        transform: translateY(-5px);
        box-shadow: 5px 5px 0px 0px #a6a6a6;
    }
    @media ${device.underTablet} {
        position: absolute;
        top: auto;
        right: 0;
        bottom: 0;
    }
`;
const Avator = styled.div`
    min-width: 30%;
    height: 150px;
    border-radius: 5px;

    background-image: ${(props) =>
        props.currentAvator ? `url(${props.currentAvator})` : `url(${img})`};
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;
`;
