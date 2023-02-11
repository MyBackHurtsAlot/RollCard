import React from "react";
import styled from "styled-components";

const Nav = () => {
    return (
        <Nav_Wrapper>
            <Nav_Left_Wrapper>
                <Nav_Left_Title>
                    你和團隊的
                    <br />
                    線上作品集
                </Nav_Left_Title>
                <Nav_Left_Role>乙方</Nav_Left_Role>
                {/* 有時間的話做跑馬 */}
            </Nav_Left_Wrapper>
            <Nav_Right_Wrapper>
                <Nav_Right_Role>甲方</Nav_Right_Role>
                <Nav_Right_Title>
                    無須登入
                    <br />
                    直接聯繫
                </Nav_Right_Title>
            </Nav_Right_Wrapper>
        </Nav_Wrapper>
    );
};

export default Nav;

//Styled Component
const Nav_Wrapper = styled.nav`
    width: 100%;
    height: 400px;
    /* padding: 0 10%; */
    background-color: ${(props) => props.theme.colors.primary_white};
    display: flex;
    &:hover {
        /* background-color: #91919140; */
        /* filter: blur(2px); */
    }
`;
const Nav_Left_Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    height: 100%;
    /* background-color: #006dcc; */
`;
const Nav_Left_Role = styled.div`
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
`;
const Nav_Left_Title = styled.div`
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
const Nav_Left_Content = styled.div`
    color: ${(props) => props.theme.colors.primary_Dark};
    font-size: 16px;
`;
const Nav_Right_Role = styled(Nav_Left_Role)`
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
const Nav_Right_Title = styled(Nav_Left_Title)`
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
const Nav_Right_Wrapper_Background = styled.div`
    background-color: ${(props) => props.theme.colors.primary_Dark};
    width: 100%;
`;
const Nav_Right_Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    height: 100%;
    /* background-color: #6bafeb; */
    background-color: ${(props) => props.theme.colors.primary_Dark};
`;
