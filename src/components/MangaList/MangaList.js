import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import MangaItem from './MangaItem'
import { mangaService } from '~/services'
import styles from './MangaList.module.scss'
import 'swiper/css/bundle'

const cx = classNames.bind(styles)

function MangaList({
    slider = false,
    trending = false,
    recommended = false,
    heading = 'Manga list',
    itemStyle = 'primary',
    displayItem = 1,
    space = 0,
}) {
    const [mangas, setMangas] = useState([])
    const [disabledNavigationBtn, setDisabledNavigationBtn] = useState('prev')
    const sliderRef = useRef(null)

    const service = (trending && mangaService.getTrendingManga) || (recommended && mangaService.getRecommendedManga)

    useEffect(() => {
        const fetchData = async () => {
            const res = await service()

            if (res.success) {
                setMangas(res.data.comics)
            }
        }

        fetchData()
    }, [service])

    const handlePrevSlider = () => {
        if (!sliderRef.current) return
        sliderRef.current.swiper.slidePrev()
    }

    const handleNextSlider = () => {
        if (!sliderRef.current) return
        sliderRef.current.swiper.slideNext()
    }

    const handleSlideChange = (swiper) => {
        if (swiper.realIndex === 0) {
            setDisabledNavigationBtn('prev')
        } else if (swiper.realIndex === swiper.slides.length - displayItem) {
            setDisabledNavigationBtn('next')
        } else {
            setDisabledNavigationBtn('')
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2 className={cx('heading')}>{heading}</h2>
                {slider && (
                    <div className={cx('navigation')}>
                        <button
                            className={cx('btn', { disabled: disabledNavigationBtn === 'prev' })}
                            onClick={handlePrevSlider}
                        >
                            <Icon icon="ph:caret-left-bold" />
                        </button>
                        <button
                            className={cx('btn', { disabled: disabledNavigationBtn === 'next' })}
                            onClick={handleNextSlider}
                        >
                            <Icon icon="ph:caret-right-bold" />
                        </button>
                    </div>
                )}
            </div>

            {slider ? (
                <div className={cx('slider-wrap')}>
                    <Swiper
                        ref={sliderRef}
                        slidesPerView={displayItem}
                        spaceBetween={space}
                        onSlideChange={handleSlideChange}
                    >
                        {mangas.map((manga) => (
                            <SwiperSlide key={manga._id}>
                                <MangaItem trending={trending} data={manga} itemStyle={itemStyle} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default MangaList
