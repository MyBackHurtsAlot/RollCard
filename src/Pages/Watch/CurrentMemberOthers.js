import React, { useEffect, useState, useRef, useContext } from "react";
import { UserContext } from "../../Context/userContext";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { query, collection, getDocs, where, limit } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../Firebase-config";
import { db } from "../../Firebase-config";
import { v4 as uuidv4 } from "uuid";
import { device } from "../../Components/Rwd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import settings from "./Carousel";

const CurrentMemberOthers = ({ videoEditor, videoList }) => {
    const { user } = useContext(UserContext);
    const [memberVideo, setMemberVideo] = useState([]);
    const [videoNameList, setVideoNameList] = useState([]);
    const [videoCategoryList, setVideoCategoryList] = useState([]);
    const [noOthers, setNoOthers] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const navigate = useNavigate();
    // console.log(videoList);
    useEffect(() => {
        try {
            async function getVideo(videoEditor, videoList) {
                // console.log("in", videoList);
                const data = query(
                    collection(db, "videoForAll"),
                    where("userName", "==", videoEditor),
                    where("videoUrlForHome", "!=", videoList || ""),
                    limit(3)
                );
                // console.log(videoList);
                const docSnap = await getDocs(data);
                const newEditorNameList = [];
                const newVideoNameList = [];
                const newVideoList = [];
                const newCategoryList = [];
                docSnap.forEach((doc) => {
                    // console.log("query", doc.data().videoUrlForHome);
                    const url = doc.data().videoUrlForHome;
                    const editor = doc.data().userName;
                    const videoName = doc.data().videoName;
                    const category = doc.data().videoCategory;
                    // const id = doc.data().user;

                    newVideoList.push(url);
                    newEditorNameList.push(editor);
                    newVideoNameList.push(videoName);
                    newCategoryList.push(category);

                    // setCurrentVideo(id);
                });
                setMemberVideo(newVideoList);
                setVideoNameList(newVideoNameList);
                setVideoCategoryList(newCategoryList);
            }
            getVideo(videoEditor, videoList);
        } catch (error) {
            console.log(error);
        }
    }, [videoEditor, videoList]);
    // console.log(memberVideo);
    useEffect(() => {
        if (memberVideo.length === 0) {
            setNoOthers(true);
        } else {
            setNoOthers(false);
        }
    }, [memberVideo]);
    useEffect(() => {
        if (window.innerWidth < 999) {
            setIsTablet(true);
        } else {
            setIsTablet(false);
        }
        const handleResize = () => {
            if (window.innerWidth < 1000) {
                setIsTablet(true);
            } else {
                setIsTablet(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    // useEffect(() => {
    //     try {
    //         async function getVideos(videoEditor) {
    //             const response = await listAll(
    //                 ref(storage, `videosForHomePage`)
    //             );

    //             response.items.forEach(async (videos) => {
    //                 const url = await getDownloadURL(videos);
    //                 // setMemberVideoAll(url);
    //                 const fileName = videos.name;

    //                 const data = query(
    //                     collection(db, "videoForAll"),
    //                     where("userName", "==", videoEditor),
    //                     limit(3)
    //                 );
    //                 const docSnap = await getDocs(data);
    //                 docSnap.forEach((doc) => {
    //                     const originalVideoName = doc.data().originalVideoName;
    //                     const videoName = doc.data().videoName;
    //                     const category = doc.data().videoCategory;
    //                     if (originalVideoName === fileName) {
    //                         setMemberVideo((prev) =>
    //                             !prev.includes(url) ? [...prev, url] : prev
    //                         );
    //                         setVideoNameList((prev) =>
    //                             !prev.includes(videoName)
    //                                 ? [...prev, videoName]
    //                                 : prev
    //                         );
    //                         setVideoCategoryList((prev) =>
    //                             !prev.includes(category)
    //                                 ? [...prev, category]
    //                                 : prev
    //                         );
    //                     }
    //                 });
    //             });
    //         }
    //         getVideos(videoEditor);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [videoEditor]);
    // console.log("asdf", memberVideo);
    // console.log(videoCategoryList);
    return (
        <>
            <VideoWapper>
                <VideoTitle>
                    {videoEditor} <p>的其他作品</p>
                </VideoTitle>
                {noOthers ? (
                    <NoOthers>{videoEditor} 沒有其他作品了</NoOthers>
                ) : isTablet ? (
                    <VideoSectionWrapper>
                        <Slider {...settings} style={{ width: "100%" }}>
                            {memberVideo.map((url, index) => {
                                const splitUrl = url.split("&token=")[1];
                                // console.log("member", splitUrl);
                                return (
                                    <VideoContainerSlider key={uuidv4()}>
                                        <VideoContainer>
                                            <video
                                                src={url}
                                                onClick={() => {
                                                    navigate(
                                                        `/watch/${splitUrl}`
                                                    );
                                                    window.location.reload();
                                                    // console.log(splitUrl);
                                                    // console.log("navigate");
                                                }}
                                            />
                                            <h1>{videoNameList[index]}</h1>
                                            <p>{videoCategoryList[index]}</p>
                                        </VideoContainer>
                                    </VideoContainerSlider>
                                );
                            })}
                        </Slider>
                    </VideoSectionWrapper>
                ) : (
                    <VideoSectionWrapper>
                        {memberVideo.map((url, index) => {
                            const splitUrl = url.split("&token=")[1];
                            // console.log("member", splitUrl);
                            return (
                                <VideoContainer key={uuidv4()}>
                                    <video
                                        src={url}
                                        onClick={() => {
                                            navigate(`/watch/${splitUrl}`);
                                            window.location.reload();
                                            // console.log(splitUrl);
                                            // console.log("navigate");
                                        }}
                                    />
                                    <h1>{videoNameList[index]}</h1>
                                    <p>{videoCategoryList[index]}</p>
                                </VideoContainer>
                            );
                        })}
                    </VideoSectionWrapper>
                )}
            </VideoWapper>
        </>
    );
};

export default CurrentMemberOthers;

const VideoWapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    gap: 20px;
    outline: 1px solid #404040;
    border-radius: 5px;
    padding: 15px;
    @media (max-width: 1000px) {
        width: 100%;
        margin-top: 30px;
    }
`;
const VideoTitle = styled.div`
    font-size: 1.3em;
    font-weight: 200;
    display: flex;

    @media (max-width: 1199px) {
        font-size: 1.2em;
        flex-direction: column;
        align-items: center;
        line-height: 23px;
    }
    @media (max-width: 1000px) {
        flex-direction: row;
    }
`;

const VideoSectionWrapper = styled.section`
    width: 90%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    /* flex-wrap: nowrap; */
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;
    @media (max-width: 1000px) {
        width: 100%;
    }
`;
const VideoContainerSlider = styled.div`
    width: 30%;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        color: ${(props) => props.theme.colors.highLight};
    }
    /* outline: 1px solid ${(props) => props.theme.colors.primary_white}; */
    cursor: pointer;
    video {
        margin-top: 5px;
        width: 100%;
        border-radius: 5px;
        /* max-width: 45%; */
        aspect-ratio: 16/9;
        outline: 1px solid ${(props) => props.theme.colors.primary_white};
        /* outline: 1px solid red; */
        transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        &:hover {
            transform: translateX(5px);
            transform: translateY(-5px);
            box-shadow: 5px 5px 0px 0px #a6a6a6;
        }
    }
    @media (max-width: 1000px) {
        width: 90%;
    }
`;
const VideoContainer = styled.div`
    width: 100%;
    padding: 10px;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        color: ${(props) => props.theme.colors.highLight};
    }
    cursor: pointer;
    video {
        margin-top: 5px;
        width: 100%;
        border-radius: 5px;

        aspect-ratio: 16/9;
        outline: 1px solid ${(props) => props.theme.colors.primary_white};
        transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        &:hover {
            transform: translateX(5px);
            transform: translateY(-5px);
            box-shadow: 5px 5px 0px 0px #a6a6a6;
        }
    }

    p {
        margin-top: 5px;
        color: ${(props) => props.theme.colors.primary_Lightgrey};
        font-weight: 500;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    h1 {
        font-size: 1.2em;
        font-weight: 500;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 5px;
    }
`;
const NoOthers = styled.div`
    white-space: nowrap;
`;
