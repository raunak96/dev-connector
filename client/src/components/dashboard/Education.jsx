import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../redux/profile/profile.actions";
import PropTypes from "prop-types";

const Education = ({ degree, from, to, _id, school, fieldofstudy,deleteEducation }) => {
    return (
        <tr>
            <td>{school}</td>
            <td className="hide-sm">{degree}</td>
            <td>{fieldofstudy}</td>
            <td className="hide-sm">
                <Moment format="DD/MM/YYYY">{from}</Moment> -
                {to === null ? (" Present") : (<Moment format="DD/MM/YYYY">{to}</Moment>)}
            </td>
            <td>
                <button className="btn btn-danger" onClick={()=>deleteEducation(_id)}>Delete</button>
            </td>
        </tr>
    );
};
Education.propTypes={
    deleteEducation:PropTypes.func.isRequired
}
const mapDispatchToProps = dispatch=>({
    deleteEducation: id => dispatch(deleteEducation(id))
})
export default connect(null,mapDispatchToProps)(Education);
