import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../redux/profile/profile.actions';

const GithubRepos = ({githubusername,repos,getGithubRepos}) => {
    useEffect(()=>{
        getGithubRepos(githubusername);
    },[getGithubRepos,githubusername]);

    return (
        <div className="profile-github">
        <h2 className="text-dark my-1">Github Repos</h2>
        {repos.map(repo=>(
            <div key={repo.id} className="repo bg-white p-1 my-1">
                <div>
                    <h4><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></h4>
                    <p>{repo.description}</p>
                </div>
                <div>
                    <ul>
                        <li className="badge badge-primary p my">Stars: {repo.stargazers_count}</li>
                        <li className="badge badge-dark p my">Watchers: {repo.watchers_count}</li>
                        <li className="badge badge-light p my">Forks: {repo.forks_count}</li>
                    </ul>
                </div>
            </div>
        ))}
        </div>
    );
};
const mapStateToProps=({profile:{repos}})=>({
    repos
});
export default connect(mapStateToProps, { getGithubRepos })(GithubRepos);