import React from 'react';


export default class FormBox extends React.Component {
  static defaultProps = {
    onClick: null,
    buttonText: "Next",
    onClickFail: null,
    buttonTextFail: null
  }


  render() {
    var classname = "cblt-box";
    if (this.props.solo) {
      classname = "cblt-box cblt-box-solo";
    }
    return (
      <div className={classname}>
        {this.props.children}
        <button className="button-success" onClick={this.props.onClick}>{this.props.buttonText}</button>
        {this.props.buttonTextFail && 
        <button className="button-fail" style={{"marginTop": "1rem"}} onClick={this.props.onClickFail}>{this.props.buttonTextFail}</button>}
      </div>  
    );
  }
}
