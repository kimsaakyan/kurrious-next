export const removeDotsFromKeys = (obj: Record<string, string>) => {
    const newObj: Record<string, string> = {}

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const newKey = key.replace(/\./g, ' ')
            newObj[newKey] = obj[key]
        }
    }

    return newObj
}

export const columns = (data: any): any => {
    const dynamicColumns = Object.keys(data[0])
    if (dynamicColumns.length > 1) {
        return dynamicColumns.map((key, index) => ({
            title: key.toUpperCase(),
            dataIndex: key.replace(/\./g, ' '),
            key: index,
            render: (text: string) => text,
            sorter: (a: any, b: any) =>
                a[key].length ? a[key].length - b[key].length : a[key] - b[key],
        }))
    }
    return []
}
