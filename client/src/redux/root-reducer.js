import { combineReducers } from "redux";
import alertsReducer from "./alerts/alerts.reducer";
import authReducer from "./auth/auth.reducer";
import profileReducer from "./profile/profile.reducer";
import postReducer from "./post/post.reducer";

const rootReducer=combineReducers({
    alerts:alertsReducer,
    auth:authReducer,
    profile: profileReducer,
    post:postReducer
});

export default rootReducer;