export const columns = (funcs: any): IDetailColumn[] => [
    {
        title: 'PRODUCT NAME',
        dataIndex: 'productName',
        key: 'productName',
        render: (text: string, user: string) => (
            <div
                onClick={() => funcs(user)}
                style={{
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    color: '#20B7FF',
                }}
            >
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
]
