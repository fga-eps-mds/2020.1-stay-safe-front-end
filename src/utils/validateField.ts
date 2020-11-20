export const validateRequiredField = (field: string) => {
    if (field === null || field === "") {
        return true;
    }
    return false;
};

export const validateFieldLength = (field: string, minLength: number) => {
    if (field && field.length < minLength) {
        return true;
    }
    return false;
};

export const validateRegexField = (field: string, regex: RegExp) => {
    if (!regex.test(field)) {
        return true;
    }
    return false;
};
