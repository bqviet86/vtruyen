import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Sidebar from './Sidebar'
import Reading from './Reading'
import { mangaService, chapterService } from '~/services'
import { userSelector } from '~/redux/selectors'
import { handleUserState } from '~/utils'
import styles from './MangaRead.module.scss'

const cx = classNames.bind(styles)

function MangaRead() {
    const user = useSelector(userSelector)
    const [manga, setManga] = useState(null)
    const [comicId, setComicId] = useState(null)
    const [siblingChapter, setSiblingChapter] = useState(null)
    const { name, chap } = useParams()

    const number = Number(chap.slice(5))

    useEffect(() => {
        const updateReading = async () => {
            if (user && manga) {
                await mangaService.updateReading(handleUserState(user), {
                    comicId: manga._id,
                    chapNumber: number,
                })
            }
        }

        updateReading()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [manga, number])

    useEffect(() => {
        const fetchData = async () => {
            const res = await mangaService.getDetailsManga(name, 'lack')

            if (res.success) {
                setManga(res.data)
                setComicId(res.data._id)
            }
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (manga) {
                const res = await chapterService.getSiblingChapter(manga._id, number)

                if (res.success) {
                    setSiblingChapter(res.data)
                }
            }
        }

        fetchData()
    }, [manga, number])

    return (
        <div className={cx('wrapper')}>
            <Sidebar data={manga} chapterNumber={number} siblingChapter={siblingChapter} />
            <Reading comicId={comicId} number={number} siblingChapter={siblingChapter} />
        </div>
    )
}

export default MangaRead
