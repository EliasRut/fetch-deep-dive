import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    userRepos: []
  }

  loadRepos() {
    this.setState({userRepos: []});
    const userNameElement = document.getElementById('userName');
    const userName = userNameElement.value;

    fetch(`https://api.github.com/users/${userName}/repos`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const repoEntries = data.map((repo) => ({
          name: repo.name,
          link: repo.html_url
        }));

        this.setState({userRepos: repoEntries});
      });
    userNameElement.value = '';
  }

  render() {
    return (
      <div className="App">
        <div style={{marginBottom: 24}}>
          <div>Github User: <input name="userName" id="userName" /></div>
          <div><button onClick={() => this.loadRepos()}>Load Repos</button></div>
        </div>
        <div>Repositories:</div>
        { this.state.userRepos.length === 0 ? (
          <div>Loading...</div>
        ) : this.state.userRepos.map((repo) => (
          <div><a href={repo.link}>{repo.name}</a></div>
        ))}
      </div>
    );
  }
}

export default App;
