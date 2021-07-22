<template>
  <div id="app">
    <canvas id="Snow"></canvas>

    <router-view />
  </div>
</template>

 <script>
export default {
  // 雪花特效
  mounted() {
    (function () {
      var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      window.requestAnimationFrame = requestAnimationFrame;
    })();
    (function () {
      var flakes = [],
        canvas = document.getElementById("Snow"),
        ctx = canvas.getContext("2d"),
        flakeCount = 50,
        mX = -100,
        mY = -100;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      function snow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < flakeCount; i++) {
          var flake = flakes[i],
            x = mX,
            y = mY,
            minDist = 150,
            x2 = flake.x,
            y2 = flake.y;
          var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
            dx = x2 - x,
            dy = y2 - y;
          if (dist < minDist) {
            var force = minDist / (dist * dist),
              xcomp = (x - x2) / dist,
              ycomp = (y - y2) / dist,
              deltaV = force / 2;
            flake.velX -= deltaV * xcomp;
            flake.velY -= deltaV * ycomp;
          } else {
            flake.velX *= 0.98;
            if (flake.velY <= flake.speed) {
              flake.velY = flake.speed;
            }
            flake.velX += Math.cos((flake.step += 0.05)) * flake.stepSize;
          }
          ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
          flake.y += flake.velY;
          flake.x += flake.velX;
          if (flake.y >= canvas.height || flake.y <= 0) {
            reset(flake);
          }
          if (flake.x >= canvas.width || flake.x <= 0) {
            reset(flake);
          }
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
          ctx.fill();
        }
        requestAnimationFrame(snow);
      }
      function reset(flake) {
        flake.x = Math.floor(Math.random() * canvas.width);
        flake.y = 0;
        flake.size = Math.random() * 3 + 2;
        flake.speed = Math.random() * 1 + 0.5;
        flake.velY = flake.speed;
        flake.velX = 0;
        flake.opacity = Math.random() * 0.5 + 0.3;
      }
      function init() {
        for (var i = 0; i < flakeCount; i++) {
          var x = Math.floor(Math.random() * canvas.width),
            y = Math.floor(Math.random() * canvas.height),
            size = Math.random() * 3 + 2,
            speed = Math.random() * 1 + 0.5,
            opacity = Math.random() * 0.5 + 0.3;
          flakes.push({
            speed: speed,
            velY: speed,
            velX: 0,
            x: x,
            y: y,
            size: size,
            stepSize: (Math.random() / 30) * 1,
            step: 0,
            angle: 180,
            opacity: opacity,
          });
        }
        snow();
      }
      document.addEventListener("mousemove", function (e) {
        (mX = e.clientX), (mY = e.clientY);
      });
      window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
      init();
    })();
  },
};
</script>

<style lang="less">
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
body {
  background: linear-gradient(to right, rgb(233, 231, 231) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(243, 240, 240) 1px, transparent 1px);
  background-repeat: repeat; /* 默认为 repeat */
  background-size: 10px 10px;
}
#Snow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  pointer-events: none;
}
</style>