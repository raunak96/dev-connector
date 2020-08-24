import ActionTypes from "./alerts.actionTypes";

const INITIAL_STATE=[];

const alertsReducer=(state=INITIAL_STATE, action)=>{
    switch (action.type) {
        case ActionTypes.SET_ALERT:
            return [...state,action.payload];
        case ActionTypes.REMOVE_ALERT:
            return state.filter(alert=>alert.id!==action.payload);
        default:
            return state;
    }
};

export default alertsReducer;