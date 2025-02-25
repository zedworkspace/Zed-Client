const API_ROUTES = {
  AUTH: {
    SENT_OTP: "/v1/otp-request",
    SIGNUP: "/v1/register",
    SIGNIN: "/v1/signin",
    RESET_OTP: "/v1/reset-otp-request",
    RESET_PASSWORD: "/v1/reset-password",
    LOGOUT: "/v1/logout",
  },
  PROJECT: {
    CREATE_PROJECT: "/v1/projects",
    GET_PROJECTS: "/v1/projects",
    GET_PROJECT: "/v1/projects/",
  },
  PROFILE: {
    GET: "/v1/profile",
    UPDATE: "/v1/profile/update",
  },
  CHANNEL:{
    GET_CHANNELS_PROJECT_ID:"/v1/channel/"
  }
};

export default API_ROUTES;
