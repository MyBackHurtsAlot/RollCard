import styled from "styled-components";

const PopUp_Wrapper = styled.div`
    background-color: ${(props) => props.theme.colors.primary_white};
    width: 300px;
    height: 300px;
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
`;
const PopUp_Mask = styled.div`
    position: absolute;
    display: ${(props) => props.style.display};
    top: 0px;
    width: 100%;
    height: 100vh;
    background-color: #a6a6a635;
    filter: blur(8px);
    z-index: 2;
`;
const PopUp_Title = styled.p`
    color: ${(props) => props.theme.colors.primary_Dark};
    text-align: center;
    font-size: 2em;
    font-weight: 700;
    margin-top: 20px;
`;
const PopUp_Input_Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 10px;
    margin-top: 15px;
`;
const PopUp_Input = styled.input`
    outline: none;
    width: 80%;
    height: 40px;
    border: 1px solid #dfdfdf;
    border-radius: 5px;
    padding: 10px;
    color: ${(props) => props.theme.colors.primary_Grey};
`;
const PopUp_Password = styled(PopUp_Input)`
    width: 80%;
`;
const PopUp_Button = styled.div`
    width: 80%;
    height: 40px;
    background-color: ${(props) => props.theme.colors.primary_Grey};
    border-radius: 5px;
    transition: border-radius 0.4s;
    font-size: 1.5em;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
        border-radius: 10px;
    }
`;
const PopUp_isLoggedin = styled.div`
    align-items: center;
    color: ${(props) => props.theme.colors.primary_Grey};
    transition: color 0.4s;
    cursor: pointer;
    &:hover {
        color: ${(props) => props.theme.colors.primary_Dark};
    }
`;
const PopUp_Message = styled.div`
    font-size: 14px;
    color: ${(prop) => prop.color};
    z-index: 3;
    margin-bottom: 5px;
`;
export {
    PopUp_Wrapper,
    PopUp_Mask,
    PopUp_Title,
    PopUp_Input,
    PopUp_Password,
    PopUp_Input_Wrapper,
    PopUp_Button,
    PopUp_isLoggedin,
    PopUp_Message,
};
