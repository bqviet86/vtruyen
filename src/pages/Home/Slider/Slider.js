import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'
import { Autoplay, EffectFade } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import Button from '~/components/Button'
import SliderItem from './SliderItem'
import { mangaService } from '~/services'
import styles from './Slider.module.scss'
import 'swiper/css/bundle'

const cx = classNames.bind(styles)

function Slider() {
    const [mangas, setMangas] = useState([])
    const [showThumbnailEffect, setShowThumbnailEffect] = useState([])
    const sliderRef = useRef(null)

    useEffect(() => {
        const fetchData = async () => {
            const res = await mangaService.getSliderManga()

            if (res.success) {
                setMangas(res.data)
                setShowThumbnailEffect(() => {
                    const newShowThumbnailEffect = Array(res.data.length).fill(false)

                    newShowThumbnailEffect[newShowThumbnailEffect.length - 1] = true

                    return newShowThumbnailEffect
                })
            }
        }

        fetchData()
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
        setShowThumbnailEffect((prevShowThumbnailEffect) => {
            const newShowThumbnailEffect = prevShowThumbnailEffect.map((_, index) => index === swiper.realIndex)

            return newShowThumbnailEffect
        })
    }

    return (
        <div className={cx('wrapper')}>
            <Swiper
                ref={sliderRef}
                className="mySwiper"
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 5000,
                }}
                effect={'fade'}
                modules={[Autoplay, EffectFade]}
                onSlideChange={handleSlideChange}
            >
                {mangas.map((manga, index) => (
                    <SwiperSlide key={manga._id}>
                        <SliderItem data={manga} showEffect={showThumbnailEffect[index]} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={cx('navigation')}>
                <Button
                    rounded
                    roundSpace={10}
                    children=<Icon icon="ph:caret-left-bold" />
                    onClick={handlePrevSlider}
                />
                <Button rounded children=<Icon icon="ph:caret-right-bold" /> onClick={handleNextSlider} />
            </div>
        </div>
    )
}

export default Slider
