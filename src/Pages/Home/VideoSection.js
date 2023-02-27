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
import Loading from "../Loading/Index";
import { device } from "../../Components/Rwd";

const VideoSection = ({ videoList, videoNameList, userIdList, editorName }) => {
    const navigate = useNavigate();
    const [showLoding, setShowLoading] = useState(false);
    // console.log(editorName);
    // console.log(userIdList);

    // useEffect(() => {
    //     if (userIdList.length === 0) {
    //         return;
    //     }
    //     async function getAvator(userId) {
    //         // console.log(userIdList);
    //         const avatorRef = await listAll(ref(storage, `avators/${userId}/`));

    //         // const avatorArray = [];
    //         avatorRef.items.forEach(async (avator) => {
    //             const avatorUrl = await getDownloadURL(avator);
    //             // avatorArray.push(url);
    //             // console.log(avatorArray);
    //             // setEditorAvator(avatorArray);
    //             setEditorAvator((prev) =>
    //                 !prev.includes(avatorUrl) ? [...prev, avatorUrl] : prev
    //             );
    //         });
    //     }
    //     userIdList.forEach((userId) => {
    //         getAvator(userId);
    //     });
    // }, [editorName]);
    useEffect(() => {
        !videoList ? setShowLoading(false) : setShowLoading(true);
    }, [videoList]);
    // console.log(showLoding);
    return (
        <>
            {!showLoding ? (
                <Loading progress={"Loading"} />
            ) : (
                <Home_Video_Section_Wrapper>
                    {videoList.map((url, index) => {
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

                                <Home_VideoInfo_Container
                                    editor={editorName[index]}
                                >
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
                                </Home_VideoInfo_Container>

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
            )}
        </>
    );
};

export default VideoSection;

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
    /* height: 230px; */
    /* outline: 1px solid red; */
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        color: ${(props) => props.theme.colors.highLight};
    }
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
            /* color: ${(props) => props.theme.colors.highLight}; */
        }
    }
    img {
        width: 50px;
    }
    @media ${device.smallest} {
        width: 90%;
        /* margin-top: 40px; */
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

const Home_VideoInfo_Container = styled.div`
    margin: 5px auto auto 0;
    position: relative;
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
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        color: ${(props) => props.theme.colors.highLight};
    }
    @media ${device.smallest} {
        h1 {
            font-size: 24px;
        }
        p {
            font-size: 1.4em;
        }
    }
    @media ${device.mobile} {
        h1 {
            font-size: 24px;
        }
        p {
            font-size: 1.4em;
        }
    }
    @media ${device.tablet} {
        h1 {
            font-size: 24px;
        }
        p {
            font-size: 1.4em;
        }
    }
    @media ${device.desktop} {
        h1 {
            font-size: 18px;
        }
        p {
            font-size: 1em;
        }
    }
`;

const Home_Video_Avator = styled.div`
    width: 20px;
    height: 20px;

    /* background-image: ${(props) =>
        props.editorAvator ? `url(${props.editorAvator})` : `url(${img})`}; */
`;
