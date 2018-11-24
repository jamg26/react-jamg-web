import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import layoutReducer from "./layoutReducer";
import navReducer from "./navReducer";
import profileReducer from "./profileReducer";
import webchatReducer from "./webchatReducer";
import forumReducer from "./forumReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  layout: layoutReducer,
  nav: navReducer,
  profile: profileReducer,
  webchat: webchatReducer,
  forum: forumReducer
});

export default rootReducer;
