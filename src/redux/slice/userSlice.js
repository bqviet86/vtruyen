import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: localStorage.getItem('user'),
    reducers: {
        login(state, action) {
            return action.payload
        },
        logout() {
            return null
        },
    },
})

export default userSlice
