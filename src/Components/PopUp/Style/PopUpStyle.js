import styled from "styled-components";

const PopUpWrapper = styled.div`
    background-color: ${(props) => props.theme.colors.primary_white};
    width: 300px;
    min-height: 300px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 70px;
    transform: translate(-50%, 0);
    z-index: 3;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);

    label {
        min-height: 0;
        margin: 30px auto 5px auto;
    }
`;
const PopUpMask = styled.div`
    position: absolute;
    display: ${(props) => props.style.display};
    top: 0px;
    width: 100%;
    height: 100vh;
    background-color: #3939396d;
    filter: blur(8px);
    z-index: 2;
`;
const PopUpTitle = styled.p`
    color: ${(props) => props.theme.colors.primary_Dark};
    text-align: center;
    font-size: 2em;
    font-weight: 700;
    margin-top: 20px;
`;
const PopUpInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 10px;
    margin-top: 15px;
`;
const PopUpInput = styled.input`
    outline: none;
    width: 80%;
    height: 40px;
    border: 1px solid #dfdfdf;
    border-radius: 5px;
    padding: 10px;
    color: ${(props) => props.theme.colors.primary_Grey};
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        transform: translateX(5px);
        transform: translateY(-5px);
        box-shadow: 5px 5px 0px 0px #a6a6a6;
    }
`;
const PopUpPassword = styled(PopUpInput)`
    width: 80%;
`;
const PopUpButton = styled.div`
    width: 80%;
    height: 40px;
    background-color: ${(props) => props.theme.colors.highLight};
    border-radius: 5px;

    font-size: 1.5em;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        transform: translateX(5px);
        transform: translateY(-5px);
        box-shadow: 5px 5px 0px 0px #a6a6a6;
    }
`;
const PopUpIsLoggedIn = styled.div`
    align-items: center;
    width: 80%;
    height: 40px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.colors.primary_Grey};
    transition: color 0.4s;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        transform: translateX(5px);
        transform: translateY(-5px);
        box-shadow: 5px 5px 0px 0px #a6a6a6;
    }
`;
const PopUpMessage = styled.div`
    font-size: 14px;
    color: ${(prop) => prop.color};
    z-index: 3;
    margin-bottom: 15px;
`;
export {
    PopUpWrapper,
    PopUpMask,
    PopUpTitle,
    PopUpInput,
    PopUpPassword,
    PopUpInputWrapper,
    PopUpButton,
    PopUpIsLoggedIn,
    PopUpMessage,
};
