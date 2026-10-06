// 表盘内圈刻度：20 个，左右各 131.6°，最后 3 个为浅色
(function () {
  var g = document.getElementById('ticks');
  var NS = 'http://www.w3.org/2000/svg';
  var cx = 142, cy = 142, r1 = 86, r2 = 102;
  var count = 20, start = -131.6, span = 263.2, light = 3;
  for (var i = 0; i < count; i++) {
    var a = (start + span * i / (count - 1)) * Math.PI / 180;
    var s = Math.sin(a), c = Math.cos(a);
    var line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', (cx + r1 * s).toFixed(2));
    line.setAttribute('y1', (cy - r1 * c).toFixed(2));
    line.setAttribute('x2', (cx + r2 * s).toFixed(2));
    line.setAttribute('y2', (cy - r2 * c).toFixed(2));
    line.setAttribute('stroke', i >= count - light ? '#cdcdcd' : '#4f4f4f');
    g.appendChild(line);
  }
})();

// 注册 Service Worker（仅 HTTPS 或 localhost 下可用；本地双击打开的 file:// 跳过）
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js');
  });
}
