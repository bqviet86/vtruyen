import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { authService } from '~/services'
import { authFormSlice, userSlice } from '~/redux/slice'

const useLogin = () => {
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const login = async (email, password) => {
        setError(null)
        setLoading(true)

        const res = await authService.login({ email, password })

        if (res.success) {
            // Save user to localStorage
            localStorage.setItem('user', JSON.stringify(res.data))

            // Update state { showAuthForm, user }
            dispatch(userSlice.actions.login(res.data))
            dispatch(authFormSlice.actions.close())
        } else {
            setError(res.message)
        }

        setLoading(false)
    }

    return { error, loading, login }
}

export default useLogin
