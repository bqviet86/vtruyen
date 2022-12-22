import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '~/components/Button'
import Loading from '~/components/Loading'
import { mangaService } from '~/services'
import { useDebounce } from '~/hooks'
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

function SearchForm({ isShow, setIsShow }) {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)

    const debouncedValue = useDebounce(searchValue, 3000)

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([])

            return
        }

        const fetchData = async () => {
            setLoading(true)

            const res = await mangaService.searchManga(debouncedValue)

            if (res.success) {
                setSearchResult(res.data.comics)
            }

            setLoading(false)
        }

        fetchData()
    }, [debouncedValue])

    const handleSlug = (slug) => {
        return slug.slice(0, slug.lastIndexOf('-'))
    }

    const handleChapter = (chapter) => {
        return chapter.slice(8)
    }

    const handleCloseForm = () => {
        setIsShow(false)
    }

    const handleStopPropagation = (e) => {
        e.stopPropagation()
    }

    return (
        <div className={cx('overlay', { show: isShow })} onClick={handleCloseForm}>
            <div className={cx('search-wrap')}>
                <div className={cx('search-form')} onClick={handleStopPropagation}>
                    <div className={cx('header')}>
                        <h5 className={cx('title')}>Tìm truyện</h5>
                        <div className={cx('close-btn')} onClick={handleCloseForm}>
                            <Icon icon="ph:x-bold" />
                        </div>
                    </div>

                    <input
                        className={cx('seek-input')}
                        placeholder="Nhập tên truyện bạn muốn tìm"
                        spellCheck={false}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

                    {loading && (
                        <div className={cx('loading-wrap')}>
                            <Loading type="tertiary" />
                        </div>
                    )}

                    {searchResult.length > 0 && (
                        <div className={cx('search-result')}>
                            {searchResult.map((manga) => (
                                <div key={manga._id} className={cx('item')}>
                                    <div className={cx('thumbnail')}>
                                        <Link to={`/manga/details/${manga.slug}`}>
                                            <img src={manga.thumbnail} alt="thumbnail" />
                                        </Link>
                                    </div>
                                    <div className={cx('info')}>
                                        <Link to={`/manga/details/${manga.slug}`} className={cx('name')}>
                                            {manga.name}
                                        </Link>
                                        <Link
                                            to={`/manga/read/${handleSlug(manga.slug)}/chap-${handleChapter(
                                                manga.newChapter,
                                            )}`}
                                            className={cx('new-chapter')}
                                        >
                                            {manga.newChapter}
                                        </Link>
                                        <div className={cx('genres')}>
                                            {manga.genres.map((genre) => (
                                                <Button
                                                    key={genre._id}
                                                    to={`/genre/${genre.value}`}
                                                    tertiary
                                                    children={genre.label}
                                                    size="sm2"
                                                    bg="#0000001a"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button
                                to={`/search?keyword=${searchValue}`}
                                quaternary
                                children="Xem tất cả kết quả"
                                size="lg2"
                                widthFull
                                IconRight=<Icon icon="ph:caret-right-bold" />
                                style={{ margin: '6px 6px 0 0' }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchForm
