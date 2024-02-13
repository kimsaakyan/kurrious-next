import React from 'react'
import styles from '../../styles/Home.module.css'

const TypingLoader = (): ReactNode => {
    return (
        <div className={styles.loader}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default TypingLoader
