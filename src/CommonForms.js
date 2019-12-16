import React from 'react';
import {dataObject} from './DataObject.js';
import './App.css';

export class FormText extends React.Component {
  render() {
    let props = this.props;
    return (
      <>
        <label className="cblt-form-label" htmlFor={props.label}>
          {props.labeltext}
        </label>
        <input
          className="cblt-form-input"
          onChange={
            props.onChange
              ? e => props.onChange(props.name, e.target.value)
              : () => {}
          }
          id={props.label}
          type={props.type}
          name={props.name}
          defaultValue={props.value}
        />
      </>
    );
  }
}

export class ReactiveForm extends React.Component {
  constructor() {
    super();
    this.c = {onChange: this.setFormData};
  }

  setFormData = (key, value) => {
    this.setState({key, value});
    //console.log(`Debug: key: ${key}, value: ${value}`);
  };
}

export class PaymentDetails extends ReactiveForm {
  static defaultProps = {
    nextpage: 'flow7',
  };
  
  constructor() {
    super();
    this.state = {
      firstname: "John",
      lastname: "Doe",
      streetaddress: "355 Adelaide",
      city: "Toronto",
      state: "Ontario",
      country: "Canada",
      card: "1234567890123456",
      nameoncard: "John Doe",
      securitycode: "123",
      expires: "2021-01-01"
    };
  }

  buttonSuccess = () => {
    this.props.pager(this.props.nextpage);
    let s = this.state;
    dataObject.update({
      user: {
        billingAddress: {
          first: s.firstname,
          last: s.lastname,
          street: s.streetaddress,
          city: s.city,
          state: s.state,
          country: s.country,
        },
        card: {
          cardn: s.card,
          name: s.nameoncard,
          securityCode: s.securitycode,
          expiryDate: s.expires
        }
      },
    });
  };
  render() {
    return (
      <div className="cblt-inner-container">
        <div className="cblt-feature-container">
          <form className="cblt-form" action="">
            <p>Billing Address</p>
            <FormText
              label="firstname"
              labeltext="First Name"
              type="text"
              name="firstname"
              value={this.state.firstname}
              {...this.c}
            />
            <FormText
              label="lastname"
              labeltext="Last Name"
              type="text"
              name="lastname"
              value={this.state.lastname}
              {...this.c}
            />
            <FormText
              label="streetaddress"
              labeltext="Street Address"
              type="text"
              name="streetaddress"
              value={this.state.streetaddress}
              {...this.c}
            />
            <FormText
              label="city"
              labeltext="City"
              type="text"
              name="city"
              value={this.state.city}
              {...this.c}
            />
            <FormText
              label="state"
              labeltext="State/Province"
              type="text"
              name="state"
              value={this.state.state}
              {...this.c}
            />
            <FormText
              label="country"
              labeltext="Country"
              type="country"
              name="country"
              value={this.state.country}
              {...this.c}
            />
          </form>
          <form className="cblt-form" action="">
            <p>Card Details</p>
            <FormText
              label="card"
              labeltext="Card"
              type="text"
              name="card"
              value={this.state.card}
              {...this.c}
            />
            <FormText
              label="name"
              labeltext="Name on Card"
              type="text"
              name="nameoncard"
              value={this.state.nameoncard}
              {...this.c}
            />
            <FormText
              label="securitycode"
              labeltext="Security Code"
              type="text"
              name="securitycode"
              value={this.state.securitycode}
              {...this.c}
            />
            <FormText
              label="expires"
              labeltext="Expiry Date"
              type="date"
              name="expires"
              value={this.state.expires}
              {...this.c}
            />
          </form>
        </div>
        <button type="button" className="button-success-small" onClick={this.buttonSuccess}>
          Complete Order
        </button>
      </div>
    );
  }
}

export class ThanksForYourOrder extends React.Component {
  render() {
    return (
      <>
        <div className="cblt-feature-text-box-center">
          Thanks for your order!
        </div>
        <div className="cblt-inner-container">
          <p>
            You will shortly get an email with your reciept, and terms and
            conditions.
          </p>
        </div>
      </>
    );
  }
}

