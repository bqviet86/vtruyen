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
    widthFull = false,
    size = 'md',
    bg = '',
    disabled = false,
    IconLeft = '',
    IconRight = '',
    className,
    children,
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

    const styles = {
        width: widthFull ? '100%' : 'auto',
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
