import React from 'react';
import {dataObject} from './DataObject';
import store from './DataObject';

var oldState = "";

store.subscribe(() => {
  let state = dataObject.g.internalName;
  if (state !== oldState) {
    track('page-change');
  }
  oldState = state;
})

const pageLookup = {
  credit: "Credit Cards",
  insurance: "Insurance Offerings",
  home: "Home Page",
  login: "Login",
  logout: "Logout"
}

function HeaderLink(props) {
  return (
    <div className="cblt-menu-item">
      <div onClick={props.onClick} className="cblt-menu-item-text">
        {props.text}
      </div>
    </div>
  );
}

var te = true;
export function track(id, detail) {
  if (! window._satellite) {
    if (!te) {
      console.error('_satellite is undefined, tracking will fail');
      te = false;
    }
    return null;
  } 
  return window._satellite.track(id, detail);
}

export function changeURL() {
//  console.log('changeURL');
//  console.log(...arguments);
  return window.history.pushState(...arguments);
}

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLogin: false};    
  }

  componentDidMount() {
    this.unsub = store.subscribe(this.loginlistener);
  }

  componentWillUnmount() {
    this.unsub()
  }

  loginlistener = () => {
    let username = dataObject.g.login.username;
    this.setState({isLogin: username !== "" && username !== null});
  }

  logout = () => {
    dataObject.update({login: {username: "", logstatus: "Logged out"}});
    track('login');
  }

  pHandle = (page) => {
      this.props.pageHandler(page);
      let name = "page unknown";
      let section = dataObject.g.section;
      if (page in pageLookup) {
        name = pageLookup[page];
        // Section only set if it is one of the top level
        section = page;
      } else {
        console.error('Page not found in lookup of Header');
      }
        
      dataObject.update({internalName: page, name: name, section: section});
    }


  render() {
    return (
      <div className="cblt-outer-container cblt-header">
        <div className="cblt-inner-container">
          <div className="logo-container">
            <div onClick={(e) => this.pHandle('home')} className="cblt-clickable">
              <img width="48px" alt="Company Logo" src="/imgs/ic_munvo.png"/> 
              <div className="logo-text">Cobalt Bank</div>
            </div>
      {!this.state.isLogin 
        ? <div onClick={(e) => this.pHandle('login')} className="login-text">Sign In</div>
        : <>
          <div className="account-name">{dataObject.g.login.username}</div>   
          <div onClick={this.logout} className="login-text logout">Log out</div>
        </>
      }
          </div>
        </div>
        <div className="cblt-menu-bg">
          <div className="cblt-inner-container">
            <div className="cblt-menu">
              <HeaderLink onClick={(e) => this.pHandle('home')} text="Home" />
              <HeaderLink onClick={(e) => this.pHandle('insurance')} text="Insurance" />
              <HeaderLink onClick={(e) => this.pHandle('credit')} text="Credit Cards" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class CbltImg extends React.Component {
  constructor() {
    super()
    this.state = {fade: "out"}
  }

  render() {
    let classn = this.props.className || "";
    classn += " cblt-" + this.state.fade;
    let img = <img alt="silence warning about not setting props, img alt will be set by caller"
      {...this.props} onLoad={() => {this.setState({fade: "fadein-fast"});}} className={classn}/>;
    this.img = img;
    return (
      img
    );
  }
}

export class CbltMessage extends React.Component {
  render() {
   return (<div className={'message-' + this.props.type}>
      {this.props.children}
    </div>
   );
  }
}
