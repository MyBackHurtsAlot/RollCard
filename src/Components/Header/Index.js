import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase-config";
import Login from "../PopUp/Login";
import SignUp from "../PopUp/SignUp";
import { PopUpMask } from "../PopUp/Style/PopUpStyle";
import { UserContext } from "../../Context/userContext";
import { device } from "../Rwd";
const Header = ({ setSelectedCategory }) => {
    const [display, setDisplay] = useState("none");
    const [currentPage, setCurrentPage] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [checkEmail, setCheckEmail] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [popMessage, setPopMessage] = useState("");
    const [popColor, setPopColor] = useState("#aa0000");
    const [loggedIn, setLoggedIn] = useState(false);
    const [uid, setUid] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                return;
            }
            setLoggedIn(true);
            setUid(user.uid);
            setUser(user.uid);
            setShowMenu(true);
        });
    }, []);

    const navigate = useNavigate();
    const homePageHandler = () => {
        // setLoggedIn(false);
        navigate("/");
    };

    const logoutHandler = async () => {
        await signOut(auth);
        setLoggedIn(false);
        setUid(null);
        onAuthStateChanged(auth, () => {
            navigate("/");
            window.location.reload(false);
        });
    };

    return (
        <HeaderWrapper>
            <HeaderContainer>
                <HeaderContainerLogo
                    onClick={() => {
                        setSelectedCategory("");
                    }}
                >
                    <NavLink to="/"> Roll Card</NavLink>
                    <Outlet />
                </HeaderContainerLogo>
                {loggedIn === true ? (
                    <HeaderMenuContainer>
                        <HeaderMenuYourPage
                            onClick={() => {
                                setDisplay("none");
                            }}
                        >
                            <NavLink to={`/member/profile/${uid}`}>
                                你的頁面
                            </NavLink>
                        </HeaderMenuYourPage>
                        <HeaderMenuUpLoad
                            onClick={() => {
                                setDisplay("none");
                            }}
                        >
                            <NavLink to="/upload">上傳影片</NavLink>
                        </HeaderMenuUpLoad>
                        <HeaderMenuLogOut onClick={logoutHandler}>
                            登出
                        </HeaderMenuLogOut>
                    </HeaderMenuContainer>
                ) : (
                    <HeadercontainerLogin
                        onClick={() => {
                            setCurrentPage("Login");
                            setDisplay("flex");
                            setShowMenu(false);
                        }}
                    >
                        登入
                    </HeadercontainerLogin>
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
            </HeaderContainer>

            <PopUpMask
                style={{ display: display }}
                onClick={() => {
                    setCurrentPage("");
                    setDisplay("none");
                    setShowMenu(false);
                }}
            ></PopUpMask>
        </HeaderWrapper>
    );
};

export default Header;

// Styled Component
const HeaderWrapper = styled.header`
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
    z-index: 10;
`;

const HeaderContainer = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media ${device.smallest} {
        flex-direction: column;
        gap: 10px;
    }
    @media ${device.mobile} {
        flex-direction: row;
    }
    @media ${device.tablet} {
        flex-direction: row;
    }
    @media ${device.desktop} {
        flex-direction: row;
    }
`;
const HeaderContainerLogo = styled.div`
    cursor: pointer;
    font-family: "Ubuntu Condensed";
    letter-spacing: 1px;
    font-size: 1.4em;
    a {
        color: ${(props) => props.theme.colors.highLight};
    }
    transition: letter-spacing 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
    &:hover {
        letter-spacing: 1.5px;
    }
`;
const HeadercontainerLogin = styled(HeaderContainerLogo)`
    color: ${(props) => props.theme.colors.primary_white};
    font-size: 1em;
    font-weight: 200;
`;
const HeadercontainerMember = styled(HeadercontainerLogin)``;

const HeaderMenuContainer = styled.div`
    display: flex;

    align-items: center;

    gap: 20px;
    z-index: 4;
    a {
        color: ${(props) => props.theme.colors.primary_white};
    }
`;
const HeaderMenuYourPage = styled(HeadercontainerLogin)``;
const HeaderMenuUpLoad = styled(HeadercontainerLogin)``;
const HeaderMenuLogOut = styled(HeadercontainerLogin)``;
