const API_ROUTES = {
  AUTH: {
    SIGNIN: "/api/v1/auth/sign-in",
    SIGNUP: "/api/v1/auth/sign-up",
    LOGOUT: "/api/v1/auth/logout",
  },
  PROJECT: {
    CREATE: "/api/v1/projects",
  },
  PROFILE:{
    GET:"/api/v1/profile",
    UPDATE:"api/v1/profile/update"
  }
};

export default API_ROUTES;
