
import React from 'react';
import Modal from 'react-modal';
import {FormText, ReactiveForm} from './CommonForms';
import {CbltMessage, track} from './Common';
import {dataObject} from './DataObject';

const modalStyles = {
  content : {
    position: 'relative',
    backgroundColor: 'white',
    border: '0px solid rgb(204, 204, 204)',
    boxShadow: '2px 2px 16px black',
    maxWidth: '960px',
    width: '100%',
    minHeight: '400px',

    zIndex: 9001
  },
  overlay : {
    display: 'flex',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.8)',

    zIndex: 9000
  }
}
Modal.setAppElement('#root')

export class CbltLoginModal extends ReactiveForm {
  constructor(props) {
    super(props);
    this.state = this.reset();

    // Return function for setting open
    if (props.controllerCB) {
      props.controllerCB(this.setOpen)
    }
  }

  setOpen = (open) => {
    this.setState({open: open,
      message: "",
      username: dataObject.g.login.username,
      passphrase: ""});
  }

  reset = () => {
    return {open: false, username: "", passphrase: "", message: "", messagetype: "fail"} 
  }

  handleCloseModal = () => {
    this.setState({open: false})
  }

  handleSuccess = (event) => {
    event.preventDefault();
    if (this.state.username.length > 0 && this.state.passphrase.length > 0) {
      // "Valid" email
      this.setState({message: "Successful Login", "messagetype": "success"});

      dataObject.update({login: {username: this.state.username, logstatus: "Logged in"}});
      track('login');
      
      setTimeout(() => {this.state.open && this.setState({open: false})}, 1000)

    } else {
      this.setState({message: "Login Failed", "messagetype": "fail"});
    }
  }

  render() {
    return (
      <Modal isOpen={this.state.open} contentLabel="Login Modal" closeTimeoutMS={500} 
          style={modalStyles}>
        <div className="cblt-section-title"> Login to Cobalt Bank </div>
        <div className="cblt-form-container">
          <form className="cblt-form cblt-form-solo" onSubmit={this.handleSuccess}>
            <FormText
              label="email"
              labeltext="Email"
              type="email"
              name="username"
              value={this.state.username}
              {...this.c}
            />
            <FormText
              label="passphrase"
              labeltext="Passphrase"
              type="password"
              name="passphrase"
              value={this.state.passphrase}
              {...this.c}
            />
            <div className="inline-buttons">
              <button className="button-success">Login</button>
              <button onClick={this.handleCloseModal} type="button" className="button-fail">Close</button>
            </div>
          </form>
          {this.state.message && <CbltMessage type={this.state.messagetype}>
            {this.state.message}
          </CbltMessage>}
        </div>
      </Modal>
    );
  }
}
