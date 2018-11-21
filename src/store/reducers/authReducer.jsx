const initState = {
  authError: null,
  authButton: true,
  sendEmailButton: false,
  sendingEmailButton: false,
  verifyError: false,
  verifySuccess: false,
  passwordChanged: false,
  changePassword: false
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return {
        ...state,
        authButton: true,
        authError: "Login Failed"
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null
      };
    case "LOGOUT_SUCCESS":
      return {
        authButton: true
      };
    case "REGISTRATION_SUCCESS":
      return {
        ...state,
        authError: null
      };
    case "REGISTRATION_ERROR":
      return {
        ...state,
        authError: action.err.message,
        authButton: true
      };
    case "AUTH_BUTTON":
      return {
        ...state,
        authButton: false
      };

    case "EMAIL_VERIFICATION_SENDING":
      return {
        sendingEmailButton: true
      };

    case "EMAIL_VERIFICATION_SENT":
      return {
        sendEmailButton: true
      };
    case "FORGOT_PASSWORD_SENT":
      return {
        ...state,
        changePassword: true
      };
    case "FORGOT_ERROR":
      return {
        ...state,
        verifyError: true
      };
    case "PASSWORD_CHANGE_ERROR":
      return {
        ...state
      };
    case "PASSWORD_CHANGED":
      return {
        passwordChanged: true
      };
    case "VERIFY_ERROR":
      return {
        verifyError: true
      };
    case "VERIFY_SUCCESS":
      return {
        verifySuccess: true
      };
    default:
      return state;
  }
};

export default authReducer;
