import { createSlice, configureStore } from '@reduxjs/toolkit';
import lodash from 'lodash';

const initialState = {
  internalName: "home",
  name: "Home Page",
  section: null,
  product: {
    internalName: null,
    name: null,
    revenue: null,
  },
  internalCampaign: null,
  upsellCampaign: null,
  user: {
    first: null,
    last: null,
    email: null,
    dob: null,
    billingAddress: {
      first: null,
      last: null,
      street: null,
      city: null,
      state: null,
      country: null,
    },
    card: {
      cardn: null,
      name: null,
      securityCode: null,
      expiryDate: null
    }
  },
  creditCheck: {
    homeWorth: null,
    morgage: null,
      street: null,
      city: null,
      state: null,
      country: null,
      otherExpense: null,
      jobTitle: null,
      grossIncome: null
  },
  insuranceAddress: {
    street: null,
    city: null,
    state: null,
    country: null,
    value: null,
  },
  travel: {
    destination: null,
    departureDate: null,
    returnDate: null,
  },
  login: {
    username: null,
    visid: null,
    logstatus: "Logged out"
  }

}

const dataObjectSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    modify(state, action) {
      state = action.payload;
      return state;
    }
  }
});

const store = configureStore({
    reducer: {
      global: dataObjectSlice.reducer
    }
});

const _dataObject = {
  get g() {return store.getState().global;},
  replace(newstate) {store.dispatch(dataObjectSlice.actions.modify(newstate))},
  update(newstate) {
    const newObj = lodash.merge({}, store.getState().global, newstate);
    store.dispatch(dataObjectSlice.actions.modify(newObj));
  },

};

export const {modify} = dataObjectSlice.actions;
export {_dataObject as dataObject};
export default store;

