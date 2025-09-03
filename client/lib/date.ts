export const isSameDay = (startDateStr: string, endDateStr: string) => {
    const start = new Date(startDateStr)
    const end = new Date(endDateStr)
    return (
        start.getFullYear() === end.getFullYear() &&
        start.getMonth() === end.getMonth() &&
        start.getDate() === end.getDate()
    )
}

export const isWithin6Days = (startDate: string) => {
    const today = new Date()
    const start = new Date(startDate)
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);

    const diffTime = start.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 6 && diffDays >= 0;
}

export const isLeavePassed = (endDateStr: string) => {
    const today = new Date()
    const endDate = new Date(endDateStr)
    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    return endDate < today;
}