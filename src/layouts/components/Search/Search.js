import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useState } from 'react'

import SearchForm from './SearchForm'
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

function Search() {
    const [isShow, setIsShow] = useState(false)

    const handleOpenSearchForm = () => {
        setIsShow(true)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search-input')} onClick={handleOpenSearchForm}>
                Tìm truyện...
            </div>
            <button className={cx('search-btn')}>
                <Icon icon="material-symbols:search-rounded" />
            </button>
            <SearchForm isShow={isShow} setIsShow={setIsShow} />
        </div>
    )
}

export default Search
