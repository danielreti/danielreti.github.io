export const capitalise = (s) => {
    return s.replace(
        /(^\w|\s\w|\(\w|-\w)([^-\s]*)/g,
        (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
    );
};
