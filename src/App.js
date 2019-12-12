import React from 'react';
import './App.css';
import HomeContent from './Home';
import Insurance from './Insurance';
import Credit from './Credit';

class App extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "home"
    };
		if (document.location.hash) {
			this.state.currentPage = document.location.hash.substring(1);
		}
    window.onhashchange = this.setPage.bind(this)
  }
 
  setPage(page) {
    if (page instanceof HashChangeEvent) {
      page = document.location.hash.substring(1);

    }
    this.setState({currentPage: page});
		document.location.hash = page;
  }

  render() {
    return (
      <>
        {this.state.currentPage === 'home' && <HomeContent pageHandler={this.setPage.bind(this)}/>}
        {this.state.currentPage === 'insurance' && <Insurance pageHandler={this.setPage.bind(this)}/>}
        {this.state.currentPage === 'credit' && <Credit pageHandler={this.setPage.bind(this)}/>}
      </>
    );
  }
}

export default App;
