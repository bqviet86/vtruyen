import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import randomColor from 'randomcolor'

import { useState } from 'react'
import Button from '~/components/Button'
import genres from './genresLocal'
import styles from './Genres.module.scss'

const cx = classNames.bind(styles)

const beautyBtn = [
    { slug: '/moi-cap-nhat', label: 'Mới cập nhật', icon: '⚡', bg: 'green' },
    { slug: '/truyen-moi', label: 'Truyện mới', icon: '✌', bg: 'yellow' },
    { slug: '/random-truyen', label: 'Random truyện', icon: '🔥', bg: 'purple' },
    { slug: '/hoan-thanh', label: 'Hoàn thành', icon: '✅', bg: 'blue' },
]

const btns = [...beautyBtn, ...genres]

function Genres({ less = false }) {
    const [displayNumber, setDisplayNumber] = useState(less ? 25 : btns.length)

    const handleClickMore = () => {
        setDisplayNumber(btns.length)
    }

    return (
        <div className={cx('wrapper')}>
            {btns.map((genre, index) => {
                if (index < displayNumber) {
                    return (
                        <Button
                            key={genre.label}
                            to={genre.slug}
                            tertiary={!genre.bg && true}
                            children={genre.label}
                            size="sm"
                            IconLeft={genre.icon && <i>{genre.icon}</i>}
                            bg={genre.bg ? randomColor({ hue: genre.bg, luminosity: 'light' }) : ''}
                            className={cx('btn')}
                            style={displayNumber === btns.length ? { display: 'flex' } : {}}
                        />
                    )
                } else {
                    return null
                }
            })}
            {displayNumber < genres.length && (
                <Button
                    tertiary
                    children="Thêm"
                    size="sm"
                    IconLeft=<Icon icon="ic:round-add" />
                    onClick={handleClickMore}
                />
            )}
        </div>
    )
}

export default Genres
