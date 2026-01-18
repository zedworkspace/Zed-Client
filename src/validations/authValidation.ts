import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export const otpSchema = Yup.object().shape({
  otp: Yup.string().matches(/^\d{6}$/, "OTP must be exactly 6 digits").required("OTP is required"),
});

export const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});
export const emailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
});
export const resetPasswordShema = Yup.object().shape({
    otp: Yup.string().matches(/^\d{6}$/, "OTP must be exactly 6 digits").required("OTP is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});