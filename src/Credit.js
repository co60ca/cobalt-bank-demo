
import React from 'react';
import {changeURL, Header, CbltImg} from './Common.js';
import FormContainer from './FormContainer.js';
import {EnterYourDetails, EnterYourWorkHomeDetails, ThanksForYourOrder} from './CommonForms';
import {dataObject} from './DataObject.js';
import './App.css';

const pageLookup = {
  "credit-flow1": "Credit - Start",
  "credit-flow2": "Credit - Personal Details",
  "credit-flow3": "Credit - Work Home Details",
  "credit-flow4": "Credit - Select Upsell Package",
  "credit-flow5": "Credit - User Confirmation of Application",
  "credit-flow6": "Credit - Confirmation of Application",
}

const fadeTimer = 500;

export default class Credit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "flow1",
      fade: "out-start"
    }
    this.setPage = this.setPage.bind(this);

    setTimeout(this.setPage, 1, this.state.currentPage, this.state.type);
  }

	setPage = (pagename, type, skip) => {
    // Don't change backwards, fixes a problem with flow5 looping
    if (this.state.currentPage > pagename) {
      return;
    }
    switch (this.state.fade) {
      case "fadein":
        // To fade out
        if (this.state.currentPage !== pagename) {
          this.setState({fade: "fadeout"});
          setTimeout(this.setPage, fadeTimer, pagename, type);
        }
        break;
      case "fadeout":
        // To be "out"
        this.setState({fade: "out"});
        setTimeout(this.setPage, 1, pagename, type);
        break;
      case "out-start":
      case "out":
        // To fade in
        this.setState({fade: "fadein", currentPage: pagename});
        if (type) {
          this.setState({fade: "fadein", currentPage: pagename, type: type});
        }
        let internalPage = `credit-${pagename}`
        changeURL({}, pageLookup[internalPage], `/credit/${pagename}`);
        dataObject.update({internalName: internalPage, name: pageLookup[internalPage]});
        setTimeout(this.setPage, fadeTimer, pagename, type);
        break;
      default:
        break;
    }
	}

  render() {
    var page = null;
    switch (this.state.currentPage) {
      case 'flow1': page = <CreditStart pager={this.setPage}/>; break;
      case 'flow2': page = <EnterYourDetails pager={this.setPage}/>; break;
      case 'flow3': page = <EnterYourWorkHomeDetails pager={this.setPage}/>; break;
      case 'flow4': page = <UpsellCredit pager={this.setPage}/>; break;
      case 'flow5': page = <ConfirmCredit pager={this.setPage}/>; break;
      case 'flow6': page = <ThanksForYourOrder pager={this.setPage}/>; break;
      default: ;
    }
    return (
      <>
      <Header pageHandler={(page) => {this.props.pageHandler(page); this.setState({currentPage:"flow1"})}}  />
      <div className={"cblt-outer-container cblt-outer-container-bottom cblt-page-" + this.state.fade}> 
          {page}
      </div>
      </>
      
    )
  }
}

function Features(props) {
  return (
    <div className="card-features" style={{marginBottom: "1rem"}}>
      <div>
        <label>Annual Fee: </label>
        <b>${props.fee}</b>
      </div>
      <div>
        <label>Rate: </label>
        <b>{props.rate}%</b>
      </div>
      <div>
        <label>Rewards: </label>
        <b>{props.cb}% Cashback</b>
      </div>
    </div>
  )
}

function Card(props) {
  return ( 
    <FormContainer onClick={props.onClick} {...props}>
      <div className="cblt-product-title">{props.title}</div>
      <div className="cblt-image-box">
        <CbltImg alt={"props.title"} src={props.img}/>
      </div>
      <p>{props.children}</p>
      <Features {...props}/>
    </FormContainer>
  );
}

const cardLookup = {
  "bronze-card": 60,
  "black-card": 210,
  "silver-card": 120
}

class CreditStart extends React.Component {
 
