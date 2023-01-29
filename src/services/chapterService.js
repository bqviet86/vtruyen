import { httpRequest } from '~/utils'

const chapterService = {
    getChapters: async (comicId) => {
        try {
            const res = await httpRequest.get(`chapters/${comicId}`)

            return { success: true, data: res.data }
        } catch (error) {
            return { success: false, message: error.response.data.message }
        }
    },

    getSiblingChapter: async (comicId, number) => {
        try {
            const res = await httpRequest.get(`chapters`, {
                params: {
                    comicId,
                    number,
                },
            })

            return { success: true, data: res.data }
        } catch (error) {
            return { success: false, message: error.response.data.message }
        }
    },
}

export default chapterService
