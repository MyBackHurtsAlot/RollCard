import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
    UserInfoContext,
    UserContext,
    VideoContext,
} from "../../Context/userContext";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import {
    query,
    collection,
    setDoc,
    getDocs,
    where,
    addDoc,
    updateDoc,
} from "firebase/firestore";
import { storage } from "../../Firebase-config";
import { db } from "../../Firebase-config";
import { v4 as uuidv4 } from "uuid";
import img from "../../Assets/SH.png";

const VideoSearchSection = ({
    selectedCategory,
    videoCategoryList,
    setVideoCategoryList,
}) => {
    const [videoList, setVideoList] = useState([]);
    // const [videoCategoryList, setVideoCategoryList] = useState([]);
    const [componentDidMount, setComponentDidMount] = useState(false);
    const { user } = useContext(UserContext);
    const { videoCount, setVideoCount } = useContext(VideoContext);
    const videoListRef = ref(storage, `videosForHomePage/`);
    const navigate = useNavigate();
    const [videoNameList, setVideoNameList] = useState([]);
    const [videoFileNameList, setVideoFileNameList] = useState([]);
    const [userIdList, setUserIdList] = useState([]);
    const [editorName, setEditorName] = useState([]);
    const [editorAvator, setEditorAvator] = useState([]);
    const [originalVideoName, setOriginalVideoName] = useState([]);

    useEffect(() => {
        setVideoCategoryList([]); // Clears previus search
        async function getVideos() {
            const response = await listAll(videoListRef, false);
            response.items.forEach(async (videos) => {
                const url = await getDownloadURL(videos);

                const fileName = videos.name;
                // console.log(fileName);
                setVideoFileNameList((prev) =>
                    !prev.includes(fileName) ? [...prev, fileName] : prev
                );
                // setVideoFileName(fileName);
                setVideoList((prev) =>
                    !prev.includes(url) ? [...prev, url] : prev
                );
            });
        }
        getVideos();
        setComponentDidMount(true);
    }, [selectedCategory]);

    useEffect(() => {
        if (videoList.length === 0) {
            return;
        }
        setVideoNameList([]);
        try {
            async function getMemberInfo(videoFileName, selectedCategory) {
                const data = query(
                    collection(db, "videoForAll"),
                    where("originalVideoName", "==", videoFileName),
                    where("videoCategory", "==", selectedCategory)
                );
                const docSnap = await getDocs(data);
                const videoInfoArray = [];
                docSnap.forEach((doc) => {
                    videoInfoArray.push(doc.data());
                });
                if (videoInfoArray.length === 0) {
                    return [];
                }
                return videoInfoArray;
            }
            Promise.all(
                videoFileNameList.map((fileName) => {
                    return getMemberInfo(fileName, selectedCategory);
                })
            )
                .then((results) => {
                    const videoNameArray = [];
                    const EditorNameArray = [];
                    const userIdArray = [];
                    const originalVideoNameArray = [];
                    // console.log(results);
                    results.forEach((allNames) => {
                        if (allNames.length === 0) {
                            return;
                        } else {
                            videoNameArray.push(allNames[0].videoName);
                            EditorNameArray.push(allNames[0].userName);
                            userIdArray.push(allNames[0].user);
                            originalVideoNameArray.push(
                                allNames[0].originalVideoName
                            );
                            setVideoNameList(videoNameArray);
                            setEditorName(EditorNameArray);
                            setUserIdList(userIdArray);
                            setOriginalVideoName(originalVideoNameArray);
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }, [videoList, selectedCategory]);
    // console.log(originalVideoName);

    useEffect(() => {
        async function filteredVideo(filteredName) {
            console.log(filteredName);
            const response = await listAll(videoListRef, false);
            response.items.forEach(async (videos) => {
                const url = await getDownloadURL(videos);

                const fileName = videos.name;
                // console.log(filteredName);
                if (fileName === filteredName) {
                    setVideoCategoryList((prev) =>
                        !prev.includes(url) ? [...prev, url] : prev
                    );
                }
            });
        }
        originalVideoName.map((filteredName) => {
            return filteredVideo(filteredName);
        });
    }, [originalVideoName]);

    return (
        <div>
            <Home_Video_Section_Wrapper>
                {videoCategoryList.map((url, index) => {
                    const splitUrl = url.split("&token=")[1];
                    // console.log(splitUrl);
                    return (
                        <Home_Video_Container key={uuidv4()}>
                            <video
                                src={url}
                                onClick={() => {
                                    navigate(`/watch/${splitUrl}`);
                                }}
                            />
                            <p>{videoNameList[index]}</p>
                            <p>{editorName[index]}</p>
                            {/* <Home_Video_Avator
                                editorAvator={editorAvator[index]}
                            /> */}
                            {/* <img src={editorAvator[index]} alt="" /> */}
                            <Home_Video_Avator>
                                {/* {editorAvator.map((img) => {
                                    return <img src={img} />;
                                })} */}
                                {/* <img src={editorAvator[index]} alt="" /> */}
                            </Home_Video_Avator>
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
    justify-content: space-between;
    gap: 50px;
`;
const Home_Video_Container = styled.div`
    width: 25%;
    height: 250px;
    /* outline: 1px solid ${(props) => props.theme.colors.primary_white}; */
    cursor: pointer;
    video {
        width: 100%;
        border-radius: 15px;
        /* max-width: 45%; */
        aspect-ratio: 16/9;
        outline: 1px solid ${(props) => props.theme.colors.primary_white};
    }
    img {
        width: 50px;
    }
`;
const Home_Video_Avator = styled.div`
    width: 20px;
    height: 20px;

    /* background-image: ${(props) =>
        props.editorAvator ? `url(${props.editorAvator})` : `url(${img})`}; */
`;
