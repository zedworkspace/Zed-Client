import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useOtp = () => {
    return useMutation({mutationFn:async(signupData)=>{
        const res = await axios.post('http://localhost:5000/api/v1/otp-request',signupData);
        return res.data;
    },onSuccess:(data)=>{
    
    }})
}
export const useRegister = () => {
    const navigate = useRouter();
    return useMutation({mutationFn:async(signupData)=>{
        const res = await axios.post('http://localhost:5000/api/v1/register',signupData);
        return res.data;
    },onSuccess:(data)=>{
        navigate.replace('/')
    }})
}
export const useSignin = () => {
    const navigate = useRouter();
    return useMutation({mutationFn:async(signupData)=>{
        const res = await axios.post('http://localhost:5000/api/v1/signin',signupData);
        return res.data;
    },onSuccess:(data)=>{
        navigate.replace('/')
    }})
}