import { USER_ADDRESS_DATA, USER_PERSONAL_DATA } from "../constant"

export const userPersonalData = (data) => {
    return {
        type: USER_PERSONAL_DATA,
        payload: data
    }
}
export const userAddressData = (data) => {
    return {
        type: USER_ADDRESS_DATA,
        payload: data
    }
}