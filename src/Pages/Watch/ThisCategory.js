import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { query, collection, getDocs, where, limit } from "firebase/firestore";
import { db } from "../../Firebase-config";
import { v4 as uuidv4 } from "uuid";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import settings from "./Carousel";
import { device, useWindowResize } from "../../Components/Rwd";
import { VideoStyle } from "../../GlobalStyle/SharedStyles";

const ThisCategory = ({ videoCategory }) => {
    const [thisCategory, setThisCategory] = useState([]);
    const navigate = useNavigate();
    const [videoNameList, setVideoNameList] = useState([]);

    const [userIdList, setUserIdList] = useState([]);
    const [editorName, setEditorName] = useState([]);
    const [onlyOneVideo, setOnlyOneVideo] = useState(false);

    useEffect(() => {
        try {
            async function getVideo(videoCategory) {
                const data = query(
                    collection(db, "videoForAll"),
                    where("videoCategory", "==", videoCategory),
                    limit(3)
                );
                const docSnap = await getDocs(data);
                const newEditorNameList = [];
                const newVideoNameList = [];
                const newVideoList = [];
                const newCategoryList = [];
                const NewIdList = [];
                docSnap.forEach((doc) => {
                    const url = doc.data().videoUrlForHome;
                    const editor = doc.data().userName;
                    const videoName = doc.data().videoName;
                    const category = doc.data().videoCategory;
                    const id = doc.data().user;

                    newVideoList.push(url);
                    newEditorNameList.push(editor);
                    newVideoNameList.push(videoName);
                    newCategoryList.push(category);
                    NewIdList.push(id);
                });
                setThisCategory(newVideoList);
                setVideoNameList(newVideoNameList);
                setEditorName(newEditorNameList);
                setUserIdList(NewIdList);
            }
            getVideo(videoCategory);
        } catch (error) {
            console.log(error);
        }
    }, [videoCategory]);
    const isTablet = useWindowResize(999, 1000);
    useEffect(() => {
        thisCategory.length < 2
            ? setOnlyOneVideo(true)
            : setOnlyOneVideo(false);
    }, [thisCategory]);
    return (
        <>
            <ThisCatSectionWrapper>
                <ThisCatTitle>更多{videoCategory}分類的作品</ThisCatTitle>
                {isTablet ? (
                    <VideoWrapper>
                        {!onlyOneVideo ? (
                            <Slider {...settings} style={{ width: "100%" }}>
                                {thisCategory.map((url, index) => {
                                    const splitUrl = url.split("&token=")[1];
                                    return (
                                        <HomeVideoContainer key={uuidv4()}>
                                            <VideoContent
                                                editor={editorName[index]}
                                            >
                                                <video
                                                    src={url}
                                                    onClick={() => {
                                                        navigate(
                                                            `/watch/${splitUrl}`
                                                        );
                                                        window.location.reload();
                                                    }}
                                                />
                                                <h1>{videoNameList[index]}</h1>
                                                <p
                                                    onClick={() =>
                                                        navigate(
                                                            `/member/${userIdList[index]}`
                                                        )
                                                    }
                                                >
                                                    {editorName[index]}
                                                </p>
                                            </VideoContent>
                                        </HomeVideoContainer>
                                    );
                                })}
                            </Slider>
                        ) : (
                            <OneVideo>
                                {thisCategory.map((url, index) => {
                                    const splitUrl = url.split("&token=")[1];
                                    return (
                                        <OneVideoContainer key={uuidv4()}>
                                            <VideoContent
                                                editor={editorName[index]}
                                            >
                                                <video
                                                    src={url}
                                                    onClick={() => {
                                                        navigate(
                                                            `/watch/${splitUrl}`
                                                        );
                                                        window.location.reload();
                                                    }}
                                                />
                                                <h1>{videoNameList[index]}</h1>
                                                <p
                                                    onClick={() =>
                                                        navigate(
                                                            `/member/${userIdList[index]}`
                                                        )
                                                    }
                                                >
                                                    {editorName[index]}
                                                </p>
                                            </VideoContent>
                                        </OneVideoContainer>
                                    );
                                })}
                            </OneVideo>
                        )}
                    </VideoWrapper>
                ) : (
                    <VideoWrapper>
                        {thisCategory.map((url, index) => {
                            const splitUrl = url.split("&token=")[1];
                            return (
                                <HomeVideoContainer key={uuidv4()}>
                                    <VideoContent editor={editorName[index]}>
                                        <video
                                            src={url}
                                            onClick={() => {
                                                navigate(`/watch/${splitUrl}`);
                                                window.location.reload();
                                            }}
                                        />
                                        <h1>{videoNameList[index]}</h1>
                                        <p
                                            onClick={() =>
                                                navigate(
                                                    `/member/${userIdList[index]}`
                                                )
                                            }
                                        >
                                            {editorName[index]}
                                        </p>
                                    </VideoContent>
                                </HomeVideoContainer>
                            );
                        })}
                    </VideoWrapper>
                )}
            </ThisCatSectionWrapper>
        </>
    );
};

export default ThisCategory;
const ThisCatSectionWrapper = styled.section`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    gap: 20px;
    outline: 1px solid #404040;
    border-radius: 5px;
    padding: 15px;
`;
const ThisCatTitle = styled.div`
    margin: 0 auto;
    font-size: 1.3em;
    font-weight: 200;
    @media (max-width: 1000px) {
        font-size: 1em;
    }
`;
const VideoWrapper = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width: 1000px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

const OneVideo = styled.div`
    display: flex;
    justify-content: center;
`;
const OneVideoContainer = styled.div`
    width: 80%;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        color: ${(props) => props.theme.colors.highLight};
    }
    cursor: pointer;
    video {
        margin-top: 5px;
        ${VideoStyle}
    }
`;
const HomeVideoContainer = styled.div`
    width: 30%;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        color: ${(props) => props.theme.colors.highLight};
    }
    cursor: pointer;
    video {
        margin-top: 5px;
        ${VideoStyle}
    }
`;
const VideoContent = styled.div`
    width: 100%;
    padding: 10px;
    position: relative;
    cursor: pointer;
    h1 {
        font-size: 1.2em;
        margin-top: 5px;
        font-weight: 500;
        line-height: 38px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    p {
        line-height: 23px;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 5px;
        color: ${(props) => props.theme.colors.primary_Lightgrey};
        font-weight: 500;
        &:hover::after {
            content: ${({ editor }) => `"${editor} 的所有作品"`};
            position: absolute;
            top: 100%;
            left: 0;
            border-radius: 5px;
            background-color: #a6a6a6;
            color: #f2f2f2;
            padding: 5px;
        }
    }
`;
