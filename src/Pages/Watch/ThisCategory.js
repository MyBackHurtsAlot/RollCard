import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { query, collection, getDocs, where, limit } from "firebase/firestore";
import { db } from "../../Firebase-config";
import { v4 as uuidv4 } from "uuid";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import settings from "./Carousel";

const ThisCategory = ({ videoCategory, currentVideo }) => {
    const [thisCategory, setThisCategory] = useState([]);
    const navigate = useNavigate();
    const [videoNameList, setVideoNameList] = useState([]);

    const [userIdList, setUserIdList] = useState([]);
    const [editorName, setEditorName] = useState([]);

    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        try {
            async function getVideo(videoCategory) {
                const data = query(
                    collection(db, "videoForAll"),
                    where("videoCategory", "==", videoCategory),
                    limit(3)
                );
                // console.log(videoCategory);
                const docSnap = await getDocs(data);
                const newEditorNameList = [];
                const newVideoNameList = [];
                const newVideoList = [];
                const newCategoryList = [];
                const NewIdList = [];
                docSnap.forEach((doc) => {
                    // console.log("query");
                    const url = doc.data().videoUrlForHome;
                    const editor = doc.data().userName;
                    const videoName = doc.data().videoName;
                    const category = doc.data().videoCategory;
                    const id = doc.data().user;
                    // const id = doc.data().user;
                    // console.log(url);
                    newVideoList.push(url);
                    newEditorNameList.push(editor);
                    newVideoNameList.push(videoName);
                    newCategoryList.push(category);
                    NewIdList.push(id);
                    // setCurrentVideo(id);
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

    return (
        <>
            <ThisCat_Section_Wrapper>
                <ThisCat_Title>更多 {videoCategory} 分類的作品</ThisCat_Title>
                {isTablet ? (
                    <VideoWrapper>
                        <Slider {...settings} style={{ width: "100%" }}>
                            {thisCategory.map((url, index) => {
                                const splitUrl = url.split("&token=")[1];
                                // console.log(splitUrl);
                                return (
                                    <Home_Video_Container key={uuidv4()}>
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
                                    </Home_Video_Container>
                                );
                            })}
                        </Slider>
                    </VideoWrapper>
                ) : (
                    <VideoWrapper>
                        {thisCategory.map((url, index) => {
                            const splitUrl = url.split("&token=")[1];
                            // console.log(splitUrl);
                            return (
                                <Home_Video_Container key={uuidv4()}>
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
                                </Home_Video_Container>
                            );
                        })}
                    </VideoWrapper>
                )}
            </ThisCat_Section_Wrapper>
        </>
    );
};

export default ThisCategory;
const ThisCat_Section_Wrapper = styled.section`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    /* flex-wrap: wrap; */
    justify-content: space-between;

    gap: 20px;
    outline: 1px solid #404040;
    border-radius: 5px;
    padding: 15px;
`;
const ThisCat_Title = styled.div`
    margin: 0 auto;
    font-size: 1.3em;
    font-weight: 200;
    @media (max-width: 1000px) {
        font-size: 1em;
    }
`;
const VideoWrapper = styled.div`
    display: flex;
    @media (max-width: 1000px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;
const Home_Video_Container = styled.div`
    width: 30%;
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
    @media (max-width: 1000px) {
        width: 90%;
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
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    p {
        overflow: hidden;
        white-space: nowrap;
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
