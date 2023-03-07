import React, { useState, useContext, useEffect } from "react";
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
import { UserContext } from "../../Context/userContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase-config";

const SignUp = ({
    setCurrentPage,
    setCheckEmail,
    checkEmail,
    setCheckPassword,
    checkPassword,
    setDisplay,
    setPopMessage,
    popMessage,
    setPopColor,
    popColor,
}) => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        if (popMessage) {
            const timeoutId = setTimeout(() => {
                setPopMessage("");
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
    }, [popMessage]);

    const submitLogin = async () => {
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                checkEmail,
                checkPassword
            );
            setCurrentPage("");
            setDisplay("none");
            navigate("/");
            sessionStorage.setItem(
                "Auth Token",
                response._tokenResponse.refreshToken
            );
        } catch (error) {
            if (!checkEmail || !checkPassword) {
                setPopMessage("請輸入信箱及密碼");
            } else if (
                error.message === "Firebase: Error (auth/wrong-password)." ||
                "Firebase: Error (auth/invalid-email)."
            ) {
                setPopMessage("信箱或密碼有誤");
            }
        }
    };
    const submitLoginByKeyboard = (e) => {
        if (e.key === "Enter") submitLogin();
    };
    return (
        <>
            <PopUpWrapper onKeyPress={submitLoginByKeyboard}>
                <PopUpTitle>會員登入</PopUpTitle>
                <PopUpInputWrapper>
                    <PopUpInput
                        placeholder="請輸入信箱"
                        type="input"
                        onChange={(e) => {
                            setCheckEmail(e.target.value);
                        }}
                        value={checkEmail}
                    ></PopUpInput>
                    <PopUpPassword
                        type="password"
                        placeholder="請輸入密碼"
                        onChange={(e) => {
                            setCheckPassword(e.target.value);
                        }}
                        // onClick={setPopMessage("")}
                        value={checkPassword}
                    ></PopUpPassword>
                </PopUpInputWrapper>
                <PopUpButton onClick={submitLogin}>登入</PopUpButton>
                <PopUpisLoggedin
                    onClick={() => {
                        setCurrentPage("SignUp");
                        setCheckEmail("");
                        setCheckPassword("");
                    }}
                >
                    我不是會員
                </PopUpisLoggedin>
                <PopUpMessage color={popColor}>{popMessage}</PopUpMessage>
            </PopUpWrapper>
        </>
    );
};

export default SignUp;
