import React, { useEffect } from "react";

const InfiniteScroll = ({ lastVideoRef, isEnd, nextPage, getVideo }) => {
    useEffect(() => {
        const option = {
            threshold: 0,
        };
        console.log("enter");
        const observer = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting && !isEnd) {
                console.log("???", entries[0].isIntersecting);
                await getVideo(nextPage);
                console.log("here");
            }
        }, option);

        const lastVideo = lastVideoRef.current;
        if (lastVideo) {
            observer.observe(lastVideo);
            console.log(lastVideo);
        }

        return () => {
            observer.disconnect();
        };
    }, [isEnd, nextPage, getVideo, lastVideoRef]);
    return <div ref={lastVideoRef} />;
};

export default InfiniteScroll;
