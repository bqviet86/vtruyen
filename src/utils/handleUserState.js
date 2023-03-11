const handleUserState = (user) => (typeof user === 'string' ? JSON.parse(user) : user)

export default handleUserState
