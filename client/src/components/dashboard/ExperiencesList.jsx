import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Experience from './Experience';

const ExperiencesList = ({experiences}) => {
    return (
        <Fragment>
            <h2 className="m-2 text-center text-success">Work Experiences</h2>
            <table className="table" style={{width: '100%'}}>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th>Location</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{
                    experiences.map(experience=>(
                        <Experience key={experience._id} {...experience} />
                    ))
                }</tbody>
            </table>
        </Fragment> 
    );
};

ExperiencesList.propTypes = {
    experiences:PropTypes.array.isRequired,
};

export default ExperiencesList;