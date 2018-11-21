const initState = {};
const webchatActionReducer = (state = initState, action) => {
  switch (action.type) {
    case "NEW_MESSAGE":
      return state;
    case "OFF_STATE":
      return state;
    default:
      return state;
  }
};
export default webchatActionReducer;
