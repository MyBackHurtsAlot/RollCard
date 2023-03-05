import React, { useContext, useState, useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";

import styled from "styled-components";
import VideoDropDown from "../../../Components/DropDown/VideoDropDown";
import {
    query,
    collection,
    getDocs,
    where,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../../Firebase-config";
import { UserContext } from "../../../Context/userContext";

const HandleEdit = ({
    videoWrapperRef,
    videoBlockRef,
    videoTextRef,
    videoNameAll,
    videoCategoryAll,
    videoDiscriptionAll,
    videoindex,
    setVideoNameAll,
    setVideoCategoryAll,
    setVideoDiscriptionAll,
}) => {
    const { user } = useContext(UserContext);
    const [showEdit, setShowEdit] = useState(true);
    const [newVideoNameTemp, setNewVideoNameTemp] = useState("");
    const [newVideoDescriptionAllTemp, setNewVideoDescriptionAllTemp] =
        useState("");
    const [videoTempCategory, setTempVideoCategory] = useState("");

    const updatedRef = useRef(null);

    const handleEditClick = (i) => {
        if (videoWrapperRef.current[i]) {
            const newHeight = showEdit ? "auto" : "auto";
            videoWrapperRef.current[i].style.height = newHeight;
            const newDisplay = showEdit ? "column" : "row";
            videoWrapperRef.current[i].style.flexDirection = newDisplay;
            const newWidth = showEdit ? 80 : 40;
            videoBlockRef.current[i].style.width = newWidth + "%";
            const newMargin = showEdit ? "0 auto" : "5px";
            videoBlockRef.current[i].style.margin = newMargin;
            const newTextContent = showEdit ? "none" : "flex";
            videoTextRef.current[i].style.display = newTextContent;
        } else {
            videoWrapperRef.current[i].removeAttribute("style");
            videoBlockRef.current[i].removeAttribute("style");
            videoTextRef.current[i].removeAttribute("style");
        }
    };

    const handleCancel = (i) => {
        if (videoWrapperRef.current[i]) {
            videoWrapperRef.current[i].removeAttribute("style");
            videoBlockRef.current[i].removeAttribute("style");
            videoTextRef.current[i].removeAttribute("style");
        }
    };

    const submitNewVideoInfo = () => {
        try {
            async function updateData(videoNameAll) {
                const d = query(
                    collection(db, "videoForAll"),
                    where("videoName", "==", videoNameAll)
                );
                const docSnap = await getDocs(d);
                docSnap.forEach((doc) => {
                    try {
                        updateDoc(doc.ref, {
                            videoName: newVideoNameTemp,
                            videoCategory: videoTempCategory,
                            videoDescription: newVideoDescriptionAllTemp,
                        });
                        setVideoNameAll((prev) => {
                            const newState = [...prev];
                            newState[videoindex] = newVideoNameTemp;
                            return newState;
                        });
                        setVideoCategoryAll((prev) => {
                            const newState = [...prev];
                            newState[videoindex] = videoTempCategory;
                            return newState;
                        });
                        setVideoDiscriptionAll((prev) => {
                            const newState = [...prev];
                            newState[videoindex] = newVideoDescriptionAllTemp;
                            return newState;
                        });
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
            updateData(videoNameAll);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (videoNameAll === videoNameAll) {
            setNewVideoNameTemp(videoNameAll);
            setTempVideoCategory(videoCategoryAll);
        }
    }, [videoNameAll]);

    useEffect(() => {
        if (videoCategoryAll === videoCategoryAll) {
            setTempVideoCategory(videoCategoryAll);
        }
    }, []);
    useEffect(() => {
        if (videoDiscriptionAll === videoDiscriptionAll) {
            setNewVideoDescriptionAllTemp(videoDiscriptionAll);
            setTempVideoCategory(videoCategoryAll);
        }
    }, [videoDiscriptionAll]);

    return (
        <>
            {!showEdit ? (
                <EditVideoContent>
                    <p>變更標題</p>
                    <NewVideoName
                        html={`${newVideoNameTemp}`}
                        onChange={(e) => {
                            setNewVideoNameTemp(e.target.value);
                        }}
                    />
                    <p>變更分類</p>
                    <VideoDropDown
                        videoCategoryAll={videoCategoryAll}
                        setTempVideoCategory={setTempVideoCategory}
                        videoTempCategory={videoTempCategory}
                    />
                    <p>變更說明</p>
                    <NewVideoDescription
                        html={`${newVideoDescriptionAllTemp}`}
                        onChange={(e) => {
                            setNewVideoDescriptionAllTemp(e.target.value);
                        }}
                    />
                </EditVideoContent>
            ) : null}
            <ButtonWrapper>
                <CancelButton
                    showEdit={showEdit}
                    onClick={() => {
                        handleCancel(videoindex);
                        setShowEdit(!showEdit);
                    }}
                >
                    算了
                </CancelButton>
                <EditButton
                    showEdit={showEdit}
                    onClick={() => {
                        if (showEdit === false) {
                            submitNewVideoInfo();
                        }
                        setShowEdit(handleEditClick(videoindex));
                        setShowEdit(!showEdit);
                    }}
                >
                    {showEdit ? "編輯" : "儲存"}
                </EditButton>
            </ButtonWrapper>
        </>
    );
};
export default HandleEdit;

const EditVideoContent = styled.div`
    margin: 20px auto 20px auto;
    width: 80%;

    display: flex;
    flex-direction: column;
    gap: 15px;
    p {
        font-size: 1.3em;
        font-weight: 500;
    }
`;
const NewVideoName = styled(ContentEditable)`
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.primary_white};
    cursor: auto;
    border-radius: 5px;
    height: 50px;
    padding: 5px;
    display: flex;
    align-items: center;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        border: 1px solid ${(props) => props.theme.colors.highLight};
    }
`;
const NewVideoDescription = styled(ContentEditable)`
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.primary_white};
    cursor: auto;
    border-radius: 5px;
    height: auto;
    padding: 15px 5px;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        border: 1px solid ${(props) => props.theme.colors.highLight};
    }
`;
const ButtonWrapper = styled.div`
    margin: auto 15px 0 auto;
    display: flex;
    justify-content: flex-end;
    gap: 15px;
`;
const EditButton = styled.span`
    cursor: pointer;

    font-size: 0.8em;
    width: 60px;
    height: 40px;
    color: ${(props) =>
        props.showEdit
            ? props.theme.colors.primary_white
            : props.theme.colors.primary_Dark};
    outline: 1px solid
        ${(props) =>
            props.showEdit
                ? props.theme.colors.primary_white
                : props.theme.colors.none};
    background-color: ${(props) =>
        props.showEdit
            ? props.theme.colors.primary_Dark
            : props.theme.colors.highLight};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        transform: translateX(5px);
        transform: translateY(-5px);
        box-shadow: 5px 5px 0px 0px #a6a6a6;
    }
`;

const CancelButton = styled(EditButton)`
    display: ${(props) => (props.showEdit ? "none" : "flex")};
    background-color: ${(props) => props.theme.colors.primary_Dark};
    color: ${(props) => props.theme.colors.primary_white};
`;
