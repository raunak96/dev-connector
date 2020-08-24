import React from 'react';
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';

const Alert = ({alerts}) => {
    return alerts!==null && alerts.length>0 && alerts.map(({id,msg,alertType})=>(
        <div key={id} className={`alert alert-${alertType}`}> 
            {(alertType==='danger' || alertType==='warning') && <i className={alertType==='warning'? 'fas fa-exclamation-circle': 'fas fa-exclamation-triangle'}></i>} {msg}
        </div>
    ));
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired  
};
const mapStateToProps = ({alerts})=>({
    alerts
})
export default connect(mapStateToProps)(Alert);