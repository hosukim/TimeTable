import React, { useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Canvas from "react-native-canvas";

function Clock() {
  const canvasRef = useRef();

  const handleCanvas = (canvas) => {
    canvasRef.current = canvas;
    const ctx = canvas.getContext("2d");
    const radius = (canvas.height / 2) * 0.9;
    ctx.translate(radius, radius);
    setInterval(() => drawClock(ctx, radius), 1000);
  };

  const drawClock = (ctx, radius) => {
    drawCircle(ctx, 24, radius);
    drawNumber(ctx, radius);
    showTime(ctx, radius);
  };

  const drawCircle = (ctx, part, radius) => {
    const eachDeg = 360 / part;
    const lineWidth = part <= 8 ? 6 : part <= 16 ? 3 : 1;

    for (let i = 0; i <= part; i++) {
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = "rgba(0, 0, 0, 1)";
      ctx.arc(
        0,
        0,
        radius,
        degToRad(i * eachDeg),
        degToRad(i * eachDeg + eachDeg)
      );
      ctx.lineTo(0, 0); // 특정 좌표 위치로 선을 그림
      ctx.closePath(); // 경로 종료

      ctx.fillStyle = "pink";
      ctx.fill(); // 채우기
      ctx.stroke(); // 윤곽선 그리기
    }
  };

  function degToRad(deg) {
    return (Math.PI / 180) * deg * 2;
  }

  function drawNumber(ctx, radius) {
    let ang;
    ctx.fillStyle = "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (let num = 1; num <= 12; num++) {
      ang = (num * 2 * Math.PI) / 12;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      // 각 시간대별로 바깥으로 빼줘야할듯?
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }

  function showTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();

    hour = hour % 12;
    hour =
      (hour * 2 * Math.PI) / 12 +
      (min * 2 * Math.PI) / (12 * 60) +
      (sec * 2 * Math.PI) / (12 * 60 * 60);
    drawHand(ctx, hour, radius * 0.5, radius * 0.08);

    min = (min * 2 * Math.PI) / 60 + (sec * 2 * Math.PI) / (60 * 60);
    drawHand(ctx, min, radius * 0.8, radius * 0.07);

    sec = (sec * 2 * Math.PI) / 60;
    drawHand(ctx, sec, radius * 0.9, radius * 0.02);
  }

  function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    // ctx.moveTo(geom.x, geom.y);
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <canvas ref={handleCanvas} style={styles.canvas} />
      ) : (
        <Canvas ref={handleCanvas} style={styles.canvas} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    padding: 0,
    margin: 0,
  },
  canvas: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default Clock;
