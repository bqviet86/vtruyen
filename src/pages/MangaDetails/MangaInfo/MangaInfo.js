import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useState } from 'react'

import Button from '~/components/Button'
import MangaContentForm from '~/components/MangaContentForm'
import { handleUrl, handleScrollbar, handleView, handleUpdateAt } from '~/utils'
import styles from './MangaInfo.module.scss'

const cx = classNames.bind(styles)

function MangaInfo({ data }) {
    const [showMangaContentForm, setShowMangaContentForm] = useState(false)
    const [dataMangaContentForm, setDataMangaContentForm] = useState({})

    const handleOpenMangaContentForm = () => {
        handleScrollbar.hideScrollbar()

        setShowMangaContentForm(true)
        setDataMangaContentForm(data)
    }

    return (
        <>
            <div className={cx('wrapper')}>
                {data && (
                    <>
                        <div className={cx('poster')}>
                            <img src={data.thumbnail} alt="poster" />
                        </div>
                        <div className={cx('details')}>
                            <h2 className={cx('name')}>{data.name}</h2>

                            {data.otherName && <div className={cx('other-name')}>{data.otherName}</div>}

                            <div className={cx('desc')}>
                                <div className={cx('details-line')}>
                                    <span className={cx('title')}>Tác giả:</span>
                                    <span>{data.author}</span>
                                </div>
                                <div className={cx('details-line')}>
                                    <span className={cx('title')}>Tình trạng:</span>
                                    <span>{data.status}</span>
                                </div>
                                <div className={cx('details-line')}>
                                    <span className={cx('title')}>Ngày cập nhật:</span>
                                    <span>{handleUpdateAt(data.updatedAt)}</span>
                                </div>
                                <div className={cx('details-line')}>
                                    <span className={cx('title')}>Lượt xem:</span>
                                    <span>{handleView.formatView(data.view)}</span>
                                </div>
                            </div>

                            <div className={cx('genres')}>
                                {data.genres.map((genre) => (
                                    <Button
                                        key={genre._id}
                                        to={`/genre/${genre.value}`}
                                        tertiary
                                        children={genre.label}
                                        size="sm2"
                                        bg="var(--tertiary-bg-color)"
                                        style={{ margin: '0 8px 6px 0' }}
                                    />
                                ))}
                            </div>

                            <div className={cx('btn-wrap')}>
                                <Button
                                    to={`/manga/read/${handleUrl.slug(data.slug)}/chap-${handleUrl.chapter(
                                        data.oldChapter.slice(8),
                                    )}`}
                                    primary
                                    children="Đọc từ đầu"
                                    IconLeft=<Icon icon="mdi:eye-outline" />
                                />
                                <Button
                                    to={`/manga/read/${handleUrl.slug(data.slug)}/chap-${handleUrl.chapter(
                                        data.newChapter.slice(8),
                                    )}`}
                                    children="Đọc mới nhất"
                                    IconLeft=<Icon icon="ant-design:thunderbolt-outlined" />
                                />
                            </div>

                            <p className={cx('content')}>{data.review}</p>
                            <div className={cx('content-more-btn')} onClick={handleOpenMangaContentForm}>
                                + Thêm
                            </div>
                        </div>
                    </>
                )}
            </div>
            <MangaContentForm
                title={dataMangaContentForm.name}
                content={dataMangaContentForm.review}
                showMangaContentForm={showMangaContentForm}
                setShowMangaContentForm={setShowMangaContentForm}
            />
        </>
    )
}

export default MangaInfo
