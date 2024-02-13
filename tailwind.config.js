/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            maxWidth: {
                200: '12.5rem',
            },
            spacing: {
                7.5: '1.875rem',
                9.75: '2.438rem',
                15: '3.75rem',
                18: '4.5rem',
                23: '5.75rem',
                25: '6.25rem',
                26: '6.5rem',
                30: '7.5rem',
                73: '18.25rem',
                79: '18.75rem',
            },
            colors: {
                primary: {
                    light: '#4996C7',
                    100: '#F7FAFC',
                    DEFAULT: '#00ADFF',
                },
                secondary: {
                    DEFAULT: '#fff',
                    light: '#F0F2F6',
                    dark: '#4E4E4F',
                },
                gray: {
                    transparent: '#13131366',
                    wave: '#f9fbfc',
                    thin: '#EAF0F3',
                    light: '#E7E7E7',
                    bright: '#E2E8F0',
                    dark: '#6F7070',
                    battleship: '#909090',
                    deepDark: '#757682',
                    50: '#718096',
                    100: '#E4EDf1',
                    150: '#C9CED6',
                    200: '#F6FAFB',
                    250: '#B5B5BD',
                    300: '#EDF2F7',
                    350: '#16192c0f',
                    400: '#F4F5F6',
                    450: '#A0AEC0',
                    500: '#9197BD',
                    550: '#6F717D',
                    600: '#737683',
                    650: '#7F84A6',
                    750: '#EBEBEB',
                    800: '#D0D0D2',
                    DEFAULT: '#E6E6E6',
                    bg: '#FAFAFB',
                },
                black: {
                    light: '#666',
                    100: '#1B1B1D',
                    150: '#1A202C',
                    200: '#636568',
                    250: '#4A5568',
                    300: '#2D3748',
                    DEFAULT: '#000',
                },
                blue: {
                    DEFAULT: '#102ACEFF',
                    dark: '#16192C',
                    light: '#29c2ff',
                    bright: '#2636DC',
                    50: '#E4ECF7',
                    100: '#e6fbff',
                    200: '#505780',
                    300: '#636A8F',
                    400: 'rgba(0, 173, 255, 0.30)',
                },
                red: {
                    DEFAULT: '#FF6868',
                },
                green: {
                    DEFAULT: '#31C048',
                    dark: '#2EBD7F',
                    light: 'rgba(52, 174, 86, 0.15)',
                    deepDark: '#34AE56',
                },
                yellow: {
                    DEFAULT: '#EDA600',
                    light: 'rgba(237, 166, 0, 0.15)',
                },
                tertiary: {
                    DEFAULT: '#8492A6',
                },
                quaternary: {
                    DEFAULT: '#425466',
                },
                slate: {
                    DEFAULT: '#FBFBFB',
                },
                azure: {
                    thin: '#F8F9FC',
                    small: 'rgba(231,236,246,0.3)',
                    light: '#E7ECF6',
                },
                error: {
                    light: '#FEE2E2',
                    thin: '#991B1B',
                },
            },
            boxShadow: {
                search: '0px 0px 1px 0px rgba(50, 50, 71, 0.20), 0px 1px 2px 0px rgba(50, 50, 71, 0.08)',
            },
            borderRadius: {
                DEFAULT: '10px',
            },
            gridTemplateRows: {
                'footer-subscribe': 'auto minmax(0, 1fr)',
            },
            fontFamily: {
                sans: ['Sofia Sans'],
            },
        },
        screens: {
            xl: '1280px',
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1.25rem',
                xl: '2.5rem',
            },
        },
        fontSize: {
            xs: [
                '12px',
                {
                    lineHeight: '150%',
                    letterSpacing: '0.01em',
                    fontWeight: '400',
                },
            ],
            s: [
                '14px',
                {
                    lineHeight: '150%',
                    letterSpacing: '0.01em',
                    fontWeight: '400',
                },
            ],
            sm: [
                '16px',
                {
                    lineHeight: '150%',
                    letterSpacing: '0.01em',
                    fontWeight: '400',
                },
            ],
            base: [
                '18px',
                {
                    lineHeight: '150%',
                    letterSpacing: '0.01em',
                    fontWeight: '400',
                },
            ],
            lg: [
                '24px',
                {
                    lineHeight: '150%',
                    letterSpacing: '0.01em',
                    fontWeight: '400',
                },
            ],
            medium: [
                '28px',
                {
                    lineHeight: '150%',
                    letterSpacing: '0.01em',
                    fontWeight: '400',
                },
            ],
            xl: [
                '32px',
                {
                    lineHeight: '150%',
                    letterSpacing: '0.01em',
                    fontWeight: '400',
                },
            ],
            '2xl': [
                '64px',
                {
                    lineHeight: '130%',
                    fontWeight: '500',
                },
            ],
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        require('@tailwindcss/typography'),
    ],
}
