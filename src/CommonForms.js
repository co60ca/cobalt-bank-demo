import React from 'react';
import './App.css';

export function FormText(props) {
	return (<>
    <label className="cblt-form-label" htmlFor={props.label}>{props.labeltext}</label>
    <input className="cblt-form-input" id={props.label} type={props.type} name={props.name} defaultValue={props.value}/>		
	</>);
}

export class PaymentDetails extends React.Component {
  static defaultProps = {
    nextpage: "flow7"
  }
	render() {
		return (
		<div className="cblt-inner-container">
      <div className="cblt-feature-container">
        <form className="cblt-form" action="">
          <p>Billing Address</p>
          <FormText label="firstname" labeltext="First Name" type="text" name="firstname" value="John" />	
          <FormText label="lastname" labeltext="Last Name" type="text" name="lastname" value="Doe" />	
          <FormText label="streetaddress" labeltext="Street Address" type="text" name="streetaddress" value="355 Adelaide" />	
          <FormText label="city" labeltext="City" type="text" name="city" value="Toronto" />	
          <FormText label="state" labeltext="State/Province" type="text" name="state" value="Ontario" />	
          <FormText label="country" labeltext="Country" type="country" name="country" value="Canada" />	
        </form>
        <form className="cblt-form" action="">
          <p>Card Details</p>
          <FormText label="card" labeltext="Card" type="text" name="card" value="1234567890123456" />	
          <FormText label="name" labeltext="Name on Card" type="text" name="name" value="John Doe" />	
          <FormText label="securitycode" labeltext="Security Code" type="text" name="securitycode" value="123" />	
          <FormText label="expires" labeltext="Expiry Date" type="date" name="expires" value="2021-01-01" />	
        </form>
      </div>
      <button className="button-success-small" onClick={() => this.props.pager(this.props.nextpage)}>Complete Order</button>
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
        You will shortly get an email with your reciept, and terms and conditions.
      </p>
		</div>
    </>
		);
	}
}

export class EnterYourDetails extends React.Component {
  static defaultProps = {
    nextpage: "flow3"
  }
	render() {
		return (
    <> 
    <div className="cblt-feature-text-box-center">
      Let us know a little bit about you.
    </div>
		<div className="cblt-inner-container">
      <div className="cblt-form-container">
        <form className="cblt-form cblt-form-solo" action="">
          <FormText label="firstname" labeltext="First Name" type="text" name="firstname" value="John" />	
          <FormText label="lastname" labeltext="Last Name" type="text" name="lastname" value="Doe" />	
          <FormText label="email" labeltext="Email" type="email" name="email" value="joe@example.com" />	
          <FormText label="dateofbirth" labeltext="Date of Birth" type="date" name="dateofbirth" value="1993-05-12" />
          <button className="button-success-small" onClick={() => this.props.pager(this.props.nextpage)}>Next</button>
        </form>
      </div>
		</div>
    </>
		);
	}
}

export class EnterYourWorkHomeDetails extends React.Component {
  static defaultProps = {
    nextpage: "flow4"
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
          <FormText label="homeworth" labeltext="Home Worth" type="number" name="homeworth" value="455000" />	
          <FormText label="morgage" labeltext="Morgage or Rent" type="number" name="morgage" value="1950" />	

          <FormText label="streetaddress" labeltext="Street Address" type="text" name="streetaddress" value="355 Adelaide" />	
          <FormText label="city" labeltext="City" type="text" name="city" value="Toronto" />	
          <FormText label="state" labeltext="State/Province" type="text" name="state" value="Ontario" />	
          <FormText label="country" labeltext="Country" type="country" name="country" value="Canada" />	

          <FormText label="otherexpenses" labeltext="Other Monthly Expenses" type="number" name="otherexpenses" 
          value="200" />	
          <FormText label="jobtitle" labeltext="Job Title" type="text" name="jobtitle" value="Application Consultant" />	
          <FormText label="grossincome" labeltext="Gross Income" type="number" name="grossincome" value="6259" />	
          <button className="button-success-small" onClick={() => this.props.pager(this.props.nextpage)}>Next</button>
        </form>
      </div>
		</div>
    </>
		);
	}
}
