import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import Button from '~/components/Button'
import { handleUrl } from '~/utils'
import styles from './Slider.module.scss'
import 'swiper/css/bundle'

const cx = classNames.bind(styles)

function SliderItem({ data, showEffect = false }) {
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
                    <Link to={`/manga/details/${data.slug}`} title={data.name} className={cx('name')}>
                        {data.name}
                    </Link>
                    <p className={cx('description')}>{data.review}</p>
                    <div className={cx('genres')}>
                        {data.genres.map((genre) => (
                            <span key={genre._id}>{genre.label}</span>
                        ))}
                    </div>
                    <div className={cx('contact')}>
                        <Button
                            to={`/manga/read/${handleUrl.slug(data.slug)}/chap-${handleUrl.chapter(
                                data.oldChapter.slice(8),
                            )}`}
                            primary
                            children="Đọc ngay"
                            className={cx('btn')}
                        />
                        <Button to={`/manga/details/${data.slug}`} children="Chi tiết" className={cx('btn')} />
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
