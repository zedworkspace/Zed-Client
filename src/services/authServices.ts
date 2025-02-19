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