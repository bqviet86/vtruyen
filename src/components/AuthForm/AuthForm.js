import classNames from 'classnames/bind'
import { useState } from 'react'

import Modal from '~/components/Modal'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { handleScrollbar } from '~/utils'
import styles from './AuthForm.module.scss'

const cx = classNames.bind(styles)

function AuthForm({ showAuthForm, setShowAuthForm }) {
    const [status, setStatus] = useState('login')

    const handleCloseForm = () => {
        handleScrollbar.appearScrollbar()
        setShowAuthForm(false)
    }

    const handleChangeForm = () => {
        status === 'login' ? setStatus('register') : setStatus('login')
    }

    return (
        <Modal
            title={status === 'login' ? 'Chào mừng trở lại!' : 'Tạo một tài khoản'}
            showModal={showAuthForm}
            closeModal={handleCloseForm}
        >
            <div className={cx('body')}>
                {status === 'login' ? (
                    <LoginForm handleCloseForm={handleCloseForm} />
                ) : (
                    <SignupForm handleCloseForm={handleCloseForm} />
                )}
            </div>

            <div className={cx('footer')}>
                <span>{status === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}</span>
                <button onClick={handleChangeForm}>{status === 'login' ? 'Đăng ký' : 'Đăng nhập'}</button>
            </div>
        </Modal>
    )
}

export default AuthForm
