import React, { useRef, useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";

const SendEmail = ({
    setSendEmail,
    currentMember,
    currentMemberName,
    currentMemberEmail,
}) => {
    const form = useRef();
    const autoHeight = useRef();
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_mmn46u4",
                "template_671yu15",
                form.current,
                "DPVmx_zii6isvserJ"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    if (result.text) {
                        setShowMessage(true);
                        setMessage("成功寄出，感謝你的聯絡");
                        setTimeout(() => {
                            setSendEmail(false);
                        }, 1000);
                    } else {
                        setMessage("出問題啦");
                        setShowMessage(true);
                    }
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };
    const handleHeight = (e) => {
        if (e.target.scrollHeight > 58) {
            autoHeight.current.style.height =
                autoHeight.current.scrollHeight + "px";
        }
    };
    return (
        <div>
            <FormWrapper ref={form} onSubmit={sendEmail}>
                <Notice>
                    以下資訊會寄到 {currentMemberName} 的信箱，感謝您的聯絡
                </Notice>
                <label>你的姓名／單位</label>
                <input type="text" name="clientName" />
                <label>你的 E-mail</label>
                <input type="email" name="clientEmail" />
                <label>～ 想說的話 ～</label>
                <textarea
                    name="message"
                    height="height"
                    onChange={handleHeight}
                    ref={autoHeight}
                />
                <ButtonWrapper>
                    <Cancel
                        onClick={() => {
                            setSendEmail(false);
                        }}
                    >
                        算了
                    </Cancel>
                    <Send type="submit" value="送出" />
                </ButtonWrapper>

                <input
                    type="hidden"
                    name="currentMemberName"
                    value={currentMemberName}
                />
                <input
                    type="hidden"
                    name="currentMemberEmail"
                    value={currentMemberEmail}
                />
                <Message>{message}</Message>
            </FormWrapper>
        </div>
    );
};

export default SendEmail;

// ============= Style ============

const FormWrapper = styled.form`
    /* margin: 90px auto auto auto; */
    width: 27%;
    min-height: 600px;
    border-radius: 15px;
    padding: 15px;
    background-color: #404040;
    display: flex;
    flex-direction: column;
    /* gap: 25px; */
    position: absolute;
    left: 32%;
    z-index: 2;
    animation: slideInFromLeft 0.5s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    opacity: 100;

    @keyframes slideInFromLeft {
        from {
            transform: translateX(-40%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 100;
        }
    }

    label {
        min-height: 0;
        margin: 30px auto 5px auto;
    }

    input,
    textarea {
        font-family: Noto Sans TC;
        font-weight: 200;
        margin: 0 auto 20px auto;
        padding: 10px;
        width: 90%;
        min-height: 40px;
        border-radius: 10px;
        border: none;
    }
`;

const ButtonWrapper = styled.div`
    margin: 0 auto;
    display: flex;
    width: 90%;
`;
const Send = styled.input`
    background-color: #404040;
    color: #f2f2f2;
    margin-top: 650px;
    width: 40% !important;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        transform: translateX(5px);
        transform: translateY(-5px);
        box-shadow: 5px 5px 0px 0px #a6a6a6;
    }
`;
const Cancel = styled.div`
    background-color: #404040;
    color: #f2f2f2;
    font-weight: 200;
    font-size: 14px;
    line-height: 0;
    width: 40%;
    margin: 0 auto 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        transform: translateX(5px);
        transform: translateY(-5px);
        box-shadow: 5px 5px 0px 0px #a6a6a6;
    }
`;
const Notice = styled.div`
    font-size: 16px;
    font-weight: 600;
    margin: 50px auto 10px auto;
    line-height: 30px;
`;
const Message = styled.div`
    /* width: 800px;
    height: 600px;
    margin: 0 auto;
    border-radius: 15px;
    position: absolute;
    left: 50%;

    color: #0d0d0d;
    z-index: 6;
    transform: translate(-50%);
    background-color: #f2f2f2; */
    color: #f2b705;
    margin: 0 auto;
`;
