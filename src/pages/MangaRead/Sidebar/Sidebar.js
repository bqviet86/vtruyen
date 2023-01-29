import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '~/components/Button'
import ChapterList from '~/components/ChapterList'
import { chapterService } from '~/services'
import images from '~/assets/images'
import styles from './Sidebar.module.scss'

const cx = classNames.bind(styles)

function Sidebar({ data, chapterNumber }) {
    const [siblingChapter, setSiblingChapter] = useState(null)
    const [showSidebar, setShowSidebar] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (data && chapterNumber) {
                const res = await chapterService.getSiblingChapter(data._id, chapterNumber)

                if (res.success) {
                    setSiblingChapter(res.data)
                }
            }
        }

        fetchData()
    }, [chapterNumber, data])

    const handleToggleSidebar = () => {
        setShowSidebar((prev) => !prev)
    }

    const handleSlug = (slug, number) => {
        return slug.slice(0, slug.indexOf('/')) + `/chap-${number}`
    }

    return (
        <div className={cx('wrapper', { hide: !showSidebar })}>
            {data && (
                <div className={cx('body')}>
                    <div className={cx('header')}>
                        <Button
                            rounded
                            to={`/manga/details/${data.slug}`}
                            color="=var(--secondary-text-color)"
                            bg="var(--tertiary-bg-color)"
                            children=<Icon icon="tabler:arrow-left" />
                        />
                        <Link to="/" className={cx('logo')}>
                            <img src={images.logo_1} alt="logo" />
                        </Link>
                    </div>
                    <Button
                        rounded
                        className={cx('toggle-btn', { 'showSidebar-btn': !showSidebar })}
                        color="=var(--secondary-text-color)"
                        bg="var(--tertiary-bg-color)"
                        onClick={handleToggleSidebar}
                        children=<Icon icon={`ph:caret-${showSidebar ? 'left' : 'right'}-bold`} />
                    />

                    <h2 className={cx('name')}>{data.name}</h2>

                    <div className={cx('chapter')}>{`Chapter ${chapterNumber}`}</div>

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
                            >
                                <Icon icon="tabler:arrow-left" />
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
                                <Icon icon="tabler:arrow-right" />
                            </Link>
                        </div>
                    )}

                    <div className={cx('chapter-list')}>
                        <ChapterList comicId={data._id} type="secondary" chapterActive={chapterNumber} />
                    </div>

                    <div className={cx('setting-btn')}>
                        <Icon icon="ant-design:setting-outlined" />
                        Cài đặt
                    </div>
                </div>
            )}
        </div>
    )
}

export default Sidebar
