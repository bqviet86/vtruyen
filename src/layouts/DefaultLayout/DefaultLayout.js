import classNames from 'classnames/bind'
import { useLocation } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './DefaultLayout.module.scss'

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    const { pathname } = useLocation()

    return (
        <div className={cx('wrapper')}>
            <Header higher={pathname === '/'} />

            <div className={cx('container')}>{children}</div>

            <Footer />
        </div>
    )
}

export default DefaultLayout
