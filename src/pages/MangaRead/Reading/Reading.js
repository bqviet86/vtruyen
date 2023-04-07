import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Image from '~/components/Image'
import Loading from '~/components/Loading'
import { imgProxyUrl } from '~/constant'
import { pageService } from '~/services'
import styles from './Reading.module.scss'

const cx = classNames.bind(styles)

function Reading({ comicId, number, siblingChapter }) {
    const [pages, setPages] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            if (comicId) {
                const res = await pageService.getPages(comicId, number)

                if (res.success) {
                    setPages(res.data?.pages || [])
                }
            }
        }

        fetchData()
    }, [comicId, number])

    const handleSlug = (slug, number) => {
        return slug.slice(0, slug.indexOf('/')) + `/chap-${number}`
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('setting')}></div>

            <div className={cx('page-list')}>
                {pages.map((page) => (
                    <div key={page._id} className={cx('page-item')}>
                        <Image src={imgProxyUrl + page.src} fallback={imgProxyUrl + page.fallbackSrc} />
                        <div className={cx('loading')}>
                            <Loading type="quaternary" color="#6a6a6a" />
                            <p>Loading...</p>
                        </div>
                    </div>
                ))}

                {siblingChapter && (
                    <div className={cx('chapter-btn-wrap')}>
                        <Link
                            to={
                                siblingChapter.prevChapter &&
                                `/manga/read/${handleSlug(
                                    siblingChapter.prevChapter.slug,
                                    siblingChapter.prevChapter.number,
                                )}`
                            }
                            className={cx('chapter-btn', { disabled: !siblingChapter.prevChapter })}
                            style={{ marginLeft: 8 }}
                        >
                            <Icon icon="tabler:arrow-left" style={{ marginRight: 8 }} />
                            Chapter trước
                        </Link>
                        <Link
                            to={
                                siblingChapter.nextChapter &&
                                `/manga/read/${handleSlug(
                                    siblingChapter.nextChapter.slug,
                                    siblingChapter.nextChapter.number,
                                )}`
                            }
                            className={cx('chapter-btn', { disabled: !siblingChapter.nextChapter })}
                        >
                            Chapter sau
                            <Icon icon="tabler:arrow-right" style={{ marginLeft: 8 }} />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Reading
