const initState = {
  dashboard: true,
  profile: false,
  login: true,
  register: false
};

const navReducer = (state = initState, action) => {
  switch (action.type) {
    case "dashboard":
      return {
        ...state,
        profile: false,
        dashboard: true
      };
    case "profile":
      return {
        ...state,
        dashboard: false,
        profile: true
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
    default:
      return state;
  }
};

export default navReducer;
