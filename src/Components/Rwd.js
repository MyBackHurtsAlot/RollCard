import { useState, useEffect } from "react";

export function useWindowResize(breakPointA, breakPointB) {
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        if (innerWidth < breakPointA) {
            setIsTablet(true);
        } else {
            setIsTablet(false);
        }
        const handleResize = () => {
            if (window.innerWidth < breakPointB) {
                setIsTablet(true);
            } else {
                setIsTablet(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isTablet;
}

const size = {
    destop: "1200px",
    w1000: "1000px",
    tablet: "768px",
    mobile: "500px",
    smallest: "360px",
};
export const device = {
    desktop: `(min-width:${size.destop})`,
    underDesktop: `(max-width:${size.destop})`,

    w1000: `(min-width: ${size.w1000})`,
    underW1000: `(max-width: ${size.w1000})`,

    tablet: `(min-width:${size.tablet})`,
    underTablet: `(max-width:${size.tablet})`,

    mobile: `(min-width:${size.mobile})`,
    underMobile: `(max-width:${size.mobile})`,

    smallest: `(min-width:${size.smallest})`,
    underSmallest: `(max-width:${size.smallest})`,
};
