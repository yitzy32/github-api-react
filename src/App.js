import GitHubUser from './GitHubUser'
import RepoData from './RepoData'
import './App.css';

function App() {
  const login = "yitzy32";
  return (
    <div className="App">
      <GitHubUser login={login}/>
      <RepoData login={login}/>
    </div>
  );
}

export default App;
