import { minLength, required } from "../validation.js";

export const userSchemaRegister = {
    firstname: {validators: [required, minLength(2)]},
    lastname: {validators: [required, minLength(2)]},
    email: {validators: [required, minLength(8)]},
    password: {validators: [required, minLength(8)]}
}

export const userSchemaLogin = {
    email: {validators: [required, minLength(8)]},
    password: {validators: [required, minLength(8)]}
};