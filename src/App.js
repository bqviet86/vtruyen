import { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import Wrapper from './Wrapper'
import routes from '~/routes'
import { useLogout } from './hooks'

function App() {
    const { logout } = useLogout()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            const { exp } = jwtDecode(user.token)

            if (Date.now() >= exp * 1000) {
                logout()
            }
        }
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
