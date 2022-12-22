import { configureStore } from '@reduxjs/toolkit'

import { authFormSlice, userSlice, searchFormSlice } from './slice'

const store = configureStore({
    reducer: {
        showAuthForm: authFormSlice.reducer,
        user: userSlice.reducer,
        showSearchForm: searchFormSlice.reducer,
    },
})

export default store
