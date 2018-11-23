const initState = {
  dashboard: true,
  profile: false,
  login: true,
  register: false,
  forum: false
};

const navReducer = (state = initState, action) => {
  switch (action.type) {
    case "dashboard":
      return {
        ...state,
        profile: false,
        dashboard: true,
        forum: false
      };
    case "profile":
      return {
        ...state,
        dashboard: false,
        profile: true,
        forum: false
      };
    case "login":
      return {
        ...state,
        register: false,
        login: true
      };
    case "register":
      return {
        ...state,
        register: true,
        login: false
      };
    case "forum":
      return {
        ...state,
        dashboard: false,
        profile: false,
        forum: true
      };

    default:
      return state;
  }
};

export default navReducer;
