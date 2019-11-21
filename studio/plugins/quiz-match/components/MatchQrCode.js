import React from 'react'
import QRCode from 'qrcode.react'

import {assembleMatchUrl} from '../utils'

function MatchQrCode(props) {
  const url = assembleMatchUrl(props.match)

  return <QRCode value={url} />
}

export default MatchQrCode
