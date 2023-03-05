import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { device } from "../../Components/Rwd";

const ThisMemberCategory = ({
    memberVideoAll,
    videoNameAll,
    videoCategoryAll,
    setShowCategory,
    memberSelectedCategory,
    videoEditorAll,
}) => {
    const navigate = useNavigate();

    const matchingVideos = videoCategoryAll.reduce((acc, cur, index) => {
        if (cur === memberSelectedCategory) {
            return [
                ...acc,
                {
                    videoName: videoNameAll[index],
                    memberVideo: memberVideoAll[index],
                    videoEditorAll: videoEditorAll[index],
                },
            ];
        }
        return acc;
    }, []);
    return (
        <>
            <ThisMemberCategoryWrapper>
                {matchingVideos.map((url, index) => {
                    const splitUrl = url.memberVideo.split("&token=")[1];
                    return (
                        <CatVideoCantainer
                            key={uuidv4()}
                            onClick={() => {
                                navigate(`/watch/${splitUrl}`);
                            }}
                        >
                            <video src={url.memberVideo} />
                            <InfoContainer>
                                <h1>{url.videoName}</h1>
                                <p>{videoEditorAll}</p>
                            </InfoContainer>
                        </CatVideoCantainer>
                    );
                })}
                <Exit
                    onClick={() => {
                        setShowCategory(false);
                    }}
                >
                    返回
                </Exit>
            </ThisMemberCategoryWrapper>
        </>
    );
};

export default ThisMemberCategory;

const ThisMemberCategoryWrapper = styled.div`
    width: 60%;
    height: 600px;
    position: relative;
    margin-left: 33%;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    position: relative;
    @media ${device.underDesktop} {
        width: 90%;
        min-height: 600px;
        margin: 15px auto;
        border-radius: 5px;
        background-color: ${(props) => props.theme.colors.primary_white};
    }
    @media ${device.underTablet} {
        display: none;
    }
`;
const CatVideoCantainer = styled.div`
    margin-top: 15px;
    width: 25%;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        color: ${(props) => props.theme.colors.highLight};
    }
    video {
        width: 100%;
        border-radius: 5px;
        aspect-ratio: 16/9;
        cursor: pointer;
        outline: 1px solid ${(props) => props.theme.colors.primary_white};
        transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
        &:hover {
            transform: translateX(5px);
            transform: translateY(-5px);
            box-shadow: 5px 5px 0px 0px #a6a6a6;
        }
        @media ${device.underDesktop} {
            outline: 1px solid ${(props) => props.theme.colors.primary_Grey};
        }
    }
    @media ${device.underDesktop} {
        /* border: 1px solid red; */
        width: 45%;
        padding: 15px;
    }
    /* @media ${device.underDesktop} {
        width: 90%;
        margin: 0 auto;
    } */
`;
const InfoContainer = styled.div`
    margin-top: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    h1 {
        font-size: 1.3em;
        font-weight: 700;
    }
    p {
        margin-top: 5px;
    }
    @media ${device.underDesktop} {
        h1 {
            font-weight: 500;
        }
        p {
            color: ${(props) => props.theme.colors.primary_Grey};
        }
        color: ${(props) => props.theme.colors.primary_Dark};
    }
`;
const Exit = styled.div`
    position: absolute;
    right: 0;
    top: -2em;
    font-size: 1.3em;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.highLight};
    color: ${(props) => props.theme.colors.primary_Dark};
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        transform: translateX(5px);
        transform: translateY(-5px);
        box-shadow: 5px 5px 0px 0px #a6a6a6;
    }
    @media ${device.underDesktop} {
        top: -1.6em;
        background-color: ${(props) => props.theme.colors.primary_white};
    }
`;
