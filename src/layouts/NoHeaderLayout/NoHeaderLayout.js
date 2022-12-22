import classNames from 'classnames/bind'

import styles from './NoHeaderLayout.module.scss'

const cx = classNames.bind(styles)

function NoHeaderLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>{children}</div>
        </div>
    )
}

export default NoHeaderLayout
