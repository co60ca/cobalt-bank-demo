import React from 'react';
import {dataObject} from './DataObject.js';

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
  if (!te) {
    return null;
  }
  if (! window._satellite) {
    console.error('_satellite is undefined, tracking will fail');
    te = false;
    return null;
  } 
  return window._satellite.track(id, detail);
}

export function changeURL() {
//  console.log('changeURL');
//  console.log(...arguments);
  track('Page Change');
  return window.history.pushState(...arguments);
}

export class Header extends React.Component {
  render() {
    let pHandle = (page) => {
      this.props.pageHandler(page);
      dataObject.update({internalName: page, name: pageLookup[page]});
    }
    return (
      <div className="cblt-outer-container">
        <div className="cblt-inner-container">
          <div onClick={(e) => pHandle('home')} className="logo-container">
            <img alt="Company Logo" src="/imgs/ic_munvo.png"/> 
            <div className="logo-text">Cobalt Bank</div>
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
