import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '~/components/Button'
import Loading from '~/components/Loading'
import { useDebounce } from '~/hooks'
import { mangaService } from '~/services'
import { handleUrl, handleScrollbar } from '~/utils'
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

function SearchForm({ showSearchForm, setShowSearchForm }) {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const seekInputRef = useRef(null)

    const debouncedValue = useDebounce(searchValue, 700)

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([])
            return
        }

        const fetchData = async () => {
            setLoading(true)

            const res = await mangaService.searchManga(debouncedValue)

            if (res.success) {
                setSearchResult(res.data)
            }

            setLoading(false)
        }

        fetchData()
    }, [debouncedValue])

    const handleClearSeekInput = () => {
        setSearchValue('')
        seekInputRef.current.focus()
    }

    const handleCloseForm = () => {
        handleScrollbar.appearScrollbar()
        setShowSearchForm(false)
    }

    const handleStopPropagation = (e) => {
        e.stopPropagation()
    }

    return (
        <div className={cx('overlay', { show: showSearchForm })} onClick={handleCloseForm}>
            <div className={cx('search-wrap')}>
                <div className={cx('search-form')} onClick={handleStopPropagation}>
                    <div className={cx('header')}>
                        <div className={cx('close-btn')} onClick={handleCloseForm}>
                            <Icon icon="ph:x-bold" />
                        </div>
                        <h5 className={cx('title')}>Tìm truyện</h5>
                    </div>

                    <div className={cx('seek-input-wrap')}>
                        <input
                            ref={seekInputRef}
                            className={cx('seek-input')}
                            placeholder="Nhập tên truyện bạn muốn tìm"
                            spellCheck={false}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        {searchValue && (
                            <div className={cx('clear-btn')} onClick={handleClearSeekInput}>
                                <Icon icon="ph:x-bold" />
                            </div>
                        )}
                    </div>

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
                                        <Link to={`/manga/details/${manga.slug}`} onClick={handleCloseForm}>
                                            <img src={manga.thumbnail} alt={manga.name} />
                                        </Link>
                                    </div>
                                    <div className={cx('info')}>
                                        <Link
                                            to={`/manga/details/${manga.slug}`}
                                            title={manga.name}
                                            className={cx('name')}
                                            onClick={handleCloseForm}
                                        >
                                            {manga.name}
                                        </Link>
                                        <Link
                                            to={`/manga/read/${handleUrl.slug(manga.slug)}/chap-${handleUrl.chapter(
                                                manga.newChapter.slice(8),
                                            )}`}
                                            className={cx('new-chapter')}
                                            onClick={handleCloseForm}
                                        >
                                            {handleUrl.chapter(manga.newChapter)}
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
                                                    onClick={handleCloseForm}
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
