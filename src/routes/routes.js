import config from '~/config'

import DefaultLayout, { NoHeaderLayout } from '~/layouts'

import Home from '~/pages/Home'
import MangaDetails from '~/pages/MangaDetails'
import MangaRead from '~/pages/MangaRead'

const routes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.mangaDetails, component: MangaDetails, layout: DefaultLayout },
    { path: config.routes.mangaRead, component: MangaRead, layout: NoHeaderLayout },
]

export default routes
