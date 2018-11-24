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
    default:
      return state;
  }
};
export default forumReducer;
