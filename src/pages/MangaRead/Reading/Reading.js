import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'

import Image from '~/components/Image'
import Loading from '~/components/Loading'
import { pageService } from '~/services'
import styles from './Reading.module.scss'

const cx = classNames.bind(styles)

function Reading({ comicId, number }) {
    const [pages, setPages] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            if (comicId && number) {
                const res = await pageService.getPages(comicId, number)

                if (res.success) {
                    setPages(res.data?.pages)
                }
            }
        }

        fetchData()
    }, [comicId, number])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('page-list')}>
                {pages &&
                    pages.map((page) => (
                        <div key={page._id} className={cx('page-item')}>
                            <Image src={page.src} fallback={page.fallbackSrc} />
                            <div className={cx('loading')}>
                                <Loading type="quaternary" color="#6a6a6a" />
                                <p>Loading...</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Reading
