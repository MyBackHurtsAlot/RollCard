import React, { useEffect, useState, useRef } from "react";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../Firebase-config";
import { db } from "../../Firebase-config";
import img from "../../Assets/SH.png";
import VideoPlayer from "../../Components/VideoPlayer/Index";

const Watch = () => {
    const { splitUrl } = useParams();
    const [videoList, setVideoList] = useState([]);
    const [componentDidMount, setComponentDidMount] = useState(false);
    const [videoEditor, setVideoEditor] = useState("");
    const [videoAvator, setvideoAvator] = useState(null);
    const [videoEditorJob, setVideoEditorJob] = useState("");
    const [videoName, setVideoName] = useState("");
    const [videoDescription, setVideoDescription] = useState("");
    const [currentVideo, setCurrentVideo] = useState("");
    const [expanded, setExpanded] = useState(false);
    const videoListRef = ref(storage, `videosForHomePage/`);
    const navigate = useNavigate();
    const measureRef = useRef(null);

    useEffect(() => {
        async function getVideos() {
            const response = await listAll(videoListRef, false);
            response.items.forEach(async (videos) => {
                const url = await getDownloadURL(videos);
                const fileName = videos.name;
                // console.log("fileName", fileName);
                if (url.includes(splitUrl)) {
                    setVideoList((prev) =>
                        !prev.includes(url) ? [...prev, url, fileName] : prev
                    );
                }
            });
        }
        getVideos();
        setComponentDidMount(true);
    }, []);

    useEffect(() => {
        if (videoList.length === 0) {
            return;
        }
        try {
            // const videoUrl = videoList[0];
            const fileName = videoList[1];

            async function getMemberInfo(fileName) {
                const data = query(
                    collection(db, `videoForAll`),
                    where("originalVideoName", "==", fileName)
                );
                const docSnap = await getDocs(data);
                docSnap.forEach((doc) => {
                    const videoInfo = doc.data();
                    setCurrentVideo(videoInfo.user);
                    setVideoName(videoInfo.videoName);
                    setVideoDescription(videoInfo.videoDescription);
                    console.log(videoInfo.videoDescription);
                });
            }
            getMemberInfo(fileName);
        } catch (error) {
            console.log(error);
        }
    }, [videoList]);

    useEffect(() => {
        if (!videoName) {
            return;
        }
        async function getCurrentVideo(currentVideo) {
            const EditorData = query(
                collection(db, "User"),
                where("userUid", "==", currentVideo)
            );
            const docSnapEdit = await getDocs(EditorData);
            docSnapEdit.forEach((doc) => {
                const editorInfo = doc.data();
                setVideoEditor(editorInfo.userName);
                setVideoEditorJob(editorInfo.userJob);
            });

            const storageRef = await listAll(
                ref(storage, `/avators/${currentVideo}/`),
                false
            );
            console.log(storageRef);
            storageRef.items.forEach(async (avator) => {
                const url = await getDownloadURL(avator);
                setvideoAvator(url);
            });
        }
        getCurrentVideo(currentVideo);
    }, [videoName]);
    // console.log(videoList[0]);

    // useEffect(() => {
    //     if (videoDescription) {
    //         // const descriptionHeight = measureRef.current.scrollHeight;
    //         // const containerHeight = 200;
    //         console.log(videoDescription.scrollHeight);
    //         // if (descriptionHeight >= containerHeight) {
    //         //     setExpanded(false);
    //         // }
    //     }
    // }, [videoDescription]);

    return (
        <div>
            <Watch_Player_wrapper>
                <VideoPlayer videoList={videoList[0]} />
                {/* <video src={videoList[0]} controls /> */}
            </Watch_Player_wrapper>
            <Member_Section_Wrapper>
                <Member_Section_VideoInfo_Wrapper>
                    <h1>{`${videoName}`}</h1>
                </Member_Section_VideoInfo_Wrapper>
                <Member_Section_Editor_Wrapper
                    onClick={() => navigate(`/member/${currentVideo}`)}
                >
                    <Member_Section_Avator_container
                        videoAvator={videoAvator}
                    />
                    <Member_Section_Editor_Text_Wrapper>
                        <h1>{`${videoEditor}`}</h1>
                        <p>|</p>
                        <p> {`${videoEditorJob}`}</p>
                    </Member_Section_Editor_Text_Wrapper>
                </Member_Section_Editor_Wrapper>
                <Member_Section_Description
                    ref={measureRef}
                    expanded={expanded}
                    onClick={() => setExpanded(true)}
                >
                    {parse(`${videoDescription}`)}
                </Member_Section_Description>
            </Member_Section_Wrapper>
        </div>
    );
};

export default Watch;

// =========== Styled ==============
const Watch_Player_wrapper = styled.div`
    width: 69%;
    margin: 70px auto 20px auto;
    aspect-ratio: 16/9;
    video {
        width: 100%;
        aspect-ratio: 16/9;
    }
`;
const Member_Section_Wrapper = styled.div`
    width: 69%;
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
const Member_Section_VideoInfo_Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    h1 {
        font-size: 2em;
    }
`;
const Member_Section_Editor_Wrapper = styled.div`
    width: 40%;
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: #404040;
    border-radius: 15px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        transform: translateX(5px);
        transform: translateY(-5px);
        box-shadow: 5px 5px 0px 0px #a6a6a6;
    }
`;
const Member_Section_Editor_Text_Wrapper = styled.div`
    display: flex;
    gap: 15px;
    font-size: 1.3em;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    /* &:hover h1 {
        font-size: 1.4em;
    } */
    /* flex-direction: column; */
`;
const Member_Section_Avator_container = styled.div`
    width: 30px;
    height: 30px;
    background-image: ${(props) =>
        props.videoAvator ? `url(${props.videoAvator})` : `url(${img})`};
    background-size: cover;
    background-position: center;
`;

const Member_Section_Description = styled.div`
    width: 40%;
    height: ${(props) => (props.expanded ? "auto" : "100px")};
    overflow: hidden;
    /* outline: 1px solid red; */
    background-color: #404040;
    border-radius: 15px;
    padding: 10px;
    position: relative;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    ${(props) =>
        !props.expanded &&
        css`
            &:hover {
                background-color: rgba(0, 0, 0, 0.5);
                color: #4d4d4d;

                transform: translateX(5px);
                transform: translateY(-5px);
                box-shadow: 5px 5px 0px 0px #a6a6a6;

                ::after {
                    content: "展開全文";
                    color: #f2f2f2;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    /* padding: 10px; */
                }
            }
        `};
`;
