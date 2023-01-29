import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '~/components/Button'
import { useDebounce } from '~/hooks'
import { chapterService } from '~/services'
import styles from './ChapterList.module.scss'

const cx = classNames.bind(styles)

function ChapterList({ comicId, type = 'primary', chapterActive = null }) {
    const [chapters, setChapters] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const inputRef = useRef(null)
    const chapterListRef = useRef(null)

    const debouncedValue = useDebounce(searchValue, 500)

    useEffect(() => {
        const fetchData = async () => {
            if (comicId) {
                const res = await chapterService.getChapters(comicId)

                if (res.success) {
                    setChapters(res.data?.chapters)
                }
            }
        }

        fetchData()
    }, [comicId])

    useEffect(() => {
        const chapterListEl = chapterListRef.current
        let selector

        if (debouncedValue) {
            selector = '.scrollToSearch'
        } else if (chapterActive || chapterActive === 0) {
            selector = '.scrollToActive'
        } else {
            selector = '.scrollToTop'
        }

        const intervalId = setInterval(() => {
            const chapterEl = document.querySelector(selector)

            if (chapterEl) {
                chapterListEl.scrollTo({
                    top: chapterEl.offsetTop - chapterListEl.offsetTop,
                    behavior: 'smooth',
                })

                clearInterval(intervalId)
            }

            setTimeout(() => {
                clearInterval(intervalId)
            }, 500)
        })
    }, [chapterActive, debouncedValue])

    const handleFocus = () => {
        inputRef.current.focus()
    }

    const handleSlug = (slug, number) => {
        return slug.slice(0, slug.indexOf('/')) + `/chap-${number}`
    }

    const handleClearSearchInput = () => {
        setSearchValue('')
        inputRef.current.focus()
    }

    return (
        <div className={cx('wrapper', { primary: type === 'primary', secondary: type === 'secondary' })}>
            <div className={cx('header')}>
                <div className={cx('search-wrap')}>
                    <button className={cx('search-btn')} onClick={handleFocus}>
                        <Icon icon="material-symbols:search-rounded" />
                    </button>
                    <input
                        ref={inputRef}
                        placeholder="Đi đến chap..."
                        spellCheck={false}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    {searchValue && (
                        <div className={cx('clear-btn')} onClick={handleClearSearchInput}>
                            <Icon icon="ph:x-bold" />
                        </div>
                    )}
                </div>
            </div>
            <div className={cx('chapter-list-wrap')}>
                <ul ref={chapterListRef} className={cx('chapter-list')}>
                    {chapters.map((chapter, index) => (
                        <li
                            key={chapter._id}
                            className={cx('chapter-item', {
                                scrollToTop: index === 0,
                                scrollToActive: chapterActive === chapter.number,
                                scrollToSearch: searchValue === `${chapter.number}`,
                            })}
                        >
                            <Link
                                to={`/manga/read/${handleSlug(chapter.slug, chapter.number)}`}
                                title={chapter.title}
                                className={cx('chapter-link', {
                                    active: chapterActive === chapter.number,
                                    highlight: searchValue === `${chapter.number}`,
                                })}
                                onClick={() => setSearchValue('')}
                            >
                                <span className={cx('icon')}>
                                    {type === 'primary' ? (
                                        <Icon icon="mdi:file-document-outline" />
                                    ) : (
                                        <Icon icon="ph:caret-right-fill" />
                                    )}
                                </span>
                                <span className={cx('title')}>{chapter.title}</span>
                                {type === 'primary' && (
                                    <Button
                                        quinary
                                        children="Đọc"
                                        size="sm2"
                                        color="var(--quinary-text-color)"
                                        style={{ margin: '-5px 0' }}
                                        className={cx('read-btn')}
                                        IconLeft=<Icon icon="fa6-solid:glasses" />
                                    />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ChapterList
