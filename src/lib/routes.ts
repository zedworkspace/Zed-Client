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
    UPDATE_PROJECT: "/v1/projects/update/",
    LEAVE_PROJECT: "/v1/projects/",
    CHANGE_OWNER: "/v1/projects/change-owner/",
    CHECK_OWNERSHIP: "/v1/projects/check-ownership/",
  },
  PROFILE: {
    GET: "/v1/profile",
    UPDATE: "/v1/profile/update",
    LOGOUT: "/v1/logout",
  },
  CHANNEL: {
    GET_CHANNELS_PROJECT_ID: "/v1/channel/",
    GET_CHANNEL: "/v1/channel/",
    CREATE_CHANNEL: "/v1/channel",
  },
  MESSAGE: {
    SEND_MESSAGE: "/v1/messages/send",
    GET_MESSAGE: "/v1/messages",
    SEND_FILE: "v1/messages/file",
    GET_NOTIFICATION: "v1/messages/get/unread",
    UPDATE_READ: "v1/messages/read",
  },
  BOARD: {
    GET_BOARDS: "/v1/boards/",
    GET_BOARD: "/v1/boards/",
    CREATE_BOARDS: "v1/boards/create",
    GET_BOARD_MEMBERS: "v1/boards/members/",
  },
  LIST: {
    CREATE_LIST: "/v1/lists/",
    UPDATE_LIST_POSITION: "/v1/lists/reorder",
  },
  CARD: {
    CREATE_CARD: "/v1/cards/",
    GET_CARDBY_ID: "/v1/cards/",
    UPDATE_CARD_BYID: "/v1/cards/",
    UPDATE_CARD_POSITION_IN_DND: "/v1/cards/reorder/dnd",
    UPDATE_CARD_POSITION_IN_SAME_LIST: "/v1/cards/reorder/same-list",
    UPDATE_CARD_POSITION_IN_DIFF_LIST: "/v1/cards/reorder/diffrent-list",
  },
  INVITE: {
    GET_INVITE_INFO: "/v1/invite/",
    GENERATE_INVITE: "/v1/invite/generate-invite/",
    SEND_INVITE: "/v1/invite/send-invite",
    ACCEPT_INVITE: "/v1/invite/accept-invite",
  },
  MEMBERS: {
    GET_MEMBERS: "/v1/project/members/",
  },
  ROLE: {
    CREATE_ROLE: "/v1/role/create",
    GET_ROLES: "/v1/role/project",
    ASSING_ROLES: "/v1/role/assign",
    REMOVE_ROLES: "/v1/role/remove",
    UPDATE_ROLE: "/v1/role/ update/",
    DELETE_ROLE: "/v1/role/delete",
    GET_SINGLE_ROLE: "/v1/role/",
  },
};

export default API_ROUTES;
