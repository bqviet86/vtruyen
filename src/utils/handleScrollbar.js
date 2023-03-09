const handleScrollbar = {
    hideScrollbar: () => {
        document.body.style.overflowY = 'hidden'
    },

    appearScrollbar: () => {
        document.body.style.overflowY = 'overlay'
    },
}

export default handleScrollbar
