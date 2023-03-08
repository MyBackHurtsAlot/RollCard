import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import styled, { css } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import HandleEdit from "./HandleEdit";

const MemberEditVideo = ({
    videoCategoryAll,
    memberVideoAll,
    videoNameAll,
    videoDiscriptionAll,
    setVideoNameAll,
    setVideoCategoryAll,
    setVideoDiscriptionAll,
}) => {
    const navigate = useNavigate();
    const videoWrapperRef = useRef([]);
    const videoBlockRef = useRef([]);
    const videoTextRef = useRef([]);

    return (
        <>
            <MemberEditPageVideoWrapper>
                {memberVideoAll.map((url, index) => {
                    const splitUrl = url.split("&token=")[1];
                    return (
                        <EditVideoWrapper
                            key={uuidv4()}
                            videoindex={index}
                            ref={(el) => (videoWrapperRef.current[index] = el)}
                        >
                            <video
                                src={url}
                                videoindex={index}
                                ref={(el) =>
                                    (videoBlockRef.current[index] = el)
                                }
                                onClick={() => {
                                    navigate(`/watch/${splitUrl}`);
                                }}
                            />
                            <VideoTextWrapper
                                videoindex={index}
                                ref={(el) => (videoTextRef.current[index] = el)}
                            >
                                <p>{parse(`${videoNameAll[index]}`)}</p>
                                <p> {parse(`${videoCategoryAll[index]}`)}</p>

                                <div>
                                    {parse(`${videoDiscriptionAll[index]}`)}
                                </div>
                            </VideoTextWrapper>
                            <HandleEdit
                                videoWrapperRef={videoWrapperRef}
                                videoBlockRef={videoBlockRef}
                                videoTextRef={videoTextRef}
                                videoNameAll={videoNameAll[index]}
                                videoCategoryAll={videoCategoryAll[index]}
                                videoDiscriptionAll={videoDiscriptionAll[index]}
                                videoindex={index}
                                setVideoNameAll={setVideoNameAll}
                                setVideoCategoryAll={setVideoCategoryAll}
                                setVideoDiscriptionAll={setVideoDiscriptionAll}
                            />
                        </EditVideoWrapper>
                    );
                })}
            </MemberEditPageVideoWrapper>
        </>
    );
};

export default MemberEditVideo;
const MemberEditPageVideoWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 70px;
    position: relative;
    z-index: 1;
    border-radius: 5px;
    gap: 15px;

    video {
        cursor: pointer;
        width: 30%;
        border-radius: 5px;
        aspect-ratio: 16/9;
        margin: 5px;
        z-index: 2;
        transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        &:hover {
            transform: translateX(5px);
            transform: translateY(-5px);
            box-shadow: 5px 5px 0px 0px #a6a6a6;
        }
    }
`;

const EditVideoWrapper = styled.div`
    display: flex;
    padding: 15px 0 15px 0;
    border-radius: 5px;
    width: 100%;
    height: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    outline: 1px solid ${(props) => props.theme.colors.primary_white};
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        transform: translateX(5px);
        transform: translateY(-5px);
        box-shadow: 5px 5px 0px 0px #a6a6a6;
    }
`;
const VideoTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    gap: 15px;
    line-height: 23px;

    & > p:first-child {
        font-size: 24px;
        font-weight: 700;
        border-bottom: 1px solid #f2f2f270;
        padding-bottom: 10px;
    }
    & > p:nth-child(2) {
        font-size: 18;
        font-weight: 500;
        border-bottom: 1px solid #f2f2f270;
        padding-bottom: 10px;
    }
`;
