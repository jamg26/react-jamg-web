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
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const offMsg = () => {
  return (dispatch, getState) => {
    dispatch({ type: "OFF_STATE" });
  };
};
