"use client";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import AuthButtons from "@/components/ui/AuthButtons";
import { useRouter } from "next/navigation";
import { useOtp, useRegister } from "@/hooks/authHooks";
import { signupSchema, otpSchema } from "@/validations/authValidation";
import ButtonLoading from "@/components/ui/ButtonLoading";

const AuthPage = () => {
  const [otpPage, setOtpPage] = useState(false);
  const [formData, setFormData] = useState<IUser>({ name: "", email: "", password: "", otp: "" });
  const navigate = useRouter();
  const [signupError, setSignupError] = useState("");

  const { mutate: otpMutate, data: otpRes, error:otpError, isPending:otpIsPending, isSuccess } = useOtp();
  const handleOtp = async (signupData: IUser) => {
    otpMutate(signupData);
  };

  useEffect(()=>{
    if(isSuccess) setOtpPage(true)
  },[isSuccess])

  const { mutate, isError, error, isPending } = useRegister();
  const handleOnSubmit = (signupData: IUser) => {
    if (signupData.otp !== otpRes?.otp) return setSignupError("Invalid OTP");
    mutate(signupData);
  };

  return (
    <div className="w-[100%] flex justify-center h-screen">
      <div className="w-[100%] md:w-[55%] lg:w-[35%] h-full flex justify-center p-5 items-center">
        <div className="border lg:w-[90%] border-gray-700 rounded-xl w-[100%] bg-[#0A0A0A] p-10 xl:px-15 flex flex-col gap-5">
          {otpPage ? (
            <Formik
              initialValues={{ otp: formData.otp || "" }}
              validationSchema={otpSchema}
              onSubmit={(values) => {
                setFormData({ ...formData, otp: values.otp });
                handleOnSubmit(values);
              }}
            >
              {({ isValid, dirty }) => (
                <Form className="flex flex-col gap-5">
                  <div className="top flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <Image src="/Zed-White.png" alt="logo" width={30} height={30} />
                      <span>Zed</span>
                    </div>
                    <div className="flex flex-col">
                  {isError && <p className="text-red-500 text-xs text-center">{error.message}</p> }
                      <h3 className="font-bold text-2xl">OTP sent to</h3>
                      <span className="text-sm font-normal text-gray-500">abhay@gmail.com</span>
                    </div>
                  </div>
                  <div className="mid flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#A3A39E] font-semibold">OTP</label>
                      <Field type="text" name="otp" className="bg-[#171717] h-10 rounded-lg text-md px-3" placeholder="Enter OTP" />
                      <ErrorMessage name="otp" component="div" className="text-red-500 text-xs" />
                      {signupError && <p className="text-red-500 text-xs">{signupError}</p>}
                    </div>
                    <AuthButtons width="100%" height="40px" color="black" value="Verify" backgroundColor="white" type="submit" />
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={formData}
              validationSchema={signupSchema}
              onSubmit={(values) => {
                setFormData(values);
                handleOtp(values);
              }}
            >
              {({ isValid, dirty }) => (
                <Form className="flex flex-col gap-5">
                  <div className="top flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <Image src="/Zed-White.png" alt="logo" width={30} height={30} />
                      <span>Zed</span>
                    </div>
                    <h3 className="font-bold text-2xl">Signup for an account</h3>
                  </div>
                  <div className="mid flex flex-col gap-5">
                  {otpError && <p className="text-red-500 text-xs text-center">{otpError.message}</p> }
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#A3A39E] font-semibold">Full Name</label>
                      <Field type="text" name="name" className="bg-[#171717] h-10 rounded-lg text-sm px-3" placeholder="Abhay" />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#A3A39E] font-semibold">Email</label>
                      <Field type="text" name="email" className="bg-[#171717] h-10 rounded-lg text-sm px-3" placeholder="a@gmail.com" />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#A3A39E] font-semibold">Password</label>
                      <Field type="password" name="password" className="bg-[#171717] h-10 rounded-lg text-sm px-3" placeholder="fsf@fff" />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
                    </div>
                    <AuthButtons width="100%" height="40px" color="black" value="Sign Up" backgroundColor="white" type="submit" />
                    <p className="text-sm text-gray-500">
                      Already have an account?{" "}
                      <span onClick={() => navigate.replace("/signin")} className="text-white cursor-pointer hover:text-gray-300">
                        {otpIsPending?<ButtonLoading bg={{color:"black"}}/>:"Sign in"}
                      </span>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          )}
          <div className="flex items-center text-gray-400">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="px-4">Or continue with</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>
          <div className="bottom flex flex-col gap-3">
            <AuthButtons width="100%" height="40px" color="black" value="GitHub" icon={<FaGithub />} backgroundColor="white" type="submit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
