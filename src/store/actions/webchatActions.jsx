import { ToastStore } from "react-toasts";
export const newMessage = query => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("webchat")
      .add({
        message: query.message,
        user: query.firstName,
        date: new Date(),
        avatar: query.avatar
      })
      .then(() => {
        dispatch({ type: "NEW_MESSAGE" });
      })
      .catch(e => {
        ToastStore.error(e.message);
      });
  };
};

export const getMessageSize = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("webchat")
      .get()
      .then(r => {
        dispatch({ type: "COUNT_WEBCHAT", payload: r.size });
      })
      .catch(e => {
        console.log(e.message);
      });
  };
};
