import React, { Fragment } from 'react';
import Moment from "react-moment";

const ProfileEducation = ({educationList}) => {
    return (
        <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {educationList.length>0? (
                <Fragment>
                {
                    educationList.map(education => {
                        const { school, degree, fieldofstudy, current, to, from, description,_id } = education;
                        return(
                            <div key={_id}>
                                <h3 className="text-dark">{school}</h3>
                                <p>
                                    <Moment format="DD/MM/YYYY">{from}</Moment> -
                                    { current ? ' Present' : <Moment format="DD/MM/YYYY">{to}</Moment>}
                                </p>
                                <p>
                                    <strong>Degree: </strong> {degree}
                                </p>
                                <p>
                                    <strong>Field of Study: </strong> {fieldofstudy}
                                </p>
                                <p>
                                    <strong>Description: </strong> {description}
                                </p>
                            </div>
                        )
                    })
                }
                </Fragment>
            ):(<h4>Education Details not added...</h4>)}
        </div>
    );
};

export default ProfileEducation;