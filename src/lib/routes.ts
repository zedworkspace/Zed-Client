const API_ROUTES = {
  AUTH: {
    SENT_OTP: "/v1/otp-request",
    SIGNUP: "/v1/register",
    SIGNIN: "/v1/signin",
    LOGOUT: "/v1/logout",
  },
  PROJECT: {
    CREATE: "/v1/projects",
  },
  PROFILE:{
    GET:"/v1/profile"
  }
};

export default API_ROUTES;
