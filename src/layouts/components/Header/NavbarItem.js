import classNames from 'classnames/bind'
import HeadlessTippy from '@tippyjs/react/headless'
import { Icon } from '@iconify/react'
import { useState } from 'react'

import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function NavbarItem({ title, menu }) {
    const [hover, setHover] = useState(false)

    return (
        <div className={cx('item-wrap')}>
            {menu ? (
                <HeadlessTippy
                    interactive
                    interactiveBorder={15}
                    placement="bottom-start"
                    render={(attrs) => (
                        <ul
                            className={cx('box')}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            tabIndex="-1"
                            {...attrs}
                        >
                            {menu.map((item, index) => (
                                <li key={index}>
                                    <a href="/">{item}</a>
                                </li>
                            ))}
                        </ul>
                    )}
                >
                    <div className={cx('item')} style={hover ? { color: '#ffd702' } : {}}>
                        <span>{title}</span>
                        <Icon icon="ph:caret-down-bold" />
                    </div>
                </HeadlessTippy>
            ) : (
                <div className={cx('item')}>
                    <span>{title}</span>
                </div>
            )}
        </div>
    )
}

export default NavbarItem
