import PhoneInput from 'react-phone-number-input/react-hook-form-input'
import React from 'react'
import { PhoneInputCustomerProps } from '@/src/types/profiles'

const PhoneInputCustomer = ({ field, icon }: PhoneInputCustomerProps) => {
    return (
        <div className="focus:shadow-outline relative h-9 w-full overflow-hidden rounded-md border border-gray-300  bg-gray-300 px-4 hover:border hover:border-blue-light focus:border-blue-light">
            <PhoneInput
                placeholder="Phone Number"
                {...field}
                country="US"
                international
                withCountryCallingCode
                value="+1"
                className="h-9 w-11/12 bg-gray-300 text-blue-dark outline-none"
            />
            {icon && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 transform">
                    {icon}
                </div>
            )}
        </div>
    )
}

export default PhoneInputCustomer
