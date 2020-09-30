import { ToastStore } from "react-toasts";
const phpLog = (username, type) => {
  const url =
    "https://php.jamgph.com/cron.php?auth=" + username + "&type=" + type;
  fetch(url, { mode: "no-cors" })
    .then(res => res.json())
    .then(
      result => {},
      error => {}
    );
};
export const login = credentials => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    //const firestore = getFirestore();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(r => {
        ToastStore.success("Login Success");
        dispatch({ type: "LOGIN_SUCCESS" });
        phpLog(credentials.email, "logged in");
        // return firestore
        //   .collection("users")
        //   .doc(r.user.uid)
        //   .get()
        //   .then(user => {
        //     const data = user.data();
        //     return firestore.collection("webchat").add({
        //       user: data.firstName,
        //       message: "has logged in.",
        //       date: new Date()
        //     });
        //   });
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
        phpLog(newUser.email, "registered");
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0],
            time: new Date()
          })
          .then(() => {
            return firestore.collection("webchat").add({
              user: newUser.firstName,
              message: "has registered.",
              date: new Date()
            });
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
