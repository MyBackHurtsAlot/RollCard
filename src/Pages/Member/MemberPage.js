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
import MemberPageInfo from "./MemberPageInfo";
import { useNavigate } from "react-router-dom";
// import Rotation from "../../Assets/Rotation.mp4";

const MemberPage = () => {
    const { user, setUser } = useContext(UserContext);
    const [currentMember, setCurrentMember] = useState("");
    const [currentMemberName, setCurrentMemberName] = useState("");
    const [currentMemberJob, setCurrentMemberJob] = useState("");
    const [currentMemberAbout, setCurrentMemberAbout] = useState("");
    const [currentMemberEmail, setCurrentMemberEmail] = useState("");
    // const [currentAvator, setCurrentAvator] = useState("");
    const [memberVideoAll, setMemberVideoAll] = useState([]);

    const { memberId } = useParams();
    const navigate = useNavigate;
    // const videoListRef = ref(storage, `videosForHomePage/`);

    useEffect(() => {
        setCurrentMember(memberId);
    }, [memberId]);

    // useEffect(() => {
    //     async function getAvator(memberId) {
    //         const response = await listAll(
    //             ref(storage, `avators/${memberId}`),
    //             false
    //         );
    //         response.items.forEach(async (avator) => {
    //             const url = await getDownloadURL(avator);
    //             setCurrentAvator(url);
    //         });
    //     }
    //     getAvator(memberId);
    // }, [memberId]);

    // useEffect(() => {
    //     try {
    //         async function getMemberData(currentMember) {
    //             const data = query(
    //                 collection(db, "videoForAll"),
    //                 where("user", "==", currentMember)
    //             );
    //             const docSnap = await getDocs(data);
    //             docSnap.forEach((doc) => {
    //                 const memberData = doc.data();
    //                 setCurrentMemberName(memberData.userName);
    //                 setCurrentMemberJob(memberData.userJob);
    //                 setCurrentMemberEmail(memberData.userEmail);
    //                 // console.log(memberData.userAbout);
    //                 setCurrentMemberAbout(
    //                     parse(memberData.userAbout.toString())
    //                 );
    //             });
    //         }
    //         getMemberData(currentMember);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [currentMember]);
    // console.log(currentMemberAbout);
    useEffect(() => {
        try {
            async function getVideos(memberId) {
                const response = await listAll(
                    ref(storage, `videosForHomePage`)
                );

                response.items.forEach(async (videos) => {
                    const url = await getDownloadURL(videos);
                    // setMemberVideoAll(url);
                    const fileName = videos.name;

                    const data = query(
                        collection(db, "videoForAll"),
                        where("user", "==", memberId)
                    );
                    const docSnap = await getDocs(data);
                    docSnap.forEach((doc) => {
                        const originalVideoName = doc.data().originalVideoName;
                        if (originalVideoName === fileName) {
                            setMemberVideoAll((prev) =>
                                !prev.includes(url) ? [...prev, url] : prev
                            );
                        }
                    });
                });
            }
            getVideos(memberId);
        } catch (error) {
            console.log(error);
        }
    }, [memberId]);
    // console.log(memberVideoAll);
    // console.log(videoArray);
    return (
        <div>
            <MemberPageWrapper>
                <MemberPageInfo
                    currentMemberName={currentMemberName}
                    currentMember={currentMember}
                    setCurrentMemberName={setCurrentMemberName}
                    memberId={memberId}
                />
                {/* <CurrentMemberWrapper>
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
                    >
                        聯絡 {currentMemberName}
                    </Contact>
                </CurrentMemberWrapper> */}
                <VideoWapper>
                    <VideoTitle>更多 {currentMemberName} 的作品</VideoTitle>
                    <VideoSectionWrapper>
                        {memberVideoAll.map((url) => {
                            const splitUrl = url.split("&token=")[1];
                            // console.log(splitUrl);
                            return (
                                <VideoContainer key={uuidv4()}>
                                    <video
                                        src={url}
                                        onClick={() => {
                                            navigate(`/watch/${splitUrl}`);
                                        }}
                                    />
                                </VideoContainer>
                            );
                        })}
                    </VideoSectionWrapper>
                </VideoWapper>
            </MemberPageWrapper>
        </div>
    );
};

export default MemberPage;

const MemberPageWrapper = styled.section`
    margin-top: 150px;
    width: 90%;
    margin: 150px auto auto auto;
    position: relative;
    /* display: flex;
    justify-content: space-between; */
`;

const VideoWapper = styled.div`
    width: 68%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-left: 32%;
`;
const VideoTitle = styled.div`
    font-size: 1.5rem;
    font-weight: 200;
    margin-left: 20px;
`;

const VideoSectionWrapper = styled.section`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 50px;
`;
const VideoContainer = styled.div`
    width: 45%;
    height: 324px;
    /* outline: 1px solid red; */
    cursor: pointer;
    video {
        width: 100%;
        border-radius: 15px;
        /* max-width: 45%; */
        aspect-ratio: 16/9;
        outline: 1px solid ${(props) => props.theme.colors.primary_white};
        transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        &:hover {
            transform: translateX(5px);
            transform: translateY(-5px);
            box-shadow: 5px 5px 0px 0px #a6a6a6;
        }
    }
    img {
        width: 50px;
    }
`;
