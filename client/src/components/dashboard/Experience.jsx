import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../redux/profile/profile.actions';
import PropTypes from "prop-types";


const Experience = ({title,from,to,_id,company,location,deleteExperience}) => {
    return (
        <tr>
            <td>{company}</td>
            <td className="hide-sm">{title}</td>
            <td>{location}</td>
            <td className="hide-sm">
                <Moment format="DD/MM/YYYY">{from}</Moment> -{
                    to === null ? (" Present") : (<Moment format="DD/MM/YYYY">{to}</Moment>)
                }
            </td>
            <td> <button className="btn btn-danger" onClick={()=>deleteExperience(_id)}>Delete</button></td>
        </tr>
    );
};
Experience.propTypes={
    deleteExperience: PropTypes.func.isRequired
}
const mapDispatchToProps = (dispatch)=>({
    deleteExperience: id => dispatch(deleteExperience(id))
})

export default connect(null,mapDispatchToProps)(Experience);