import RocketIcon from '@/src/components/Icons/RocketIcon'

const ComingSoon = () => {
    return (
        <div className="flex h-5/6 w-full flex-col items-center justify-center p-10">
            <RocketIcon />
            <div className="mt-5 text-[36px] font-medium">Coming soon</div>
            <div className="min-w-3/6 mt-2 text-center text-s font-normal text-gray-50">
                <div>
                    We&apos;re fully engaged in enhancing our platform for an
                    even better user experience.
                </div>
                <div>Watch this space for exciting improvements!</div>
            </div>
        </div>
    )
}

export default ComingSoon
