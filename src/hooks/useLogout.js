import { useDispatch } from 'react-redux'

import { userSlice } from '~/redux/slice'

const useLogout = () => {
    const dispatch = useDispatch()

    const logout = () => {
        // Remove user from localStorage
        localStorage.removeItem('user')

        // Dispatch state user
        dispatch(userSlice.actions.logout())
    }

    return { logout }
}

export default useLogout
