export const dashboard = () => {
  return (dispatch, getState) => {
    dispatch({ type: "dashboard" });
  };
};
export const profile = () => {
  return (dispatch, getState) => {
    dispatch({ type: "profile" });
  };
};
export const login = () => {
  return (dispatch, getState) => {
    dispatch({ type: "login" });
  };
};
export const registerNav = () => {
  return (dispatch, getState) => {
    dispatch({ type: "register" });
  };
};
