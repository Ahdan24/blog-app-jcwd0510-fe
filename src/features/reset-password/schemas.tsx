import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const ResetPasswordSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  email: Yup.string().email("invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .min(6),
  confirmPassword: Yup.string()
    .required("Confirm Pasword is required")
    .oneOf([Yup.ref("password"), "Your Password do not match"]),
});
