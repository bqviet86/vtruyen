import { createSlice } from '@reduxjs/toolkit'

const authFormSlice = createSlice({
    name: 'authForm',
    initialState: false,
    reducers: {
        close() {
            return false
        },
        open() {
            return true
        },
    },
})

export default authFormSlice
