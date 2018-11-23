import { ToastStore } from "react-toasts";
export const newTopic = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("Forum")
      .add({
        title: data.title,
        message: data.message.replace(/\n/gi, "<br />"),
        author: data.author,
        avatar: data.photoURL,
        date: new Date()
      })
      .then(() => {
        ToastStore.success("New Topic Submitted!");
      })
      .catch(e => {
        console.log(e.message);
      });
  };
};
