import { IUser } from "@/interface/userInterface";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

export const sendOtpApi = async (signupData: IUser) => {
    const res = await apiClient.post(API_ROUTES.AUTH.SENT_OTP,signupData);
    return res.data;
};
export const registerApi = async (signupData: IUser) => {
    const res = await apiClient.post(API_ROUTES.AUTH.SIGNUP,signupData);
    return res.data;
};
export const signinApi = async (signinData: IUser) => {
    const res = await apiClient.post(API_ROUTES.AUTH.SIGNIN,signinData);
    return res.data;
};
export const resetOtpApi = async (restData: IUser) => {
    const res = await apiClient.post(API_ROUTES.AUTH.RESET_OTP,restData);
    return res.data;
};
export const resetPasswordApi = async (restData: IUser) => {
    const res = await apiClient.post(API_ROUTES.AUTH.RESET_PASSWORD,restData);
    return res.data;
};

