import { BrowserRouter as Router, Route } from 'react-router-dom'

import Wrapper from './Wrapper'
import routes from '~/routes'

function App() {
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
