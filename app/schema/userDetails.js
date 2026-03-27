import { required, minLength, maxLength } from "../validation.js";

export const userDetailsSchema = {
    phone: { validators: [required, minLength(10), maxLength(15)] },
    address: { validators: [required, minLength(5), maxLength(100)] },
    city: { validators: [required, minLength(2), maxLength(30)] },
    country: { validators: [required, minLength(2), maxLength(30)] },
};