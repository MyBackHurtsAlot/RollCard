import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import parse from "html-react-parser";
import styled, { css } from "styled-components";
import { UserContext } from "../../Context/userContext";
import { query, collection, getDocs, where } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../Firebase-config";
import { db } from "../../Firebase-config";
import img from "../../Assets/SH.png";
import { v4 as uuidv4 } from "uuid";
import SendEmail from "./SendEmail";
import { device } from "../../Components/Rwd";
import SmallScreen from "./SmallScreen";

const MemberPageInfo = ({
    currentMember,
    currentMemberName,
    setCurrentMemberName,
    memberId,
    currentAvator,
    setCurrentAvator,
    currentMemberAbout,
}) => {
    const [currentMemberJob, setCurrentMemberJob] = useState("");
    // const [currentMemberAbout, setCurrentMemberAbout] = useState("");
    const [currentMemberEmail, setCurrentMemberEmail] = useState("");
    // const [currentAvator, setCurrentAvator] = useState("");
    const [isSmallScreen, setIsSmaillScreen] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 1199) {
            setIsSmaillScreen(true);
        } else {
            setIsSmaillScreen(false);
        }
        const handleResize = () => {
            if (window.innerWidth < 1200) {
                setIsSmaillScreen(true);
            } else {
                setIsSmaillScreen(false);
            }
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        async function getAvator(memberId) {
            const response = await listAll(
                ref(storage, `avators/${memberId}`),
                false
            );
            response.items.forEach(async (avator) => {
                const url = await getDownloadURL(avator);
                setCurrentAvator(url);
            });
        }
        getAvator(memberId);
    }, [memberId]);

    useEffect(() => {
        try {
            async function getMemberData(currentMember) {
                const data = query(
                    collection(db, "videoForAll"),
                    where("user", "==", currentMember)
                );
                const docSnap = await getDocs(data);
                docSnap.forEach((doc) => {
                    const memberData = doc.data();
                    setCurrentMemberName(memberData.userName);
                    // setCurrentMemberJob(memberData.userJob);
                    setCurrentMemberEmail(memberData.userEmail);
                    // console.log(memberData.userAbout);
                    // setCurrentMemberAbout(
                    //     parse(memberData.userAbout.toString())
                    // );
                    // console.log("1234", memberData.userJob);
                    memberData.userJob === "你的職業"
                        ? setCurrentMemberJob("影視從業人員")
                        : setCurrentMemberJob(
                              !memberData.userJob
                                  ? "影視從業人員"
                                  : memberData.userJob
                          );
                });
            }
            getMemberData(currentMember);
        } catch (error) {
            console.log(error);
        }
    }, [currentMember]);

    return (
        <div>
            {isSmallScreen ? (
                <SmallScreen
                    currentMemberName={currentMemberName}
                    currentMember={currentMember}
                    currentMemberJob={currentMemberJob}
                    currentMemberEmail={currentMemberEmail}
                    setCurrentMemberName={setCurrentMemberName}
                    currentMemberAbout={currentMemberAbout}
                    memberId={memberId}
                    currentAvator={currentAvator}
                ></SmallScreen>
            ) : (
                <CurrentMemberWrapper>
                    <Avator currentAvator={currentAvator}></Avator>
                    <UserContainer>
                        <UserName>{currentMemberName}</UserName>
                        <UserJob>{currentMemberJob}</UserJob>
                        <UserAbout>{currentMemberAbout}</UserAbout>
                    </UserContainer>
                    <Contact
                        onClick={() => {
                            setSendEmail(true);
                        }}
                        currentMember={currentMember}
                        currentMemberName={currentMemberName}
                        currentMemberEmail={currentMemberEmail}
                        setSendEmail={setSendEmail}
                    >
                        聯絡 {currentMemberName}
                    </Contact>
                </CurrentMemberWrapper>
            )}
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
            {/* <SendEmail
                currentMemberName={currentMemberName}
                currentMemberEmail={currentMemberEmail}
                sendEmail={sendEmail}
            /> */}
        </div>
    );
};

export default MemberPageInfo;

const CurrentMemberWrapper = styled.div`
    /* margin: 5% auto auto 3%; */
    float: left;
    padding: 20px;
    width: 25%;
    min-height: 600px;
    border-radius: 5px;
    outline: 1px solid ${(props) => props.theme.colors.primary_Lightgrey};
    background-color: ${(props) => props.theme.colors.primary_white};
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: space-around; */
    gap: 5px;
    z-index: 3;
    position: fixed;
    /* @media ${device.underDesktop} {
        width: 90%;
        min-height: 300px;
    } */
`;

const Avator = styled.div`
    width: 80%;
    height: 200px;
    border-radius: 5px;
    background-image: ${(props) =>
        props.currentAvator ? `url(${props.currentAvator})` : `url(${img})`};
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;
    /* @media ${device.underDesktop} {
        width: 40%;
    } */
`;
const UserContainer = styled.div`
    width: 80%;
    min-height: 250px;
    margin-bottom: 10px;
`;
const UserName = styled.div`
    font-size: 2em;
    font-weight: 700;
    color: ${(props) => props.theme.colors.primary_Dark};
`;

const UserJob = styled.div`
    margin-top: 5px;
    color: ${(props) => props.theme.colors.primary_Dark};
`;
const UserAbout = styled.div`
    margin-top: 20px;
    text-align: left;
    line-height: 23px;
    color: ${(props) => props.theme.colors.primary_Dark};
`;

const Contact = styled.div`
    margin-top: 25px;
    width: 80%;
    height: 50px;
    letter-spacing: 3px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.colors.highLight};
    color: ${(props) => props.theme.colors.primary_Dark};
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        transform: translateX(5px);
        transform: translateY(-5px);
        box-shadow: 5px 5px 0px 0px #a6a6a6;
    }
`;
