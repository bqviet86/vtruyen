import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Sidebar from './Sidebar'
import Reading from './Reading'
import { mangaService } from '~/services'
import styles from './MangaRead.module.scss'

const cx = classNames.bind(styles)

function MangaRead() {
    const [manga, setManga] = useState(null)
    const [comicId, setComicId] = useState(null)
    const { name, chap } = useParams()

    const number = Number(chap.slice(5))

    useEffect(() => {
        const fetchData = async () => {
            const res = await mangaService.getDetailsManga(name, 'lack')

            if (res.success) {
                setManga(res.data)
                setComicId(res.data._id)
            }
        }

        fetchData()
    }, [name])

    return (
        <div className={cx('wrapper')}>
            <Sidebar data={manga} chapterNumber={number} />
            <Reading comicId={comicId} number={number} />
        </div>
    )
}

export default MangaRead
