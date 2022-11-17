import { Howl, Howler } from 'howler'

export default function Sound(asset, basePath, onError) {
  this.sound = new Howl({
    src: [asset],
    onload: onError,
    onloaderror: onError,
  })
}

Sound.enable = () => {}
Sound.enableInSilenceMode = () => {}
Sound.setCategory = () => {}
Sound.setMode = () => {}
Sound.setSpeakerPhone = () => {}

Sound.prototype.isLoaded = function () {
  return this.sound.state() === 'loaded'
}

Sound.prototype.play = function(onEnd) {
  if (!this.isLoaded()) {
    onEnd && onEnd(false)
    return this
  }
  if (onEnd) this.sound.once('end', () => onEnd(true))
  this.sound.play()
  return this
}

Sound.prototype.pause = function() {
  if (!this.isLoaded()) return this
  this.sound.pause()
  return this
}

Sound.prototype.stop = function() {
  this.sound.stop()
  return this
}

Sound.prototype.reset = function() { return this }

Sound.prototype.release = function() {
  this.stop()
  return this
}

Sound.prototype.getNumberOfChannels = function() { return -1 }

Sound.prototype.getDuration = function() { return this.sound.duration() }

Sound.prototype.getVolume = function() { return this.sound.volume() }

Sound.prototype.setVolume = function(volume) {
  this.sound.volume(volume)
  return this
}

Sound.prototype.getSystemVolume = () => Howler.volume()

Sound.prototype.setSystemVolume = (v) => Howler.volume(v)

Sound.prototype.getNumberOfLoops = function() { return this.sound.loop() ? -1 : 0 }

Sound.prototype.setNumberOfLoops = function(n) {
  this.sound.loop(n === -1)
  return this
}

Sound.prototype.setSpeed = function(v) {
  this.sound.rate(v)
  return this
}

Sound.prototype.setPan = function(v) {
  this.sound.stereo(v)
  return this
}

Sound.prototype.getPan = function() { return this.sound.stereo() }

Sound.prototype.getCurrentTime = function() { return this.sound.seek() }

Sound.prototype.setCurrentTime = function(v) {
  this.sound.seek(v)
  return this
}

Sound.prototype.isPlaying = function() { return this.sound.playing() }

Sound.prototype.setCategory = () => {}

Sound.prototype.setSpeakerphoneOn = () => {}
