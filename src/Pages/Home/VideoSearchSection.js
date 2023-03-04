import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../Firebase-config";
import { device } from "../../Components/Rwd";

const VideoSearchSection = ({
    selectedCategory,
    videoCategoryList,
    setVideoCategoryList,
}) => {
    const [videoList, setVideoList] = useState([]);
    const navigate = useNavigate();
    const [videoNameList, setVideoNameList] = useState([]);
    const [userIdList, setUserIdList] = useState([]);
    const [editorName, setEditorName] = useState([]);

    useEffect(() => {
        setVideoCategoryList([]); // Clears previus search
        async function getVideo(selectedCategory) {
            const data = query(
                collection(db, "videoForAll"),
                where("videoCategory", "==", selectedCategory)
            );
            const docSnap = await getDocs(data);
            const newVideoList = [];
            const newEditorNameList = [];
            const newVideoNameList = [];
            const newUserIdList = [];
            docSnap.forEach((doc) => {
                console.log("query");
                const url = doc.data().videoUrlForHome;
                const editor = doc.data().userName;
                const videoName = doc.data().videoName;
                const id = doc.data().user;
                newVideoList.push(url);
                newEditorNameList.push(editor);
                newVideoNameList.push(videoName);
                newUserIdList.push(id);
            });
            setVideoList(newVideoList);
            setEditorName(newEditorNameList);
            setVideoNameList(newVideoNameList);
            setUserIdList(newUserIdList);
            setVideoCategoryList(newVideoList);
        }
        getVideo(selectedCategory);
    }, [selectedCategory]);

    return (
        <div>
            <Home_Video_Section_Wrapper>
                {videoCategoryList.map((url, index) => {
                    const splitUrl = url.split("&token=")[1];
                    return (
                        <Home_Video_Container
                            key={index}
                            editor={editorName[index]}
                        >
                            <video
                                src={url}
                                onClick={() => {
                                    navigate(`/watch/${splitUrl}`);
                                }}
                            />
                            <h1>{videoNameList[index]}</h1>
                            <p
                                onClick={() =>
                                    navigate(`/member/${userIdList[index]}`)
                                }
                            >
                                {editorName[index]}
                            </p>
                        </Home_Video_Container>
                    );
                })}
            </Home_Video_Section_Wrapper>
        </div>
    );
};

export default VideoSearchSection;

// ================ Styled =================
const Home_Video_Section_Wrapper = styled.section`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 20px;
`;
const Home_Video_Container = styled.div`
    width: 23%;
    position: relative;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    cursor: pointer;
    video {
        width: 100%;
        border-radius: 5px;
        /* max-width: 45%; */
        aspect-ratio: 16/9;
        outline: 1px solid ${(props) => props.theme.colors.primary_white};
        transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        &:hover {
            transform: translateX(5px);
            transform: translateY(-5px);
            box-shadow: 5px 5px 0px 0px #a6a6a6;
            color: ${(props) => props.theme.colors.highLight};
        }
    }
    img {
        width: 50px;
    }
    h1 {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 5px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    p {
        font-weight: 200;
        &:hover::after {
            content: ${({ editor }) => `"${editor} 的所有作品"`};
            position: absolute;
            top: 110%;
            left: 0;
            border-radius: 5px;
            background-color: #a6a6a6;
            color: #f2f2f2;
            padding: 5px;
        }
    }
    @media ${device.smallest} {
        width: 90%;
        margin-top: 40px;
    }
    @media ${device.mobile} {
        width: 90%;
        margin-top: 40px;
    }
    @media ${device.tablet} {
        width: 45%;
    }
    @media ${device.desktop} {
        width: 23%;
    }
`;
