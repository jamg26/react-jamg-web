const initState = {
  chatSize: null
};
const webchatReducer = (state = initState, action) => {
  switch (action.type) {
    case "NEW_MESSAGE":
      return state;
    case "COUNT_WEBCHAT":
      return {
        ...state,
        chatSize: action.payload
      };
    default:
      return state;
  }
};
export default webchatReducer;
