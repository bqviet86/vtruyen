import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'

import MangaItem from './MangaItem'
import Button from '~/components/Button'
import MangaContentForm from '~/components/MangaContentForm'
import { mangaService } from '~/services'
import { useLogout } from '~/hooks'
import { userSelector } from '~/redux/selectors'
import { handleUserState } from '~/utils'
import styles from './MangaList.module.scss'
import 'swiper/css/bundle'

const cx = classNames.bind(styles)

function MangaList({
    slider = false,
    trending = false,
    recommended = false,
    completed = false,
    continueReading = false,
    random = false,
    latestUpdate = false,
    remove = false,
    content = false,
    heading = 'Manga list',
    itemStyle = 'primary',
    displayItem = 1,
    space = 15,
}) {
    const user = useSelector(userSelector)
    const { logout } = useLogout()

    const [mangas, setMangas] = useState([])
    const [disabledNavigationBtn, setDisabledNavigationBtn] = useState('prev')
    const [showMangaContentForm, setShowMangaContentForm] = useState(false)
    const [dataMangaContentForm, setDataMangaContentForm] = useState({})
    const sliderRef = useRef(null)
    const randomComics = useRef([])

    const breakpoints = {
        primary: {
            1300: { slidesPerView: 8, spaceBetween: 15 },
            1100: { slidesPerView: 6, spaceBetween: 15 },
            820: { slidesPerView: 5, spaceBetween: 15 },
            640: { slidesPerView: 4, spaceBetween: 5 },
            360: { slidesPerView: 3, spaceBetween: 2 },
        },
        secondary: {
            1100: { slidesPerView: 6, spaceBetween: 20 },
            820: { slidesPerView: 5, spaceBetween: 15 },
            640: { slidesPerView: 4, spaceBetween: 5 },
            360: { slidesPerView: 3, spaceBetween: 2 },
        },
        tertiary: {
            1300: { slidesPerView: 4, spaceBetween: 15 },
            940: { slidesPerView: 3, spaceBetween: 15 },
            760: { slidesPerView: 2, spaceBetween: 5 },
            560: { slidesPerView: 3, spaceBetween: 2 },
        },
    }

    const service =
        (trending && mangaService.getTrendingManga) ||
        (recommended && mangaService.getRecommendedManga) ||
        (completed && mangaService.getCompletedManga) ||
        (continueReading && mangaService.getContinueReadingManga) ||
        (random && mangaService.getRandomManga) ||
        (latestUpdate && mangaService.getLatestUpdateManga)

    const fetchData = async () => {
        const res =
            (continueReading && (await service(handleUserState(user)))) ||
            (random && (await service(randomComics.current))) ||
            (await service())

        if (res.success) {
            randomComics.current = res.data.randomComics
            setMangas(random ? res.data.comics : res.data)
        } else if (res.message === 'Request is not authorized') {
            logout()
        }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handlePrevSlider = () => {
        if (!sliderRef.current) return
        sliderRef.current.swiper.slidePrev()
    }

    const handleNextSlider = () => {
        if (!sliderRef.current) return
        sliderRef.current.swiper.slideNext()
    }

    const handleSlideChange = (swiper) => {
        const slidesPerView =
            swiper.currentBreakpoint === 'max'
                ? displayItem
                : swiper.params.breakpoints[swiper.currentBreakpoint].slidesPerView

        if (swiper.realIndex === 0) {
            setDisabledNavigationBtn('prev')
        } else if (swiper.realIndex === swiper.slides.length - slidesPerView) {
            setDisabledNavigationBtn('next')
        } else {
            setDisabledNavigationBtn('')
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-left')}>
                    <h2 className={cx('heading')}>{heading}</h2>
                    {random && (
                        <Button
                            secondary
                            children="Random"
                            size="md2"
                            IconRight=<Icon icon="el:random" />
                            style={{ marginLeft: 20 }}
                            onClick={fetchData}
                        />
                    )}
                </div>
                {slider && (
                    <div className={cx('navigation')}>
                        <Button
                            rounded
                            roundSpace={6}
                            color="var(--secondary-text-color)"
                            bg="var(--quaternary-bg-color)"
                            children=<Icon icon="ph:caret-left-bold" />
                            disabled={disabledNavigationBtn === 'prev'}
                            onClick={handlePrevSlider}
                        />
                        <Button
                            rounded
                            color="var(--secondary-text-color)"
                            bg="var(--quaternary-bg-color)"
                            children=<Icon icon="ph:caret-right-bold" />
                            disabled={disabledNavigationBtn === 'next'}
                            onClick={handleNextSlider}
                        />
                    </div>
                )}
            </div>

            {slider ? (
                <>
                    <div className={cx('slider-wrap')}>
                        <Swiper
                            ref={sliderRef}
                            slidesPerView={displayItem}
                            spaceBetween={space}
                            onSlideChange={handleSlideChange}
                            breakpoints={breakpoints[itemStyle]}
                        >
                            {mangas.map((manga, index) => (
                                <SwiperSlide key={manga._id}>
                                    <MangaItem
                                        index={index}
                                        trending={trending}
                                        data={manga}
                                        itemStyle={itemStyle}
                                        remove={remove}
                                        content={content}
                                        continueReading={continueReading}
                                        setMangas={setMangas}
                                        setShowMangaContentForm={setShowMangaContentForm}
                                        setDataMangaContentForm={setDataMangaContentForm}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    {content && (
                        <MangaContentForm
                            title={dataMangaContentForm.name}
                            content={dataMangaContentForm.review}
                            showMangaContentForm={showMangaContentForm}
                            setShowMangaContentForm={setShowMangaContentForm}
                        />
                    )}
                </>
            ) : (
                <div className={cx('list-wrap')}>
                    {mangas.map((manga) => (
                        <div key={manga._id} className={cx('manga-item')}>
                            <MangaItem data={manga} itemStyle={itemStyle} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MangaList
