// ============================================================
// 天气卡片 - 完全参照 wttr.in 的 ASCII 图形 + 颜色方案
// 核心原理：pre + monospace + 同行图文 = 天然对齐
// ============================================================

// ---- 1. 天气代码 -> 中文描述 ----
var weatherCodeMap = {
  '113': '\u6674\u5929', '116': '\u6674\u95F4\u591A\u4E91', '119': '\u591A\u4E91', '122': '\u9634\u5929',
  '143': '\u96FE', '151': '\u70DF\u96FE\u973E', '176': '\u9635\u96E8', '179': '\u9635\u96E8\u5939\u96EA',
  '182': '\u96E8\u5939\u96EA', '185': '\u51BB\u96E8', '200': '\u6BDB\u6BDB\u96E8', '227': '\u5C0F\u96EA',
  '230': '\u5927\u96EA', '248': '\u51B0\u96FE', '260': '\u51BB\u96E8', '263': '\u6BDB\u6BDB\u96E8',
  '266': '\u5927\u96E8', '281': '\u51BB\u96E8', '284': '\u51BB\u96E8', '293': '\u5C0F\u96E8',
  '296': '\u5927\u96E8', '299': '\u5C0F\u96E8', '302': '\u5927\u96E8', '305': '\u9635\u96E8',
  '308': '\u66B4\u96E8', '311': '\u96F7\u9635\u96E8', '314': '\u96F7\u9635\u96E8', '317': '\u96F7\u9635\u96E8',
  '320': '\u9635\u96EA', '323': '\u9635\u96EA', '326': '\u96E8\u5939\u96EA', '329': '\u96E8\u5939\u96EA',
  '332': '\u9635\u96EA', '335': '\u9635\u96EA', '338': '\u5C0F\u96EA', '350': '\u51BB\u96E8',
  '353': '\u6BDB\u6BDB\u96E8', '356': '\u5927\u96E8', '359': '\u9635\u96E8', '362': '\u66B4\u96E8',
  '365': '\u96E8\u5939\u96EA', '368': '\u96E8\u5939\u96EA', '371': '\u9635\u96EA', '374': '\u9635\u96EA',
  '377': '\u5C0F\u96EA', '386': '\u5927\u96EA', '389': '\u51BB\u96E8'
};

// ---- 2. 天气代码 -> 图形类型 ----
var codeToArtType = {
  // 晴天
  '113': 'sunny',
  // 晴间多云
  '116': 'partly_cloudy',
  // 多云
  '119': 'cloudy',
  // 阴天
  '122': 'overcast',
  // 雾
  '143': 'fog',
  // 烟雾霾
  '151': 'haze',
  // 阵雨
  '176': 'showers', '305': 'showers', '359': 'showers',
  // 阵雨夹雪
  '179': 'rain_snow_showers',
  // 雨夹雪
  '182': 'sleet', '326': 'sleet', '329': 'sleet', '365': 'sleet', '368': 'sleet',
  // 冻雨
  '185': 'freezing_rain', '260': 'freezing_rain', '281': 'freezing_rain', '284': 'freezing_rain', '350': 'freezing_rain', '389': 'freezing_rain',
  // 毛毛雨
  '200': 'drizzle', '263': 'drizzle', '266': 'drizzle', '353': 'drizzle',
  // 小雪
  '227': 'light_snow', '338': 'light_snow', '377': 'light_snow',
  // 大雪
  '230': 'heavy_snow', '386': 'heavy_snow',
  // 冰雾
  '248': 'ice_fog',
  // 小雨
  '293': 'light_rain', '299': 'light_rain',
  // 大雨
  '296': 'heavy_rain', '302': 'heavy_rain', '356': 'heavy_rain',
  // 暴雨
  '308': 'heavy_downpour', '362': 'heavy_downpour',
  // 雷阵雨
  '311': 'thunderstorm', '314': 'thunderstorm', '317': 'thunderstorm',
  // 阵雪
  '320': 'snow_showers', '323': 'snow_showers', '332': 'snow_showers', '335': 'snow_showers', '371': 'snow_showers', '374': 'snow_showers'
};

