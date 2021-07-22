<template>
  <div class="player">
    <div class="record">
      <img
        src="../assets/record.png"
        alt="播放器"
        title="AKB48 - 桜の木になろう"
        @click="start"
      />
      <audio
        loop="loop"
        ref="audioRef"
        @play="onPlay"
        @pause="onPause"
      >
        <source type="audio/mp3" src="../static/AKB48 - 桜の木になろう.mp3"/>
      </audio>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    //   audioSrc: "../assets/audio/AKB48 - 桜の木になろう.mp3",
      playing: false,
    };
  },
  methods: {
    async start() {
      let recordAudio = this.$refs.audioRef; //获取audio元素
      console.log(recordAudio);
      await recordAudio.load()
      this.playing ? this.pause() : this.play();
    },
    // 播放音频
    play() {
      console.log("点击play");
        this.$refs.audioRef.play();
    },
    // 暂停音频
    pause() {
      console.log("点击pause");
    this.$refs.audioRef.pause();
    },
    // 当音频播放
    onPlay() {
      this.playing = true;
    },
    // 当音频暂停
    onPause() {
      this.playing = false;
    },
  },
};
</script>
<style lang="less">
.player {
  position: fixed;
  left: 0;
  top: 70%;
//   transform: translateY(-50%);
  z-index: 20;
  .record {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-60%, -50%);
    transition: all 0.5s ease;
    cursor: pointer;
    &:hover {
      transform: translate(-40%, -50%);
    }
    img {
      width: 120px;
      height: auto;
    }
    audio {
      width: 0;
      height: 0;
      opacity: 0;
      visibility: hidden;
    }
  }
}
</style>