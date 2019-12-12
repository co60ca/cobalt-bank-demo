import React from 'react';
import {Header} from './Common.js';
import FormBox from './FormContainer.js';
import {EnterYourDetails, ThanksForYourOrder, PaymentDetails, FormText} from './CommonForms';
import './App.css';

export default class Insurance extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: "flow1",
      type: "travel"
    }
    this.setPage = this.setPage.bind(this);
  }

	setPage(pagename, type) {
		this.setState({currentPage: pagename});
    if (type) {
      this.setState({currentPage: pagename, type: type});
    }
	}

  render() {
    var page = null;
    switch (this.state.currentPage) {
      case 'flow1': page = <InsuranceStart pager={this.setPage}/>; break;
      case 'flow2': page = <EnterYourDetails pager={this.setPage}/>; break;
      case 'flow3':
        if (this.state.type === "travel") {
          page = <EnterYourTrip pager={this.setPage}/>; break;
        } else if (this.state.type === "home") {
          page = <SelectCoverage pager={this.setPage}/>; break;
        }
        break;
      case 'flow4': page = <SelectInsurance type={this.state.type} pager={this.setPage}/>; break;
      case 'flow5': page = <UpsellInsurance type={this.state.type} pager={this.setPage}/>; break;
      case 'flow6': page = <PaymentDetails pager={this.setPage}/>; break;
      case 'flow7': page = <ThanksForYourOrder pager={this.setPage}/>; break;
      default: ;
    }
    return (
      <>
      <Header pageHandler={(page) => {this.props.pageHandler(page); this.setPage("flow1")}} />
      <div className="cblt-outer-container cblt-outer-container-bottom">
        {page}
      </div>
      </>
      
    )
  }
}

class InsuranceStart extends React.Component {
  
  render() {
    return (
    <>
      <img alt="person sitting in an airport with a bag" className="cblt-banner-image" src="imgs/insurance.jpg"/>
      <div className="cblt-inner-container">
        <div className="cblt-section-title">Insurance offerings at Cobolt</div>
      </div>
        <div className="cblt-feature-text-box-center">
          What type of insurance are you looking for?
        </div>
      <div className="cblt-inner-container">
        <p>
        Cobalt Insurance offerings come in three main parts: health, financial, and home and auto.  This first section is primarily for those with a direct obligation to purchase or rebuild property. In order to secure an effective Cobalt car insurance policy you must either qualify for one of our standard policies or choose a Cobalt package that has a personalized benefit. Any savings earned when purchasing a Cobalt policy will be reimbursed in full by the person that purchases the Cobalt policies.
        </p>
        <div className="cblt-feature-container">
          <FormBox onClick={() => this.props.pager('flow2', "travel")}>
            <div className="cblt-product-title">Travel Medical Insurance</div>
            <div className="cblt-image-box">
              <img alt="plane taking off" src="imgs/plane.jpg"/>
            </div>
            <p>Cobalt Medical Travel Insurance gives you piece of mind when traveling. Not only do our experts, like your doctor, provide you with expert, advice, but our travel experts work together to create your personalized travel plan. We are more than willing to help you make your vacation a much better experience. You can get access to travel insurance with Cobalt Medical Travel Insurance.  All you need to do is answer a few questions and Cobalt Medical Travel Insurance will provide the right travel insurance solution for you.  Ready to Start Traveling?</p>
          </FormBox>
          <FormBox onClick={() => this.props.pager('flow2', "home")}>
            <div className="cblt-product-title">Home Owner's Insurance</div>
            <div className="cblt-image-box">
              <img alt="family with a mother father and two children" src="imgs/family-home.jpg"/>
            </div>
            <p>Cobalt Bank protects families from all types of disasters and provides an extensive and dedicated line of insurance for them. Our insurance covers you for:  Hurricane and Flood Damage  Home Fires  Buildings Collapse  Signage loss  Insurance may be expensive. But your home insurance is a commitment from you to yourself, to your family and to your business. Here at Cobalt Bank we are there for you.</p>
          </FormBox>
        </div>
      </div>
    </>
    );
  }
}



class EnterYourTrip extends React.Component {
	render() {
		return (
    <> 
    <div className="cblt-feature-text-box-center">
      Let us know about your trip.
    </div>
		<div className="cblt-inner-container">
      <div className="cblt-form-container">
        <form className="cblt-form cblt-form-solo" action="">
          <FormText label="location" labeltext="Location" type="text" name="location" value="Montreal" />	
          <FormText label="departure" labeltext="Departure" type="date" name="departure" value="2020-09-23" />	
          <FormText label="return" labeltext="Return" type="date" name="return" value="2020-09-30" />	
          <button className="button-success-small" onClick={() => this.props.pager('flow4')}>Next</button>
        </form>
      </div>
		</div>
    </>
		);
	}
}

