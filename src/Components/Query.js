import React, { useState } from "react";

const Query = () => {
    const [a, setA] = useState("");

    const getA = () => {
        setA();
    };
    return { getA };
};

export default Query;
