import { Howl, Howler } from 'howler'

export default class Sound {
  static enable() {}

  static enableInSilenceMode() {}

  static setCategory() {}

  static setMode() {}

  static setSpeakerPhone() {}

  constructor(asset, basePath, onError) {
    this.sound = new Howl({
      src: [asset],
      onload: onError,
      onloaderror: onError,
    })
  }

  isLoaded = () => this.sound.state() === 'loaded'

  play = () => {
    if (!this.isLoaded()) return this
    this.sound.play()
    return this
  }

  pause = () => {
    if (!this.isLoaded()) return this
    this.sound.pause()
    return this
  }

  stop = () => {
    this.sound.stop()
    return this
  }

  reset = () => this

  release = () => {
    this.stop()
    return this
  }

  getNumberOfChannels = () => -1

  getDuration = () => this.sound.duration()

  getVolume = () => this.sound.volume()

  setVolume = (volume) => {
    this.sound.volume(volume)
    return this
  }

  getSystemVolume = () => Howler.volume()

  setSystemVolume = (v) => Howler.volume(v)

  getNumberOfLoops = () => this.sound.loop()

  setNumberOfLoops = (n) => {
    this.sound.loop(n === -1)
    return this
  }

  setSpeed = (v) => {
    this.sound.rate(v)
    return this
  }

  setPan = (v) => {
    this.sound.stereo(v)
    return this
  }

  getPan = () => this.sound.stereo()

  getCurrentTime = () => this.sound.seek()

  setCurrentTime = (v) => {
    this.sound.seek(v)
    return this
  }

  isPlaying = () => this.sound.playing()

  setCategory = () => {}

  setSpeakerphoneOn = () => {}
}
