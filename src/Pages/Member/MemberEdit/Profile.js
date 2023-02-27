import React, {
    useCallback,
    useContext,
    useEffect,
    useState,
    useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
    getFirestore,
    doc,
    setDoc,
    query,
    collection,
    getDocs,
    where,
    updateDoc,
} from "firebase/firestore";
import { auth } from "../../../Firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../Firebase-config";
import { db } from "../../../Firebase-config";
import { UserInfoContext, UserContext } from "../../../Context/userContext";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";
import img from "../../../Assets/SH.png";
import JobDropDown from "../../../Components/DropDown/JobDropDown";
import Card from "../../../Components/Card";

const Profile = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const {
        userName,
        setUserName,
        userJob,
        setUserJob,
        userAbout,
        setUserAbout,
        avator,
        setAvator,
        avatorPreview,
        setAvatorPreview,
    } = useContext(UserInfoContext);
    // console.log(userJob);
    const [userEmail, setUserEmail] = useState("");
    const [userNameTemp, setUserNameTemp] = useState("你的名字");
    const [userJobTemp, setUserJobTemp] = useState("");
    const [userAboutTemp, setUserAboutTemp] = useState("關於你");
    const [showCard, setShowCard] = useState(false);
    const userAboutRef = useRef();

    const submitUserInfo = async () => {
        try {
            await setDoc(doc(db, "User", user), {
                userUid: user,
                userEmail: userEmail,
                userName: userNameTemp,
                userJob: userJobTemp,
                userAbout: userAboutTemp,
            });
            async function updateData(user) {
                const d = query(
                    collection(db, "videoForAll"),
                    where("user", "==", user)
                );
                const docSnap = await getDocs(d);
                docSnap.forEach((doc) => {
                    try {
                        updateDoc(doc.ref, {
                            userName: userNameTemp,
                            userJob: userJobTemp,
                            userAbout: userAboutTemp,
                        });
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
            updateData(user);
            setShowCard(true);
            setTimeout(() => {
                setShowCard(false);
            }, 2500);
        } catch (error) {
            console.log(error);
        }
    };
    // console.log(userAboutTemp);
    const AvatorChangePreview = async (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const previewer = new FileReader();
            previewer.readAsDataURL(file);
            previewer.onloadend = () => {
                setAvator(file);
                setAvatorPreview(previewer.result);
            };
            try {
                const imageRef = ref(
                    storage,
                    `avators/${user}/${"avator" + user}`
                );
                if (imageRef) {
                    uploadBytes(imageRef, file).then(() => {
                        console.log("Upload");
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    useEffect(() => {
        const email = auth.currentUser;
        if (email) {
            setUserEmail(email.email);
        }
    }, [user]);

    // const uploadImage = () => {
    //     try {
    //         const imageRef = ref(storage, `avators/${user}/${"avator" + user}`);
    //         if (imageRef) {
    //             uploadBytes(imageRef, avator).then(() => {
    //                 console.log("Upload");
    //                 const img = getDownloadURL(imageRef);
    //                 console.log(img);
    //             });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    useEffect(() => {
        if (userNameTemp === "你的名字") {
            setUserNameTemp(userName);
            setUserJobTemp(userJob);
        }
    }, [userName]);

    useEffect(() => {
        if (userJob === userJob) {
            setUserJobTemp(userJob);
        }
    }, []);

    useEffect(() => {
        if (userAboutTemp === "關於你") {
            setUserAboutTemp(userAbout);
            setUserJobTemp(userJob);
        }
    }, [userAbout]);
    return (
        <Profile_Section>
            <Profile_Section_Left_Wrapper>
                <Profile_Section_Left_Avator_Container
                    avatorPreview={avatorPreview}
                >
                    <Profile_Section_Left_Avator_Uploader
                        type="file"
                        accept="image/*"
                        onChange={AvatorChangePreview}
                        // onChange={uploadImage}
                    />
                </Profile_Section_Left_Avator_Container>
                {/* <Profile_Section_Left_Avator_Uploader_Confirm
                // onClick={uploadImage}
                >
                    上傳
                </Profile_Section_Left_Avator_Uploader_Confirm> */}
            </Profile_Section_Left_Wrapper>
            <Profile_Section_Right_Wrapper>
                <p>你的名字</p>
                <Profile_Section_Right_Name_Editor
                    html={`${userNameTemp}`}
                    onChange={(e) => setUserNameTemp(e.target.value)}
                />
                <p>你的職業</p>
                <JobDropDown
                    userJobTemp={userJobTemp}
                    setUserJobTemp={setUserJobTemp}
                    userJob={userJob}
                />
                <p>關於你</p>
                <Profile_Section_Right_About_Editor
                    html={`${userAboutTemp}`}
                    onChange={(e) => setUserAboutTemp(e.target.value)}
                />

                {/* <Profile_Section_Right_Editor_Email html={`${userEmail}`} /> */}
                <Profile_Section_Right_Editor_Confirm onClick={submitUserInfo}>
                    儲存
                </Profile_Section_Right_Editor_Confirm>
            </Profile_Section_Right_Wrapper>
            {showCard ? <Card message={"上傳成功"} /> : ""}
        </Profile_Section>
    );
};

export default Profile;

// ============ Style ===========

export const Profile_Section = styled.section`
    position: relative;
    margin: 100px auto auto 3%;
    padding: 20px;
    width: 25%;
    min-height: 600px;
    border-radius: 5px;
    outline: 1px solid ${(props) => props.theme.colors.primary_Lightgrey};
    background-color: ${(props) => props.theme.colors.primary_white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;
export const Profile_Section_Left_Wrapper = styled.div`
    position: relative;
    width: 70%;
    border-radius: 20px;
    background-color: ${(props) => props.theme.colors.primary_Dark};
    display: flex;
    justify-content: center;
    align-items: top;
`;
export const Profile_Section_Left_Avator_Container = styled.label`
    width: 100%;
    height: 200px;
    border-radius: 15px;
    background-color: ${(props) => props.theme.colors.primary_white};
    background-image: ${(props) =>
        props.avatorPreview ? `url(${props.avatorPreview})` : `url(${img})`};
    color: ${(props) => props.theme.colors.primary_white};
    background-size: cover;
    background-position: center;
    cursor: pointer;
    &:hover::after {
        content: "人為什麼要拍照人活得好好的他為什麼要拍照 到底是為了要回味兒 回什麼味 回自己的味 回自己和大家生活的味 回經歷和體驗的味 回經歷和體驗的味 回感受深刻的味 回悲歡離合喜怒哀樂的味 什麼味的照片才叫好呢？拍得漂亮 拍得瀟灑 拍得清楚 拍得得意 拍得精彩 拍得出色 拍得深情 拍得智慧 拍得天真浪漫反璞歸真 拍得喜事連連無怨無悔 拍得恍然大悟破鏡重圓 拍得平常心是道 拍得日日好日年年好年 如夢似真止於至善";
        display: flex;
        /* align-items: center; */
        justify-content: center;
        font-size: 18px;
        font-weight: 200;
        position: absolute;
        border-radius: 15px;
        top: 0;
        left: 0;
        width: 100%;
        max-height: 200px;
        overflow: hidden;
        background-color: #16161664;
    }
`;
const Profile_Section_Left_Avator_Uploader = styled.input`
    display: none;
    position: absolute;
    top: 0;
    left: 0;
`;
const Profile_Section_Left_Avator_Uploader_Confirm = styled.div`
    background-color: ${(props) => props.theme.colors.highLight};
    color: ${(props) => props.theme.colors.primary_Dark};
    position: absolute;
    left: 93%;
    top: 45%;
    width: 40px;
    height: 40px;
    z-index: 9;
    border-radius: 15px;
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
export const Profile_Section_Right_Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    min-height: 280px;
    align-items: center;
    margin-top: 25px;
    /* gap: 30px; */
    p {
        color: ${(props) => props.theme.colors.primary_Grey};
        margin: 5px auto 5px 0;
    }
`;
export const Profile_Section_Right_Name_Editor = styled(ContentEditable)`
    font-size: 1.5em;
    font-weight: 700;
    width: 100%;
    min-height: 50px;
    margin-right: auto;
    outline: none;

    border-radius: 5px;
    white-space: pre-wrap;
    word-wrap: break-word;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-wrap: wrap;
    /* line-height: 0; */
    color: ${(props) => props.theme.colors.primary_Dark};
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        border: 1px solid ${(props) => props.theme.colors.highLight};
        padding: 5px;
        border-radius: 5px;
    }
`;

export const Profile_Section_Right_About_Editor = styled(ContentEditable)`
    font-size: 16px;
    font-weight: 400;
    min-height: 160px;
    line-height: 23px;
    width: 100%;
    white-space: pre-wrap;
    word-wrap: break-word;
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.primary_Lightgrey};
    padding: 5px;
    border-radius: 5px;
    color: ${(props) => props.theme.colors.primary_Dark};
    transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        border: 1px solid ${(props) => props.theme.colors.highLight};

        border-radius: 5px;
    }
`;

// const JobDropDownWidth = styled(JobDropDown)`
//     width: 100%;
// `;

export const Profile_Section_Right_Editor_Confirm = styled.div`
    font-size: 14px;
    /* top: 370px;
    right: 1%; */
    width: 100%;
    height: 50px;
    letter-spacing: 3px;
    border-radius: 5px;
    margin-top: 10px;
    color: ${(props) => props.theme.colors.primary_Dark};
    background-color: ${(props) => props.theme.colors.highLight};
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
const Profile_Section_Right_Editor_Email = styled(ContentEditable)`
    font-size: 16px;
    font-weight: 400;
    outline: none;
    color: ${(props) => props.theme.colors.primary_Dark};
`;
