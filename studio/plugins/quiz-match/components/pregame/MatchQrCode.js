import React from 'react'
import QRCode from 'qrcode.react'
import styles from '../styles/QrCode.css'

import {assembleMatchUrl} from '../../utils'

function MatchQrCode(props) {
  const url = assembleMatchUrl(props.match)

  return (
    <div className={styles.qrCode}>
      <QRCode value={url} renderAs="svg" fgColor="#002152" bgColor="transparent" />
    </div>
  )
}

export default MatchQrCode
