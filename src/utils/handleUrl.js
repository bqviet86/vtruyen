const handleUrl = {
    slug: (slug) => {
        return slug.slice(0, slug.lastIndexOf('-'))
    },

    chapter: (chapter) => {
        return chapter.slice(0, chapter.indexOf(':') !== -1 ? chapter.indexOf(':') : undefined)
    },
}

export default handleUrl
