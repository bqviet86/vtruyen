import classNames from 'classnames/bind'
import { useState } from 'react'

import Loading from '~/components/Loading'
import { useLogin } from '~/hooks'
import styles from './AuthForm.module.scss'

const cx = classNames.bind(styles)

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { error, loading, login } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <>
            {error && <div className={cx('error')}>{error}</div>}
            <form onSubmit={handleSubmit}>
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
                <div className={cx('form-check')}>
                    <div className={cx('left')}>
                        <input type="checkbox" id="rememberme" />
                        <label htmlFor="rememberme">Ghi nhớ tôi</label>
                    </div>
                    <div className={cx('right')}>
                        <button onClick={(e) => e.preventDefault()}>Quên mật khẩu?</button>
                    </div>
                </div>
                <div className={cx('form-submit')}>
                    <button type="submit" className={cx('submit-btn')}>
                        Đăng nhập
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

export default LoginForm
