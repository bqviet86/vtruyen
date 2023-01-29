import { httpRequest } from '~/utils'

const pageService = {
    getPages: async (comicId, number) => {
        try {
            const res = await httpRequest.get(`pages`, {
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

export default pageService
