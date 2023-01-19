import React, { useEffect, useContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { auth } from "../../../Firebase-config";
import styled from "styled-components";
import Header from "../../../Components/Header/Index";
import Profile from "./Profile";

const MemberEditPage = () => {
    return (
        <>
            <Header />
            <Profile />
        </>
    );
};

export default MemberEditPage;

//Styled
