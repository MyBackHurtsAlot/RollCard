import React, { useState, useContext } from "react";
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
                error.message === "Firebase: Error (auth/invalid-email)."
            ) {
                setPopMessage("信箱或密碼有誤");
            }
        }
    };
    return (
        <>
            <PopUp_Wrapper>
                <PopUp_Title>會員登入</PopUp_Title>
                <PopUp_Input_Wrapper>
                    <PopUp_Input
                        placeholder="E-mail"
                        type="input"
                        onChange={(e) => {
                            setCheckEmail(e.target.value);
                        }}
                        value={checkEmail}
                    ></PopUp_Input>
                    <PopUp_Password
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setCheckPassword(e.target.value);
                        }}
                        value={checkPassword}
                    ></PopUp_Password>
                </PopUp_Input_Wrapper>
                <PopUp_Button onClick={submitLogin}>登入</PopUp_Button>
                <PopUp_isLoggedin
                    onClick={() => {
                        setCurrentPage("SignUp");
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
