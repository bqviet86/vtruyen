import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import Button from '~/components/Button'
import styles from './Slider.module.scss'
import 'swiper/css/bundle'

const cx = classNames.bind(styles)

function SliderItem({ data, showEffect = false }) {
    const handleSlug = (slug) => {
        return slug.slice(0, slug.lastIndexOf('-'))
    }

    return (
        <div className={cx('slider-wrap')}>
            <div className={cx('slider')}>
                <div
                    className={cx('slider-img')}
                    style={{
                        backgroundImage: `url(${data.thumbnail})`,
                    }}
                ></div>
                <div className={cx('content')}>
                    <div className={cx('new-chapter')}>{data.newChapter}</div>
                    <Link to={`/manga/details/${data.slug}`} className={cx('name')}>
                        {data.name}
                    </Link>
                    <p className={cx('description')}>{data.review}</p>
                    <div className={cx('genres')}>
                        {data.genres.map((genre) => (
                            <span key={genre._id}>{genre.label}</span>
                        ))}
                    </div>
                    <div className={cx('contact')}>
                        <Button to={`/manga/read/${handleSlug(data.slug)}/chap-1`} primary children="Đọc ngay" />
                        <Button to={`/manga/details/${data.slug}`} children="Chi tiết" />
                    </div>
                </div>
                <div className={cx('thumbnail', { 'show-effect': showEffect })}>
                    <img src={data.thumbnail} alt="thumbnail" />
                </div>
            </div>
        </div>
    )
}

export default SliderItem
