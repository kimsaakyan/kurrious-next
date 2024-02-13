import { Button } from '@/src/components/ui/button'

export const columns: IFeedbackData[] = [
    {
        title: 'USERNAME',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'EMAIL',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'DATE',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'TITLE',
        key: 'title',
        dataIndex: 'title',
        render: () => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                Change color
                <div className="flex items-center	gap-6">
                    <Button size="mediumSm" variant="link">
                        See feedback
                    </Button>
                    <div style={{ marginRight: '8px' }}>
                        <img src="/images/ellipsis.svg" />
                    </div>
                </div>
            </div>
        ),
    },
]
