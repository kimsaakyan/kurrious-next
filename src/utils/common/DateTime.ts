import moment from 'moment'

export function getDiffOfTime(start: string, end: string): string {
    const startTime = moment(start, 'h:mm:ss A')
    const endTime = moment(end, 'h:mm:ss A')

    const diff = endTime.diff(startTime)

    const duration = moment.duration(diff)
    const hours = Math.floor(duration.asHours())
    const minutes = Math.floor(duration.asMinutes()) - hours * 60
    const seconds = Math.floor(duration.asSeconds()) - minutes * 60

    const totalTime = `${hours}h, ${minutes}m, ${seconds}s`

    return totalTime
}

export function getMessageTime(unix_timestamp: number): string {
    const date = new Date(unix_timestamp * 1000)
    const currentDate = new Date()
    const timeDiff = currentDate.getTime() - date.getTime()

    if (timeDiff <= 24 * 60 * 60 * 1000) {
        //Today
        return moment(date).format('h:mm a')
    } else if (timeDiff <= 48 * 60 * 60 * 1000) {
        // Yesterday
        return 'Yesterday'
    } else if (timeDiff <= 168 * 60 * 60 * 1000) {
        // Less than week
        return moment(date).format('dddd')
    } else {
        return moment(date).format('DD/MM/YYYY')
    }
}

export function getDateFormat(date: Date | number): string {
    return moment(new Date(date)).format('L')
}

export const getDeviceTimeZone = (): string => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    return tz
}
