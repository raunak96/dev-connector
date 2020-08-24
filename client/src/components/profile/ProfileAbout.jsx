import React, { Fragment } from 'react';

const ProfileAbout = ({bio,skills,user:{name}}) => {
    return (
        <div className="profile-about bg-light p-2">
            {bio && (
                <Fragment>
                    <h2 className="text-primary">{`${name.split(' ')[0]}'s bio`}</h2>
                    <p className="big-text"><em>{bio}</em></p>
                </Fragment>
            )}

            <div className="line"></div>
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
            {
                skills.map((skill,index)=>(
                    <div className="p-1 text-success lead" key={index}>
                        <i className="fa fa-check"></i> {skill}
                    </div>
                ))
            } 
            </div>
        </div>
    );
};

export default ProfileAbout;