import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import parse from "html-react-parser";

export const HandleDescription = (videoDescription) => {
    const measureRef = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const [showExpand, setShowExpand] = useState(false);
    useEffect(() => {
        const descriptionHeight = measureRef.current.scrollHeight;
        if (videoDescription) {
            if (descriptionHeight > 100) {
                setShowExpand(true);
            }
        }
    }, [videoDescription]);

    const handleDescripiton = () => {
        setShowExpand(false);

        const descriptionHeight = measureRef.current.scrollHeight;
        descriptionHeight > 100 ? setExpanded(true) : setExpanded(false);
    };
    return (
        <>
            <Member_Section_Description
                ref={measureRef}
                expanded={expanded}
                showExpand={showExpand}
                onClick={handleDescripiton}
            >
                {parse(videoDescription.videoDescription)}
            </Member_Section_Description>
        </>
    );
};

const Member_Section_Description = styled.div`
    width: 100%;
    height: ${(props) => (props.expanded ? "auto" : "100px")};
    overflow: hidden;
    line-height: 1.5em;
    background-color: #404040;
    border-radius: 5px;
    padding: 10px;
    position: relative;
    cursor: ${(props) => (!props.showExpand ? "auto" : "pointer")};
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);

    ${(props) =>
        props.showExpand &&
        css`
            &:hover {
                background-color: rgba(0, 0, 0, 0.5);
                color: #4d4d4d;

                transform: translateX(5px, -5px);
                box-shadow: 5px 5px 0px 0px #a6a6a6;

                ::after {
                    content: "展開全文";
                    color: #f2f2f2;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        `};
`;
