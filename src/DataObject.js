import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  internalName: "home",
  name: "Home",
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
    //console.log(`Requested update to state:`);
    //console.log(newstate);
    const newObj = Object.assign(Object.assign({}, store.getState().global), newstate);
    store.dispatch(dataObjectSlice.actions.modify(newObj));
  },

};

export const {modify} = dataObjectSlice.actions;
export {_dataObject as dataObject};
export default store;

