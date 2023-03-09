import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Menu from '~/components/Menu'
import Button from '~/components/Button'
import { chapterService } from '~/services'
import { handleUrl, handleScrollbar, handleUpdateAt } from '~/utils'
import styles from './MangaList.module.scss'

const cx = classNames.bind(styles)

function MangaItem({
    trending = false,
    data,
    itemStyle = 'primary',
    remove = false,
    content = false,
    continueReading = false,
    setShowMangaContentForm,
    setDataMangaContentForm,
}) {
    const [chapters, setChapters] = useState([])

    const handleOpenMangaContentForm = () => {
        handleScrollbar.hideScrollbar()

        setShowMangaContentForm(true)
        setDataMangaContentForm(data)
    }

    const defaultFunc = () => {}

    const menuItems = [
        {
            title: (remove && 'Xóa') || (content && 'Nội dung') || '',
            onClick: (remove && defaultFunc) || (content && handleOpenMangaContentForm),
            color: '#ddd',
            bg_color: '#3f3f3f',
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            const res = await chapterService.getChapters(data._id)

            if (res.success) {
                setChapters(res.data.chapters)
            }
        }

        if (itemStyle === 'quaternary') {
            fetchData()
        }
    }, [data._id, itemStyle])

    return (
        ((itemStyle === 'primary' || itemStyle === 'secondary') && (
            <div
                className={cx('item-first', { column: itemStyle === 'primary' })}
                style={trending ? { height: 240 } : {}}
            >
                {itemStyle === 'secondary' && (
                    <div className={cx('rank')}>
                        <span className={cx('number')}>{`${data.rank < 10 ? 0 : ''}${data.rank}`}</span>
                        <h5 className={cx('name')}>{data.name}</h5>
                    </div>
                )}

                <div className={cx('poster')} style={!trending ? { aspectRatio: '2/3' } : {}}>
                    <Link to={`/manga/details/${data.slug}`} className={cx('poster-link')} />
                    <img src={data.thumbnail} alt="poster" />
                    <div className={cx('description')}>
                        <p className={cx('name')}>
                            <Link to={`/manga/details/${data.slug}`} title={data.name}>
                                <strong>{data.name}</strong>
                            </Link>
                        </p>
                        <p>
                            <Link
                                to={`/manga/read/${handleUrl.slug(data.slug)}/chap-${handleUrl.chapter(
                                    data.newChapter.slice(8),
                                )}`}
                            >
                                <Icon icon="mdi:file-document-outline" />
                                {handleUrl.chapter(data.newChapter)}
                            </Link>
                        </p>
                        <p>
                            <Icon icon="tabler:clock-hour-3" />
                            {handleUpdateAt(data.updatedAt)}
                        </p>
                        <p>
                            <Icon icon="heroicons-solid:status-online" />
                            {data.status}
                        </p>
                        <div className={cx('contact')}>
                            <div className={cx('btn-wrap')}>
                                <Button
                                    to={`/manga/read/${handleUrl.slug(data.slug)}/chap-${handleUrl.chapter(
                                        data.oldChapter.slice(8),
                                    )}`}
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
                        <h3 className={cx('name')} title={data.name}>
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
        )) ||
        ((itemStyle === 'tertiary' || itemStyle === 'quaternary') && (
            <div
                className={cx('item-second', {
                    tertiary: itemStyle === 'tertiary',
                    quaternary: itemStyle === 'quaternary',
                })}
            >
                <div className={cx('poster')}>
                    <Link to={`/manga/details/${data.slug}`}>
                        <img src={data.thumbnail} alt="poster" />
                    </Link>
                </div>

                <div className={cx('info')}>
                    {(remove || content) && (
                        <Menu data={menuItems} className={cx('menu')}>
                            <div className={cx('menu-icon')}>
                                <Icon icon="carbon:overflow-menu-vertical" />
                            </div>
                        </Menu>
                    )}
                    <h4
                        className={cx('name')}
                        title={data.name}
                        style={((remove || content) && { paddingRight: 15 }) || {}}
                    >
                        <Link to={`/manga/details/${data.slug}`}>{data.name}</Link>
                    </h4>
                    <div className={cx('genres')}>
                        {data.genres.map((genre, index) => {
                            if (index < (itemStyle === 'tertiary' ? 2 : 3)) {
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
                    <div className={cx('chapter-btn')}>
                        {itemStyle === 'tertiary' ? (
                            <Button
                                to={`/manga/read/${handleUrl.slug(data.slug)}/chap-${
                                    continueReading
                                        ? data.currentChapNumber
                                        : handleUrl.chapter(data.newChapter.slice(8))
                                }`}
                                quinary
                                widthFull
                                children={
                                    continueReading
                                        ? `Chapter ${data.currentChapNumber}`
                                        : handleUrl.chapter(data['newChapter'])
                                }
                                size="md2"
                            />
                        ) : (
                            chapters.map((chapter, index) => {
                                if (index < 3) {
                                    return (
                                        <div key={chapter._id} className={cx('btn')}>
                                            <Link
                                                to={`/manga/read/${handleUrl.slug(data.slug)}/chap-${chapter.number}`}
                                                title={chapter.title}
                                            >
                                                <Icon icon="mdi:file-document-outline" />
                                                {handleUrl.chapter(chapter.title)}
                                            </Link>
                                        </div>
                                    )
                                } else {
                                    return null
                                }
                            })
                        )}
                    </div>
                </div>
            </div>
        ))
    )
}

export default MangaItem
