import classNames from 'classnames/bind'

import styles from './Loading.module.scss'

const cx = classNames.bind(styles)

function Loading({ type = 'primary', color = '#5f25a6' }) {
    return (
        <>
            {type === 'primary' && (
                <svg className={cx('primary')} viewBox="25 25 50 50">
                    <circle cx="50" cy="50" r="20" style={{ stroke: color }}></circle>
                </svg>
            )}

            {type === 'secondary' && (
                <div className={cx('secondary')} style={{ borderColor: `${color} transparent` }}></div>
            )}

            {type === 'tertiary' && (
                <div className={cx('tertiary')}>
                    {[1, 2, 3].map((item) => (
                        <div key={item} style={{ backgroundColor: color }}></div>
                    ))}
                </div>
            )}

            {type === 'quaternary' && (
                <div className={cx('quaternary')}>
                    {[1, 2, 3, 4].map((item) => (
                        <span key={item} style={{ backgroundColor: color }}></span>
                    ))}
                </div>
                // <div className={cx('quaternary')}></div>
            )}
        </>
    )
}

export default Loading
