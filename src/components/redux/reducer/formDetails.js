import { USER_ADDRESS_DATA, USER_PERSONAL_DATA } from "../constant";

const initialState = {
  formData: [],
  formDataPart: {},
};

export default function formReducer  (state = initialState, action) {
  switch (action.type) {
    case USER_PERSONAL_DATA:
      return {
        ...state,
        formDataPart: action.payload,
      };
    case USER_ADDRESS_DATA:

    let temp = {...state.formDataPart, ...action.payload};
    let temp2 = [...state.formData];
    temp2.push(temp);


    
      return {
        ...state,
        formData: temp2,
      };
   
    default:
      return state;
  }
};
