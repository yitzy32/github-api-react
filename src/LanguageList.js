import React, {
  useState,
  useEffect
} from 'react';
import axios from 'axios'

const LanguageList = (props) => {
  const [data, setData] = useState(null);
  let tracker = {};

  const fetchAllRepoData = async () => {
    const headers = {
      "Authorization": `Token ${process.env.REACT_APP_GITHUB_TOKEN}`
    }

    console.log("props.login:", props.login, "props.repoName", props.repoName)
    Promise.all(props.languageList.map(url => {
      return axios.get(`${url}`, {
        "method": "GET",
        "headers": headers
      }).then((response) => {
        let keys = Object.keys(response.data)
        keys.map(l => {
          if (tracker[l]) {
            tracker[l] += 1
          } else {
            tracker[l] = 1
          }
        })
      })
    })).then(() => {
      setData(tracker);
    })
  }

  useEffect(() => {
    if(props.login && props.repoName){
      fetchAllRepoData()
    }
  }, [props.login, props.repoName]);
  
  if (data) {
    return (
      <div>
        {data && (
          <div>User has:
          {Object.keys(data).map((lang, i)=> {
          return (
            <div key={i}>{data[lang]} repositories containing {lang}</div>
          )
          })}
        </div>
        )}
      </div>
    );
  } else {
    return null
  }
}
 
export default LanguageList;