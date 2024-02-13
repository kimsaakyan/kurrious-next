export const columns: IDetailColumn[] = [
    {
        title: 'PRICE BOOK NAME',
        dataIndex: 'name',
        key: 'name',
        render: (text) => (
            <div style={{ textDecoration: 'underline', color: '#20B7FF' }}>
                {text}
            </div>
        ),
    },
    {
        title: 'DESCRIPTION',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'LAST MODIFIED DATE',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'ACTIVE',
        dataIndex: 'status',
        key: 'status',
    },
]
