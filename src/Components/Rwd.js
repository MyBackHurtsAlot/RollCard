const size = {
    destop: "1200px",
    tablet: "768px",
    mobile: "500px",
    smallest: "360px",
};
export const device = {
    desktop: `(min-width:${size.destop})`,
    underDesktop: `(max-width:${size.destop})`,

    tablet: `(min-width:${size.tablet})`,
    underTablet: `(max-width:${size.tablet})`,

    mobile: `(min-width:${size.mobile})`,
    underMobile: `(max-width:${size.mobile})`,

    smallest: `(min-width:${size.smallest})`,
    underSmallest: `(max-width:${size.smallest})`,
};
