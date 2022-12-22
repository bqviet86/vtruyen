import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import randomColor from 'randomcolor'

import { useState } from 'react'
import Button from '~/components/Button'
import genres from './genresLocal'
import styles from './Genres.module.scss'

const cx = classNames.bind(styles)

function Genres() {
    const [displayNumber, setDisplayNumber] = useState(25)

    const handleClickMore = () => {
        setDisplayNumber((prev) => prev * 2)
    }

    return (
        <div className={cx('wrapper')}>
            {genres.map((genre, index) => {
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
