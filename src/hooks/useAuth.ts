import { registerApi, sendOtpApi, signinApi } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useOtp = () => {
    return useMutation({mutationFn:async(signupData : IUser)=>{
        return await sendOtpApi(signupData);
    },onSuccess:(data)=>{
    
    }})
}
export const 
useRegister = () => {
    const navigate = useRouter();
    return useMutation({mutationFn:async(signupData : IUser)=>{
        const res = await registerApi(signupData);
        return res;
    },onSuccess:(data)=>{
        localStorage.setItem('accessToken',data.accessToken);
        navigate.replace('/')
    }})
}
export const useSignin = () => {
    const navigate = useRouter();
    return useMutation({mutationFn:async(signinData : IUser)=>{
        const res = await signinApi(signinData);
        return res;
    },onSuccess:(data)=>{
        localStorage.setItem('accessToken',data.accessToken);
        navigate.replace('/')
    }})
}