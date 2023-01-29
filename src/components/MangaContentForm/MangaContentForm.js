import classNames from 'classnames/bind'

import Modal from '~/components/Modal'
import { handleScrollbar } from '~/utils'
import styles from './MangaContentForm.module.scss'

const cx = classNames.bind(styles)

function MangaContentForm({ title, content, showMangaContentForm, setShowMangaContentForm }) {
    const handleCloseForm = () => {
        handleScrollbar.appearScrollbar()
        setShowMangaContentForm(false)
    }

    return (
        <Modal title={title} showModal={showMangaContentForm} closeModal={handleCloseForm}>
            <div className={cx('content')}>{content}</div>
        </Modal>
    )
}

export default MangaContentForm
