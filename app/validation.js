export function required(name, value) {
    if (!value) return `${name} is a required field`;
}

export function minLength(min) {
    return (name, value) => {
        if(value.length < min) return `${name} must have at least ${min} characters`;
    }
}

export function maxLength(max) {
    return (name, value) => {
        if(value.length > max) return `${name} must not exceed ${max} characters`;
    }
}



export function validateField(name, value, validators) {
    for (const validator of validators) {
        const error = validator(name, value);
        if (error) return error;
    }
}

export function isEmail(name, value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return `${name} must be a valid email (e.g. user@gmail.com)`;
    }
}

export function hasSymbol(name, value) {
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!symbolRegex.test(value)) {
        return `${name} must contain at least one symbol`;
    }
}

export function validateSchema(formData, schema) {
    const entries = Object.entries(schema);
    const validated = {};
    let isValid = true;
    const errorEntries = entries.map(([key, {validators, displayName}]) => {
        const value = formData.get(key) || "";
        validated[key] = value; // always add it
        const message = validateField(displayName || key, value, validators) || "";
        if (message) {
            isValid = false;
        } else {
            validated[key] = value;
        }
        return [key, { value, message, error: !!message }];
    });
    const errors = Object.fromEntries(errorEntries);
    return { isValid, errors, validated };
}

