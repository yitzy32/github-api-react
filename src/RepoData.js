import React, {
  useState,
  useEffect
} from 'react';

function RepoData({login}) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const headers = {
      "Authorization": `Token ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
    fetch(`https://api.github.com/users/${login}/repos?per_page=100`, {
      "method": "GET",
      "headers": headers
    })
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
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
    return(
      <h2>Most recently pushed Repo: {repoName}</h2>
    )
  }
  return null
}
 
export default RepoData;