import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'

import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

function Modal({ children, title, showModal, closeModal }) {
    const handleStopPropagation = (e) => {
        e.stopPropagation()
    }

    return (
        <div className={cx('overlay', { show: showModal })} onClick={closeModal}>
            <div className={cx('wrapper')} onClick={handleStopPropagation}>
                <div className={cx('header')}>
                    <div className={cx('close-btn')} onClick={closeModal}>
                        <Icon icon="ph:x-bold" />
                    </div>
                    <h5 className={cx('title')}>{title}</h5>
                </div>

                <div className={cx('body')}>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </div>
    )
}

export default Modal
