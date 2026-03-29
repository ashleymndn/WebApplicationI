import { required, minLength, maxLength } from "../validation.js";

export const userDetailsSchema = {
    phone: { validators: [required, minLength(10), maxLength(20)] },
    address: { validators: [required, minLength(5), maxLength(255)] },
    city: { validators: [required, minLength(2), maxLength(60)] },
    country: { validators: [required, minLength(4), maxLength(30)] },
};