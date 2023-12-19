import { combineReducers } from "redux";
import Alert from "./alert";
import Auth from "./auth";
import Task from "./task";
import darkModeReducer from "./darkMode";
export default combineReducers ({
    Alert, Auth, Task, 
    darkMode: darkModeReducer
})