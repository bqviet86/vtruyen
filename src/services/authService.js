import { httpRequest } from '~/utils'

const authService = {
    signup: async (data) => {
        try {
            const res = await httpRequest.post('user/signup', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            return { success: true, data: res.data }
        } catch (error) {
            return { success: false, message: error.response.data.message }
        }
    },

    login: async (data) => {
        try {
            const res = await httpRequest.post('user/login', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            return { success: true, data: res.data }
        } catch (error) {
            return { success: false, message: error.response.data.message }
        }
    },

    refreshToken: async (user) => {
        try {
            const res = await httpRequest.get(`user/refreshToken/${user.email}`)

            return { success: true, data: res.data }
        } catch (error) {
            return { success: false, message: error.response.data.message }
        }
    },
}

export default authService
