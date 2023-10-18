import axios from 'axios'
import jwtDecode from 'jwt-decode'

const api = axios.create({
    baseURL: process.env.API_URL, // http://localhost:8000
})

const isAccessTokenExpired = (access_token) => {
    const { exp } = jwtDecode(access_token)

    return Date.now() >= exp * 1000
}

const saveTokens = (access_token, refresh_token) => {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
}

// Hàm để gọi API refresh token
function callRefreshTokenAPI(refresh_token) {
    return api
        .post('/users/refresh-token', {
            refreshToken: refresh_token,
        })
        .then((response) => {
            // Lấy access token mới và refresh token mới từ response
            const newAccessToken = response.data.result.access_token
            const newRefreshToken = response.data.result.refresh_token

            // Lưu access token mới và refresh token mới
            saveTokens(newAccessToken, newRefreshToken)

            // Trả về access token mới để sử dụng trong interceptor
            return newAccessToken
        })
}

// Thêm interceptor cho request
api.interceptors.request.use(
    (config) => {
        const access_token = localStorage.getItem('access_token')

        // Kiểm tra nếu access token hết hạn
        if (access_token && isAccessTokenExpired(access_token)) {
            const refresh_token = localStorage.getItem('refresh_token')

            // Gọi API refresh token và trả về access token mới
            return callRefreshTokenAPI(refresh_token).then((accessToken) => {
                // Cập nhật access token mới vào header của request
                config.headers.Authorization = `Bearer ${accessToken}`

                return config
            })
        }

        // Nếu access token chưa hết hạn, trả về request config ban đầu
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

export default api
