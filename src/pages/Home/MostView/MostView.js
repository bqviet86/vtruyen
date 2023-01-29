import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { mangaService } from '~/services'
import { handleUrl, handleView } from '~/utils'
import styles from './MostView.module.scss'

const cx = classNames.bind(styles)

function MostView() {
    const [mangas, setMangas] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await mangaService.getMostViewManga()

            if (res.success) {
                setMangas(res.data)
            }
        }

        fetchData()
    }, [])

    return (
        <>
            <div className={cx('header')}>
                <div className={cx('header-left')}>
                    <h2 className={cx('heading')}>Đọc nhiều nhất</h2>
                </div>
            </div>
            <ul className={cx('mostView-list')}>
                {mangas.map((manga, index) => (
                    <li key={manga._id} className={cx('mostView-item', { top: index < 3 })}>
                        <div className={cx('ranking')}>
                            <span>{`${index + 1 < 10 ? 0 : ''}${index + 1}`}</span>
                        </div>
                        <div className={cx('poster')}>
                            <Link to={`/manga/details/${manga.slug}`}>
                                <img src={manga.thumbnail} alt="poster" />
                            </Link>
                        </div>
                        <div className={cx('info')}>
                            <h3 className={cx('name')}>
                                <Link to={`/manga/details/${manga.slug}`} title={manga.name}>
                                    {manga.name}
                                </Link>
                            </h3>
                            <div className={cx('genres')}>
                                {manga.genres.map((genre, index) => {
                                    if (index < 3) {
                                        return (
                                            <React.Fragment key={genre._id}>
                                                {index !== 0 && <span>, </span>}
                                                <Link to={`/genre/${genre.value}`}>{genre.label}</Link>
                                            </React.Fragment>
                                        )
                                    } else {
                                        return null
                                    }
                                })}
                            </div>
                            <div className={cx('chapter-btn')}>
                                <Link
                                    to={`/manga/read/${handleUrl.slug(manga.slug)}/chap-${handleUrl.chapter(
                                        manga.newChapter.slice(8),
                                    )}`}
                                    title={manga.newChapter}
                                >
                                    <Icon icon="tabler:file-description" />
                                    {handleUrl.chapter(manga.newChapter)}
                                </Link>
                            </div>
                            <div className={cx('view')}>
                                <Icon icon="mdi:eye-outline" />
                                {handleView.formatView(manga.view)}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default MostView
