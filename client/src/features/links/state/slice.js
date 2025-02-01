import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const LINKS_URL = `${import.meta.env.VITE_API_URL}/links`;

const initialState = {
    links: [],
    linksStatus: '',
    currentLinks: [],
    updateLinksStatus,
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

        const response = await axios.put(
            `${LINKS_URL}/all`,
            { email: user.email },
            { headers }
        );
        
        return response.data.links;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const updateLinks = createAsyncThunk('links/updateLinks', async (linksArr, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.post(
            `${LINKS_URL}/all`,
            {
                email: user.email,
                links: linksArr,
            },
            { headers }
        );

        return response.data.links;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

const linksSlice = createSlice({
    name: 'links',
    initialState,
    reducers: {
        addNewLink: () => {},
        updateLink: () => {},
        updateLinksOrder: () => {},
        deleteLink: () => {},
    },
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
            .addCase(updateLinks.pending, (state) => {
                state.updateLinksStatus = 'loading';
                state.error = null;
            })
            .addCase(updateLinks.rejected, (state, action) => {
                state.updateLinksStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(updateLinks.fulfilled, (state, action) => {
                state.updateLinksStatus = 'success';
                state.links = action.payload;
                state.error = null;
            })
    },
});


// export const {  } = linksSlice.actions;
export default linksSlice.reducer;