const initState = {
  dpUpdated: false,
  username: null,
  avatar: null,
  firstName: null,
  lastName: null,
  age: null,
  gender: null,
  status: null
};
const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case "DP_UPDATED":
      return {
        dpUpdated: true
      };
    case "FETCH_PROFILE":
      return {
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        age: action.payload.Age,
        gender: action.payload.Gender,
        avatar: action.payload.photoURL,
        status: true
      };
    case "NO_PROFILE":
      return {
        username: "NOT FOUND",
        firstName: "NOT",
        lastName: "FOUND",
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/jamgph.appspot.com/o/profiles%2Fnoprofile.jpg?alt=media&token=fe8af1c1-e102-4f2c-ae50-cabd721f11eb"
      };
    default:
      return state;
  }
};
export default profileReducer;
