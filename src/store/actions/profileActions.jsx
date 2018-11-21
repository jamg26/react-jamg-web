import { ToastStore } from "react-toasts";

export const removeDp = () => {
  return (dispatch, getState, { getFirebase }) => {
    ToastStore.success("Removing...");
    const firebase = getFirebase();
    firebase
      .auth()
      .currentUser.updateProfile({
        photoURL: null
      })
      .then(() => {
        window.location.reload();
      });
  };
};
export const dp = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    ToastStore.success("Updating...");
    const firebase = getFirebase();
    firebase.auth().onAuthStateChanged(user => {
      const imgRef = firebase.storage().ref(`profiles/${user.uid}`);
      imgRef
        .put(data[0])
        .then(snapshot => {
          imgRef.getDownloadURL().then(url => {
            firebase
              .auth()
              .currentUser.updateProfile({
                photoURL: url
              })
              .then(() => {
                dispatch({ type: "DP_UPDATED" });
                ToastStore.success("Updated!");
              });
          });
        })
        .catch(err => {
          ToastStore.error(err.message);
        });
    });
  };
};

export const newAge = age => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase.auth().onAuthStateChanged(user => {
      return firestore
        .collection("users")
        .doc(user.uid)
        .update({
          Age: age
        })
        .then(() => {
          ToastStore.success("Updated!");
        })
        .catch(err => {});
    });
  };
};

export const newGender = gender => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase.auth().onAuthStateChanged(user => {
      return firestore
        .collection("users")
        .doc(user.uid)
        .update({
          Gender: gender
        })
        .then(() => {
          ToastStore.success("Updated!");
        })
        .catch(err => {});
    });
  };
};
