import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const ToOtherVideos = ({ memberVideo }) => {
    const navigate = useNavigate();

    return (
        <div>
            {memberVideo.map((url) => {
                const splitUrl = url.split("&token=")[1];
                return (
                    <VideoContainer key={uuidv4()}>
                        <video
                            src={url}
                            onClick={() => {
                                navigate(`/watch/${splitUrl}`);
                            }}
                        />
                    </VideoContainer>
                );
            })}
        </div>
    );
};

export default ToOtherVideos;

const VideoContainer = styled.div`
    width: 100%;
    /* height: 324px; */
    /* outline: 1px solid red; */
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
        }
    }
    img {
        width: 50px;
    }
`;