// ---- 3. 风向箭头 ----
var windArrowMap = {
  'N': '\u2193', 'NNE': '\u2199', 'NE': '\u2190', 'ENE': '\u2199',
  'E': '\u2190', 'ESE': '\u2196', 'SE': '\u2191', 'SSE': '\u2196',
  'S': '\u2191', 'SSW': '\u2197', 'SW': '\u2192', 'WSW': '\u2197',
  'W': '\u2192', 'WNW': '\u2198', 'NW': '\u2193', 'NNW': '\u2198'
};

// ---- 4. 颜色（wttr.in xterm 256 色对应 hex） ----
var C = {
  sun:       '#ffff00',  // xterm 226 - 太阳/光线
  cloud:     '#bcbcbc',  // xterm 250 - 云体
  rain:      '#87afff',  // xterm 111 - 雨滴
  snow:      '#ffffff',  // xterm 255 - 雪花
  fog:       '#b39ddb',  // 雾 - 紫
  mist:      '#ce93d8',  // 薄雾 - 浅紫
  haze:      '#9e9e9e',  // 烟雾霾 - 灰
  lightning: '#ffeb3b',  // 闪电 - 亮黄
  temp:      '#ffd700',  // xterm 220 - 温度
  tempF:     '#ffaf00',  // xterm 214 - 体感温度
  wind:      '#87ff00',  // xterm 118 - 风速
  vis:       '#87afff',  // 能见度
  precip:    '#87afff'   // 降水量
};

// ---- 5. ASCII 图形定义 ----
// 从 wttr.in ?T 输出提取的真实 ASCII 图
// 每行由若干 {t: 文本, c: 颜色名} 段组成
// 纯 ASCII 字符，确保任何等宽字体都能对齐
var ART_W = 13; // 图形列固定宽度

