import { v4 as uuid } from "uuid";
import ActionTypes from './alerts.actionTypes';

export const setAlert=(alert,timeout=5000)=>dispatch=>{  // alert an object like {alertType,msg}
    const id=uuid();
    dispatch ({type:ActionTypes.SET_ALERT,payload: {id,...alert}});

    setTimeout(()=>dispatch({type:ActionTypes.REMOVE_ALERT,payload:id}),timeout);
}