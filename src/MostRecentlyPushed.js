import React, {
  useState,
  useEffect
} from 'react';
// import RepoData from "./RepoData"

const MostRecentlyPushed = (props) => {
  const [data, setData] = useState(null);

  const fetchMostRecentlyPushedData = () => {
    const headers = {
      "Authorization": `Token ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
    fetch(`https://api.github.com/repos/${props.login}/${props.repoName}/languages`, {
      "method": "GET",
      "headers": headers
    })
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
  }

  useEffect(() => {
    fetchMostRecentlyPushedData()
  }, []);

  let languages = {}
  if (data) {
    for (const lang in data) {
      languages[lang] = data[lang];
      console.log(`This app has ${data[lang]} charachters of ${lang}`)
    }
  }
  return (
    <div>
      <div>
        This app contains:
        {Object.keys(languages).map((lang, i)=> {
        return (
          <p key={i}>{languages[lang]} charachters of {lang}</p>
        )
        })}
      </div>
    </div>
     );
}
 
export default MostRecentlyPushed;