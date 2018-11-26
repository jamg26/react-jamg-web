import { ToastStore } from "react-toasts";
const initState = {
  newtopic: ""
};

const forumReducer = (state = initState, action) => {
  switch (action.type) {
    case "NEW_TOPIC_ADDED":
      return {
        ...state,
        newtopic: "New topic added successfully"
      };
    case "NEW_TOPIC_ERROR":
      return {
        ...state,
        newtopic: action.payload
      };
    case "TOPIC_DELETED":
      ToastStore.success("Deleted!");
      return state;
    case "TOPIC_DELETE_ERROR":
      ToastStore.error(action.payload);
      return state;
    default:
      return state;
  }
};
export default forumReducer;