class SelectCoverage extends React.Component {
	render() {
		return (
    <> 
    <div className="cblt-feature-text-box-center">
      Tell us about your house?
    </div>
		<div className="cblt-inner-container">
      <div className="cblt-form-container">
        <form className="cblt-form cblt-form-solo" action="">
          <FormText label="streetaddress" labeltext="Street Address" type="text" name="streetaddress" value="355 Adelaide" />	
          <FormText label="city" labeltext="City" type="text" name="city" value="Toronto" />	
          <FormText label="state" labeltext="State/Province" type="text" name="state" value="Ontario" />	
          <FormText label="country" labeltext="Country" type="country" name="country" value="Canada" />	
          
          <FormText label="value" labeltext="Insured Value" type="number" name="value" value="600000" />	
          <button className="button-success-small" onClick={() => this.props.pager('flow4')}>Next</button>
        </form>
      </div>
		</div>
    </>
		);
	}
}

function InsurOption(props) {
  return ( 
    <FormBox onClick={props.onClick} {...props}>
      <div className="cblt-product-title">{props.title}</div>
      <div className="cblt-image-box">
        <img alt={props.imgalt} src={props.img}/>
      </div>
      <p>{props.children}</p>
      <p><b>Cost:</b> ${props.cost}</p>
    </FormBox>
  );
}

class SelectInsurance extends React.Component {
	render() {

    var inner = null;

    if (this.props.type === "travel") {
        inner = (
        <>
          <InsurOption title="Standard Travel Insurance" img="imgs/standard-travel.jpg"
          imgalt="a suitcase filled with things"
          cost="69.99"
          onClick={() => this.props.pager('flow5')}>
          If you don't qualify for the other kinds of benefits, look for one of the best protection deals, offered by the grandfathered plans described above. Once you have this coverage, look to add essential care to your policies.
          </InsurOption>
          <InsurOption title="Premium Travel Insurance" img="imgs/premium-travel.jpg"
          imgalt="workspace with a phone, coffe, passport, sunglasses, and camera" 
          cost="129.99"
          onClick={() => this.props.pager('flow6')}>
          Insurance companies offer policies with company-imposed deductible, minimum or maximum coverage and/or rate caps that are specific to your region and type of claim. Companies use various methods to "punish" consumers for making claims. For example, the GEICO policy stated, "if a claim is made against your policy within a 15 year period and you did not purchase insurance within a certain time period, a 10 percent penalty will be assessed to your insurance policy for each year you were not insured and you cannot make new claims for 12 months."
          </InsurOption>
        </>
        );
    } else if (this.props.type === "home") {
        inner = (
        <>
          <InsurOption title="Basic Home Insurance" img="imgs/standard-insurance.jpg"
          imgalt="small victorian white house with porch"
          cost="69.99 monthly"
          onClick={() => this.props.pager('flow5')}>
            Basic coverage home insurance just covers the basics. Like fire, burglery. Upgrade to Premium to cover flood damage.
          </InsurOption>
          <InsurOption title="Premium Home Insurance" img="imgs/premium-insurance.jpg" 
          imgalt="mansion with many rooms and windows behind a pond in the foreground"
          cost="79.99 monthly"
          onClick={() => this.props.pager('flow6')}>
            Premium all coverage home insurance covers absolutely everything including floods and we know you live a flood plane so you better get this one or your house is a goner.
          </InsurOption>
        </>
        );

    }

		return (
    <> 
    <div className="cblt-feature-text-box-center">
      Which package would you like?
    </div>
		<div className="cblt-inner-container">
      <div className="cblt-feature-container">
        {inner}
      </div>
		</div>
    </>
		);
	}
}

class UpsellInsurance extends React.Component {
	render() {

    var inner = null;
    if (this.props.type === "travel") {
        inner = <InsurOption title="Premium Travel Insurance" img="imgs/premium-travel.jpg"
        imgalt="workspace with a phone, coffe, passport, sunglasses, and camera" 
        cost="116.99"
        onClick={() => this.props.pager('flow6')}
        solo={true}
        buttonText="Yes, accept the new offer"
        buttonTextFail="No, stick with my previous offer"
        onClickFail={() => this.props.pager('flow6')}>
          Are you sure you wouldn't prefer the Premium package? Select this offer now for a 10% discount.
        </InsurOption>
    } else if (this.props.type === "home") {
        inner = <InsurOption title="Premium Home Insurance" img="imgs/premium-insurance.jpg"
        imgalt="mansion with many rooms and windows behind a pond in the foreground"
        cost="69.99"
        onClick={() => this.props.pager('flow6')}
        solo={true}
        buttonText="Yes, accept the new offer"
        buttonTextFail="No, stick with my previous offer"
        onClickFail={() => this.props.pager('flow6')}>
          Are you sure you wouldn't prefer the Premium package? Select this offer now for a 10$ off discount for your first 3 months.
        </InsurOption>
    }

		return (
		<div className="cblt-inner-container">
      <div className="cblt-feature-container-solo">
        {inner}
      </div>
		</div>
		);
	}
}

