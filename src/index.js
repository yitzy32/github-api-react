import React, {
  useState,
  useEffect
} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function GitHubUser({login}) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`https://api.github.com/users/${login}`)
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
  }, []);

  if (data) {
    console.log(data.created_at)
    return (
      <div>
        <h1>{data.login}</h1>
        <img src={data.avatar_url} width={100}/>
        <a href={data.html_url}>View on Github</a>
        <p>{data.location}</p>
        <p>{data.public_repos} public repos</p>
        <p>Github user since: {data.created_at}</p>
      </div>
    )
  }
  return null;
}

function App() {
  return <GitHubUser login="yitzy32"/>;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
