import { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'

import Wrapper from './Wrapper'
import routes from '~/routes'
import { authService } from '~/services'
import { useLogout } from './hooks'
import { userSlice } from './redux/slice'

function App() {
    const dispatch = useDispatch()
    const { logout } = useLogout()

    useEffect(() => {
        const handleExpire = async () => {
            const user = JSON.parse(localStorage.getItem('user'))

            if (user) {
                const { exp } = jwtDecode(user.token)

                if (Date.now() < exp * 1000) {
                    const res = await authService.refreshToken(user)

                    localStorage.setItem('user', JSON.stringify(res.data))
                    dispatch(userSlice.actions.login(res.data))
                } else {
                    logout()
                }
            }
        }

        handleExpire()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="App">
            <Router>
                <Wrapper>
                    {routes.map((route, index) => {
                        const Layout = route.layout
                        const Page = route.component

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        )
                    })}
                </Wrapper>
            </Router>
        </div>
    )
}

export default App
