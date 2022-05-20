import { createSlice } from '@reduxjs/toolkit';


const rootSlice = createSlice({
    name: "root",
    initialState: {
        website_url: 'instagram.com',
        carbon_per_webpage: .08,
        green_energy: true,
     
    },
    reducers: {
        chooseURL: (state, action) => { state.website_url = action.payload},
        chooseCarbon: (state, action ) => { state.carbon_per_webpage= action.payload},
        chooseEnergy: (state, action ) => { state.green_energy= action.payload}

    }
})

// Exporting those Reducers (so much typing :())
export const reducer = rootSlice.reducer;
export const { chooseURL, chooseCarbon, chooseEnergy } = rootSlice.actions