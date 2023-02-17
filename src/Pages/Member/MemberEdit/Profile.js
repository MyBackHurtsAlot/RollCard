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
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../Firebase-config";
import { db } from "../../../Firebase-config";
import { UserInfoContext, UserContext } from "../../../Context/userContext";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";
import img from "../../../Assets/SH.png";
import JobDropDown from "../../../Components/DropDown/JobDropDown";

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
    const [userNameTemp, setUserNameTemp] = useState("Name Here");
    const [userJobTemp, setUserJobTemp] = useState("");
    const [userAboutTemp, setUserAboutTemp] = useState("關於你");
    // const [userAbout, setUserAbout] = useState("");
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
        } catch (error) {
            console.log(error);
        }
    };
    // console.log(userAboutTemp);
    const AvatorChangePreview = async (e) => {
        // const imageRef = ref(storage, `avators/${user}/${"avator" + user}`);
        // if (imageRef) {
        //     uploadBytes(imageRef, avator).then(() => {
        //         console.log("Upload");
        //     });
        // }
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const previewer = new FileReader();
            previewer.readAsDataURL(file);
            previewer.onloadend = () => {
                setAvator(file);
                setAvatorPreview(previewer.result);
            };
        }
    };
    useEffect(() => {
        const email = auth.currentUser;
        if (email) {
            setUserEmail(email.email);
        }
    }, [user]);
    const uploadImage = () => {
        try {
            const imageRef = ref(storage, `avators/${user}/${"avator" + user}`);
            if (imageRef) {
                uploadBytes(imageRef, avator).then(() => {
                    console.log("Upload");
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (userNameTemp === "Name Here") {
            setUserNameTemp(userName);
        }
    }, [userName]);

    useEffect(() => {
        if (userAboutTemp === "關於你") {
            setUserAboutTemp(userAbout);
        }
    }, [userAbout]);
    // console.log(userAboutTemp);
    return (
        <Profile_Section>
            <Profile_Section_Left_Wrapper>
                <Profile_Section_Left_Avator_Container
                    // !!!!!!!!!!!!!!! 把 Preview 改回 avator !!!!!!!!!!!
                    avatorPreview={avatorPreview}
                >
                    <Profile_Section_Left_Avator_Uploader
                        type="file"
                        onChange={AvatorChangePreview}
                    />
                </Profile_Section_Left_Avator_Container>
                <Profile_Section_Left_Avator_Uploader_Confirm
                    onClick={uploadImage}
                >
                    儲存
                </Profile_Section_Left_Avator_Uploader_Confirm>
            </Profile_Section_Left_Wrapper>
            <Profile_Section_Right_Wrapper>
                <Profile_Section_Right_Name_Editor
                    html={`${userNameTemp}`}
                    onChange={(e) => setUserNameTemp(e.target.value)}
                />
                <JobDropDownWidth
                    userJobTemp={userJobTemp}
                    setUserJobTemp={setUserJobTemp}
                    userJob={userJob}
                />
                <Profile_Section_Right_About_Editor
                    html={`${userAboutTemp}`}
                    onChange={(e) => setUserAboutTemp(e.target.value)}
                />

                {/* <Profile_Section_Right_Editor_Email html={`${userEmail}`} /> */}
                <Profile_Section_Right_Editor_Confirm onClick={submitUserInfo}>
                    儲存
                </Profile_Section_Right_Editor_Confirm>
            </Profile_Section_Right_Wrapper>
        </Profile_Section>
    );
};

export default Profile;

// ============ Style ===========

export const Profile_Section = styled.section`
    /* position: relative; */
    margin: 100px auto auto 3%;
    padding: 20px;
    width: 30%;
    min-height: 600px;
    border-radius: 20px;
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
    // !!!!!!!!!!!!!!! 把 Preview 改回 avator !!!!!!!!!!!
    background-image: ${(props) =>
        props.avatorPreview ? `url(${props.avatorPreview})` : `url(${img})`};
    color: ${(props) => props.theme.colors.primary_white};
    background-size: cover;
    background-position: center;
    cursor: pointer;
    &:hover::after {
        content: "人為什麼要拍照人活得好好的他為什麼要拍照 到底是為了要回味兒 回什麼味 回自己的味 回自己和大家生活的味 回經歷和體驗的味 回經歷和體驗的味 回感受深刻的味 回悲歡離合喜怒哀樂的味 ";
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 200;
        position: absolute;
        border-radius: 15px;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #67676740;
    }
`;
const Profile_Section_Left_Avator_Uploader = styled.input`
    display: none;
    position: absolute;
    top: 0;
    left: 0;
`;
const Profile_Section_Left_Avator_Uploader_Confirm = styled.div`
    background-color: ${(props) => props.theme.colors.primary_Lightgrey};
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
    transition: all 0.2s cubic-bezier(0.34, -0.28, 0.7, 0.93);
    &:hover {
        width: 42px;
        height: 42px;
    }
`;
export const Profile_Section_Right_Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    min-height: 280px;
    align-items: center;
    margin-top: 50px;
    gap: 30px;
`;
export const Profile_Section_Right_Name_Editor = styled(ContentEditable)`
    font-size: 36px;
    font-weight: 700;
    width: 100%;
    height: 50px;
    outline: none;
    white-space: pre-wrap;
    word-wrap: break-word;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0;
    color: ${(props) => props.theme.colors.primary_Dark};
`;

const Profile_Section_Right_Job_Editor = styled(ContentEditable)`
    font-size: 24px;
    font-weight: 500;
    outline: none;
    color: ${(props) => props.theme.colors.primary_Dark};
`;

export const Profile_Section_Right_About_Editor = styled(ContentEditable)`
    font-size: 16px;
    font-weight: 400;
    min-height: 160px;
    width: 100%;
    white-space: pre-wrap;
    word-wrap: break-word;
    outline: 1px solid #a6a6a6;
    padding: 15px;
    border-radius: 5px;
    color: ${(props) => props.theme.colors.primary_Dark};
`;

const JobDropDownWidth = styled(JobDropDown)`
    width: 100%;
`;

export const Profile_Section_Right_Editor_Confirm = styled.div`
    font-size: 14px;
    top: 370px;
    right: 1%;
    width: 100%;
    height: 50px;
    letter-spacing: 3px;
    border-radius: 5px;

    color: ${(props) => props.theme.colors.primary_white};
    background-color: ${(props) => props.theme.colors.primary_Dark};
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
