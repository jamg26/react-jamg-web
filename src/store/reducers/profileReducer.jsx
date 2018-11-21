const initState = {
  dpUpdated: false
};
const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case "DP_UPDATED":
      return {
        dpUpdated: true
      };
    default:
      return state;
  }
};
export default profileReducer;
