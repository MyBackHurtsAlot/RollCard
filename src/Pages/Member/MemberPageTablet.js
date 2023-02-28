import React from "react";
import styled from "styled-components";
import SmallScreen from "./SmallScreen";
import img from "../../Assets/SH.png";
import MemberShowVideo from "./MemberShowVideo";

const MemberPageTablet = ({
    memberVideoAll,
    videoNameAll,
    videoCategoryAll,
    currentMemberName,
    videoEditorAll,
    memberId,
    currentAvator,
    currentMember,
    currentMemberJob,
    currentMemberEmail,
    setCurrentMemberName,
    currentMemberAbout,
}) => {
    return (
        <>
            <TabletWrapper>
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
                            聯絡 {currentMemberName}
                        </Contact>
                    </NameAndJob>
                </TopWrapper>
            </TabletWrapper>
            {/* <SmallScreen
                memberVideoAll={memberVideoAll}
                videoNameAll={videoNameAll}
                videoCategoryAll={videoCategoryAll}
                currentMemberName={currentMemberName}
                videoEditorAll={videoEditorAll}
                memberId={memberId}
                currentAvator={currentAvator}
                currentMember={currentMember}
                currentMemberJob={currentMemberJob}
                currentMemberEmail={currentMemberEmail}
                setCurrentMemberName={setCurrentMemberName}
                currentMemberAbout={currentMemberAbout}
            /> */}
            <MemberShowVideo
                memberVideoAll={memberVideoAll}
                videoNameAll={videoNameAll}
                videoCategoryAll={videoCategoryAll}
                currentMemberName={currentMemberName}
                videoEditorAll={videoEditorAll}
                memberId={memberId}
                currentAvator={currentAvator}
            />
        </>
    );
};

export default MemberPageTablet;

const TabletWrapper = styled.div`
    width: 80%;
    display: flex;
    margin: 0 auto;
    outline: 1px solid red;
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
