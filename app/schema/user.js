import { maxLength, minLength, required } from "../validation.js";

export const userSchemaRegister = {
    firstname: {validators: [required, minLength(2), maxLength(30)]},
    lastname: {validators: [required, minLength(2), maxLength(30)]},
    email: {validators: [required, minLength(8), ]},
    password: {validators: [required, minLength(8)]}
}

export const userSchemaLogin = {
    email: {validators: [required]},
    password: {validators: [required, minLength(8)]}
};