import * as httpRequest from '~/utils/httpRequest'

const mangaService = {
    getSliderManga: async () => {
        try {
            const res = await httpRequest.get('comics/slider')

            return { success: true, data: res.data }
        } catch (error) {
            return { success: false, message: error.response.data.message }
        }
    },

    getTrendingManga: async () => {
        try {
            const res = await httpRequest.get('comics/trending')

            return { success: true, data: res.data }
        } catch (error) {
            return { success: false, message: error.response.data.message }
        }
    },

    getRecommendedManga: async () => {
        try {
            const res = await httpRequest.get('comics/recommended')

            return { success: true, data: res.data }
        } catch (error) {
            return { success: false, message: error.response.data.message }
        }
    },

    searchManga: async (keyword, type = 'less') => {
        try {
            const res = await httpRequest.get('comics/search', {
                params: {
                    q: keyword,
                    type,
                },
            })

            return { success: true, data: res.data }
        } catch (error) {
            return { success: false, message: error.response.data.message }
        }
    },
}

export default mangaService