export class EnterYourDetails extends ReactiveForm {
  static defaultProps = {
    nextpage: 'flow3',
  };
  constructor() {
    super();
    this.state = {
      firstname: "John",
      lastname: "Doe",
      email: "johndoe@example.com",
      dateofbirth: "1993-05-12",
      homeworth: "455000"
    };
  }


  buttonSuccess = () => {
    let s = this.state;
    dataObject.update({
      user: {
        first: s.firstname,
        last: s.lastname,
        email: s.email,
        dob: s.dateofbirth,
      },
    });
    this.props.pager(this.props.nextpage);
  };
  render() {
    return (
      <>
        <div className="cblt-feature-text-box-center">
          Let us know a little bit about you.
        </div>
        <div className="cblt-inner-container">
          <div className="cblt-form-container">
            <form className="cblt-form cblt-form-solo" action="">
              <FormText
                label="firstname"
                labeltext="First Name"
                type="text"
                name="firstname"
                value={this.state.firstname}
                {...this.c}
              />
              <FormText
                label="lastname"
                labeltext="Last Name"
                type="text"
                name="lastname"
                value={this.state.lastname}
                {...this.c}
              />
              <FormText
                label="email"
                labeltext="Email"
                type="email"
                name="email"
                value={this.state.email}
                {...this.c}
              />
              <FormText
                label="dateofbirth"
                labeltext="Date of Birth"
                type="date"
                name="dateofbirth"
                value={this.state.dateofbirth}
                {...this.c}
              />
              <button
                type="button"
                className="button-success-small"
                onClick={this.buttonSuccess}>
                Next
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export class EnterYourWorkHomeDetails extends ReactiveForm {
  static defaultProps = {
    nextpage: 'flow4',
  };
  constructor() {
    super();
    this.state = {
      homeworth: "455000",
      morgage: "1990",
      streetaddress: "357 Adelaide",
      city: "Toronto",
      state: "Ontario", 
      country: "Canada",
      otherexpenses: "250",
      jobtitle: "Software Consultant",
      grossincome: "85000"
    }
  }

  buttonSuccess = () => {
    this.props.pager(this.props.nextpage);
    let s = this.state;
    dataObject.update({
      creditCheck: {
        homeWorth: s.homeworth,
        morgage: s.morgage,
        street: s.streetaddress,
        city: s.city,
        state: s.state,
        country: s.country,
        otherExpense: s.otherexpense,
        jobTitle: s.jobtitle,
        grossIncome: s.grossincome
      }
    });
  }
  render() {
    return (
      <>
        <div className="cblt-feature-text-box-center">
          Let us know about your expenses / assets.
        </div>
        <div className="cblt-inner-container">
          <div className="cblt-form-container">
            <form className="cblt-form cblt-form-solo" action="">
              <FormText
                label="homeworth"
                labeltext="Home Worth"
                type="number"
                name="homeworth"
                value={this.state.homeworth}
                {...this.c}
              />
              <FormText
                label="morgage"
                labeltext="Morgage or Rent"
                type="number"
                name="morgage"
                value={this.state.morgage}
                {...this.c}
              />

              <FormText
                label="streetaddress"
                labeltext="Street Address"
                type="text"
                name="streetaddress"
                value={this.state.streetaddress}
                {...this.c}
              />
              <FormText
                label="city"
                labeltext="City"
                type="text"
                name="city"
                value={this.state.city}
                {...this.c}
              />
              <FormText
                label="state"
                labeltext="State/Province"
                type="text"
                name="state"
                value={this.state.state}
                {...this.c}
              />
              <FormText
                label="country"
                labeltext="Country"
                type="country"
                name="country"
                value={this.state.country}
                {...this.c}
              />

              <FormText
                label="otherexpenses"
                labeltext="Other Monthly Expenses"
                type="number"
                name="otherexpenses"
                value={this.state.otherexpenses}
                {...this.c}
              />
              <FormText
                label="jobtitle"
                labeltext="Job Title"
                type="text"
                name="jobtitle"
                value={this.state.jobtitle}
                {...this.c}
              />
              <FormText
                label="grossincome"
                labeltext="Gross Income"
                type="number"
                name="grossincome"
                value={this.state.grossincome}
                {...this.c}
              />
              <button
                type="button"
                className="button-success-small"
                onClick={this.buttonSuccess}>
                Next
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
