import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'

import Button from '~/components/Button'
import styles from './MangaList.module.scss'

const cx = classNames.bind(styles)

function MangaItem({ trending = false, data, itemStyle = 'primary' }) {
    const handleSlug = (slug) => {
        return slug.slice(0, slug.lastIndexOf('-'))
    }

    const handleChapter = (chapter) => {
        return chapter.slice(8)
    }

    return (
        <div className={cx('item', { column: itemStyle === 'primary' })} style={trending ? { height: 240 } : {}}>
            {itemStyle === 'secondary' && (
                <div className={cx('rank')}>
                    <span className={cx('number')}>{data.rank < 10 ? `0${data.rank}` : data.rank}</span>
                    <h5 className={cx('name')}>{data.name}</h5>
                </div>
            )}

            <div className={cx('poster')} style={!trending ? { aspectRatio: '2/3' } : {}}>
                <img src={data.thumbnail} alt="poster" />
                <div className={cx('description')}>
                    <p className={cx('name')} title={data.name}>
                        <strong>{data.name}</strong>
                    </p>
                    <p>
                        <Link to={`/manga/read/${handleSlug(data.slug)}/chap-${handleChapter(data.newChapter)}`}>
                            <Icon icon="tabler:file-description" />
                            {data.newChapter}
                        </Link>
                    </p>
                    <p>
                        <Icon icon="tabler:clock-hour-3" />
                        {data.updatedAt}
                    </p>
                    <p>
                        <Icon icon="heroicons-solid:status-online" />
                        {data.status}
                    </p>
                    <div className={cx('contact')}>
                        <div className={cx('btn-wrap')}>
                            <Button
                                to={`/manga/read/${handleSlug(data.slug)}/chap-1`}
                                primary
                                children="Đọc ngay"
                                widthFull
                                size="md2"
                                IconLeft=<Icon icon="fa6-solid:glasses" />
                            />
                        </div>
                        <div className={cx('btn-wrap')}>
                            <Button
                                to={`/manga/details/${data.slug}`}
                                tertiary
                                children="Chi tiết"
                                widthFull
                                size="md2"
                                IconLeft=<Icon icon="bi:info-circle-fill" />
                            />
                        </div>
                    </div>
                </div>
            </div>

            {itemStyle === 'primary' && (
                <div className={cx('manga-details')}>
                    <h3 className={cx('name')}>
                        <Link to={`/manga/details/${data.slug}`}>{data.name}</Link>
                    </h3>
                    <div className={cx('genres')}>
                        {data.genres.map((genre, index) => {
                            if (index < 2) {
                                return (
                                    <React.Fragment key={genre._id}>
                                        {index !== 0 && ', '}
                                        <Link to={`/genre/${genre.value}`}>{genre.label}</Link>
                                    </React.Fragment>
                                )
                            } else {
                                return null
                            }
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MangaItem
