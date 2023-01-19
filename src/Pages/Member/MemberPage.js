import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header/Index";
import { UserContext } from "../../Context/userContext";

const MemberPage = () => {
    const { user, setUser } = useContext(UserContext);
    console.log("mmm" + user);
    return (
        <div>
            <Header />
            <Profile>
                {/* <NavLink to="/member">
                    <Profile_Edit_Button>編輯</Profile_Edit_Button>
                </NavLink> */}
            </Profile>
        </div>
    );
};

export default MemberPage;

//Style
const Profile = styled.nav`
    position: relative;
    width: 100%;
    height: 400px;
    margin: 66px auto 0 auto;
    color: ${(props) => props.theme.colors.primary_Dark};
    background-color: ${(props) => props.theme.colors.primary_white};
`;
const Profile_Edit_Button = styled.div`
    position: absolute;
    font-size: 14px;
    top: 2%;
    right: 1%;
    width: 60px;
    height: 50px;
    letter-spacing: 3px;
    border-radius: 87% 13% 92% 8% / 30% 70% 30% 70%;
    transition: border-radius 0.4s cubic-bezier(0.42, 0, 0.58, 1);
    color: ${(props) => props.theme.colors.primary_Grey};
    background-color: ${(props) => props.theme.colors.highLight};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
        border-radius: 52% 48% 17% 83% / 51% 21% 79% 49%;
    }
`;
