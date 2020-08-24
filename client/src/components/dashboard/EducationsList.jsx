import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Education from "./Education";


const EducationsList = ({ educationList }) => {
    return (
        <Fragment>
            <h2 className="m-2 text-center text-info">Education Records</h2>
            <table className="table" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th>Field of Study</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {educationList.map((education) => (
                        <Education key={education._id} {...education} />
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

EducationsList.propTypes = {
    educationList: PropTypes.array.isRequired,
};

export default EducationsList;
