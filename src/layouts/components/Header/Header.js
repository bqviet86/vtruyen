import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import NavbarItem from './NavbarItem'
import Search from '../Search'
import Menu from '~/components/Menu'
import AuthForm from '~/components/AuthForm'
import { useLogout } from '~/hooks'
import { authFormSlice } from '~/redux/slice'
import { showAuthFormSelector, userSelector } from '~/redux/selectors'
import images from '~/assets/images'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

const navItems = [
    {
        title: 'Thể loại',
        menu: ['Action', 'Adventure', 'Comedy', 'Horror'],
    },
    {
        title: 'Truyện tranh',
        menu: ['Manga', 'Manhua', 'Manhwa', 'Doujinshi'],
    },
    {
        title: 'Mới cập nhật',
        menu: null,
    },
    {
        title: 'Bảng xếp hạng',
        menu: null,
    },
]

function Header({ primary, secondary }) {
    const dispatch = useDispatch()
    const isShow = useSelector(showAuthFormSelector)
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
        dispatch(authFormSlice.actions.open())
    }

    return (
        <>
            <header className={cx('wrapper', { secondary: !primary && secondary })}>
                <div className={cx('content')}>
                    <nav className={cx('navbar')}>
                        <Link to="/" style={{ display: 'flex' }}>
                            {(primary && <img src={images.logo_1} className={cx('logo')} alt="logo" />) ||
                                (secondary && <img src={images.logo_2} className={cx('logo')} alt="logo" />)}
                        </Link>
                        {navItems.map((navItem, index) => (
                            <NavbarItem key={index} title={navItem.title} menu={navItem.menu} />
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
            <AuthForm isShow={isShow} />
        </>
    )
}

export default Header
