export const parseExpToMs = (exp) => {

    if (!exp) return null;

    if (typeof exp === "number") {
        return exp * 1000;
    }

    if (!isNaN(Number(exp))) {
        return Number(exp) * 1000;
    }

    const parsed = Date.parse(exp);

    return isNaN(parsed) ? null : parsed;
};