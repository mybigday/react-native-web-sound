export default function Sound(asset, basePath, onError) {
  this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
  this.source = this.audioContext.createBufferSource()
  this.gainNode = this.audioContext.createGain()
  this.source.connect(this.gainNode)
  this.gainNode.connect(this.audioContext.destination)
  this.currentPlaybackPosition = 0

  fetch(asset)
    .then(response => response.arrayBuffer())
    .then(data => this.audioContext.decodeAudioData(data))
    .then(buffer => {
      this.source.buffer = buffer
      onError && onError()
    })
    .catch(error => onError && onError(`Got error: ${error}`))
}

Sound.enable = () => {}
Sound.enableInSilenceMode = () => {}
Sound.setCategory = () => {}
Sound.setMode = () => {}
Sound.setSpeakerPhone = () => {}

Sound.prototype.isLoaded = function () {
  return this.source.buffer !== null
}

Sound.prototype.play = function(onEnd) {
  if (!this.isLoaded()) {
    onEnd && onEnd(false)
    return this
  }
  if (this.audioContext.state === 'suspended') {
    this.audioContext.resume()
  } else {
    this.source.start(0, this.currentPlaybackPosition)
  }
  this.source.onended = () => onEnd && onEnd(true)
  return this
}

Sound.prototype.pause = function() {
  if (!this.isLoaded()) return this
  this.currentPlaybackPosition = this.audioContext.currentTime
  this.audioContext.suspend()
  return this
}

Sound.prototype.stop = function() {
  this.source.stop(0)
  this.currentPlaybackPosition = 0
  return this
}

Sound.prototype.reset = function() { return this }

Sound.prototype.release = function() {
  this.stop()
  return this
}

Sound.prototype.getNumberOfChannels = function() { return this.source.buffer.numberOfChannels }

Sound.prototype.getDuration = function() { return this.source.buffer.duration }

Sound.prototype.getVolume = function() { return this.gainNode.gain.value }

Sound.prototype.setVolume = function(volume) {
  this.gainNode.gain.value = volume
  return this
}

Sound.prototype.getSystemVolume = () => 1 // Web Audio API does not have a global volume control

Sound.prototype.setSystemVolume = (v) => {} // Web Audio API does not have a global volume control

Sound.prototype.getNumberOfLoops = function() { return this.source.loop ? -1 : 0 }

Sound.prototype.setNumberOfLoops = function(n) {
  this.source.loop = (n === -1)
  return this
}

Sound.prototype.setSpeed = function(v) {
  this.source.playbackRate.value = v
  return this
}

Sound.prototype.setPan = function(v) {
  if (!this.pannerNode) {
    this.pannerNode = this.audioContext.createStereoPanner()
    this.source.connect(this.pannerNode)
    this.pannerNode.connect(this.audioContext.destination)
  }
  this.pannerNode.pan.value = v
  return this
}

Sound.prototype.getPan = function() { return this.pannerNode ? this.pannerNode.pan.value : 0 }

Sound.prototype.getCurrentTime = function() { return this.audioContext.currentTime }

Sound.prototype.setCurrentTime = function(v) {
  this.source.stop(0)
  this.source.start(0, v)
  return this
}

Sound.prototype.isPlaying = function() { return this.source.playbackState === this.source.PLAYING_STATE }

Sound.prototype.setCategory = () => {}

Sound.prototype.setSpeakerphoneOn = () => {}
