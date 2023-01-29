import { compareAsc, format, formatDistanceToNow, sub } from 'date-fns'
import viLocale from 'date-fns/locale/vi'

const handleUpdateAt = (updatedAt) => {
    const dateUpdatedAt = new Date(updatedAt)
    const subDate = sub(new Date(), { months: 1, days: -1 })

    if (compareAsc(dateUpdatedAt, subDate) === -1) {
        return format(dateUpdatedAt, 'dd/MM/yyyy')
    } else {
        return formatDistanceToNow(dateUpdatedAt, {
            addSuffix: true,
            locale: viLocale,
        })
    }
}

export default handleUpdateAt
