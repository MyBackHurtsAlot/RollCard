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
import { useNavigate } from "react-router-dom";
import SendEmail from "./SendEmail";
import MemberPageInfo from "./MemberPageInfo";
import MemberShowVideo from "./MemberShowVideo";
import { device } from "../../Components/Rwd";
import VideoCategory from "./VideoCategory";

// import Rotation from "../../Assets/Rotation.mp4";

const MemberPage = () => {
    const { user, setUser } = useContext(UserContext);
    const [currentMember, setCurrentMember] = useState("");
    const [currentAvator, setCurrentAvator] = useState("");
    const [currentMemberName, setCurrentMemberName] = useState("");
    const [currentMemberJob, setCurrentMemberJob] = useState("");
    const [currentMemberAbout, setCurrentMemberAbout] = useState("");
    const [currentMemberEmail, setCurrentMemberEmail] = useState("");
    // const [currentAvator, setCurrentAvator] = useState("");
    const [memberVideoAll, setMemberVideoAll] = useState([]);
    // const [isSmallScreen, setIsSmaillScreen] = useState(false);

    const { memberId } = useParams();
    const navigate = useNavigate;
    // const videoListRef = ref(storage, `videosForHomePage/`);

    useEffect(() => {
        setCurrentMember(memberId);
    }, [memberId]);

    // useEffect(() => {
    //     if (window.innerWidth < 1200) {
    //         setIsSmaillScreen(true);
    //     } else {
    //         setIsSmaillScreen(false);
    //     }
    //     const handleResize = () => {
    //         if (window.innerWidth < 1200) {
    //             setIsSmaillScreen(true);
    //         } else {
    //             setIsSmaillScreen(false);
    //         }
    //     };
    //     window.addEventListener("resize", handleResize);

    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);
    // console.log(window.innerWidth);
    // console.log(isSmallScreen);

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
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! THIS PAGE FROM HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!
    const [videoNameAll, setVideoNameAll] = useState([]);
    const [videoCategoryAll, setMemberCategoryAll] = useState([]);
    const [videoInfoAll, setVideoInfoAll] = useState({});
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
                        const videoName = doc.data().videoName;
                        const videoCategory = doc.data().videoCategory;
                        // console.log(videoCategory);
                        if (originalVideoName === fileName) {
                            setMemberVideoAll((prev) =>
                                !prev.includes(url) ? [...prev, url] : prev
                            );
                            setVideoNameAll((prev) =>
                                !prev.includes(videoName)
                                    ? [...prev, videoName]
                                    : prev
                            );
                            setMemberCategoryAll((prev) =>
                                !prev.includes(videoCategory)
                                    ? [...prev, videoCategory]
                                    : prev
                            );
                            setVideoInfoAll((prev) => ({
                                ...prev,
                                [videoCategory]: {
                                    url,
                                    videoName,
                                },
                            }));
                        }
                    });
                });
            }
            getVideos(memberId);
        } catch (error) {
            console.log(error);
        }
    }, [memberId]);
    console.log(videoInfoAll);
    // console.log(videoNameAll);
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TOHERE !!!!!!!!!!!!!!!!!!!!!!!!!!!

    // console.log(memberVideoAll);
    // console.log(videoArray);
    // const videoRefs = videoNameAll.map(() => {
    //     useRef(null);
    // });
    // const [currentVideo, setCurrentVideo] = useState([]);
    // const handleInfo = () => {
    //     const videoNames = videoRefs.map((ref) => {
    //         ref.current.textContent;
    //     });
    //     setCurrentVideo(videoNames);
    // };
    // const [showVideo, setShowVideo] = useState("none");
    // const handleShowVideo = () => {
    //     setShowVideo("block");
    // };
    return (
        <>
            <MemberPageWrapper>
                <MemberPageInfo
                    currentMemberName={currentMemberName}
                    currentMember={currentMember}
                    setCurrentMemberName={setCurrentMemberName}
                    memberId={memberId}
                    currentAvator={currentAvator}
                    setCurrentAvator={setCurrentAvator}
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
                <VideoCategory
                    memberVideoAll={memberVideoAll}
                    videoNameAll={videoNameAll}
                    videoCategoryAll={videoCategoryAll}
                    currentMemberName={currentMemberName}
                />
                <VideoWapper>
                    <VideoTitle>更多 {currentMemberName} 的作品</VideoTitle>
                    <VideoSectionWrapper
                    // ref={testRef}
                    // onMouseEnter={handleInfo}
                    >
                        <MemberShowVideo
                            memberVideoAll={memberVideoAll}
                            videoNameAll={videoNameAll}
                        />
                        {/* {currentVideo.map((member, index) => {
                            <VideoContainer ref={member[index]} />;
                            member;
                        })} */}
                        {/* {memberVideoAll.map((url, index) => {
                            const splitUrl = url.split("&token=")[1];
                            // console.log(splitUrl);
                            return (
                                <VideoContainer key={uuidv4()}>
                                    <NavLink to={`/watch/${splitUrl}`}>
                                        <video
                                            src={url}
                                            style={{ display: showVideo }}
                                        />
                                    </NavLink>
                                    <p onMouseEnter={handleShowVideo}>
                                        {videoNameAll[index]}
                                    </p>
                                </VideoContainer>
                            );
                        })} */}
                    </VideoSectionWrapper>
                </VideoWapper>
            </MemberPageWrapper>
        </>
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
    /* @media ${device.underDesktop} {
        display: flex;
        flex-direction: column;
    } */
`;

const VideoWapper = styled.div`
    /* width: 68%; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-left: 32%;
`;
const VideoTitle = styled.div`
    font-size: 1.5rem;
    font-weight: 200;
    /* margin-left: 20px; */
    /* @media ${device.underDesktop} {
        width: 40%;
    } */
`;

const VideoSectionWrapper = styled.section`
    margin-top: 20px;
    width: 100%;
    /* border: 1px solid red; */
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
