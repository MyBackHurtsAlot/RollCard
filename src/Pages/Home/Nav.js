import React from "react";
import styled from "styled-components";
import { device } from "../../Components/Rwd";
const Nav = () => {
    return (
        <NavWrapper>
            <NavLeftWrapper>
                <NavLeftTitle>
                    你和團隊的
                    <br />
                    線上作品集
                </NavLeftTitle>
                <NavLeftRole>乙方</NavLeftRole>
            </NavLeftWrapper>
            <NavRightWrapper>
                <NavRightRole>甲方</NavRightRole>
                <NavRightTitle>
                    無須登入
                    <br />
                    直接聯繫
                </NavRightTitle>
            </NavRightWrapper>
        </NavWrapper>
    );
};

export default Nav;

//Styled Component
const NavWrapper = styled.nav`
    width: 100%;
    height: 500px;
    /* padding: 0 10%; */
    background-color: ${(props) => props.theme.colors.primary_white};
    display: flex;
    @media ${device.smallest} {
        flex-direction: column;
    }

    @media ${device.mobile} {
        flex-direction: column;
    }
    @media ${device.tablet} {
        flex-direction: row;
    }
    @media ${device.desktop} {
        flex-direction: row;
    }
`;
const NavLeftWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    height: 100%;
    /* background-color: #006dcc; */
    @media ${device.smallest} {
        width: 100%;
    }
    @media ${device.mobile} {
        width: 100%;
    }
    @media ${device.tablet} {
        width: 50%;
    }
    @media ${device.desktop} {
        width: 50%;
    }
`;
const NavLeftRole = styled.div`
    color: ${(props) => props.theme.colors.primary_Dark};
    display: table-cell;
    vertical-align: text-top;
    font-size: 150px;
    font-weight: 500;
    text-align: left;
    -webkit-text-stroke: 1px;
    -webkit-text-fill-color: transparent;
    animation: slideInFromBottom 0.5s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    opacity: 100;

    @keyframes slideInFromBottom {
        from {
            transform: translateY(10%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 100;
        }
    }
    @media ${device.smallest} {
        font-size: 90px;
    }
    @media ${device.mobile} {
        font-size: 90px;
    }
    @media ${device.tablet} {
        font-size: 150px;
    }
    @media ${device.desktop} {
        font-size: 150px;
    }
`;
const NavLeftTitle = styled.div`
    color: ${(props) => props.theme.colors.primary_Dark};
    font-size: 64px;
    font-weight: 900;
    text-align: end;
    animation: slideInFromRight 0.5s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    opacity: 100;

    @keyframes slideInFromRight {
        from {
            transform: translateX(10%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 100;
        }
    }
`;
const NavLeftContent = styled.div`
    color: ${(props) => props.theme.colors.primary_Dark};
    font-size: 16px;
`;
const NavRightRole = styled(NavLeftRole)`
    color: ${(props) => props.theme.colors.primary_white};
    text-align: end;
    animation: slideInFromTop 0.5s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    opacity: 100;

    @keyframes slideInFromTop {
        from {
            transform: translateY(-15%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 100;
        }
    }
`;
const NavRightTitle = styled(NavLeftTitle)`
    color: ${(props) => props.theme.colors.primary_white};
    text-align: start;
    animation: slideInFromLeft 0.5s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    opacity: 100;

    @keyframes slideInFromLeft {
        from {
            transform: translateX(-10%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 100;
        }
    }
`;

const NavRightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.primary_Dark};
    @media ${device.smallest} {
        width: 100%;
    }
    @media ${device.mobile} {
        width: 100%;
    }
    @media ${device.tablet} {
        width: 50%;
    }
    @media ${device.desktop} {
        width: 50%;
    }
`;
