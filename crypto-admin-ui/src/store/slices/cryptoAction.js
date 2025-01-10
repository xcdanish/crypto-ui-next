// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { dispatch } from '../index';
// import { setAuthSession } from 'config';

const PROXY = `${process.env.REACT_API_URL}crypto/`;

const initialState = {
  getCryptoCoinGraph: [],
  getCryptoCoinGraphLoading: true,
  getOrder: {},
  getOrderLoading: true
};

const slice = createSlice({
  name: 'Coin-Data',
  initialState,
  reducers: {
    GET_CRYPTO_DATA(state, action) {
      state.getCryptoCoinGraph = action.payload?.data;
      state.getCryptoCoinGraphLoading = false;
    },

    GET_ORDER_DATA(state, action) {
      state.getOrder = action.payload?.data;
      state.getOrderLoading = false;
    }

    // GET_PRODUCT_DETAILS_LIST(state, action) {
    //   state.getProductDetails = action.payload?.result;
    //   state.getProductDetailsLoading = false;
    // },

    // ClearProductDetails(state, action) {
    //   state.getProductDetails = null;
    //   state.getProductDetailsLoading = true;
    // }
  }
});

export const { ClearProductDetails } = slice.actions;
// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const GetCoinDataApi =
  (cryptoId = '') =>
  async () => {
    try {
      const response = await axios.get(`${PROXY}get?cryptoId=${cryptoId}`);
      dispatch(slice.actions.GET_CRYPTO_DATA(response.data));
      // console.log('🚀 ~ response:', response?.data);
      return response.data;
    } catch (error) {
      return error;
    }
  };

export const GetOrderApi = () => async () => {
  try {
    const response = await axios.get(`${PROXY}get-order`);
    dispatch(slice.actions.GET_ORDER_DATA(response.data));
    // console.log('🚀 ~ response:', response?.data);
    return response.data;
  } catch (error) {
    return error;
  }
};
// http://localhost:8080/api/crypto/get-order
// export const GetProductDetailsApi =
//   (id = '') =>
//   async () => {
//     try {
//       const response = await axiosHelper('get', `${PROXY}product/get-detail/${id}`);
//       dispatch(slice.actions.GET_PRODUCT_DETAILS_LIST(response.data));
//       return response.data;
//     } catch (error) {
//       return error;
//     }
//   };
