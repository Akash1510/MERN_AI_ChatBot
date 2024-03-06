import { body } from "express-validator";
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validate.arguments(req);
        }
    };
};
const signupvalidator = () => {
    body("name").notEmpty().withMessage("Name is Required");
    body("email").trim().isEmail().notEmpty().withMessage("Email is Required ");
    body("password").trim().isLength({ min: 8 }).withMessage("Password Should Contain atleast 8 Characters");
};
//# sourceMappingURL=signup.js.map