var ART = {
  // 晴天 - 全部黄色
  sunny: [
    [{ t: '  \\   /', c: 'sun' }],
    [{ t: '   .-.', c: 'sun' }],
    [{ t: '- (   ) -', c: 'sun' }],
    [{ t: "   `-'", c: 'sun' }],
    [{ t: '  /   \\', c: 'sun' }]
  ],
  // 晴间多云 - 太阳黄 + 云灰
  partly_cloudy: [
    [{ t: '    \\  /', c: 'sun' }],
    [{ t: '  _ /""', c: 'sun' }, { t: '.-.', c: 'cloud' }],
    [{ t: '    \\_', c: 'sun' }, { t: '(   ).', c: 'cloud' }],
    [{ t: '    /', c: 'sun' }, { t: '(___(__)', c: 'cloud' }],
    [{ t: '', c: '' }]
  ],
  // 多云 - 全灰
  cloudy: [
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '   (___(__)', c: 'cloud' }],
    [{ t: '', c: '' }],
    [{ t: '', c: '' }]
  ],
  // 阴天 - 全灰大云
  overcast: [
    [{ t: '     .--.', c: 'cloud' }],
    [{ t: '  .-(    ).', c: 'cloud' }],
    [{ t: ' (___.__)__)', c: 'cloud' }],
    [{ t: '', c: '' }],
    [{ t: '', c: '' }]
  ],
  // 毛毛雨 - 云 + 少量雨点
  drizzle: [
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '   (___(__)', c: 'cloud' }],
    [{ t: "     ' ' '", c: 'rain' }],
    [{ t: "    ' ' '", c: 'rain' }]
  ],
  // 小雨 - 云 + 轻雨
  light_rain: [
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '   (___(__)', c: 'cloud' }],
    [{ t: "    ' ' ' '", c: 'rain' }],
    [{ t: "   ' ' ' '", c: 'rain' }]
  ],
  // 雨 - 太阳 + 云 + 雨
  rain: [
    [{ t: ' _`/""', c: 'sun' }, { t: '.-.', c: 'cloud' }],
    [{ t: '  ,\\_', c: 'sun' }, { t: '(   ).', c: 'cloud' }],
    [{ t: '   /', c: 'sun' }, { t: '(___(__)', c: 'cloud' }],
    [{ t: "    ' ' ' '", c: 'rain' }],
    [{ t: "   ' ' ' '", c: 'rain' }]
  ],
  // 阵雨 - 太阳 + 云 + 雨
  showers: [
    [{ t: '    \\  /', c: 'sun' }],
    [{ t: '  _ /""', c: 'sun' }, { t: '.-.', c: 'cloud' }],
    [{ t: '    \\_', c: 'sun' }, { t: '(   ).', c: 'cloud' }],
    [{ t: '    /', c: 'sun' }, { t: '(___(__)', c: 'cloud' }],
    [{ t: "    ' ' ' '", c: 'rain' }]
  ],
  // 大雨 - 云 + 密雨
  heavy_rain: [
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '   (___(__)', c: 'cloud' }],
    [{ t: "   ' ' ' ' '", c: 'rain' }],
    [{ t: "  ' ' ' ' '", c: 'rain' }]
  ],
  // 暴雨 - 阴云 + 暴雨
  heavy_downpour: [
    [{ t: '     .--.', c: 'cloud' }],
    [{ t: '  .-(    ).', c: 'cloud' }],
    [{ t: ' (___.__)__)', c: 'cloud' }],
    [{ t: "  ' ' ' ' ' '", c: 'rain' }],
    [{ t: "   ' ' ' ' '", c: 'rain' }]
  ],
  // 冻雨 - 云 + 雨冰交替
  freezing_rain: [
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '   (___(__)', c: 'cloud' }],
    [{ t: "    '", c: 'rain' }, { t: ' * ', c: 'snow' }, { t: "'", c: 'rain' }, { t: ' *', c: 'snow' }],
    [{ t: '   *', c: 'snow' }, { t: " ' ", c: 'rain' }, { t: '*', c: 'snow' }, { t: " '", c: 'rain' }]
  ],
  // 小雪 - 云 + 少量雪花
  light_snow: [
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '   (___(__)', c: 'cloud' }],
    [{ t: '     * * *', c: 'snow' }],
    [{ t: '    * * *', c: 'snow' }]
  ],
  // 雪 - 太阳 + 云 + 雪
  snow: [
    [{ t: ' _`/""', c: 'sun' }, { t: '.-.', c: 'cloud' }],
    [{ t: '  ,\\_', c: 'sun' }, { t: '(   ).', c: 'cloud' }],
    [{ t: '   /', c: 'sun' }, { t: '(___(__)', c: 'cloud' }],
    [{ t: '    * * * *', c: 'snow' }],
    [{ t: '   * * * *', c: 'snow' }]
  ],
  // 大雪 - 云 + 密雪
  heavy_snow: [
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '   (___(__)', c: 'cloud' }],
    [{ t: '   * * * * *', c: 'snow' }],
    [{ t: '  * * * * *', c: 'snow' }]
  ],
  // 阵雪 - 太阳 + 云 + 雪
  snow_showers: [
    [{ t: '    \\  /', c: 'sun' }],
    [{ t: '  _ /""', c: 'sun' }, { t: '.-.', c: 'cloud' }],
    [{ t: '    \\_', c: 'sun' }, { t: '(   ).', c: 'cloud' }],
    [{ t: '    /', c: 'sun' }, { t: '(___(__)', c: 'cloud' }],
    [{ t: '    * * * *', c: 'snow' }]
  ],
  // 雷阵雨 - 云 + 雨 + 闪电
  thunderstorm: [
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '   (___(__)', c: 'cloud' }],
    [{ t: "    ' '", c: 'rain' }, { t: 'z', c: 'lightning' }, { t: "' '", c: 'rain' }, { t: 'z', c: 'lightning' }],
    [{ t: "   ' '", c: 'rain' }, { t: 'z', c: 'lightning' }, { t: "' '", c: 'rain' }, { t: 'z', c: 'lightning' }]
  ],
  // 雨夹雪 - 太阳 + 云 + 雨雪交替
  sleet: [
    [{ t: ' _`/""', c: 'sun' }, { t: '.-.', c: 'cloud' }],
    [{ t: '  ,\\_', c: 'sun' }, { t: '(   ).', c: 'cloud' }],
    [{ t: '   /', c: 'sun' }, { t: '(___(__)', c: 'cloud' }],
    [{ t: "    '", c: 'rain' }, { t: ' * ', c: 'snow' }, { t: "'", c: 'rain' }, { t: ' *', c: 'snow' }],
    [{ t: '   *', c: 'snow' }, { t: " ' ", c: 'rain' }, { t: '*', c: 'snow' }, { t: " '", c: 'rain' }]
  ],
  // 阵雨夹雪 - 太阳 + 云 + 雨雪交替
  rain_snow_showers: [
    [{ t: '    \\  /', c: 'sun' }],
    [{ t: '  _ /""', c: 'sun' }, { t: '.-.', c: 'cloud' }],
    [{ t: '    \\_', c: 'sun' }, { t: '(   ).', c: 'cloud' }],
    [{ t: '    /', c: 'sun' }, { t: '(___(__)', c: 'cloud' }],
    [{ t: "   '", c: 'rain' }, { t: '* * ', c: 'snow' }, { t: "'", c: 'rain' }, { t: '* *', c: 'snow' }]
  ],
  // 雾 - 紫色横线
  fog: [
    [{ t: '', c: '' }],
    [{ t: '  - - - -', c: 'fog' }],
    [{ t: '   - - - -', c: 'fog' }],
    [{ t: '  - - - -', c: 'fog' }],
    [{ t: '', c: '' }]
  ],
  // 薄雾 - 浅紫波浪
  mist: [
    [{ t: '', c: '' }],
    [{ t: '   ~ ~ ~', c: 'mist' }],
    [{ t: '    ~ ~ ~', c: 'mist' }],
    [{ t: '   ~ ~ ~', c: 'mist' }],
    [{ t: '', c: '' }]
  ],
  // 烟雾霾 - 灰波浪
  haze: [
    [{ t: '  ~ ~ ~ ~', c: 'haze' }],
    [{ t: '   ~ ~ ~ ~', c: 'haze' }],
    [{ t: '  ~ ~ ~ ~', c: 'haze' }],
    [{ t: '   ~ ~ ~ ~', c: 'haze' }],
    [{ t: '', c: '' }]
  ],
  // 冰雾 - 冰晶 + 雾
  ice_fog: [
    [{ t: '', c: '' }],
    [{ t: '  * - * -', c: 'fog' }],
    [{ t: '   - * - *', c: 'fog' }],
    [{ t: '  * - * -', c: 'fog' }],
    [{ t: '', c: '' }]
  ]
};

