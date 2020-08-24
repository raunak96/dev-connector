import React from 'react';
import { Link } from 'react-router-dom';

const ProfilesItem = ({user: { _id, name, avatar },status,company,location,skills,}) => {
    return <div className="profile bg-light">
        <img src={avatar} alt="dp" className="round-img mr-2"/>
        <div className="ml-2">
            <h2>{name}</h2>
            <p>{status} {company && <span> at {company}</span>}</p>
            <p className='my-1'>{location && <span>{location}</span>}</p>
            <Link to={`/profile/${_id}`} className='btn btn-success'>
                View Profile
            </Link>
        </div>
        <ul>
            { skills.slice(0,4).map((skill,index)=>(
                <li key={index} className="text-primary lead">
                    <i className="fas fa-check-circle"></i> {skill}
                </li>
            ))}
        </ul>
    </div>;
};


export default ProfilesItem;