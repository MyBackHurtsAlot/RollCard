// import React, { useContext, useState, useEffect, useRef } from "react";
// import { NavLink, useParams } from "react-router-dom";
// import parse from "html-react-parser";
// import styled, { css } from "styled-components";
// import { UserContext } from "../../Context/userContext";
// import { query, collection, getDocs, where } from "firebase/firestore";
// import { ref, getDownloadURL, listAll } from "firebase/storage";
// import { storage } from "../../Firebase-config";
// import { db } from "../../Firebase-config";
// import img from "../../Assets/SH.png";
// import { v4 as uuidv4 } from "uuid";
// import SendEmail from "./SendEmail";
// import MemberPageInfo from "./MemberPageInfo";
// import { useNavigate } from "react-router-dom";

// const MemberPageVideo = ({ memberId }) => {
//     const [memberVideoAll, setMemberVideoAll] = useState([]);
//     useEffect(() => {
//         try {
//             async function getVideos(memberId) {
//                 const response = await listAll(
//                     ref(storage, `videosForHomePage`)
//                 );

//                 response.items.forEach(async (videos) => {
//                     const url = await getDownloadURL(videos);
//                     // setMemberVideoAll(url);
//                     const fileName = videos.name;

//                     const data = query(
//                         collection(db, "videoForAll"),
//                         where("user", "==", memberId)
//                     );
//                     const docSnap = await getDocs(data);
//                     docSnap.forEach((doc) => {
//                         const originalVideoName = doc.data().originalVideoName;
//                         if (originalVideoName === fileName) {
//                             setMemberVideoAll((prev) =>
//                                 !prev.includes(url) ? [...prev, url] : prev
//                             );
//                         }
//                     });
//                 });
//             }
//             getVideos(memberId);
//         } catch (error) {
//             console.log(error);
//         }
//     }, [memberId]);
//     return (
//         <div>
//             <VideoSectionWrapper>
//                 {memberVideoAll.map((url) => {
//                     const splitUrl = url.split("&token=")[1];
//                     // console.log(splitUrl);
//                     return (
//                         <VideoContainer key={uuidv4()}>
//                             <video
//                                 src={url}
//                                 onClick={() => {
//                                     navigate(`/watch/${splitUrl}`);
//                                 }}
//                             />
//                         </VideoContainer>
//                     );
//                 })}
//             </VideoSectionWrapper>
//         </div>
//     );
// };

// export default MemberPageVideo;

// const VideoSectionWrapper = styled.section`
//     margin-top: 20px;
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-evenly;
//     gap: 50px;
// `;
// const VideoContainer = styled.div`
//     width: 45%;
//     height: 324px;
//     /* outline: 1px solid red; */
//     cursor: pointer;
//     video {
//         width: 100%;
//         border-radius: 15px;
//         /* max-width: 45%; */
//         aspect-ratio: 16/9;
//         outline: 1px solid ${(props) => props.theme.colors.primary_white};
//         transition: all 0.3s cubic-bezier(0.34, -0.28, 0.7, 0.93);
//         &:hover {
//             transform: translateX(5px);
//             transform: translateY(-5px);
//             box-shadow: 5px 5px 0px 0px #a6a6a6;
//         }
//     }
//     img {
//         width: 50px;
//     }
// `;