// ---- 6. 工具函数 ----
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function padRight(str, width) {
  str = String(str);
  while (str.length < width) str += ' ';
  return str;
}

// 构建一行图形的 HTML（带颜色 span，补齐到 ART_W 宽度）
function buildArtLine(segments) {
  var plain = '';
  var html = [];

  for (var i = 0; i < segments.length; i++) {
    var seg = segments[i];
    if (!seg.t) continue;
    plain += seg.t;
    if (seg.c && C[seg.c]) {
      html.push('<span style="color:' + C[seg.c] + ' !important">' + escapeHtml(seg.t) + '</span>');
    } else {
      html.push(escapeHtml(seg.t));
    }
  }

  // 补齐到固定宽度（用普通空格，不需要 span）
  var pad = ART_W - plain.length;
  if (pad > 0) {
    html.push(new Array(pad + 1).join(' '));
  }

  return html.join('');
}

// ---- 7. 构建天气显示内容 ----
function buildWeatherContent(weatherData) {
  var cur = weatherData.current_condition[0];
  var code = String(cur.weatherCode || '113');
  var temp = parseInt(cur.temp_C) || 0;
  var feels = parseInt(cur.FeelsLikeC) || temp;
  var wind = cur.windspeedKmph || '0';
  var windDir = cur.winddir16Point || 'N';
  var vis = cur.visibility || '--';
  var precip = cur.precipMM || '0';
  var desc = weatherCodeMap[code] || '\u6674\u5929';
  var artType = codeToArtType[code] || 'sunny';
  var arrow = windArrowMap[windDir] || '\u2192';

  var art = ART[artType] || ART.sunny;

  // 数据值（5 行，对应图形 5 行）
  var dataLines = [
    { text: desc, color: null },
    { text: temp + '(' + feels + ')\u00B0C', color: C.temp },
    { text: arrow + ' ' + wind + ' km/h', color: C.wind },
    { text: vis + ' km', color: C.vis },
    { text: precip + ' mm', color: C.precip }
  ];

  // 构建每行：图形(13字符宽) + 两个空格 + 数据
  var lines = [];
  for (var i = 0; i < 5; i++) {
    var artHtml = buildArtLine(art[i] || [{ t: '', c: '' }]);
    var d = dataLines[i];
    var dataHtml = d.color
      ? '<span style="color:' + d.color + ' !important">' + escapeHtml(d.text) + '</span>'
      : escapeHtml(d.text);
    lines.push(artHtml + '  ' + dataHtml);
  }

  return lines.join('\n');
}

