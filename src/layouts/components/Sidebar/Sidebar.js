import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '~/components/Button'
import { handleScrollbar } from '~/utils'
import genres from '~/components/Genres/genresLocal'
import images from '~/assets/images'
import styles from './Sidebar.module.scss'

const cx = classNames.bind(styles)

const menuItems = [
    {
        title: 'Trang chủ',
        to: '/',
    },
    {
        title: 'Truyện tranh',
        links: [
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
        title: 'Hoàn thành',
        to: '/completed',
    },
    {
        title: 'Danh sách A-Z',
        to: '/az-list',
    },
    {
        title: 'Random',
        to: '/random',
    },
    {
        title: 'Mới cập nhật',
        to: '/new-update',
    },
    {
        title: 'Thể loại',
        menu: genres,
    },
]

function Sidebar({ showSidebar, setShowSidebar }) {
    const [displayNumber, setDisplayNumber] = useState(10)

    const handleCloseForm = () => {
        handleScrollbar.appearScrollbar()
        setShowSidebar(false)
    }

    const handleStopPropagation = (e) => {
        e.stopPropagation()
    }

    const handleClickMore = () => {
        setDisplayNumber(genres.length)
    }

    return (
        <div className={cx('overlay', { show: showSidebar })} onClick={handleCloseForm}>
            <div className={cx('wrapper')} onClick={handleStopPropagation}>
                <div className={cx('header')}>
                    <Button
                        rounded
                        roundSpace={6}
                        color="var(--secondary-text-color)"
                        bg="var(--tertiary-bg-color)"
                        children=<Icon icon="ph:caret-left-bold" />
                        onClick={handleCloseForm}
                    />
                    <img src={images.logo_1} className={cx('logo')} alt="logo" />
                </div>
                <ul className={cx('menu-list')}>
                    {menuItems.map((menuItem) => {
                        const Tag = menuItem.to ? Link : 'div'
                        const props = menuItem.to ? { to: menuItem.to, onClick: handleCloseForm } : {}

                        return (
                            <li key={menuItem.title} className={cx('menu-item')}>
                                <Tag className={cx('item-link')} {...props}>
                                    {menuItem.to ? menuItem.title : <strong>{menuItem.title}</strong>}
                                </Tag>
                                {menuItem.links && (
                                    <div className={cx('links-wrap')}>
                                        {menuItem.links.map((link) => (
                                            <Button
                                                key={link.title}
                                                to={link.to}
                                                quaternary
                                                children={link.title}
                                                size="sm"
                                                color="var(--secondary-text-color)"
                                                bg="var(--tertiary-bg-color)"
                                                onClick={handleCloseForm}
                                            />
                                        ))}
                                    </div>
                                )}
                                {menuItem.menu && (
                                    <ul className={cx('sub-menu')}>
                                        {menuItem.menu.map((item, index) => {
                                            if (index < displayNumber) {
                                                return (
                                                    <li key={item.slug} className={cx('sub-menu-item')}>
                                                        <Link to={item.slug} onClick={handleCloseForm}>
                                                            {item.label}
                                                        </Link>
                                                    </li>
                                                )
                                            } else {
                                                return null
                                            }
                                        })}
                                        {displayNumber < genres.length && (
                                            <li className={cx('sub-menu-item')}>
                                                <span onClick={handleClickMore}>
                                                    <Icon icon="ic:round-add" />
                                                    Thêm
                                                </span>
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
