import React, { useEffect, useState } from "react";
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
    const [videoAvatar, setVideoAvatar] = useState(null);
    const [videoEditorJob, setVideoEditorJob] = useState("");
    const [videoName, setVideoName] = useState("");
    const [videoDescription, setVideoDescription] = useState("");
    const [videoCategory, setVideoCategory] = useState("");
    const [currentVideo, setCurrentVideo] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function getVideo() {
            const data = query(collection(db, "videoForAll"));
            const docSnap = await getDocs(data);
            const newVideoList = [];

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
                    job === "你的職業"
                        ? setVideoEditorJob("影視從業人員")
                        : setVideoEditorJob(job || "影視從業人員");
                    setVideoDescription(description.toString());
                }
            });
            setVideoList(newVideoList);
        }
        getVideo();
    }, []);

    useEffect(() => {
        const getAvatar = async (currentVideo) => {
            const storageRef = await listAll(
                ref(storage, `/Avatars/${currentVideo}/`),
                false
            );
            storageRef.items.forEach(async (Avatar) => {
                const url = await getDownloadURL(Avatar);
                setVideoAvatar(url);
            });
        };
        getAvatar(currentVideo);
    }, [currentVideo]);

    return (
        <div>
            <WatchPlayerWrapper>
                <VideoPlayer videoList={videoList[0]} />
            </WatchPlayerWrapper>
            <MemberSectionBelowWrapper>
                <MemberSectionBelowLeftWrapper>
                    <MemberSectionWrapper>
                        <MemberSectionVideoInfoWrapper>
                            <h1>{`${videoName}`}</h1>
                        </MemberSectionVideoInfoWrapper>

                        <MemberSectionEditorWrapper
                            onClick={() => navigate(`/member/${currentVideo}`)}
                            editor={`${videoEditor}`}
                        >
                            <MemberSectionAvatarContainer
                                videoAvatar={videoAvatar}
                            />
                            <MemberSectionEditorTextWrapper>
                                <h1>{`${videoEditor}`}</h1>
                                <p>|</p>
                                <p> {`${videoEditorJob}`}</p>
                            </MemberSectionEditorTextWrapper>
                        </MemberSectionEditorWrapper>
                        <HandleDescription
                            videoDescription={videoDescription}
                        ></HandleDescription>
                    </MemberSectionWrapper>

                    <ThisCategory
                        videoCategory={videoCategory}
                        currentVideo={currentVideo}
                    />
                </MemberSectionBelowLeftWrapper>

                <CurrentMemberOthersWrapper>
                    <CurrentMemberOthers
                        videoEditor={videoEditor}
                        videoList={videoList[0]}
                    />
                </CurrentMemberOthersWrapper>
            </MemberSectionBelowWrapper>
        </div>
    );
};

export default Watch;

// =========== Styled ==============
const WatchPlayerWrapper = styled.div`
    width: 69%;
    margin: 70px auto 20px auto;
    aspect-ratio: 16/9;
    video {
        width: 100%;
        aspect-ratio: 16/9;
    }
    @media ${device.underDesktop} {
        width: 95%;
    }
`;

const MemberSectionBelowWrapper = styled.div`
    width: 69%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1000px) {
        width: 90%;
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

const MemberSectionBelowLeftWrapper = styled.div`
    width: 65%;
    @media (max-width: 1000px) {
        width: 90%;
        margin: 0 auto;
    }
`;
const MemberSectionWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
const MemberSectionVideoInfoWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;

    h1 {
        font-size: 1.5em;
    }
`;
const MemberSectionEditorWrapper = styled.div`
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
    h1,
    p {
        @media (max-width: 600px) {
            font-size: 14px;
        }
        @media (max-width: 453px) {
            font-size: 12px;
        }
    }
`;
const MemberSectionEditorTextWrapper = styled.div`
    display: flex;
    gap: 15px;
    font-size: 1.3em;
    margin-left: 10px;
`;
const MemberSectionAvatarContainer = styled.div`
    width: 30px;
    height: 30px;
    background-image: ${(props) =>
        props.videoAvatar ? `url(${props.videoAvatar})` : `url(${img})`};
    background-size: cover;
    background-position: center;
`;
