import {createSlice} from '@reduxjs/toolkit'
import { dummyListings, dummyUsers } from '../../assets/assets'

const listingSlice =createSlice({
    name: 'listing',
    initialState: {
        listings: dummyListings,
        userListings: dummyUsers,
        balance: {
              earn: 0,
              withdrawn: 0,
              available: 0
        }
    },
    reducers: {
        setListings: (state, action) =>{
            state.listings =action.payload
        }
    }
})
export const {setListings} = listingSlice.actions;

export default listingSlice.reducer