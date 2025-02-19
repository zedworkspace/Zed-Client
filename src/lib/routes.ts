const API_ROUTES = {
  AUTH: {
    SENT_OTP: "/api/v1/otp-request",
    SIGNUP: "/api/v1/register",
    SIGNIN: "/api/v1/signin",
    LOGOUT: "/api/v1/logout",
  },
  PROJECT: {
    CREATE: "/api/v1/projects",
  },
  PROFILE:{
    GET:"/api/v1/profile"
  }
};

export default API_ROUTES;
