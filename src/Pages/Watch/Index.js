import React, { useEffect, useState, useRef } from "react";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../Firebase-config";
import { db } from "../../Firebase-config";
import img from "../../Assets/SH.png";
import VideoPlayer from "../../Components/VideoPlayer/Index";
import CurrentMemberOthers from "./CurrentMemberOthers";
import ThisCategory from "./ThisCategory";
import { HandleDescription } from "./HandleDescription";
import { device } from "../../Components/Rwd";

const Watch = () => {
    const { splitUrl } = useParams();
    const [videoList, setVideoList] = useState([]);
    const [videoEditor, setVideoEditor] = useState("");
    const [videoAvator, setvideoAvator] = useState(null);
    const [videoEditorJob, setVideoEditorJob] = useState("");
    const [videoName, setVideoName] = useState("");
    const [videoDescription, setVideoDescription] = useState("");
    const [videoCategory, setVideoCategory] = useState("");
    const [currentVideo, setCurrentVideo] = useState("");
    // const [expanded, setExpanded] = useState(false);
    // const [showExpand, setShowExpand] = useState(false);
    const [videoListAll, setVideoListAll] = useState([]);
    const videoListRef = ref(storage, `videosForHomePage/`);
    const navigate = useNavigate();
    const measureRef = useRef(null);

    useEffect(() => {
        async function getVideo() {
            const data = query(
                collection(db, "videoForAll")
                // where("originalVideoName", "==", videoFileName)
            );
            const docSnap = await getDocs(data);
            const newEditorNameList = [];
            const newVideoNameList = [];
            const newVideoList = [];
            const newUserJobList = [];
            const newDescriptionList = [];

            docSnap.forEach((doc) => {
                const url = doc.data().videoUrlForHome;
                const editor = doc.data().userName;
                const videoName = doc.data().videoName;
                const job = doc.data().userJob;
                const description = doc.data().videoDescription;
                const id = doc.data().user;
                const category = doc.data().videoCategory;
                if (url.includes(splitUrl)) {
                    newVideoList.push(url);

                    setVideoCategory(category);
                    setCurrentVideo(id);
                    setVideoName(videoName);
                    setVideoEditor(editor || "工作人員A");
                    setVideoEditorJob(job || "影視從業人員");
                    setVideoDescription(description.toString());
                }
            });
            setVideoList(newVideoList);
        }
        getVideo();
    }, []);

    useEffect(() => {
        const getAvator = async (currentVideo) => {
            const storageRef = await listAll(
                ref(storage, `/avators/${currentVideo}/`),
                false
            );
            // console.log(storageRef);
            storageRef.items.forEach(async (avator) => {
                const url = await getDownloadURL(avator);
                setvideoAvator(url);
            });
        };
        getAvator(currentVideo);
    }, [currentVideo]);
    // useEffect(() => {
    //     // console.log(StorageReference.toString());
    //     // async function getVideos() {
    //     //     const response = await listAll(videoListRef, false);
    //     //     response.items.forEach(async (videos) => {
    //     //         const url = await getDownloadURL(videos);
    //     //         const fileName = videos.name;
    //     //         // console.log("fileName", fileName);
    //     //         if (url.includes(splitUrl)) {
    //     //             setVideoList((prev) =>
    //     //                 !prev.includes(url) ? [...prev, url, fileName] : prev
    //     //             );
    //     //         }
    //     //         setVideoListAll((prev) =>
    //     //             !prev.find((item) => item.url === url)
    //     //                 ? [...prev, { url: url, fileName: fileName }]
    //     //                 : prev
    //     //         );
    //     //     });
    //     // }
    //     async function getMemberInfo() {
    //         const data = query(
    //             collection(db, "videoForAll")
    //             // where("originalVideoName", "==", videoFileName)
    //         );
    //         const docSnap = await getDocs(data);
    //         docSnap.forEach((doc) => {
    //             const url = doc.data().videoUrlForHome;
    //             const fileName = doc.data().name;
    //             if (url.includes(splitUrl)) {
    //                 setVideoList((prev) =>
    //                     !prev.includes(url) ? [...prev, url, fileName] : prev
    //                 );
    //             }
    //             setVideoListAll((prev) =>
    //                 !prev.find((item) => item.url === url)
    //                     ? [...prev, { url: url, fileName: fileName }]
    //                     : prev
    //             );
    //         });
    //     }
    //     getMemberInfo();
    //     // getVideos();
    // }, []);
    // // console.log("videoListAll", videoListAll);

    // // console.log(videoListAll[0]);

    // useEffect(() => {
    //     if (videoList.length === 0) {
    //         return;
    //     }
    //     try {
    //         // const videoUrl = videoList[0];
    //         const fileName = videoList[1];

    //         async function getMemberInfo(fileName) {
    //             const data = query(
    //                 collection(db, `videoForAll`),
    //                 where("originalVideoName", "==", fileName)
    //             );
    //             const docSnap = await getDocs(data);
    //             docSnap.forEach((doc) => {
    //                 const videoInfo = doc.data();
    //                 setCurrentVideo(videoInfo.user);
    //                 setVideoName(videoInfo.videoName);
    //                 setVideoDescription(videoInfo.videoDescription);
    //                 setVideoCategory(videoInfo.videoCategory);
    //                 // console.log(videoInfo.videoDescription);
    //             });
    //         }
    //         getMemberInfo(fileName);

    //         // async function getAllNeededData(videoListAll) {
    //         //     console.log(videoListAll);
    //         //     // const fileNameAll = videoListAll[0].fileName;
    //         //     // console.log(fileNameAll);
    //         // }
    //         // getAllNeededData(videoListAll);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [videoList]);

    // useEffect(() => {
    //     if (!videoName) {
    //         return;
    //     }
    //     async function getCurrentVideo(currentVideo) {
    //         const EditorData = query(
    //             collection(db, "User"),
    //             where("userUid", "==", currentVideo)
    //         );
    //         const docSnapEdit = await getDocs(EditorData);
    //         docSnapEdit.forEach((doc) => {
    //             const editorInfo = doc.data();
    //             setVideoEditor(editorInfo.userName || "工作人員A");
    //             setVideoEditorJob(editorInfo.userJob || "影視從業人員");
    //         });

    //         const storageRef = await listAll(
    //             ref(storage, `/avators/${currentVideo}/`),
    //             false
    //         );
    //         // console.log(storageRef);
    //         storageRef.items.forEach(async (avator) => {
    //             const url = await getDownloadURL(avator);
    //             setvideoAvator(url);
    //         });
    //     }
    //     getCurrentVideo(currentVideo);
    // }, [videoName]);
    // console.log(videoList[0]);
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // useEffect(() => {
    //     if (videoDescription) {
    //         const descriptionHeight = measureRef.current.scrollHeight;

    //         console.log(descriptionHeight);
    //         if (descriptionHeight > 100) {
    //             setShowExpand(true);
    //         }
    //     }
    // }, [videoDescription]);
    // console.log("show", showExpand);

    // const handleDescripiton = () => {
    //     setShowExpand(false);
    //     setExpanded(true);
    // };

    return (
        <div>
            <Watch_Player_wrapper>
                <VideoPlayer videoList={videoList[0]} />
                {/* <video src={videoList[0]} controls /> */}
            </Watch_Player_wrapper>
            <Member_Section_Below_Wrapper>
                <Member_Section_Below_Left_Wrapper>
                    <Member_Section_Wrapper>
                        <Member_Section_VideoInfo_Wrapper>
                            <h1>{`${videoName}`}</h1>
                        </Member_Section_VideoInfo_Wrapper>

                        <Member_Section_Editor_Wrapper
                            onClick={() => navigate(`/member/${currentVideo}`)}
                            editor={`${videoEditor}`}
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
                        <HandleDescription
                            // ref={measureRef}
                            // expanded={expanded}
                            // showExpand={showExpand}
                            // onClick={handleDescripiton}
                            videoDescription={videoDescription}
                        >
                            {/* <div>{parse(`${videoDescription}`)}</div>
                            {console.log("ori", videoDescription)} */}
                        </HandleDescription>
                    </Member_Section_Wrapper>

                    <ThisCategory
                        videoCategory={videoCategory}
                        currentVideo={currentVideo}
                    />
                </Member_Section_Below_Left_Wrapper>

                <CurrentMemberOthersWrapper>
                    <CurrentMemberOthers
                        videoEditor={videoEditor}
                        videoList={videoList[0]}
                    />
                </CurrentMemberOthersWrapper>
            </Member_Section_Below_Wrapper>
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

const Member_Section_Below_Wrapper = styled.div`
    width: 69%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1000px) {
        flex-direction: column;
    }
`;

const CurrentMemberOthersWrapper = styled.div`
    width: 30%;
    @media (max-width: 1000px) {
        width: 90%;
        margin: 10px auto;
    }
`;

const Member_Section_Below_Left_Wrapper = styled.div`
    width: 65%;
    @media (max-width: 1000px) {
        width: 90%;
        margin: 0 auto;
    }
`;
const Member_Section_Wrapper = styled.div`
    width: 100%;
    /* margin: 30px auto; */
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
        font-size: 1.5em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;
const Member_Section_Editor_Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: #404040;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        transform: translateX(5px);
        transform: translateY(-5px);
        box-shadow: 5px 5px 0px 0px #a6a6a6;
    }
    &:hover::after {
        content: ${({ editor }) => `"去 ${editor} 那邊看看"`};
        position: absolute;
        bottom: 100%;
        right: 0;
        border-radius: 5px;
        background-color: #a6a6a6;
        color: #f2f2f2;
        padding: 5px;
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
// const Member_Section_Description = styled.div`
//     width: 100%;
//     height: ${(props) => (props.expanded ? "auto" : "100px")};
//     overflow: hidden;
//     line-height: 1.5em;
//     background-color: #404040;
//     border-radius: 15px;
//     padding: 10px;
//     position: relative;
//     cursor: ${(props) => (!props.showExpand ? "auto" : "pointer")};
//     transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
//     ${(props) =>
//         props.showExpand &&
//         css`
//             &:hover {
//                 background-color: rgba(0, 0, 0, 0.5);
//                 color: #4d4d4d;

//                 transform: translateX(5px);
//                 transform: translateY(-5px);
//                 box-shadow: 5px 5px 0px 0px #a6a6a6;

//                 ::after {
//                     content: "展開全文";
//                     color: #f2f2f2;
//                     position: absolute;
//                     top: 50%;
//                     left: 50%;
//                     transform: translate(-50%, -50%);
//                     /* padding: 10px; */
//                 }
//             }
//         `};
// `;
