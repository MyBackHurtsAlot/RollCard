import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import {
    PopUp_Wrapper,
    PopUp_Title,
    PopUp_Input,
    PopUp_Password,
    PopUp_Input_Wrapper,
    PopUp_Button,
    PopUp_isLoggedin,
    PopUp_Message,
} from "./Style/PopUpStyle";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase-config";

const SignUp = ({
    setCurrentPage,
    registerEmail,
    setRegisterEmail,
    registerPassword,
    setRegisterPassword,
    setDisplay,
    setPopMessage,
    popMessage,
    setPopColor,
    popColor,
}) => {
    const navigate = useNavigate();
    const submitRegister = async () => {
        try {
            await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            setRegisterEmail("");
            setRegisterPassword("");
            setCurrentPage("");
            setDisplay("none");
            navigate("/member");
        } catch (error) {
            if (!registerEmail || !registerPassword) {
                setPopMessage("請輸入信箱及密碼");
            } else if (error.message === "auth/email-already-in-use") {
                setPopMessage("請輸入信箱及密碼");
            }
        }
    };
    return (
        <PopUp_Wrapper>
            <PopUp_Title>註冊會員</PopUp_Title>
            <PopUp_Input_Wrapper>
                <PopUp_Input
                    type="input"
                    placeholder="E-mail"
                    onChange={(e) => {
                        setRegisterEmail(e.target.value);
                    }}
                    value={registerEmail}
                ></PopUp_Input>
                <PopUp_Password
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                        setRegisterPassword(e.target.value);
                    }}
                    value={registerPassword}
                ></PopUp_Password>
            </PopUp_Input_Wrapper>
            <PopUp_Button onClick={submitRegister}>註冊</PopUp_Button>
            <PopUp_isLoggedin
                onClick={() => {
                    setCurrentPage("Login");
                }}
            >
                我是會員
            </PopUp_isLoggedin>
            <PopUp_Message color={popColor}>{popMessage}</PopUp_Message>
        </PopUp_Wrapper>
    );
};

export default SignUp;
