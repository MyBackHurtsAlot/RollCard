import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";
import {
    UserInfoContext,
    UserContext,
    VideoContext,
} from "../../../Context/userContext";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    uploadBytesResumable,
    StorageReference,
} from "firebase/storage";
import { storage } from "../../../Firebase-config";
import { db } from "../../../Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../Firebase-config";
import UploadVideoInfo from "./UploadVideoInfo";
import Loading from "../../Loading/Index";

import Header from "../../../Components/Header/Index";
import VideoDropDown from "../../../Components/DropDown/VideoDropDown";
import { v4 as uuidv4 } from "uuid";

const VideoUpload = (selectedCategory) => {
    const id = uuidv4();
    const navigate = useNavigate();
    const [video, setVideo] = useState(null);
    const [memberUrl, setMemberUrl] = useState();
    const [homePageUrl, setHomePageUrl] = useState();
    const [videoCategory, setVideoCategory] = useState("");
    // const [videoTempCategory, setTempVideoCategory] = useState("");
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState("");

    const [displayNone, setDisplayNone] = useState("none");
    const [displayBlock, setDisplayBlock] = useState("block");
    const [visibility, setVisability] = useState("visable");
    const [notLoading, setNotLoading] = useState("none");
    // console.log("first", uploading);
    const {
        // videoName,
        // setVideoName,
        videoDescription,
        setVideoDescription,
        videoUrl,
        setVideoUrl,
        originalVideoName,
        setOriginalVideoName,
    } = useContext(VideoContext);
    const { userName, userJob, userEmail, setUserEmail } =
        useContext(UserInfoContext);
    const { user } = useContext(UserContext);
    const metadata = {
        contentType: "video/*",
    };
    const [videoName, setVideoName] = useState("");

    useEffect(() => {
        const email = auth.currentUser;
        if (email) {
            setUserEmail(email.email);
        }
    }, [user]);

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            navigate("/");
        }
    });

    // const submitVideoContent = async () => {
    //     try {
    // const url = await videoRef.getDownloadURL();
    // await addDoc(collection(db, "Videos", user), {
    //     user: user,
    //     userEmail: userEmail,
    //     userName: userName,
    //     userJob: userJob,
    //     videoName: videoName,
    //     videoCategory: videoTempCategory,
    //     originalVideoName: originalVideoName,
    //     videoDescription: videoDescription,
    //     videoUrlForHome: homePageUrl,
    //     videoUrlForMember: memberUrl,
    //     videoId: id,
    // });
    //         await addDoc(collection(db, "videoForAll"), {
    //             user: user,
    //             userEmail: userEmail,
    //             userName: userName,
    //             userJob: userJob,
    //             videoName: videoName,
    //             videoCategory: videoTempCategory,
    //             originalVideoName: originalVideoName,
    //             videoDescription: videoDescription,
    //             videoUrlForHome: homePageUrl,
    //             videoUrlForMember: memberUrl,
    //             videoId: id,
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // const timeStamp = new Date(new Date().getTime()).toLocaleString();
    // !!!!!!!!!!!!!!!!!!!!!!!! 會上傳空值 ！！！！！！！！！！！！！！！！！！
    const handleDrop = async (e) => {
        if (e.dataTransfer.files) {
            console.log(e.dataTransfer.files);
            const file = e.dataTransfer.files;
            try {
                const videoRefForMember = ref(
                    storage,
                    `videos/${user}/${videoName + user}`
                );
                const videoRefForHomePage = ref(
                    storage,
                    `videosForHomePage/${videoName + user}`
                );
                // const videoForCateGory = ref(storage, ``);
                if (videoRefForMember) {
                    await uploadBytesResumable(
                        videoRefForMember,
                        file,
                        metadata
                    );
                    await uploadBytesResumable(
                        videoRefForHomePage,
                        file,
                        metadata
                    );
                    await uploadBytesResumable();
                    const url = await getDownloadURL(
                        ref(storage, videoRefForMember)
                    );
                    setVideo(url);
                    setDisplayNone("block");
                    setDisplayBlock("none");
                    setVisability("hidden");
                    setVideoName(file.name);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    const uploadVideo = async (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setVideoName(file.name);
            try {
                const videoRefForMember = ref(
                    storage,
                    `videos/${user}/${file.name + user}`
                );
                const videoRefForHomePage = ref(
                    storage,
                    `videosForHomePage/${file.name + user}`
                );

                // const videoRefForCategory = ref(storage, `videosForCategory`);
                if (videoRefForHomePage) {
                    const task = uploadBytesResumable(
                        videoRefForHomePage,
                        file,
                        metadata
                    );
                    // console.log("task", task);
                    setNotLoading("block");
                    setDisplayBlock("none");
                    // console.log("start", uploading);
                    task.on("state_changed", (snapshot) => {
                        let progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        // progress = 100 ? null : setUploading(true);
                        setProgress(progress);
                        console.log("Upload is " + progress + "% done");
                    });
                    await uploadBytesResumable(
                        videoRefForMember,
                        file,
                        metadata
                    );

                    const urlForMember = await getDownloadURL(
                        ref(storage, videoRefForMember)
                    );
                    const urlRefForHomePage = await getDownloadURL(
                        ref(storage, videoRefForMember)
                    );
                    setMemberUrl(urlForMember);
                    setHomePageUrl(urlRefForHomePage);
                    setOriginalVideoName(`${file.name + user}`);
                    // console.log("111", originalVideoName);
                    // console.log(video);

                    // useEffect(() => {
                    //     videoRefForMember.current = storage.ref(
                    //         `videos/${user}/${videoName + user}`
                    //     );
                    // }, [videoName, user]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        // setUploading(false);
        // console.log("end", uploading);

        console.log("uploaded");
    };
    useEffect(() => {
        if (progress === 100) {
            setDisplayNone("block");
            setDisplayBlock("none");
            setVisability("hidden");
            setNotLoading("none");
            setVideoName(videoName);
            console.log("Change");
        } else {
            // setUploading(true);
        }
    }, [progress]);

    const fileName = `${videoName + user}`;

    // console.log("rerender");
    console.log(notLoading);
    return (
        <>
            {/* <Header /> */}
            <Upload_Area_Wrapper
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <Upload_Video
                    src={memberUrl}
                    controls
                    style={{ display: displayNone }}
                    key={id}
                />
                <Upload_File_Input style={{ display: displayBlock }}>
                    {progress}
                    Upload
                    <input type="file" onChange={uploadVideo} />
                </Upload_File_Input>

                <Loading
                    style={{ display: notLoading }}
                    progress={Math.ceil(progress)}
                />
                {/* <Loading progress={Math.ceil(progress)} /> */}

                {/* <Upload_File_Video_Confirm onClick={submitVideo}>
                    Upload
                </Upload_File_Video_Confirm> */}
            </Upload_Area_Wrapper>
            <UploadVideoInfo fileName={fileName} videoName={videoName} />
            {/* <Upload_File_Section_Wrapper>
                <Upload_File_Name
                    html={`${videoName}`}
                    onChange={(e) => {
                        setVideoName(e.target.value);
                        textContent;
                    }}
                />
                <Upload_File_description
                    html={`${videoDescription}`}
                    onChange={(e) => {
                        setVideoDescription(e.target.value);
                    }}
                    ref={aaa}
                />
                <Upload_File_Confirm
                    // onClick={submitVideoContent}
                    onClick={() => {
                        console.log(aaa.current.textContent);
                    }}
                >
                    OK
                </Upload_File_Confirm>
                <VideoDropDown
                    videoTempCategory={videoTempCategory}
                    setTempVideoCategory={setTempVideoCategory}
                />
            </Upload_File_Section_Wrapper> */}
        </>
    );
};

export default VideoUpload;

// =========== Styled ============
// const UploadVideoInfo = styled.div``;
const Upload_Area_Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    max-height: 1080px;
    margin: 66px auto 0 auto;
    aspect-ratio: 16/9;
    position: relative;
    z-index: 1;
    outline: 1px solid #a6a6a6;
    border-radius: 15px;
`;
const Upload_File_Input = styled.label`
    cursor: pointer;
    input {
        display: none;
    }
`;
const Upload_Video = styled.video`
    margin: 0 auto;
    width: 100%;
    height: 100%;
`;
