import classNames from 'classnames/bind'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import Loading from '~/components/Loading'
import { useSignup } from '~/hooks'
import { userSelector } from '~/redux/selectors'
import styles from './AuthForm.module.scss'

const cx = classNames.bind(styles)

function SignupForm({ handleCloseForm }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const currentUser = useSelector(userSelector)
    const { error, loading, signup } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!currentUser) {
            const isSuccessSignup = await signup(name, email, password, confirmPassword)

            if (isSuccessSignup) {
                setName('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                handleCloseForm()
            }
        }
    }

    return (
        <>
            {error && <div className={cx('error')}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label className={cx('label')} htmlFor="name">
                        họ và tên
                    </label>
                    <input
                        className={cx('form-input')}
                        id="name"
                        placeholder="VD: Nguyẽn Văn A"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('label')} htmlFor="email">
                        địa chỉ email
                    </label>
                    <input
                        className={cx('form-input')}
                        id="email"
                        type="email"
                        placeholder="VD: abc@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('label')} htmlFor="password">
                        mật khẩu
                    </label>
                    <input
                        className={cx('form-input')}
                        id="password"
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('label')} htmlFor="confirm-password">
                        nhập lại mật khẩu
                    </label>
                    <input
                        className={cx('form-input')}
                        id="confirm-password"
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className={cx('form-submit')}>
                    <button type="submit" className={cx('submit-btn')}>
                        Đăng ký
                    </button>
                </div>
            </form>
            {loading && (
                <div className={cx('loading')}>
                    <Loading type="tertiary" width={100} />
                </div>
            )}
        </>
    )
}

export default SignupForm
