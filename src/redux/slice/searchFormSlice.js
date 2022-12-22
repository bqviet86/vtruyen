import { createSlice } from '@reduxjs/toolkit'

const searchFormSlice = createSlice({
    name: 'searchForm',
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

export default searchFormSlice
