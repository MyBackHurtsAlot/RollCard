import React from "react";
import styled from "styled-components";
import Header from "../../Components/Header/Index";
import Nav from "./Nav";

const HomePage = () => {
    return (
        <>
            <Header />
            <Main>
                <Nav></Nav>
                <Section></Section>
            </Main>
        </>
    );
};

export default HomePage;

//Styled Component
const Main = styled.main`
    width: 100%;
    margin-top: 66px;
`;
const Section = styled.section`
    width: 80%;
    /* background-color: coral; */
    height: 900px;
    margin: 0 auto;
`;
