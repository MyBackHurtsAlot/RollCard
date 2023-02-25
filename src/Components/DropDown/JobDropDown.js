import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { UserInfoContext } from "../../Context/userContext";
const JobDropDown = ({ userJobTemp, setUserJobTemp, userJob }) => {
    const handleVideoDropDown = (options) => {
        setUserJobTemp(options.value);
    };
    const options = [
        { value: "工作室", label: "工作室" },
        { value: "導演", label: "導演" },
        { value: "攝影師", label: "攝影師" },
        { value: "剪接師", label: "剪接師" },
        { value: "調光師", label: "調光師" },
        { value: "動畫師", label: "動畫師" },
        { value: "演員", label: "演員" },
        { value: "其他", label: "其他" },
    ];

    const placeholder = userJob ? userJob : "你的職業";
    return (
        <>
            <Select
                options={options}
                classNamePrefix="react-select"
                styles={customStyles}
                placeholder={placeholder}
                onChange={handleVideoDropDown}
                menuPortalTarget={document.body}
                captureMenuScroll={false}
                menuShouldScrollIntoView={true}
                // menuPortal={true}
            />
        </>
    );
};

export default JobDropDown;

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderRadius: "10px ",
        borderColor: state.isFocused ? "none" : "none",
        // outline: state.isFocused ? "1px solid #F2B705" : "none",
        color: state.isSelected ? "#F2B705" : "#a6a6a6",
        backgroundColor: state.isSelected ? "#0d0d0d" : "#f2f2f2",
        backgroundColor: state.isFocused ? "#0d0d0d" : "#f2f2f2",
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
        maxHeight: 130,
        overflowY: "auto",
        backgroundColor: "#f2f2f2",

        // backgroundColor: "blue",
    }),
    menuList: () => ({
        color: "#f2f2f2",
        backgroundColor: "${(props) => props.theme.colors.primary_white}",
    }),
};
