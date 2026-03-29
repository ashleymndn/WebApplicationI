import { maxLength, minLength, required, isEmail, hasSymbol } from "../validation.js";

export const userSchemaRegister = {
    firstname: { validators: [required, minLength(2), maxLength(30)] },
    lastname: { validators: [required, minLength(2), maxLength(30)] },
    email: { validators: [required, isEmail] },
    password: { validators: [required, minLength(8), hasSymbol] }
};

export const userSchemaLogin = {
    email: { validators: [required, isEmail] },
    password: { validators: [required, minLength(8)] }
};