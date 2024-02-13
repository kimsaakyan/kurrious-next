import React from 'react'

const Divider = (): ReactNode => (
    <div
        className="relative h-px w-full bg-gray-light after:absolute after:-top-3.5 after:left-0 after:right-0 after:mx-auto
              after:w-14 after:bg-white after:text-center after:text-base after:text-black-light"
    />
)

export default Divider
