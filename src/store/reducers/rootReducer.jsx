import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import layoutReducer from "./layoutReducer";
import navReducer from "./navReducer";
import profileReducer from "./profileReducer";
import webchatActionReducer from "./webchatActionReducer";
import forumReducer from "./forumReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  layout: layoutReducer,
  nav: navReducer,
  profile: profileReducer,
  webchat: webchatActionReducer,
  forum: forumReducer
});

export default rootReducer;
