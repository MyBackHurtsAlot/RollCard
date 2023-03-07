import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import {
    PopUpWrapper,
    PopUpTitle,
    PopUpInput,
    PopUpPassword,
    PopUpInputWrapper,
    PopUpButton,
    PopUpisLoggedin,
    PopUpMessage,
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
    useEffect(() => {
        if (popMessage) {
            const timeoutId = setTimeout(() => {
                setPopMessage("");
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
    }, [popMessage]);

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
            navigate(`/member/profile/${uid}`);
            if (popMessage) {
                setPopMessage("");
            }
        } catch (error) {
            if (!registerEmail || !registerPassword) {
                setPopMessage("請輸入信箱及密碼");
            } else if (
                error.message === "Firebase: Error (auth/email-already-in-use)."
            ) {
                setPopMessage("信箱被用過啦");
            } else if ("Firebase: Error (auth/invalid-email).") {
                setPopMessage("請輸入正常的信箱");
            }
            console.log(error.message);
        }
    };
    const submiRegestByKeyboard = (e) => {
        if (e.key === "Enter") submitRegister();
    };
    return (
        <PopUpWrapper onKeyPress={submiRegestByKeyboard}>
            <PopUpTitle>註冊會員</PopUpTitle>
            <PopUpInputWrapper>
                <PopUpInput
                    type="input"
                    placeholder="請輸入信箱"
                    onChange={(e) => {
                        setRegisterEmail(e.target.value);
                    }}
                    value={registerEmail}
                ></PopUpInput>
                <PopUpPassword
                    type="password"
                    placeholder="請輸入密碼"
                    onChange={(e) => {
                        setRegisterPassword(e.target.value);
                    }}
                    value={registerPassword}
                ></PopUpPassword>
            </PopUpInputWrapper>
            <PopUpButton onClick={submitRegister}>註冊</PopUpButton>
            <PopUpisLoggedin
                onClick={() => {
                    setCurrentPage("Login");
                    setRegisterEmail("");
                    setRegisterPassword("");
                }}
            >
                我是會員
            </PopUpisLoggedin>
            <PopUpMessage color={popColor}>{popMessage}</PopUpMessage>
        </PopUpWrapper>
    );
};

export default SignUp;
