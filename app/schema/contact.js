import { required, minLength, maxLength, isEmail } from "../validation.js";

export const contactSchema = {
    firstName: { validators: [required, minLength(2), maxLength(50)] },
    lastName:  { validators: [required, minLength(2), maxLength(50)] },
    email:     { validators: [required, isEmail] },
    message:   { validators: [required, minLength(10), maxLength(1000)] },
};