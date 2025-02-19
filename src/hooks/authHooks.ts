import { registerApi, sendOtpApi, signinApi } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useOtp = () => {
    return useMutation({mutationFn:async(signupData : IUser)=>{
        return await sendOtpApi(signupData);
    },onSuccess:(data)=>{
    
    }})
}
export const useRegister = () => {
    const navigate = useRouter();
    return useMutation({mutationFn:async(signupData : IUser)=>{
        return await registerApi(signupData);
    },onSuccess:(data)=>{
        navigate.replace('/')
    }})
}
export const useSignin = () => {
    const navigate = useRouter();
    return useMutation({mutationFn:async(signinData : IUser)=>{
        return await signinApi(signinData);
    },onSuccess:(data)=>{
        navigate.replace('/')
    }})
}