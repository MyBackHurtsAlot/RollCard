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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../Firebase-config";
import { db } from "../../../Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../Firebase-config";

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
    const [videoTempCategory, setTempVideoCategory] = useState("");

    const {
        videoName,
        setVideoName,
        videoDescription,
        setVideoDescription,
        videoUrl,
        setVideoUrl,
        displayNone,
        setDisplayNone,
        displayBlock,
        setDisplayBlock,
        visibility,
        setVisability,
        originalVideoName,
        setOriginalVideoName,
    } = useContext(VideoContext);
    const { userName, userJob, userEmail, setUserEmail } =
        useContext(UserInfoContext);
    const { user } = useContext(UserContext);
    const metadata = {
        contentType: "video/*",
    };

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

    const submitVideoContent = async () => {
        try {
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
            await addDoc(collection(db, "videoForAll"), {
                user: user,
                userEmail: userEmail,
                userName: userName,
                userJob: userJob,
                videoName: videoName,
                videoCategory: videoTempCategory,
                originalVideoName: originalVideoName,
                videoDescription: videoDescription,
                videoUrlForHome: homePageUrl,
                videoUrlForMember: memberUrl,
                videoId: id,
            });
        } catch (error) {
            console.log(error);
        }
    };
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
                    await uploadBytes(videoRefForMember, file, metadata);
                    await uploadBytes(videoRefForHomePage, file, metadata);
                    await uploadBytes();
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
                if (videoRefForMember) {
                    await uploadBytes(videoRefForMember, file, metadata);
                    await uploadBytes(videoRefForHomePage, file, metadata);

                    const urlForMember = await getDownloadURL(
                        ref(storage, videoRefForMember)
                    );
                    const urlRefForHomePage = await getDownloadURL(
                        ref(storage, videoRefForMember)
                    );
                    setMemberUrl(urlForMember);
                    setHomePageUrl(urlRefForHomePage);
                    setOriginalVideoName(`${file.name + user}`);
                    console.log("111", originalVideoName);
                    console.log(video);
                    setDisplayNone("block");
                    setDisplayBlock("none");
                    setVisability("hidden");
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
        console.log("uploaded");
    };
    return (
        <>
            {/* <Header /> */}

            <Upload_Area_Wrapper
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <Upload_Video
                    src={video}
                    controls
                    style={{ display: displayNone }}
                    key={id}
                />
                <Upload_File_Input style={{ display: displayBlock }}>
                    Upload <br />
                    ??POPUP AFTER UPLOADED??
                    <br /> ！！！！！！ 上傳進度條 ！！！！！！
                    <input type="file" onChange={uploadVideo} />
                </Upload_File_Input>
                {/* <Upload_File_Video_Confirm onClick={submitVideo}>
                    Upload
                </Upload_File_Video_Confirm> */}
            </Upload_Area_Wrapper>
            <Upload_File_Section_Wrapper>
                <Upload_File_Name
                    html={`${videoName}`}
                    onChange={(e) => {
                        setVideoName(e.target.value);
                    }}
                />
                <Upload_File_description
                    html={`${videoDescription}`}
                    onChange={(e) => {
                        setVideoDescription(e.target.value);
                    }}
                />
                <Upload_File_Confirm onClick={submitVideoContent}>
                    OK
                </Upload_File_Confirm>
                <VideoDropDown
                    videoTempCategory={videoTempCategory}
                    setTempVideoCategory={setTempVideoCategory}
                />
            </Upload_File_Section_Wrapper>
        </>
    );
};

export default VideoUpload;

// =========== Styled ============
const Upload_Area_Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    max-height: 1080px;
    margin: 66px auto 0 auto;
    aspect-ratio: 16/9;
    // !!!!!!!!!!!!!!!!!!! 有需要再回來改回relative !!!!!!!!!!!!!!!!!!!!
    /* position: relative; */
    z-index: 1;
    /* outline: 1px solid #666666; */
`;
const Upload_File_Input = styled.label`
    cursor: pointer;
    input {
        display: none;
    }
`;
const Upload_File_Section_Wrapper = styled.div`
    position: relative;
    width: 70%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const Upload_File_Video_Confirm = styled.div`
    color: ${(props) => props.theme.colors.primary_white};
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 0;
`;
const Upload_File_Name = styled(ContentEditable)`
    font-size: 36px;
    font-weight: 700;
    outline: none;
    color: ${(props) => props.theme.colors.primary_white};
`;
const Upload_File_description = styled(ContentEditable)`
    font-size: 16px;
    font-weight: 400;
    white-space: pre-wrap;
    word-wrap: break-word;
    outline: none;
    color: ${(props) => props.theme.colors.primary_white};
`;
const Upload_File_Confirm = styled.div`
    color: ${(props) => props.theme.colors.primary_white};
    cursor: pointer;
    direction: rtl;
`;
const Upload_Video = styled.video`
    margin: 0 auto;
    width: 100%;
    height: 100%;
`;
