import React, {
  useState,
  useEffect
} from 'react';
import axios from 'axios'

const LanguageList = (props) => {
  const [data, setData] = useState(null);

  const fetchAllRepoData = async () => {
    const headers = {
      "Authorization": `Token ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
    console.log("props.login:", props.login, "props.repoName", props.repoName)
    props.languageList.forEach(url => {
      axios.get(`${url}`, {
        "method": "GET",
        "headers": headers  
      }).then((response) => {
        console.log(response.data)
      })
    });
  }

  useEffect(() => {
    if(props.login && props.repoName){
        fetchAllRepoData()}
  }, [props.login, props.repoName]);
  
  if (data) {
    return (
      <div>
        <p>Here is data: {data}</p>
      </div>
    );
  }
  return <div>hello</div>
}
 
export default LanguageList;