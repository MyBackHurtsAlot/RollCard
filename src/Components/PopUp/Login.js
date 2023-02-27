import React, { useState, useContext, useEffect } from "react";
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
            // console.log(userData.user.uid);
            // setUser(userData.user.uid);
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
            <PopUp_Wrapper onKeyPress={submitLoginByKeyboard}>
                <PopUp_Title>會員登入</PopUp_Title>
                <PopUp_Input_Wrapper>
                    <PopUp_Input
                        placeholder="請輸入信箱"
                        type="input"
                        onChange={(e) => {
                            setCheckEmail(e.target.value);
                        }}
                        // onClick={setPopMessage("")}
                        value={checkEmail}
                    ></PopUp_Input>
                    <PopUp_Password
                        type="password"
                        placeholder="請輸入密碼"
                        onChange={(e) => {
                            setCheckPassword(e.target.value);
                        }}
                        // onClick={setPopMessage("")}
                        value={checkPassword}
                    ></PopUp_Password>
                </PopUp_Input_Wrapper>
                <PopUp_Button onClick={submitLogin}>登入</PopUp_Button>
                <PopUp_isLoggedin
                    onClick={() => {
                        setCurrentPage("SignUp");
                        setCheckEmail("");
                        setCheckPassword("");
                    }}
                >
                    我不是會員
                </PopUp_isLoggedin>
                <PopUp_Message color={popColor}>{popMessage}</PopUp_Message>
            </PopUp_Wrapper>
        </>
    );
};

export default SignUp;
