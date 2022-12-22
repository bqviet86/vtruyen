import * as httpRequest from '~/utils/httpRequest'

const authService = {
    signup: async (data) => {
        try {
            const res = await httpRequest.post('user/signup', { ...data })

            return { success: true, data: res.data }
        } catch (error) {
            return { success: false, message: error.response.data.message }
        }
    },

    login: async (data) => {
        try {
            const res = await httpRequest.post('user/login', { ...data })

            return { success: true, data: res.data }
        } catch (error) {
            return { success: false, message: error.response.data.message }
        }
    },
}

export default authService
