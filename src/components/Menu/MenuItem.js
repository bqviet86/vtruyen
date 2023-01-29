import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

function MenuItem({ title, to, href, onClick = () => {}, iconLeft, iconRight, color, bg_color, className }) {
    let Comp = 'button'
    const props = { onClick }

    if (to) {
        props.to = to
        Comp = Link
    }
    if (href) {
        props.href = href
        Comp = 'a'
    }

    if (color) {
        props.style = { color }
    }
    if (bg_color) {
        props.style = {
            ...props.style,
            backgroundColor: bg_color,
        }
    }

    return (
        <Comp className={cx('menu-item', className)} {...props}>
            {iconLeft && <span className={cx('icon', 'icon-left')}>{iconLeft}</span>}
            <span>{title}</span>
            {iconRight && <span className={cx('icon', 'icon-right')}>{iconRight}</span>}
        </Comp>
    )
}

export default MenuItem
