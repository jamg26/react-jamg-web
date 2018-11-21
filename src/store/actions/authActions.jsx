import { ToastStore } from "react-toasts";
export const login = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
        ToastStore.success("Login Success");
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
        ToastStore.error(err.message);
      });
  };
};
export const logout = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT_SUCCESS" });
        ToastStore.success("Logout Success");
      });
  };
};

export const register = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0],
            time: new Date()
          });
      })
      .then(() => {
        dispatch({ type: "REGISTRATION_SUCCESS" });
        ToastStore.success("Registration Success");
        firebase.auth().currentUser.sendEmailVerification();
      })
      .catch(err => {
        dispatch({ type: "REGISTRATION_ERROR", err });
        ToastStore.error(err.message);
      });
  };
};
export const verifyEmail = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: "EMAIL_VERIFICATION_SENDING" });
    const firebase = getFirebase();
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        dispatch({ type: "EMAIL_VERIFICATION_SENT" });
        ToastStore.error("Email verification has been sent!");
      })
      .catch(function(error) {});
  };
};

export const verifyingEmail = creds => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .applyActionCode(creds.actionCode)
      .then(function(resp) {
        dispatch({ type: "VERIFY_SUCCESS" });
      })
      .catch(function(error) {
        dispatch({ type: "VERIFY_ERROR" });
      });
  };
};

export const forgotPassword = email => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch({ type: "FORGOT_PASSWORD_SENT" });
        ToastStore.success("Password reset has been sent to your email.");
      })
      .catch(err => {
        dispatch({ type: "FORGOR_ERROR", err });
        ToastStore.error(err.message);
      });
  };
};
export const newPassword = creds => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .confirmPasswordReset(creds.actionCode, creds.newPassword)
      .then(function(resp) {
        dispatch({ type: "PASSWORD_CHANGED" });
      })
      .catch(function(error) {
        dispatch({ type: "PASSWORD_CHANGE_ERROR" });
        ToastStore.error(error.message);
      });
  };
};

export const handleResetPassword = creds => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .verifyPasswordResetCode(creds.actionCode)
      .then(function(email) {
        dispatch({ type: "FORGOT_PASSWORD_SENT" });
      })
      .catch(error => {
        dispatch({ type: "FORGOT_ERROR" });
      });
  };
};
export const authButton = () => {
  return (dispatch, getState) => {
    dispatch({ type: "AUTH_BUTTON" });
  };
};
