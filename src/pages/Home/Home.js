import classNames from 'classnames/bind'
import React from 'react'
import { useSelector } from 'react-redux'

import Slider from './Slider'
import MostView from './MostView'
import MangaList from '~/components/MangaList'
import Genres from '~/components/Genres'
import { userSelector } from '~/redux/selectors'
import images from '~/assets/images'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
    const user = useSelector(userSelector)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider-wrap')}>
                <Slider />
            </div>

            <div className={cx('manga-share')}>
                <div className={cx('image')}>
                    <img src={images.share} alt="share" />
                </div>
                <div className={cx('content')}>
                    <strong>Chia sẽ VTruyen</strong>
                    <p>đến bạn bè của bạn</p>
                </div>
            </div>

            <div className={cx('manga-trending')}>
                <MangaList slider trending heading="Xu hướng" itemStyle="secondary" displayItem={2} space={2} />
            </div>

            <Genres less />

            {user && (
                <div className={cx('manga-continue-reading')}>
                    <MangaList
                        slider
                        continueReading
                        content
                        heading="Tiếp tục đọc"
                        itemStyle="tertiary"
                        displayItem={2}
                        space={2}
                    />
                </div>
            )}

            <div className={cx('manga-recommended')}>
                <MangaList slider recommended heading="Truyện đề cử" displayItem={2} space={2} />
            </div>

            <div className={cx('manga-random')}>
                <MangaList
                    slider
                    random
                    content
                    heading="Random truyện"
                    itemStyle="tertiary"
                    displayItem={2}
                    space={2}
                />
            </div>

            <div className={cx('manga-lu-mv-wrapper')}>
                <div className={cx('manga-lu-mv-wrap')}>
                    <div className={cx('manga-latestUpdate')}>
                        <MangaList latestUpdate heading="Truyện mới cập nhật" itemStyle="quaternary" />
                    </div>

                    <div className={cx('manga-mostView')}>
                        <MostView />
                    </div>
                </div>
            </div>

            <div className={cx('manga-completed')}>
                <MangaList slider completed heading="Truyện đã hoàn thành" displayItem={2} space={2} />
            </div>
        </div>
    )
}

export default Home
