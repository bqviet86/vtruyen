import classNames from 'classnames/bind'
import { useState } from 'react'
import PropTypes from 'prop-types'

import images from '~/assets/images'
import styles from './Image.module.scss'

const cx = classNames.bind(styles)

function Image({ src, alt, fallback: customFallback = images.noImage, ...props }) {
    const [fallback, setFallback] = useState('')

    const handleError = () => {
        setFallback(customFallback)
    }

    return <img src={fallback || src} alt={alt} className={cx('wrapper')} onError={handleError} {...props} />
}

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    fallback: PropTypes.string,
}

export default Image
