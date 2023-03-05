import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { device } from "../../Components/Rwd";

const Category = ({
    selectedCategory,
    setSelectedCategory,
    showEnterprise,
    showAnimation,
    showEvent,
    showTrailer,
    showDocumentory,
    showOthers,
}) => {
    const videoRefDocument = useRef(null);
    const videoRefAnimation = useRef(null);
    const videoRefEvent = useRef(null);
    const videoRefTrailer = useRef(null);
    const videoRefDocumentory = useRef(null);
    const videoRefOthers = useRef(null);

    const HandleClick = (category) => {
        setSelectedCategory(category);
    };
    // ========================== handle Mouse ============================
    const handlEnterpriseMouseEnter = () => {
        if (videoRefDocument.current.paused) {
            videoRefDocument.current.play();
        }
    };

    const handlEnterpriseMouseLeave = () => {
        if (!videoRefDocument.current.paused) {
            videoRefDocument.current.pause();
        }
    };

    const handleAnimationMouseEnter = () => {
        if (videoRefAnimation.current.paused) {
            videoRefAnimation.current.play();
        }
    };

    const handleAnimationMouseLeave = () => {
        if (!videoRefAnimation.current.paused) {
            videoRefAnimation.current.pause();
        }
    };
    const handleEventMouseEnter = () => {
        if (videoRefEvent.current.paused) {
            videoRefEvent.current.play();
        }
    };

    const handleEventMouseLeave = () => {
        if (!videoRefEvent.current.paused) {
            videoRefEvent.current.pause();
        }
    };

    const handleTrailerMouseEnter = () => {
        if (videoRefTrailer.current.paused) {
            videoRefTrailer.current.play();
        }
    };

    const handleTrailerMouseLeave = () => {
        if (!videoRefTrailer.current.paused) {
            videoRefTrailer.current.pause();
        }
    };
    const handleDocumentoryMouseEnter = () => {
        if (videoRefDocumentory.current.paused) {
            videoRefDocumentory.current.play();
        }
    };

    const handleDocumentoryMouseLeave = () => {
        if (!videoRefDocumentory.current.paused) {
            videoRefDocumentory.current.pause();
        }
    };
    const handleOthersnMouseEnter = () => {
        if (videoRefOthers.current.paused) {
            videoRefOthers.current.play();
        }
    };

    const handleOthersnMouseLeave = () => {
        if (!videoRefOthers.current.paused) {
            videoRefOthers.current.pause();
        }
    };

    return (
        <div>
            <Category_Wrapper>
                <Cat_And_All_Wrapper>
                    {/* <Categories>分類</Categories> */}
                    <All onClick={() => HandleClick("")}>全部影片</All>
                </Cat_And_All_Wrapper>
                <Category_Enterprise
                    onClick={() => HandleClick("企業形象")}
                    onMouseEnter={handlEnterpriseMouseEnter}
                    onMouseLeave={handlEnterpriseMouseLeave}
                >
                    企業形象
                    <video src={showEnterprise} ref={videoRefDocument} muted />
                </Category_Enterprise>
                <Category_Animation
                    onClick={() => HandleClick("動畫")}
                    onMouseEnter={handleAnimationMouseEnter}
                    onMouseLeave={handleAnimationMouseLeave}
                >
                    動畫
                    <video src={showAnimation} ref={videoRefAnimation} muted />
                </Category_Animation>
                <Category_Event
                    onClick={() => HandleClick("活動紀錄")}
                    onMouseEnter={handleEventMouseEnter}
                    onMouseLeave={handleEventMouseLeave}
                >
                    活動紀錄
                    <video src={showEvent} ref={videoRefEvent} muted />
                </Category_Event>
                <Category_Trailer
                    onClick={() => HandleClick("預告片")}
                    onMouseEnter={handleTrailerMouseEnter}
                    onMouseLeave={handleTrailerMouseLeave}
                >
                    預告片
                    <video src={showTrailer} ref={videoRefTrailer} muted />
                </Category_Trailer>
                <Category_Documentory
                    onClick={() => HandleClick("紀錄片")}
                    onMouseEnter={handleDocumentoryMouseEnter}
                    onMouseLeave={handleDocumentoryMouseLeave}
                >
                    紀錄片
                    <video
                        src={showDocumentory}
                        ref={videoRefDocumentory}
                        muted
                    />
                </Category_Documentory>
                <Category_Others
                    onClick={() => HandleClick("其他")}
                    onMouseEnter={handleOthersnMouseEnter}
                    onMouseLeave={handleOthersnMouseLeave}
                >
                    其他
                    <video src={showOthers} ref={videoRefOthers} muted />
                </Category_Others>
            </Category_Wrapper>
        </div>
    );
};

export default Category;

//==================== Styles ====================
const Category_Wrapper = styled.section`
    margin-top: 20px;
    width: 100%;
    height: 500px;
    outline: 1px solid #a6a6a6;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px;
`;
const Cat_And_All_Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;
const Categories = styled.div`
    position: relative;
    width: 50%;
    padding: 10px;
    text-align: center;
    color: #a6a6a6;
    outline: 1px solid #a6a6a6;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);

    &:hover {
        color: #f2b705;
        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #91919140;
            filter: blur(2px);
        }
    }
`;
const All = styled(Categories)`
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        transform: translateX(5px);
        transform: translateY(-5px);
        box-shadow: 5px 5px 0px 0px #a6a6a6;
    }
`;

const Category_Enterprise = styled.div`
    position: relative;
    width: 30%;
    height: 150px;
    outline: 1px solid #a6a6a6;
    color: #ffffff;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 1px 1.3px 2px #404040;
    z-index: 1;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    animation: cats 0.5s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    @keyframes cats {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 100;
        }
    }
    video {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        object-fit: cover;
        border-radius: 5px;
    }
    &:hover {
        font-size: 4em;
        font-weight: 700;
        transform: translateX(5px);
        transform: translateY(-5px);
        box-shadow: 5px 5px 0px 0px #a6a6a6;
        color: #f2b705;
        video {
            filter: blur(2px);
        }
        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            filter: blur(2px);
        }
        @media (max-width: 1000px) {
            font-size: 2em;
        }
        @media ${device.underMobile} {
            font-size: 1.4em;
        }
    }
`;
const Category_Animation = styled(Category_Enterprise)``;
const Category_Event = styled(Category_Enterprise)``;
const Category_Trailer = styled(Category_Enterprise)``;
const Category_Documentory = styled(Category_Enterprise)``;
const Category_Others = styled(Category_Enterprise)``;
