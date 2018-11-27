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
    const firestore = getFirestore();
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
                firestore
                  .collection("users")
                  .doc(user.uid)
                  .update({
                    photoURL: url
                  });
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

export const updateUsername = username => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const u = username.toLowerCase();
    return firestore
      .collection("users")
      .get()
      .then(r => {
        let exist = 0;
        r.forEach(docs => {
          const u = docs.data();
          if (u.username === username) {
            ToastStore.error("Username exist!");
            exist = 1;
          }
        });
        if (
          u.includes("admin") ||
          u.includes("profile") ||
          u.includes("moderator") ||
          u.includes("staff")
        ) {
          ToastStore.error("Username not allowed!");
          exist = 1;
        }
        if (exist === 0) {
          return firebase.auth().onAuthStateChanged(user => {
            return firestore
              .collection("users")
              .doc(user.uid)
              .update({
                username: u
              })
              .then(() => {
                ToastStore.success("Username Updated!");
              })
              .catch(err => {
                console.log(err.message);
              });
          });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const fetchProfile = data => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("users")
      .get()
      .then(r => {
        let fetch = 0;
        r.forEach(docs => {
          const u = docs.data();
          if (u.username === data.username) {
            dispatch({ type: "FETCH_PROFILE", payload: u });
            fetch = 1;
          }
        });
        if (fetch === 0) {
          dispatch({ type: "NO_PROFILE" });
        }
      })
      .catch(e => {
        console.log(e.message);
      });
  };
};
