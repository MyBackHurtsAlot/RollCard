import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase-config";
import Login from "../PopUp/Login";
import SignUp from "../PopUp/SignUp";
import { PopUp_Mask } from "../PopUp/Style/PopUpStyle";
import { UserContext } from "../../Context/userContext";

const Header = () => {
    const [display, setDisplay] = useState("none");
    const [currentPage, setCurrentPage] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [checkEmail, setCheckEmail] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [popMessage, setPopMessage] = useState("");
    const [popColor, setPopColor] = useState("#aa0000");
    const [loggedIn, setLoggedIn] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const [uid, setUid] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/");
            } else {
                setLoggedIn(true);
                setUid(user.uid);
                setUser(user.uid);
                // console.log(uid);
                //console.log("111", user);
            }
        });
    }, []);
    // useEffect(() => {
    //     onAuthStateChanged(auth, (currentUser) => {
    //         if (currentUser) {
    //         }
    //     });
    // }, []);

    const navigate = useNavigate();
    const homePageHandler = () => {
        // setLoggedIn(false);
        navigate("/");
    };

    const logoutHandler = async () => {
        await signOut(auth);
        setLoggedIn(false);
        setUid(null);
        // setUser({});
        onAuthStateChanged(auth, () => {
            navigate("/");
        });
    };

    // const menuHanlder = () => {
    //     setShowMenu(true);
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! NAVIGATE !!!!!!!!!!!!!!!!!!
    //     // navigate(`/memberPage/${uid}`);
    //     // console.log(uid);
    // };
    // console.log("o", uid);
    return (
        <Header_Wrapper>
            <Header_Container>
                <Header_Container_Logo onClick={homePageHandler}>
                    Roll Card
                </Header_Container_Logo>
                {loggedIn === true ? (
                    <Header_container_Member
                        onClick={() => {
                            setDisplay("block");
                            setShowMenu(true);
                        }}
                    >
                        會員中心
                    </Header_container_Member>
                ) : (
                    <Header_container_Login
                        onClick={() => {
                            setCurrentPage("Login");
                            setDisplay("block");
                        }}
                    >
                        登入
                    </Header_container_Login>
                )}

                {currentPage === "Login" && (
                    <Login
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        setCheckEmail={setCheckEmail}
                        checkEmail={checkEmail}
                        setCheckPassword={setCheckPassword}
                        checkPassword={checkPassword}
                        setDisplay={setDisplay}
                        setPopMessage={setPopMessage}
                        popMessage={popMessage}
                        setPopColor={setPopColor}
                        popColor={popColor}
                    />
                )}
                {currentPage === "SignUp" && (
                    <SignUp
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        setRegisterEmail={setRegisterEmail}
                        registerEmail={registerEmail}
                        setRegisterPassword={setRegisterPassword}
                        registerPassword={registerPassword}
                        setDisplay={setDisplay}
                        setPopMessage={setPopMessage}
                        popMessage={popMessage}
                        setPopColor={setPopColor}
                        popColor={popColor}
                    />
                )}
            </Header_Container>
            {showMenu === true && (
                <Header_menu_container>
                    <Header_menu_YourPage
                        onClick={() => {
                            navigate(`/member/profile/${uid}`);
                        }}
                    >
                        你的頁面
                    </Header_menu_YourPage>
                    <Header_menu_UpLoad>上傳影片</Header_menu_UpLoad>
                    <Header_menu_LogOut onClick={logoutHandler}>
                        登出
                    </Header_menu_LogOut>
                </Header_menu_container>
            )}

            <PopUp_Mask
                style={{ display: display }}
                onClick={() => {
                    setCurrentPage("");
                    setDisplay("none");
                    setShowMenu(false);
                }}
            ></PopUp_Mask>
        </Header_Wrapper>
    );
};

export default Header;

// Styled Component
const Header_Wrapper = styled.header`
    width: 100%;
    background-color: #0d0d0deb;
    border-bottom: 1px solid #404040d1;
    position: fixed;
    top: 0;
    left: 0;

    height: 66px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Header_Container = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Header_Container_Logo = styled.div`
    font-family: "Ubuntu Condensed";
    color: ${(props) => props.theme.colors.highLight};
    letter-spacing: 1px;
    font-size: 1.4em;
    cursor: pointer;
    transition: letter-spacing 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
    &:hover {
        letter-spacing: 1.5px;
    }
`;
const Header_container_Login = styled(Header_Container_Logo)`
    color: ${(props) => props.theme.colors.primary_white};
    font-size: 1em;
    font-weight: 200;
`;
const Header_container_Member = styled(Header_container_Login)`
    display: block;
`;

const Header_menu_container = styled.div`
    width: 152px;
    height: 136px;
    border-radius: 5px;
    position: absolute;
    right: 5%;
    top: 66px;
    background-color: ${(props) => props.theme.colors.primary_Grey};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    z-index: 4;
`;
const Header_menu_YourPage = styled(Header_container_Login)`
    display: block;
`;
const Header_menu_UpLoad = styled(Header_container_Login)`
    display: block;
`;
const Header_menu_LogOut = styled(Header_container_Login)`
    display: block;
`;
