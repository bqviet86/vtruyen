import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import NavbarItem from './NavbarItem'
import Search from '../Search'
import Sidebar from '../Sidebar'
import Menu from '~/components/Menu'
import AuthForm from '~/components/AuthForm'
import { useLogout } from '~/hooks'
import { userSelector } from '~/redux/selectors'
import { handleScrollbar } from '~/utils'
import images from '~/assets/images'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

const navItems = [
    {
        title: 'Hoàn thành',
        to: '/completed',
    },
    {
        title: 'Thể loại',
        menu: [
            { title: 'Manga', to: '/genre/manga-112' },
            { title: 'One shot', to: '/genre/one-shot' },
            { title: 'Doujinshi', to: '/genre/doujinshi' },
            { title: 'Live action', to: 'genre/live-action' },
            { title: 'Manhwa', to: '/genre/manhwa-11400' },
            { title: 'Manhua', to: '/genre/manhua' },
            { title: 'Comic', to: '/genre/comic' },
        ],
    },
    {
        title: 'Danh sách A-Z',
        to: '/az-list',
    },
    {
        title: 'Mới cập nhật',
        to: '/new-update',
    },
]

function Header({ higher = false }) {
    const [showAuthForm, setShowAuthForm] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const currentUser = useSelector(userSelector)
    const { logout } = useLogout()

    const menuItems = [
        {
            title: 'Thông tin tài khoản',
            to: '/user/profile',
            iconLeft: <Icon icon="mingcute:user-3-fill" />,
        },
        {
            title: 'Truyên đang đọc',
            to: '/user/reading-list',
            iconLeft: <Icon icon="material-symbols:bookmark" />,
        },
        {
            title: 'Đăng xuất',
            onClick: logout,
            iconRight: <Icon icon="ph:arrow-right-bold" />,
            color: '#111',
            bg_color: '#ffd702',
        },
    ]

    const handleOpenAuthForm = () => {
        handleScrollbar.hideScrollbar()
        setShowAuthForm(true)
    }

    const handleOpenSidebar = () => {
        handleScrollbar.hideScrollbar()
        setShowSidebar(true)
    }

    return (
        <>
            <header className={cx('wrapper', { higher })}>
                <div className={cx('menu-btn')} onClick={handleOpenSidebar}>
                    <Icon icon="mi:menu" />
                </div>
                <Link to="/" className={cx('logo')}>
                    <img src={images.logo_1} alt="logo" />
                </Link>
                <div className={cx('content')}>
                    <nav className={cx('navbar')}>
                        {navItems.map((navItem, index) => (
                            <NavbarItem key={index} {...navItem} />
                        ))}
                    </nav>
                    <nav className={cx('navbar')}>
                        <Search />
                        <div className={cx('user-wrap')}>
                            {currentUser ? (
                                <Menu data={menuItems}>
                                    <div className={cx('user')}>
                                        <img src={images.avatars.DragonBall[0]} className={cx('avatar')} alt="avatar" />
                                    </div>
                                </Menu>
                            ) : (
                                <div className={cx('user')} onClick={handleOpenAuthForm}>
                                    <Icon icon="mingcute:user-3-line" />
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </header>
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <AuthForm showAuthForm={showAuthForm} setShowAuthForm={setShowAuthForm} />
        </>
    )
}

export default Header
