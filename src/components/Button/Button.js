import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    primary = false,
    secondary = false,
    tertiary = false,
    quaternary = false,
    quinary = false,
    widthFull = false,
    rounded = false,
    roundSpace = 0,
    size = 'md',
    color = '',
    bg = '',
    disabled = false,
    IconLeft = '',
    IconRight = '',
    className,
    children,
    style = {},
    ...passProps
}) {
    let Comp = 'button'
    const props = {
        ...passProps,
    }

    if (to) {
        props.to = to
        Comp = Link
    } else if (href) {
        props.href = href
        Comp = 'a'
    }

    // Remove event listeners when disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key]
            }
        })
    }

    const classes = cx(className, 'wrapper', {
        primary,
        secondary,
        tertiary,
        quaternary,
        quinary,
        rounded,
        disabled,
        small: size === 'sm',
        small2: size === 'sm2',
        medium2: size === 'md2',
        medium3: size === 'md3',
        large: size === 'lg',
        large2: size === 'lg2',
        iconLeft: IconLeft,
        iconRight: IconRight,
    })

    const roundedStyles = rounded ? { marginRight: roundSpace } : {}

    const styles = {
        ...style,
        ...roundedStyles,
        width: widthFull ? '100%' : 'auto',
        color,
        backgroundColor: bg,
    }

    return (
        <Comp className={classes} style={styles} {...props}>
            {IconLeft}
            <span>{children}</span>
            {IconRight}
        </Comp>
    )
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    IconLeft: PropTypes.node,
    IconRight: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
}

export default Button
