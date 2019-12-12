import React from 'react';

function HeaderLink(props) {
  return (
    <div className="cblt-menu-item">
      <div onClick={props.onClick} className="cblt-menu-item-text">
        {props.text}
      </div>
    </div>
  );
}

export class Header extends React.Component {
  render() {
    let pHandle = this.props.pageHandler;
    return (
      <div className="cblt-outer-container">
        <div className="cblt-inner-container">
          <div onClick={(e) => pHandle('home')} className="logo-container">
            <img alt="Company Logo" src="imgs/ic_munvo.png"/> 
            <div className="logo-text">Cobolt Bank</div>
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
