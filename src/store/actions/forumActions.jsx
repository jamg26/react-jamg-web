import { ToastStore } from "react-toasts";
export const newTopic = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("Forum")
      .add({
        message: data.message.replace(/\n/gi, "<br />"),
        title: data.title,
        author: data.author,
        avatar: data.photoURL,
        date: new Date()
      })
      .then(() => {
        dispatch({ type: "NEW_TOPIC_ADDED" });
      })
      .catch(e => {
        dispatch({ type: "NEW_TOPIC_ERROR", payload: e.message });
      });
  };
};

export const reply = data => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("replies")
      .doc(data.forumid)
      .collection("replies")
      .add({
        reply: data.reply.replace(/\n/gi, "<br />"),
        avatar: data.photoURL,
        name: data.name,
        date: new Date()
      })
      .then(() => {
        ToastStore.success("Reply added!");
      })
      .catch(e => {
        ToastStore.error(e.message);
      });
  };
};
