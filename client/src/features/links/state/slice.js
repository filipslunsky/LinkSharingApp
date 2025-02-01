import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const LINKS_URL = `${import.meta.env.VITE_API_URL}/links`;

const initialState = {
    links: [],
    linksStatus: '',
    editLinkStatus: '',
    newLinkStatus: '',
    deleteLinkStatus: '',
    editOrderStatus: '',
    linksMessage: '',
    error: null,
};

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
};

export const getLinks = createAsyncThunk('links/getLinks', async (_, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.post(
            `${LINKS_URL}/all`,
            { email: user.email },
            { headers }
        );
        return response.data.chats;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});


const linksSlice = createSlice({
    name: 'links',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLinks.pending, (state) => {
                state.linksStatus = 'loading';
                state.error = null;
            })
            .addCase(getLinks.rejected, (state, action) => {
                state.linksStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(getLinks.fulfilled, (state, action) => {
                state.linksStatus = 'success';
                state.links = action.payload;
                state.error = null;
            })
    },
});


// export const {  } = linksSlice.actions;
export default linksSlice.reducer;