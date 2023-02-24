import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { NavLink, useParams } from "react-router-dom";

const ThisMemberCategory = ({
    memberVideoAll,
    videoNameAll,
    videoCategoryAll,
    setShowCategory,
    memberSelectedCategory,
}) => {
    memberVideoAll.map((video) => {
        console.log(video);
    });

    return (
        <>
            <ThisMemberCategoryWrapper>
                <Exit
                    onClick={() => {
                        setShowCategory(false);
                    }}
                >
                    離開
                </Exit>
            </ThisMemberCategoryWrapper>
        </>
    );
};

export default ThisMemberCategory;

const ThisMemberCategoryWrapper = styled.div`
    width: 60%;
    height: 600px;
    outline: 1px solid red;
    position: relative;
    margin-left: 33%;
`;
const Exit = styled.div``;
