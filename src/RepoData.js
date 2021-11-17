import React, {
  useState,
  useEffect
} from 'react';
import MostRecentlyPushed from './MostRecentlyPushed';

function RepoData(props) {
  const [data, setData] = useState(null);

  const fetchAllRepoData = () => {
    const headers = {
      "Authorization": `Token ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
    fetch(`https://api.github.com/users/${props.login}/repos?per_page=100`, {
      "method": "GET",
      "headers": headers
    })
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
  }

  useEffect(() => {
    fetchAllRepoData()
  }, []);

  if (data) {
    let lastPushedMs = new Date(data[0].pushed_at).getTime();
    let repoName = "";
    for (const repo of data) {
      let pushedAtMs = new Date(repo.pushed_at).getTime();
      if (pushedAtMs > lastPushedMs) {
        lastPushedMs = pushedAtMs;
        repoName = repo.name;
      }
    }
    console.log("repoName:", repoName, "lastPushedMs:", lastPushedMs)
    const lastPushed = new Date(lastPushedMs).toString();
    // .toString -> Tue Nov 16 2021 09:10:57 GMT-0500 (Eastern Standard Time)
    // .slice(0, 25) -> Tue Nov 16 2021 09:10:57
    return(
      <div>
        <h2>Most recently pushed Repo: {repoName}. Last Pushed at {lastPushed}<MostRecentlyPushed repoName={repoName} login={props.login}/></h2>
      </div>
    )
  }
  return null
}
 
export default RepoData;