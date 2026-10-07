// 主显示外环与刻度，参数取自设计稿「主显示」
// 角度均为屏幕坐标：从 3 点钟方向起顺时针，单位度
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var RAD = Math.PI / 180;
  var cx = 120, cy = 120;

  function pt(d, a) {
    return (cx + d * Math.cos(a * RAD)).toFixed(2) + ' ' + (cy + d * Math.sin(a * RAD)).toFixed(2);
  }

  // 圆角环形扇区：外径 R、内径 r、起止角 a0→a1、端部圆角 k
  function sector(R, r, a0, a1, k) {
    var dO = Math.asin(k / (R - k)) / RAD;
    var dI = Math.asin(k / (r + k)) / RAD;
    var lO = Math.sqrt((R - k) * (R - k) - k * k);
    var lI = Math.sqrt((r + k) * (r + k) - k * k);
    var big = a1 - a0 > 180 ? 1 : 0;
    var c = 'A' + k + ' ' + k + ' 0 0 1 ';
    return 'M' + pt(lO, a0) + c + pt(R, a0 + dO) +
      'A' + R + ' ' + R + ' 0 ' + big + ' 1 ' + pt(R, a1 - dO) + c + pt(lO, a1) +
      'L' + pt(lI, a1) + c + pt(r, a1 - dI) +
      'A' + r + ' ' + r + ' 0 ' + big + ' 0 ' + pt(r, a0 + dI) + c + pt(lI, a0) + 'Z';
  }

  // 外环：240×240，内径比 0.8（环宽 24），从 135° 顺时针到 405°，圆角 8
  var ring = sector(120, 96, 135, 405, 8);
  document.getElementById('ringTrack').setAttribute('d', ring);
  document.getElementById('ringProgress').setAttribute('d', ring);

  // 内环刻度：20 个 14×6 圆角矩形，中心半径 80，均布于 138°–402°
  var g = document.getElementById('ticks');
  var count = 20, start = 138, span = 264;
  for (var i = 0; i < count; i++) {
    var a = start + span * i / (count - 1);
    var line = document.createElementNS(NS, 'line');
    var p1 = pt(76, a).split(' '), p2 = pt(84, a).split(' ');
    line.setAttribute('x1', p1[0]);
    line.setAttribute('y1', p1[1]);
    line.setAttribute('x2', p2[0]);
    line.setAttribute('y2', p2[1]);
    g.appendChild(line);
  }
})();

// 注册 Service Worker（仅 HTTPS 或 localhost 下可用；本地双击打开的 file:// 跳过）
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js');
  });
}