  clickHandle = (page, productInternal, productName) => {
    this.props.pager(page);
    dataObject.update({product: {
      internalName: productInternal,
      name: productName,
      revenue: cardLookup[productInternal]
    }});
  }

  render() {
    return (
      <>
        <CbltImg alt="person tapping card against mobile scanner from another person"
        className="cblt-banner-image" src={process.env.PUBLIC_URL + "/imgs/card-hand.jpg"}/>
        <div className="cblt-inner-container">
          <div className="cblt-section-title">Credit products at Cobalt</div>
        </div>
          <div className="cblt-feature-text-box-center">
            Get the credit card that works for you!
          </div>
        <div className="cblt-inner-container">
        <p>
       It's convenient, convenient! With the choice to complete your payment online or on the day of your order, you'll save money by not needing to worry about incoming bills or coordinating all your payments. Cobalt will automatically bill you for the fees, if any, associated with your order, plus you'll qualify for the Cobalt Cash back on your purchases in the meantime. 
        </p>
        <div className="cblt-feature-container-3">
          <Card title="Bronze Card" img="/imgs/bronze-card.jpg" fee="0" rate="21.0" cb="0"
          onClick={() => this.clickHandle('flow2', 'bronze-card', 'Bronze Card')}>
            Limited Starbucks® travel. Also, call our Travelers Assistance Line at 800-555-2077 Monday-Friday between 8:00 AM to 6:00 PM PST. We are happy to help our customers find the appropriate travel credit to meet their needs.  To schedule an appointment, please call our telephone number (800-555-2077) or complete the Online Request for Referral form and send it to...
          </Card>
          <Card title="Black Card" img="/imgs/black-card.jpg" fee="210" rate="19.90" cb="3" 
          onClick={() => this.clickHandle('flow2', 'black-card', 'Black Card')}>
            Choose a card that offers travel points that go up significantly as the price of your trips go up. Travel a lot? Get a card that rewards you with travel points you can redeem!
          </Card>
          <Card title="Silver Card" img="/imgs/silver-card.jpg" fee="60" rate="20.00" cb="1"
          onClick={() => this.clickHandle('flow2', 'silver-card', 'Silver Card')}>
            Silver mastercard credit card, even in cash.  Hello, you've reached the hidden page that guarantees your precious wallet may never get lost again! All the cards have been marked with the letter "e" inside the card, to reflect the hidden line.  Discovering a £10 Super Deluxe Deed Card You really need to read this one, as it completely changes the direction of these credit cards.
          </Card>
        </div>
        </div>
      </> 
    );
  }
}

class UpsellCredit extends React.Component {
  constructor(props) {
    super(props);
    // If we already have a black card, skip
    if (dataObject.g.product.internalName === 'black-card') {
      props.pager('flow5');
      return;
    }
  }
  
  clickHandle = (page, productInternal, productName) => {
    this.props.pager(page);
    dataObject.update({
      product: {
        internalName: productInternal,
        name: productName,
        revenue: cardLookup[productInternal]
      },
      upsellCampaign: `upsell-${productInternal}`
    });
  }

	render() {
		return (
		<div className="cblt-inner-container">
      <div className="cblt-feature-container-solo">
        <Card title="Black Card" img="/imgs/black-card.jpg" fee="210" rate="19.90" cb="3"
        onClick={() => this.clickHandle('flow5', 'black-card', 'Black Card')}
        solo={true}
        buttonText="Yes, accept the new offer"
        buttonTextFail="No, stick with my previous offer"
        onClickFail={() => this.props.pager('flow5')}>
          You qualify for the Black Card, would you like to apply to this card instead?
        </Card>
      </div>
		</div>
		);
	}
}

class ConfirmCredit extends React.Component {
	render() {
		return (
		<div className="cblt-inner-container">
      <div className="cblt-feature-container-solo">
        <div className="cblt-box-solo">
          <div className="cblt-section-title">
            You're almost done
          </div>
          <p>Confirm your application below</p>
          <button className="button-success" onClick={() => this.props.pager('flow6')}>Confirm Application</button>
        </div>
      </div>
		</div>
		);
	}
}

