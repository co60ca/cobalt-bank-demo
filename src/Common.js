import React from 'react';
import {dataObject} from './DataObject';
import store from './DataObject';

var oldState = "";
store.subscribe(() => {
  let state = dataObject.g.internalName;
  if (state !== oldState) {
//    console.log(`Saw page change ${state}`);
    track('page-change');
  }
  oldState = state;
})

const pageLookup = {
  credit: "Credit Cards",
  insurance: "Insurance Offerings",
  home: "Home Page",
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
  render() {
    let pHandle = (page) => {
      this.props.pageHandler(page);
      dataObject.update({internalName: page, name: pageLookup[page]});
    }
    return (
      <div className="cblt-outer-container cblt-header">
        <div className="cblt-inner-container">
          <div className="logo-container">
            <div onClick={(e) => pHandle('home')} className="cblt-clickable">
              <img width="48px" alt="Company Logo" src="/imgs/ic_munvo.png"/> 
              <div className="logo-text">Cobalt Bank</div>
            </div>
            <div className="login-text">Sign In</div>
          </div>
        </div>
        <div className="cblt-menu-bg">
          <div className="cblt-inner-container">
            <div className="cblt-menu">
              <HeaderLink onClick={(e) => pHandle('home')} text="Home" />
              <HeaderLink onClick={(e) => pHandle('insurance')} text="Insurance" />
              <HeaderLink onClick={(e) => pHandle('credit')} text="Credit Cards" />
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
