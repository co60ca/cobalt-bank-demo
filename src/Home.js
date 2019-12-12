import React from 'react';
import {Header} from './Common.js';
import FormContainer from './FormContainer.js';
import './App.css';

export default class HomeContent extends React.Component {
  
  render() {
    return (
    <>
      <Header pageHandler={this.props.pageHandler} />
      <div className="cblt-outer-container cblt-outer-container-bottom">
        <img alt="photograph of a bank" className="cblt-banner-image" src="imgs/bank.jpg"/>
        <div className="cblt-inner-container">
          <div className="cblt-section-title">Featured Deals</div>
          <p>
          Please consider some of our personalized deals!
          </p>
          <div className="cblt-feature-container">
            <FormContainer onClick={() => this.props.pageHandler("insurance")}>
              <div className="cblt-product-title">Premium Travel Insurance</div>
              <div className="cblt-image-box">
                <img alt="plane taking off" src="imgs/plane.jpg"/>
              </div>
              <div className="cblt-label">Customer Comments</div>
              <p className="cblt-quote">
              "The best thing I have ever done for my self insurance in over 8 years. Huge relief from everything but not losing a day of work. We have been paying about $90 a month since 2015 for the plan. Our current premiums are around $350 a month. It's a pretty great deal that doesn't make you feel like you're just ripping off insurance companies." <br/>
              "…was wondering what insurer that is offering cheap insurance"</p>
            </FormContainer>

            <FormContainer onClick={() => this.props.pageHandler("credit")}>
              <div className="cblt-product-title">Black Card</div>
              <div className="cblt-image-box">
                <img alt="black credit card" src="imgs/black-card.jpg"/>
              </div>
              <p>The black card benefits due to the co-equal employment provisions of the Convention and clause 12 of the GATT 1994 and the requirement to separate each trade in labour.  Our experience suggests that this is not the case. In 1984 we had an initial enquiry from a large multinational (United States of America, which produced toys for the European market) but later became the beneficiaries of a regular supply of children's animation products
              </p>
            </FormContainer>
          </div>
        </div>
      </div>
    </>
    );
  }
}
