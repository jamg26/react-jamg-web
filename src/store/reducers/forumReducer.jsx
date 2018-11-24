const initState = {
  replies: []
};

const forumReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_REPLIES":
      console.log(action.payload);
      return {
        replies: action.payload
      };
    default:
      return state;
  }
};
export default forumReducer;
