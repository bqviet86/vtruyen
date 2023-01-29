import classNames from 'classnames/bind'
import HeadlessTippy from '@tippyjs/react/headless'

import MenuItem from './MenuItem'
import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

function Menu({ children, data, className }) {
    return (
        <div>
            <HeadlessTippy
                interactive
                hideOnClick
                trigger="click"
                placement="bottom-end"
                offset={[0, 3]}
                render={(attrs) => (
                    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                        {data.map((item, index) => (
                            <MenuItem key={index} {...item} className={className} />
                        ))}
                    </div>
                )}
            >
                {children}
            </HeadlessTippy>
        </div>
    )
}

export default Menu