// ---- 8. 主逻辑 ----
export default async function initWeather() {
  var container = document.getElementById('redefine-weather');
  if (!container) return;
  var config = window.hexo_config && window.hexo_config.plugins && window.hexo_config.plugins.weather
    ? window.hexo_config.plugins.weather : {};
  var fallbackCity = config.fallback_city || '\u5357\u660C';
  container.innerHTML = '<div class="weather-loading">\u52A0\u8F7D\u4E2D...</div>';

  try {
    var city = fallbackCity;
    try {
      var location = await getLocation();
      if (location && location.city) city = location.city;
    } catch (e) { console.warn('[Weather] IP\u5B9A\u4F4D\u5931\u8D25'); }
    var weatherData = await getWeatherJSON(city);
    var content = buildWeatherContent(weatherData);
    renderCard(container, city, content);
    startClock(container);
  } catch (error) {
    console.error('[Weather] \u52A0\u8F7D\u5931\u8D25:', error);
    container.innerHTML =
      '<div class="weather-error">' +
      '\u5929\u6C14\u83B7\u53D6\u5931\u8D25<br>' +
      '<button onclick="Weather.init()" style="margin-top:8px;padding:4px 12px;border-radius:4px;border:1px solid var(--border-color);background:var(--card-background);color:var(--text-primary);cursor:pointer;">\u91CD\u8BD5</button>' +
      '</div>';
  }
}

async function getLocation() {
  try {
    var res = await fetch('https://ip-api.com/json/?fields=status,city', { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    var data = await res.json();
    if (data.status === 'success' && data.city) return { city: data.city };
    return null;
  } catch (e) { return null; }
}

async function getWeatherJSON(city) {
  var url = 'https://wttr.in/' + encodeURIComponent(city) + '?format=j1&lang=zh';
  var res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  var data = await res.json();
  if (!data.current_condition || !data.current_condition[0]) throw new Error('\u65E0\u6548\u5929\u6C14\u6570\u636E');
  return data;
}

function renderCard(container, city, content) {
  var now = new Date();
  container.innerHTML =
    '<div class="weather-card-content">' +
    '  <div class="weather-title-line" id="weather-title">' +
    '    <span class="weather-city">' + escapeHtml(city) + '</span>' +
    '    <span class="weather-time">' + formatDate(now) + '</span>' +
    '  </div>' +
    '  <pre class="weather-pre">' + content + '</pre>' +
    '</div>';
}

function formatDate(date) {
  var y = date.getFullYear();
  var m = String(date.getMonth() + 1).padStart(2, '0');
  var d = String(date.getDate()).padStart(2, '0');
  var h = String(date.getHours()).padStart(2, '0');
  var min = String(date.getMinutes()).padStart(2, '0');
  var s = String(date.getSeconds()).padStart(2, '0');
  return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
}

function startClock(container) {
  if (window.__weatherTimer) clearInterval(window.__weatherTimer);
  var titleEl = container.querySelector('#weather-title');
  if (!titleEl) return;
  window.__weatherTimer = setInterval(function () {
    var timeEl = titleEl.querySelector('.weather-time');
    if (timeEl) timeEl.textContent = formatDate(new Date());
  }, 1000);
}

// ---- 9. 初始化 ----
var isInitialized = false;
function init() {
  if (isInitialized) return;
  isInitialized = true;
  initWeather();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else { init(); }
document.addEventListener('swup:pageView', function () {
  var container = document.getElementById('redefine-weather');
  if (container) {
    if (window.__weatherTimer) clearInterval(window.__weatherTimer);
    isInitialized = false;
    init();
  }
});
window.Weather = { init: initWeather };
