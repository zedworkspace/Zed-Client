"use client";
import Image from "next/image";
import AuthButtons from "@/components/ui/AuthButtons";
import { IoLogoGoogle } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSignin } from "@/hooks/authHooks";
import { loginSchema } from '@/validations/authValidation';
import ButtonLoading from "@/components/ui/ButtonLoading";

interface ILogin {
  email: string;
  password: string;
}

const signinPage = () => {
  const [emailPage, setEmailPage] = useState(false);
  const navigate = useRouter();

  const {mutate, data, isError, isPending,  error} = useSignin();
  const handleOnSubmit = (signinData : any) => {
    mutate(signinData);
  };

  return (
    <div className="w-[100%] flex justify-center h-screen">
      <div className="w-[100%] md:w-[55%] lg:w-[35%] h-full flex justify-center p-5 items-center">
        <div className="border lg:w-[90%] border-gray-700 rounded-xl w-[100%] bg-[#0A0A0A] p-10 xl:px-15 flex flex-col gap-5">
          {emailPage ? (
            <>
              <div className="top flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <Image src='/Zed-White.png' alt="logo" width={30} height={30} />
                  <span>Zed</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-2xl text-white">Login with Email</h3>
                </div>
              </div>

             {isError && <p className="text-red-500 text-xs text-center">{error.message}</p> }

              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={loginSchema}
                onSubmit={(values) => {
                  handleOnSubmit(values)
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="mid gap-5 flex flex-col">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#A3A39E] font-semibold" htmlFor="email">Email</label>
                      <Field type="text" name="email" className="bg-[#171717] h-10 rounded-lg text-sm px-3" placeholder="Enter email"/>
                      <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#A3A39E] font-semibold" htmlFor="password">
                        Password
                      </label>
                      <Field type="password" name="password" className="bg-[#171717] h-10 rounded-lg text-sm px-3" placeholder="Enter password" />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
                    </div>

                    <AuthButtons width="100%" height="40px" color="black" value={isPending?<ButtonLoading bg={{color:"black"}}/>:"Sign In"} backgroundColor="white" type="submit" />
                  </Form>
                )}
              </Formik>

              <div className="bottom flex flex-col">
                <p className="text-sm text-gray-500">
                  Create an account ?{" "}
                  <span onClick={() => navigate.replace("/signup")} className="text-white cursor-pointer hover:text-gray-300">
                    Sign up
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="top flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <Image src='/Zed-White.png' alt="logo" width={30} height={30} />
                  <span>Zed</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-2xl text-white">Sign in to your account</h3>
                </div>
              </div>

              <div className="mid gap-5 flex flex-col">
                <div onClick={() => setEmailPage(true)}>
                  <AuthButtons width="100%" height="40px" color="black" value="Continue with Email" backgroundColor="white" />
                </div>
                <AuthButtons width="100%" height="40px" color="black" value="Login with GitHub" icon={<FaGithub />} backgroundColor="white" />
                <AuthButtons width="100%" height="40px" color="black" value="Login with Google" icon={<IoLogoGoogle />} backgroundColor="white" />
              </div>

              <div className="bottom flex flex-col">
                <p className="text-sm text-gray-500">
                  Already have an account ?{" "}
                  <span onClick={() => navigate.replace("/signup")} className="text-white cursor-pointer hover:text-gray-300">
                    Sign up
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default signinPage;
