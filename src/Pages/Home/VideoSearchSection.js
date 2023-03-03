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
import { device } from "../../Components/Rwd";

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

    // useEffect(() => {
    //     setVideoCategoryList([]); // Clears previus search
    //     async function getVideos() {
    //         const response = await listAll(videoListRef, false);
    //         response.items.forEach(async (videos) => {
    //             const url = await getDownloadURL(videos);

    //             const fileName = videos.name;
    //             // console.log(fileName);
    //             setVideoFileNameList((prev) =>
    //                 !prev.includes(fileName) ? [...prev, fileName] : prev
    //             );
    //             // setVideoFileName(fileName);
    //             setVideoList((prev) =>
    //                 !prev.includes(url) ? [...prev, url] : prev
    //             );
    //         });
    //     }
    //     getVideos();
    //     setComponentDidMount(true);
    // }, [selectedCategory]);

    // useEffect(() => {
    //     if (videoList.length === 0) {
    //         return;
    //     }
    //     setVideoNameList([]);
    //     try {
    //         async function getMemberInfo(videoFileName, selectedCategory) {
    //             const data = query(
    //                 collection(db, "videoForAll"),
    //                 where("originalVideoName", "==", videoFileName),
    //                 where("videoCategory", "==", selectedCategory)
    //             );
    //             const docSnap = await getDocs(data);
    //             const videoInfoArray = [];
    //             docSnap.forEach((doc) => {
    //                 videoInfoArray.push(doc.data());
    //             });
    //             if (videoInfoArray.length === 0) {
    //                 return [];
    //             }
    //             return videoInfoArray;
    //         }
    //         Promise.all(
    //             videoFileNameList.map((fileName) => {
    //                 return getMemberInfo(fileName, selectedCategory);
    //             })
    //         )
    //             .then((results) => {
    //                 const videoNameArray = [];
    //                 const EditorNameArray = [];
    //                 const userIdArray = [];
    //                 const originalVideoNameArray = [];
    //                 // console.log(results);
    //                 results.forEach((allNames) => {
    //                     if (allNames.length === 0) {
    //                         return;
    //                     } else {
    //                         videoNameArray.push(allNames[0].videoName);
    //                         EditorNameArray.push(allNames[0].userName);
    //                         userIdArray.push(allNames[0].user);
    //                         originalVideoNameArray.push(
    //                             allNames[0].originalVideoName
    //                         );
    //                         setVideoNameList(videoNameArray);
    //                         setEditorName(EditorNameArray);
    //                         setUserIdList(userIdArray);
    //                         setOriginalVideoName(originalVideoNameArray);
    //                     }
    //                 });
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [videoList, selectedCategory]);
    // // console.log(originalVideoName);

    // useEffect(() => {
    //     async function filteredVideo(filteredName) {
    //         console.log(filteredName);
    //         const response = await listAll(videoListRef, false);
    //         response.items.forEach(async (videos) => {
    //             const url = await getDownloadURL(videos);

    //             const fileName = videos.name;
    //             // console.log(filteredName);
    //             if (fileName === filteredName) {
    //                 setVideoCategoryList((prev) =>
    //                     !prev.includes(url) ? [...prev, url] : prev
    //                 );
    //             }
    //         });
    //     }
    //     originalVideoName.map((filteredName) => {
    //         return filteredVideo(filteredName);
    //     });
    // }, [originalVideoName]);

    return (
        <div>
            <Home_Video_Section_Wrapper>
                {videoCategoryList.map((url, index) => {
                    const splitUrl = url.split("&token=")[1];
                    // console.log(splitUrl);
                    return (
                        <Home_Video_Container
                            key={uuidv4()}
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
    gap: 50px;
`;
const Home_Video_Container = styled.div`
    width: 20%;
    position: relative;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    /* &:hover {
        color: ${(props) => props.theme.colors.highLight};
    } */
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
        overflow: hidden;
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
        width: 20%;
    }
`;
// const Home_Video_Avator = styled.div`
//     width: 20px;
//     height: 20px;

//     /* background-image: ${(props) =>
//         props.editorAvator ? `url(${props.editorAvator})` : `url(${img})`}; */
// `;
