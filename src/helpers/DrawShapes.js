export default {
  crest(ctx, width, height) {
    const percentageOff = 15.33333333333;
    const lengthOff = (percentageOff / 100) * height;
    const bottomTo = height - lengthOff;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    ctx.lineTo(width, bottomTo);
    ctx.lineTo(width / 2, height);
    ctx.lineTo(0, bottomTo);
    ctx.closePath();
  },
  diamond(ctx, width, height) {
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width, height / 2);
    ctx.lineTo(width / 2, height);
    ctx.lineTo(0, height / 2);
    ctx.closePath();
  },
  circle(ctx, width, height) {
    ctx.arc(width / 2, height / 2, width / 2, 0, 2 * Math.PI);
  },
  roundedRect(ctx, width, height) {
    const halfRadians = (2 * Math.PI)/2
    const quarterRadians = (2 * Math.PI)/4  
    const rounded = 10;
    ctx.beginPath();
    ctx.arc(rounded, rounded, rounded, -quarterRadians, halfRadians, true);
    ctx.lineTo(0, height - rounded);
    ctx.arc(rounded, height - rounded, rounded, halfRadians, quarterRadians, true);
    ctx.lineTo(width - rounded, height);
    ctx.arc(width - rounded, height - rounded, rounded, quarterRadians, 0, true);
    ctx.lineTo(width, rounded);
    ctx.arc(width - rounded, rounded, rounded, 0, -quarterRadians, true);
    ctx.lineTo(rounded, 0);
  },
  drawImage(ctx, img, width, height) {
    const imgWidth = img.width;
    const imgHeight = img.height;
    const scale = Math.max(width / imgWidth, height / imgHeight);
    const x = (width / 2) - (imgWidth / 2) * scale;
    const y = (height / 2) - (imgHeight / 2) * scale;
    ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
    ctx.restore();
  },
  drawImageToFit(ctx, img, width, height) {
    const imgWidth = img.width;
    const imgHeight = img.height;
    const scale = Math.min(width / imgWidth, height / imgHeight);
    const x = (width / 2) - (imgWidth / 2) * scale;
    const y = (height / 2) - (imgHeight / 2) * scale;
    ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
    ctx.restore();
  }
}