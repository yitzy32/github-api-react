import React, {
  useState,
  useEffect
} from 'react';
import moment from 'moment'
import RepoData from './RepoData';

function GitHubUser({login}) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const headers = {
      "Authorization": `Token ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
    fetch(`https://api.github.com/users/${login}`, {
      "method": "GET",
      "headers": headers
    })
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
  }, []);

  if (data) {
    const createdAt =  moment(data.created_at).format('MMMM Do YYYY')
    return (
      <div>
        <h1>{data.login}</h1>
        <img src={data.avatar_url} width={100}/>
        <a href={data.html_url}>View on Github</a>
        <p>{data.location}</p>
        <p>{data.public_repos} public repos</p>
        <p>Github user since: {createdAt}</p>
        <RepoData login={login}/>
      </div>
    )
  }
  return null;
}
 
export default GitHubUser;