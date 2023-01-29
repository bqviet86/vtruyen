import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import MangaInfo from './MangaInfo'
import ChapterList from '~/components/ChapterList'
import Genres from '~/components/Genres'
import { mangaService } from '~/services'
import styles from './MangaDetails.module.scss'

const cx = classNames.bind(styles)

function MangaDetails() {
    const [manga, setManga] = useState(null)
    const [comicId, setComicId] = useState(null)
    const { slug } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const res = await mangaService.getDetailsManga(slug)

            if (res.success) {
                setManga(res.data)
                setComicId(res.data._id)
            }
        }

        fetchData()
    }, [slug])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('manga-info')}>
                <MangaInfo data={manga} />
            </div>
            <div className={cx('under')}>
                <div className={cx('chapter-list-wrap')}>
                    <div className={cx('header')}>
                        <div className={cx('header-left')} style={{ marginLeft: -20 }}>
                            <h2 className={cx('heading')}>Danh sách chương</h2>
                        </div>
                    </div>
                    <div className={cx('chapter-list')}>
                        <ChapterList comicId={comicId} />
                    </div>
                </div>
                <div className={cx('genres')}>
                    <div className={cx('header')}>
                        <div className={cx('header-left')}>
                            <h2 className={cx('heading')}>Thể loại</h2>
                        </div>
                    </div>
                    <Genres />
                </div>
            </div>
        </div>
    )
}

export default MangaDetails
