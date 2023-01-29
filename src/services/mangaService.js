import { httpRequest } from '~/utils'

const mangaService = {
    getDetailsManga: async (slug, type = '') => {
        try {
            const res = await httpRequest.get(`comics/details/${slug}`, {
                params: {
                    type,
                },
            })

            return { success: true, data: res.data }
        } catch (error) {
            return { success: false, message: error.response.data.message }
        }
    },

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

    getCompletedManga: async (type = 'less') => {
        try {
            const res = await httpRequest.get('comics/completed', {
                params: {
                    type,
                },
            })

            return { success: true, data: res.data }
        } catch (error) {
            return { success: false, message: error.response.data.message }
        }
    },

    getRandomManga: async (randomComics) => {
        try {
            const res = await httpRequest.post('comics/random', {
                randomComics,
            })

            return { success: true, data: res.data }
        } catch (error) {
            return { success: false, message: error.response.data.message }
        }
    },

    getLatestUpdateManga: async (type = 'less') => {
        try {
            const res = await httpRequest.get('comics/latest-update', {
                params: {
                    type,
                },
            })

            return { success: true, data: res.data }
        } catch (error) {
            return { success: false, message: error.response.data.message }
        }
    },

    getMostViewManga: async (type = 'less') => {
        try {
            const res = await httpRequest.get('comics/most-view', {
                params: {
                    type,
                },
            })

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
