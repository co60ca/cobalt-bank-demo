import React from 'react';
import './App.css';
import HomeContent from './Home';
import Insurance from './Insurance';
import Credit from './Credit';
import dataStore, {dataObject, modify} from './DataObject';
import {changeURL} from './Common';
import {CbltLoginModal} from './Login'

class App extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "home"
    };
		if (document.location.pathname) {
      let split = document.location.pathname.split("/");
			this.state.currentPage = split[1] || "home";
		}

    window.dataObject = dataObject; 
    window.dataStore = dataStore; 
    window.modify = modify; 
  }
 
  setPage(page, args={}) {
/*    if (page instanceof HashChangeEvent) {
      page = document.location.hash.substring(1);
    }*/
    // Data Layer
//    dataObject.update({internalName: page});

    if (page === 'login' && this.loginhandler) {
      this.loginhandler(true); 
      return;
    }
    if (page === 'logout') {
      return;
    }

    this.setState({currentPage: page, args: args});
		//document.location.hash = page;
    changeURL({}, page, `/${page}`);
  }

  render() {
    let args = this.state.args;
    return (
      <>
        <CbltLoginModal controllerCB={(handler) => {this.loginhandler = handler}}/>
        {this.state.currentPage === 'home' && <HomeContent {...args} pageHandler={this.setPage.bind(this)}/>}
        {this.state.currentPage === 'insurance' && <Insurance {...args} pageHandler={this.setPage.bind(this)}/>}
        {this.state.currentPage === 'credit' && <Credit {...args} pageHandler={this.setPage.bind(this)}/>}
      </>
    );
  }
}

export default App;
