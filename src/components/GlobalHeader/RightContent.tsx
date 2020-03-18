import React from 'react'
import Avatar from './AvatarDropdown'
import SelectLang from '../SelectLang'
import defaultSettings from '@/../config/defaultSettings'
import styles from './index.less'


const RightContent = props => {
    return (
        <div className={styles.right}>
            <Avatar menu />
            <SelectLang className={styles.action} color={defaultSettings.primaryColor} />
        </div>
    )
}

export default RightContent