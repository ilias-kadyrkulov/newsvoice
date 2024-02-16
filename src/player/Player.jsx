import { useState, useRef, useEffect, FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { faVolumeUp, faVolumeMute, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { TextToSpeech } from '../api'
import './Player.css'

function Player({ text, speaker_id = 2 }) {
  const audioRef = useRef(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showVolumeMenu, setShowVolumeMenu] = useState(false)
  const [volume, setVolume] = useState(1)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showPlaybackRateMenu, setShowPlaybackRateMenu] = useState(false)
  const [audio, setAudio] = useState('')
  const [showControls, setShowControls] = useState(false)

  const [isInfoActive, setIsInfoActive] = useState(false)

  const getAudio = async () => {
    const response = await TextToSpeech.getAudioFile(text, speaker_id)

    const audioData = await response.arrayBuffer() // Получаем массив байтов из ответа

    // Создаем объект Blob из полученных данных
    const blob = new Blob([audioData], { type: 'audio/mpeg' })

    // Создаем URL для объекта Blob
    const audioURL = URL.createObjectURL(blob)

    setAudio(audioURL)
  }

  useEffect(() => {
    getAudio()
  }, [])

  const fetchDataFromBackend = async (textToSpeech, speakerId) => {
    try {
      const response = await fetch('https://wf.chat2desk.kg/insert-into-db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          speaker_id: speaker_id,
        }),
      })

      if (!response.ok) {
        throw new Error('Ошибка при отправке запроса на сервер')
      }

      const audioData = await response.arrayBuffer() // Получаем массив байтов из ответа

      // Создаем объект Blob из полученных данных
      const blob = new Blob([audioData], { type: 'audio/mpeg' })

      // Создаем URL для объекта Blob
      const audioURL = URL.createObjectURL(blob)

      audioRef.current.src = audioURL // Устанавливаем URL для тега audio
      audioRef.current.play() // Запускаем воспроизведение аудио

      // Обновляем продолжительность аудио
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration)
      }
    } catch (error) {
      console.error('Ошибка:', error)
    }
  }

  const handlePlayPause = () => {
    const audioElement = audioRef.current

    if (!isPlaying) {
      audioElement.play()
      setIsPlaying(true)
      setShowControls(true)
    } else {
      audioElement.pause()
      setIsPlaying(false)
    }
  }

  const handleTimeSeek = (e) => {
    const seekTime = e.target.value
    audioRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  const handleVolumeChange = (e) => {
    const volumeValue = e.target.value
    audioRef.current.volume = volumeValue
    setVolume(volumeValue)
  }

  const toggleVolumeMenu = () => {
    setShowVolumeMenu(!showVolumeMenu)
  }

  const handlePlaybackRateChange = (rate) => {
    audioRef.current.playbackRate = rate
    setPlaybackRate(rate)
    setShowPlaybackRateMenu(false)
  }

  const togglePlaybackRateMenu = () => {
    setShowPlaybackRateMenu(!showPlaybackRateMenu)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  const playbackRates = [0.5, 1, 1.5, 2]

  const handleInfoIcon = () => {
    setIsInfoActive(!isInfoActive)
  }

  return (
    <div className="player-wrapper">
      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        //@ts-ignore
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
      >
        <source src="" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className={`btn-play-pause-group ${showControls ? 'show' : 'hide'}`}>
        {isPlaying ? (
          <button className="play-button" onClick={handlePlayPause}>
            <FontAwesomeIcon icon={faPause} />
          </button>
        ) : (
          <button
            className="play-button"
            onClick={() =>
              fetchDataFromBackend(
                'Пример текста для преобразования в речь',
                'идентификатор_говорящего',
              )
            }
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
        <input
          style={{ height: '3px', width: '300px' }}
          type="range"
          min={0}
          max={duration}
          step="any"
          value={currentTime}
          onChange={handleTimeSeek}
        />
        <div className="time">
          <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
        </div>
        <div className="vol-rate-buttons">
          <div style={{ display: 'flex', alignItems: 'center' }} className="vol-btn-flex">
            {showVolumeMenu && (
              <input
                className="range"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                style={{ height: '3px' }}
              />
            )}
            <button
              className="volume-button"
              onClick={toggleVolumeMenu}
              style={{ marginLeft: showVolumeMenu ? '5px' : '0' }}
            >
              <FontAwesomeIcon icon={showVolumeMenu ? faVolumeMute : faVolumeUp} />
            </button>
          </div>
          <button
            className="rate-button selected"
            onClick={togglePlaybackRateMenu}
            style={{
              marginLeft: showPlaybackRateMenu ? '5px' : '0',
              backgroundColor: 'gray',
              color: 'white',
            }}
          >
            {playbackRate}x
          </button>
          {showPlaybackRateMenu && (
            <div className={`playback-rate-menu ${showPlaybackRateMenu ? 'visible' : ''}`}>
              {playbackRates.map((rate) => (
                <button
                  className="rate-button-sh"
                  key={rate}
                  onClick={() => handlePlaybackRateChange(rate)}
                >
                  {rate}x
                </button>
              ))}
            </div>
          )}
        </div>
        <button className={isInfoActive ? 'info-icon-active' : 'info-icon'} aria-label="info button">
          <FontAwesomeIcon icon={faCircleInfo} onClick={handleInfoIcon} />
        </button>
      </div>
      {isInfoActive && (
        <div className={isInfoActive ? 'info-active' : 'info-hidden'}>
          Бул үн жасалма интеллект менен жасалган. API <a href="https://ulut.kg/">"Улут Софт"</a>{' '}
          компанияга таандык, жаңылыктарды үнгө өткөзүү кызматын{' '}
          <a href="https://crm.kg/">CRM Technologies</a> компаниясы жасап чыкты.
        </div>
      )}
    </div>
  )
}

export default Player
