import classNames from 'classnames/bind'

import Slider from './Slider'
import MangaList from '~/components/MangaList'
import Genres from '~/components/Genres'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider-wrap')}>
                <Slider />
            </div>
            <div className={cx('manga-trending')}>
                <MangaList slider trending heading="Trending" itemStyle="secondary" displayItem={6} space={20} />
            </div>
            <Genres />
            <div className={cx('manga-recommended')}>
                <MangaList slider recommended heading="Truyện đề cử" itemStyle="primary" displayItem={8} space={20} />
            </div>
        </div>
    )
}

export default Home
