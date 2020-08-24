import React, { Fragment } from 'react';
import Moment from "react-moment";

const ProfileExperience = ({experiences}) => {
    return (
        <div className="profile-exp bg-white p-2">
            <h2 className="text-info">Experience</h2>
            {experiences.length>0? (
                <Fragment>
                {
                    experiences.map(experience => {
                        const { company, title, location, current, to, from, description,_id }=experience;
                        return(
                            <div key={_id}>
                                <h3 className="text-dark">{company}</h3>
                                <p>
                                    <Moment format="DD/MM/YYYY">{from}</Moment> -
                                    { current ? ' Present' : <Moment format="DD/MM/YYYY">{to}</Moment>}
                                </p>
                                <p>
                                    <strong>Position: </strong> {title}
                                </p>
                                <p>
                                    <strong>Location: </strong> {location}
                                </p>
                                <p>
                                    <strong>Description: </strong> {description}
                                </p>
                            </div>
                        )
                    })
                }
                </Fragment>
            ):(<h4>No Experiences added...</h4>)}
        </div>
    );
};

export default ProfileExperience;