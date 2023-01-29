const handleView = {
    formatView: (view) => {
        return new Intl.NumberFormat('en-US').format(view)
    },
}

export default handleView
