import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import styles from './Footer.module.scss'
import images from '~/assets/images'

const cx = classNames.bind(styles)

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('top')}>
                    <Link to="/" className={cx('logo')}>
                        <img src={images.logo_1} alt="logo" />
                    </Link>
                </div>
                <div className={cx('links')}>
                    <Link to="/terms-of-service" className={cx('link')}>
                        Điều khoản dịch vụ
                    </Link>
                    <Link to="/privacy-policy" className={cx('link')}>
                        Chính sách riêng tư
                    </Link>
                    <Link to="/dmca" className={cx('link')}>
                        DMCA
                    </Link>
                    <Link to="/contact" className={cx('link')}>
                        Liên hệ
                    </Link>
                </div>
                <p className={cx('desc')}>
                    VTruyen không lưu trữ bất kì tệp tin nào trên máy chủ, chúng tôi chỉ liên kết tới những phương tiện
                    truyền thông được lưu trữ bên dịch vụ thứ 3.
                </p>
                <p className={cx('copyright')}>© VTruyen.to</p>
            </div>
        </footer>
    )
}

export default Footer
