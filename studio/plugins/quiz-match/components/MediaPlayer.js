import React from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import styles from './styles/MediaPlayer.css'

// Don't put this in a grid, if you want it full width and responsive
function MediaPlayer({match: {quiz: {musicUrl = ''} = {}} = {}}) {
  if (!musicUrl) {
    return null
  }
  return (
    <div className={styles.mediaPlayerWrapper}>
      <ReactPlayer
        className={styles.mediaPlayer}
        url={musicUrl}
        playing
        width="100%"
        height="100px"
      />
    </div>
  )
}

MediaPlayer.propTypes = {
  match: PropTypes.shape({
    match: PropTypes.shape({
      musicUrl: PropTypes.string
    })
  })
}

export default MediaPlayer
