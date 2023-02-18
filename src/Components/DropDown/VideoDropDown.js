import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";

const VideoDropDown = ({
    videoTempCategory,
    setTempVideoCategory,
    videoCategoryAll,
}) => {
    const handleVideoDropDown = (options) => {
        setTempVideoCategory(options.value);
    };
    const options = [
        { value: "企業形象", label: "企業形象" },
        { value: "動畫", label: "動畫" },
        { value: "活動紀錄", label: "活動紀錄" },
        { value: "預告片", label: "預告片" },
        { value: "紀錄片", label: "紀錄片" },
        { value: "其他", label: "其他" },
    ];
    const placeholder = videoCategoryAll ? videoCategoryAll : "請選擇分類";
    console.log("from drop", videoTempCategory);
    return (
        <div>
            <Select
                options={options}
                classNamePrefix="react-select"
                styles={customStyles}
                placeholder={placeholder}
                onChange={handleVideoDropDown}
                menuPortalTarget={document.body}
                captureMenuScroll={false}
                menuShouldScrollIntoView={true}
            />
        </div>
    );
};

export default VideoDropDown;
const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderRadius: "10px ",
        borderColor: state.isFocused ? "none" : "none",
        // outline: state.isFocused ? "1px solid #F2B705" : "none",
        color: state.isSelected ? "#F2B705" : "#a6a6a6",
        backgroundColor: state.isSelected ? "#0d0d0d" : "#f2f2f2",
        backgroundColor: state.isFocused ? "#f2f2f2" : "#0d0d0d",
        padding: 10,
        marginTop: 5,
    }),

    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: "none",
        color: "#f2f2f2",
        // borderColor: state.isOpen ? "none" : "none",
        boxShadow: "none",
        border: "1px solid #a6a6a6",
        "&:hover": {
            border: "1px solid #F2B70570",
        },
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";
        const color = "#a6a6a6";
        return { ...provided, opacity, transition, color };
    },
    container: () => ({
        width: "100%",
    }),
    menu: () => ({
        width: "100%",
        maxHeight: 120,
        overflowY: "auto",
    }),
    menuList: () => ({
        color: "#f2f2f2",
        backgroundColor: "${(props) => props.theme.colors.primary_white}",
    }),
};
