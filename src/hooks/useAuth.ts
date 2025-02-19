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
        localStorage.setItem('user',JSON.stringify(res));
        return res;
    },onSuccess:(data)=>{
        navigate.replace('/')
    }})
}
export const useSignin = () => {
    const navigate = useRouter();
    return useMutation({mutationFn:async(signinData : IUser)=>{
        const res = await signinApi(signinData);
        localStorage.setItem('user',JSON.stringify(res));
        return res.data;
    },onSuccess:(data)=>{
        navigate.replace('/')
    }})
}