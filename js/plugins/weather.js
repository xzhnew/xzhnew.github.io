
// ---- 1. 天气代码 -> 中文描述 ----
var weatherCodeMap = {

  // ===== 晴 / 云 =====
  '113': '晴',
  '116': '晴间多云',
  '119': '多云',
  '122': '阴',

  // ===== 雾 / 霾 =====
  '143': '轻雾',
  '151': '烟霾',
  '248': '雾',
  '260': '冰雾',

  // ===== 雨 =====
  '176': '零星阵雨',
  '185': '零星冻雨',
  '200': '雷阵雨',
  '263': '毛毛雨',
  '266': '毛毛雨',
  '281': '冻雨',
  '284': '冻雨',
  '293': '零星小雨',
  '296': '小雨',
  '299': '中雨',
  '302': '中雨',
  '305': '大雨',
  '308': '大雨',
  '311': '冻雨',
  '314': '冻雨',
  '317': '小雨夹雪',
  '350': '冰粒',
  '353': '阵雨',
  '356': '中到大阵雨',
  '359': '暴雨',
  '362': '小阵雨夹雪',
  '365': '中到大阵雨夹雪',
  '386': '雷阵雨',
  '389': '雷阵雨',

  // ===== 雪 =====
  '179': '零星小雪',
  '227': '风吹雪',
  '230': '暴风雪',
  '323': '局部小雪',
  '326': '小雪',
  '329': '局部中雪',
  '332': '中雪',
  '335': '局部大雪',
  '338': '大雪',
  '368': '阵雪',
  '371': '中到大阵雪',
  '374': '小阵冰粒',
  '377': '中到大阵冰粒',
  '392': '雷阵雪',
  '395': '雷阵雪',

  // ===== 雨夹雪 =====
  '182': '零星雨夹雪',
  '320': '中到大雨夹雪',
};
// ---- 2. 天气代码 -> 图形类型 ----
var codeToArtType = {

  // ----- sunny（晴） -----
  '113': 'sunny',

  // ----- partly_cloudy（晴间多云） -----
  '116': 'partly_cloudy',

  // ----- cloudy / overcast（多云 / 阴） -----
  '119': 'cloudy',
  '122': 'overcast',

  // ----- mist / fog / ice_fog / haze（轻雾 / 雾 / 冰雾 / 烟霾） -----
  '143': 'mist',
  '151': 'haze',
  '248': 'fog',
  '260': 'ice_fog',

  // ----- drizzle（毛毛雨 / 零星小雨） -----
  '263': 'drizzle',
  '266': 'drizzle',
  '293': 'drizzle',

  // ----- light_rain（小雨） -----
  '296': 'light_rain',

  // ----- rain（中雨） -----
  '299': 'rain',
  '302': 'rain',

  // ----- heavy_rain（大雨） -----
  '305': 'heavy_rain',
  '308': 'heavy_rain',
  '356': 'heavy_rain',

  // ----- heavy_downpour（暴雨） -----
  '359': 'heavy_downpour',

  // ----- showers（阵雨，太阳+云+雨） -----
  '176': 'showers',
  '353': 'showers',

  // ----- thunderstorm（雷阵雨） -----
  '200': 'thunderstorm',
  '386': 'thunderstorm',
  '389': 'thunderstorm',

  // ----- freezing_rain（冻雨 / 冰粒） -----
  '185': 'freezing_rain',
  '281': 'freezing_rain',
  '284': 'freezing_rain',
  '311': 'freezing_rain',
  '314': 'freezing_rain',
  '350': 'freezing_rain',

  // ----- light_snow（小雪） -----
  '179': 'light_snow',
  '227': 'light_snow',
  '323': 'light_snow',
  '326': 'light_snow',

  // ----- snow（中雪） -----
  '329': 'snow',
  '332': 'snow',

  // ----- heavy_snow（大雪 / 暴风雪） -----
  '230': 'heavy_snow',
  '335': 'heavy_snow',
  '338': 'heavy_snow',
  '395': 'heavy_snow',

  // ----- snow_showers（阵雪 / 阵冰粒） -----
  '368': 'snow_showers',
  '371': 'snow_showers',
  '374': 'snow_showers',
  '377': 'snow_showers',

  // ----- sleet（雨夹雪） -----
  '182': 'sleet',
  '317': 'sleet',
  '320': 'sleet',
  '365': 'sleet',

  // ----- rain_snow_showers（阵雨夹雪，太阳+雨雪） -----
  '362': 'rain_snow_showers',

  // ----- 雷阵雪（无专属图，用雪图） -----
  '392': 'snow'
};

// ---- 3. 风向箭头 ----
var windArrowMap = {
  'N': '↓', 'NNE': '↙', 'NE': '↙', 'ENE': '↙',
  'E': '←', 'ESE': '↖', 'SE': '↖', 'SSE': '↖',
  'S': '↑', 'SSW': '↗', 'SW': '↗', 'WSW': '↗',
  'W': '→', 'WNW': '↘', 'NW': '↘', 'NNW': '↘'
};

// ---- 4. 颜色 ----
// ---- Dark ----
var C = {
  sun:       '#fff143', // 鵝黃
  cloud:     '#e9e7ef', // 銀白
  rain:      '#44cef6', // 藍
  snow:      '#ffffff', // 精白
  fog:       '#f2ecde', // 縞
  mist:      '#e3f9fd', // 瑩白
  haze:      '#a1afc9', // 藍灰色
  lightning: '#fff143', // 鵝黃
  temp:      '#f0c239', // 緗色
  tempF:     '#e29c45', // 黃櫨
  wind:      '#7fecad', // 縹
  vis:       '#d6ecf0', // 月白
  precip:    '#30dff3'  // 湖藍
};
// ---- Light ----
// 暂时与 Dark 同一套亮色（用户要求试试效果），表结构独立保留便于后续改回
// 例外：cloud 用纯黑（浅底上银白几乎不可见）
var C_LIGHT = {
  sun:       '#ffa400', // 橙黃
  cloud:     '#000000', // 純黑
  rain:      '#44cef6', // 藍
  snow:      '#ffffff', // 精白
  fog:       '#f2ecde', // 縞
  mist:      '#e3f9fd', // 瑩白
  haze:      '#a1afc9', // 藍灰色
  lightning: '#fff143', // 鵝黃
  temp:      '#f0c239', // 緗色
  tempF:     '#e29c45', // 黃櫨
  wind:      '#7fecad', // 縹
  vis:       '#d6ecf0', // 月白
  precip:    '#30dff3'  // 湖藍
};

/** 是否为暗色模式 */
function isDarkMode() {
  try {
    // 优先看 body 上主题挂的模式 class —— 它是主题自己的语义标记，最可靠。
    if (document.body && document.body.classList.contains('dark-mode')) return true;
    if (document.body && document.body.classList.contains('light-mode')) return false;
    // class 还没挂上（weather.js 的 module 脚本比 main.js 先执行）时，回退到读变量值
    var bg = '';
    if (document.body) {
      bg = getComputedStyle(document.body).getPropertyValue('--background-color').trim();
    }
    if (!bg) {
      bg = getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim();
    }
    if (!bg) return false;
    var r, g, b;
    var hex = bg.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hex) {
      var h = hex[1];
      if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      r = parseInt(h.slice(0, 2), 16);
      g = parseInt(h.slice(2, 4), 16);
      b = parseInt(h.slice(4, 6), 16);
    } else {
      var m = bg.match(/\d+(\.\d+)?/g);
      if (!m || m.length < 3) return false;
      r = parseFloat(m[0]); g = parseFloat(m[1]); b = parseFloat(m[2]);
    }
    var lum = (r * 299 + g * 587 + b * 114) / 1000;
    return lum < 128;
  } catch (e) { return false; }
}

/** 返回当前模式对应的颜色表 */
function getPalette() {
  return isDarkMode() ? C : C_LIGHT;
}

// ---- 5. ASCII 图形 ----
var ART_W = 13;

var ART = {
  sunny: [
    [{ t: '  \\   /', c: 'sun' }],
    [{ t: '   .-.', c: 'sun' }],
    [{ t: '- (   ) -', c: 'sun' }],
    [{ t: "   `-'", c: 'sun' }],
    [{ t: '  /   \\', c: 'sun' }]
  ],
  partly_cloudy: [
    [{ t: '    \\  /', c: 'sun' }],
    [{ t: '  _ /""', c: 'sun' }, { t: '.-.', c: 'cloud' }],
    [{ t: '    \\_', c: 'sun' }, { t: '(   ).', c: 'cloud' }],
    [{ t: '    /', c: 'sun' }, { t: '(___(__)', c: 'cloud' }],
    [{ t: '', c: '' }]
  ],
  cloudy: [
    [{ t: '', c: '' }],
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '   (___(__)', c: 'cloud' }],
    [{ t: '', c: '' }]
  ],
  overcast: [
    [{ t: '', c: '' }],
    [{ t: '     .--.', c: 'cloud' }],
    [{ t: '  .-(    ).', c: 'cloud' }],
    [{ t: ' (___.__)__)', c: 'cloud' }],
    [{ t: '', c: '' }]
  ],
  drizzle: [
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '   (___(__)', c: 'cloud' }],
    [{ t: "     ' ' '", c: 'rain' }],
    [{ t: "    ' ' '", c: 'rain' }]
  ],
  light_rain: [
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '   (___(__)', c: 'cloud' }],
    [{ t: "    ' ' ' '", c: 'rain' }],
    [{ t: "   ' ' ' '", c: 'rain' }]
  ],
  rain: [
    [{ t: ' _`/""', c: 'sun' }, { t: '.-.', c: 'cloud' }],
    [{ t: '  ,\\_', c: 'sun' }, { t: '(   ).', c: 'cloud' }],
    [{ t: '   /', c: 'sun' }, { t: '(___(__)', c: 'cloud' }],
    [{ t: "    ' ' ' '", c: 'rain' }],
    [{ t: "   ' ' ' '", c: 'rain' }]
  ],
  showers: [
    [{ t: '    \\  /', c: 'sun' }],
    [{ t: '  _ /""', c: 'sun' }, { t: '.-.', c: 'cloud' }],
    [{ t: '    \\_', c: 'sun' }, { t: '(   ).', c: 'cloud' }],
    [{ t: '    /', c: 'sun' }, { t: '(___(__)', c: 'cloud' }],
    [{ t: "    ' ' ' '", c: 'rain' }]
  ],
  heavy_rain: [
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '   (___(__)', c: 'cloud' }],
    [{ t: "   ' ' ' ' '", c: 'rain' }],
    [{ t: "  ' ' ' ' '", c: 'rain' }]
  ],
  heavy_downpour: [
    [{ t: '     .--.', c: 'cloud' }],
    [{ t: '  .-(    ).', c: 'cloud' }],
    [{ t: ' (___.__)__)', c: 'cloud' }],
    [{ t: "  ' ' ' ' ' '", c: 'rain' }],
    [{ t: "   ' ' ' ' '", c: 'rain' }]
  ],
  freezing_rain: [
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '   (___(__)', c: 'cloud' }],
    [{ t: "    '", c: 'rain' }, { t: ' * ', c: 'snow' }, { t: "'", c: 'rain' }, { t: ' *', c: 'snow' }],
    [{ t: '   *', c: 'snow' }, { t: " ' ", c: 'rain' }, { t: '*', c: 'snow' }, { t: " '", c: 'rain' }]
  ],
  light_snow: [
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '   (___(__)', c: 'cloud' }],
    [{ t: '     * * *', c: 'snow' }],
    [{ t: '    * * *', c: 'snow' }]
  ],
  snow: [
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '    (___(__)', c: 'cloud' }],
    [{ t: '    * * * *', c: 'snow' }],
    [{ t: '   * * * *', c: 'snow' }]
  ],
  heavy_snow: [
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '   (___(__)', c: 'cloud' }],
    [{ t: '   * * * * *', c: 'snow' }],
    [{ t: '  * * * * *', c: 'snow' }]
  ],
  snow_showers: [
    [{ t: '    \\  /', c: 'sun' }],
    [{ t: '  _ /""', c: 'sun' }, { t: '.-.', c: 'cloud' }],
    [{ t: '    \\_', c: 'sun' }, { t: '(   ).', c: 'cloud' }],
    [{ t: '    /', c: 'sun' }, { t: '(___(__)', c: 'cloud' }],
    [{ t: '    * * * *', c: 'snow' }]
  ],
  thunderstorm: [
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '   (___(__)', c: 'cloud' }],
    [{ t: "    ' '", c: 'rain' }, { t: 'z', c: 'lightning' }, { t: "' '", c: 'rain' }, { t: 'z', c: 'lightning' }],
    [{ t: "   ' '", c: 'rain' }, { t: 'z', c: 'lightning' }, { t: "' '", c: 'rain' }, { t: 'z', c: 'lightning' }]
  ],
  sleet: [
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '    (___(__)', c: 'cloud' }],
    [{ t: "    '", c: 'rain' }, { t: ' * ', c: 'snow' }, { t: "'", c: 'rain' }, { t: ' *', c: 'snow' }],
    [{ t: '   *', c: 'snow' }, { t: " ' ", c: 'rain' }, { t: '*', c: 'snow' }, { t: " '", c: 'rain' }]
  ],
  rain_snow_showers: [
    [{ t: '    \\  /', c: 'sun' }],
    [{ t: '  _ /""', c: 'sun' }, { t: '.-.', c: 'cloud' }],
    [{ t: '    \\_', c: 'sun' }, { t: '(   ).', c: 'cloud' }],
    [{ t: '    /', c: 'sun' }, { t: '(___(__)', c: 'cloud' }],
    [{ t: "   '", c: 'rain' }, { t: '* * ', c: 'snow' }, { t: "'", c: 'rain' }, { t: '* *', c: 'snow' }]
  ],
  fog: [
    [{ t: '', c: '' }],
    [{ t: '  - - - -', c: 'fog' }],
    [{ t: '   - - - -', c: 'fog' }],
    [{ t: '  - - - -', c: 'fog' }],
    [{ t: '', c: '' }]
  ],
  mist: [
    [{ t: '', c: '' }],
    [{ t: '   ~ ~ ~', c: 'mist' }],
    [{ t: '    ~ ~ ~', c: 'mist' }],
    [{ t: '   ~ ~ ~', c: 'mist' }],
    [{ t: '', c: '' }]
  ],
  haze: [
    [{ t: '  ~ ~ ~ ~', c: 'haze' }],
    [{ t: '   ~ ~ ~ ~', c: 'haze' }],
    [{ t: '  ~ ~ ~ ~', c: 'haze' }],
    [{ t: '   ~ ~ ~ ~', c: 'haze' }],
    [{ t: '', c: '' }]
  ],
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

function buildArtLine(segments) {
  var plain = '';
  var html = [];
  for (var i = 0; i < segments.length; i++) {
    var seg = segments[i];
    if (!seg.t) continue;
    plain += seg.t;
    var text = escapeHtml(seg.t);
    text = text.replace(/\./g, '<span class="w-dot">.</span>');
    var pal = getPalette();
    if (seg.c && pal[seg.c]) {
      html.push('<span style="color:' + pal[seg.c] + ' !important">' + text + '</span>');
    } else {
      html.push(text);
    }
  }
  var pad = ART_W - plain.length;
  if (pad > 0) {
    html.push(new Array(pad + 1).join(' '));
  }
  return html.join('');
}

// ---- 7. 构建天气显示内容 ----
function seg(t, c) {
  return { t: String(t), c: c };
}

function buildWeatherContent(weatherData) {
  var cur = weatherData.current_condition[0];
  var code = String(cur.weatherCode || '113');
  var temp = parseInt(cur.temp_C) || 0;
  var feels = parseInt(cur.FeelsLikeC) || temp;
  var wind = cur.windspeedKmph || '0';
  var windDir = cur.winddir16Point || 'N';
  var vis = cur.visibility || '--';
  var precip = cur.precipMM || '0';
  var desc = weatherCodeMap[code] || '晴天';
  var artType = codeToArtType[code] || 'sunny';
  var arrow = windArrowMap[windDir] || '→';
  var art = ART[artType] || ART.sunny;

  var today = (weatherData.weather && weatherData.weather[0]) || {};
  var maxT = parseInt(today.maxtempC, 10);
  var minT = parseInt(today.mintempC, 10);
  if (isNaN(maxT)) maxT = temp;
  if (isNaN(minT)) minT = feels;

  var sym = symbolColor();
  var rows = [
    [seg(desc, sym)],
    [seg(maxT + '（' + minT + '）', levelColor('temp', maxT)), seg('°C', sym)],
    [seg(arrow, sym), seg(' ' + wind, levelColor('wind', wind)), seg(' km/h', sym)],
    [seg(vis, levelColor('vis', vis)), seg(' km', sym)],
    [seg(precip, levelColor('precip', precip)), seg(' mm', sym)]
  ];

  var lines = [];
  for (var i = 0; i < 5; i++) {
    var segs = (rows[i] || []).map(function (s) {
      return '<span style="color:' + s.c + ' !important">' + escapeHtml(s.t) + '</span>';
    }).join('');
    lines.push(buildArtLine(art[i] || [{ t: '', c: '' }]) + '  ' + segs);
  }
  return lines.join('\n');
}

// ---- 7a. 符号色 ----
function symbolColor() {
  return isDarkMode() ? '#ffffff' : '#000000';
}

// ---- 7b. 数值分级色表 ----
var LEVELS = {
  temp: [
    { max: 0,   dark: '#30dff3', light: '#30dff3' }, // 严寒
    { max: 10,  dark: '#44cef6', light: '#44cef6' }, // 冷
    { max: 18,  dark: '#7fecad', light: '#7fecad' }, // 凉
    { max: 25,  dark: '#00e079', light: '#00e079' }, // 舒适
    { max: 30,  dark: '#fff143', light: '#fff143' }, // 暖
    { max: 35,  dark: '#e29c45', light: '#e29c45' }, // 热
    { max: 999, dark: '#ff4c00', light: '#ff4c00' }  // 酷热  朱紅 / 緋紅
  ],
  wind: [
    { max: 3,   dark: '#d6ecf0', light: '#d6ecf0' }, // 无风
    { max: 11,  dark: '#c0ebd7', light: '#c0ebd7' }, // 微风
    { max: 19,  dark: '#7fecad', light: '#7fecad' }, // 和风
    { max: 28,  dark: '#d9b611', light: '#d9b611' }, // 强风  秋香色
    { max: 38,  dark: '#e29c45', light: '#e29c45' }, // 大风
    { max: 74,  dark: '#ff7500', light: '#ff7500' }, // 狂风
    { max: 999, dark: '#ff2121', light: '#ff2121' }  // 暴风  大紅 / 胭脂
  ],
  vis: [
    { max: 1,   dark: '#ff4c00', light: '#ff4c00' }, // 极差
    { max: 4,   dark: '#e29c45', light: '#e29c45' }, // 差
    { max: 10,  dark: '#fff143', light: '#fff143' }, // 中
    { max: 20,  dark: '#7fecad', light: '#7fecad' }, // 良
    { max: 999, dark: '#00e079', light: '#00e079' }  // 优    青翠 / 松花綠
  ],
  precip: [
    { max: 0.05, dark: '#d6ecf0', light: '#a1afc9' }, // 无雨    月白 / 藍灰色
    { max: 1,    dark: '#d3e0f3', light: '#2e4e7e' }, // 小雨    淡青 / 藏青
    { max: 10,   dark: '#44cef6', light: '#065279' }, // 中到大雨 藍   / 靛藍
    { max: 25,   dark: '#801dae', light: '#56004f' }, // 暴雨    青蓮 / 紫棠
    { max: 999,  dark: '#ff4c00', light: '#9d2933' }  // 特大暴雨 朱紅 / 胭脂
  ]
};

/** 按数值查分级色 */
function levelColor(kind, value) {
  var table = LEVELS[kind];
  if (!table) return symbolColor();
  var v = parseFloat(value);
  if (isNaN(v)) v = 0;
  var dark = isDarkMode();
  for (var i = 0; i < table.length; i++) {
    if (v < table[i].max) return dark ? table[i].dark : table[i].light;
  }
  var last = table[table.length - 1];
  return dark ? last.dark : last.light;
}

// ---- 8. 主逻辑 ----
var CACHE_KEY = 'weather_cache_v2';
var CACHE_TTL = 15 * 60 * 1000; // 15 分钟刷新一次

function readCache() {
  try {
    var raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    var obj = JSON.parse(raw);
    if (!obj || !obj.data || !obj.data.current_condition || !obj.data.current_condition[0]) return null;
    return obj;
  } catch (e) { return null; }
}

function writeCache(city, data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), city: city, data: data }));
  } catch (e) { /* localStorage 满了就算了 */ }
}

function isCacheStale(cached) {
  return !cached || (Date.now() - cached.time) > CACHE_TTL;
}

// ---- 8a. 定位 ----

var GEO_CACHE_KEY = 'weather_geo_v3';
var GEO_CACHE_TTL = 24 * 60 * 60 * 1000; // GPS 坐标缓存 24 小时（人不会突然搬家）

// 英文 -> 中文城市名
var CITY_CN_MAP = {
  // 直辖市
  'Beijing': '北京', 'Shanghai': '上海', 'Tianjin': '天津', 'Chongqing': '重庆',
  // 华东
  'Nanchang': '南昌', 'Hangzhou': '杭州', 'Nanjing': '南京', 'Hefei': '合肥',
  'Fuzhou': '福州', 'Xiamen': '厦门', 'Jinan': '济南', 'Qingdao': '青岛',
  'Suzhou': '苏州', 'Wuxi': '无锡', 'Ningbo': '宁波', 'Wenzhou': '温州',
  'Nantong': '南通', 'Shaoxing': '绍兴', 'Jiaxing': '嘉兴', 'Changzhou': '常州',
  'Xuzhou': '徐州', 'Yantai': '烟台', 'Weifang': '潍坊', 'Linyi': '临沂',
  'Quanzhou': '泉州', 'Zhangzhou': '漳州', 'Putian': '莆田', 'Longyan': '龙岩',
  // 江西各地级市
  'Ganzhou': '赣州', 'Jiujiang': '九江', 'Shangrao': '上饶', 'Ji\'an': '吉安',
  'JiAn': '吉安', 'Yichun': '宜春', 'Fuzhou Jiangxi': '抚州', 'Jingdezhen': '景德镇',
  'Pingxiang': '萍乡', 'Xinyu': '新余', 'Yingtan': '鹰潭',
  // 华南
  'Guangzhou': '广州', 'Shenzhen': '深圳', 'Dongguan': '东莞', 'Foshan': '佛山',
  'Zhuhai': '珠海', 'Zhongshan': '中山', 'Huizhou': '惠州', 'Shantou': '汕头',
  'Zhanjiang': '湛江', 'Jiangmen': '江门', 'Nanning': '南宁', 'Haikou': '海口',
  'Sanya': '三亚',
  // 华中
  'Wuhan': '武汉', 'Changsha': '长沙', 'Zhengzhou': '郑州', 'Luoyang': '洛阳',
  'Wuhu': '芜湖',
  // 华北
  'Shijiazhuang': '石家庄', 'Taiyuan': '太原', 'Hohhot': '呼和浩特',
  'Baotou': '包头', 'Datong': '大同', 'Tangshan': '唐山', 'Qinhuangdao': '秦皇岛',
  // 东北
  'Shenyang': '沈阳', 'Dalian': '大连', 'Changchun': '长春', 'Harbin': '哈尔滨',
  'Daqing': '大庆', 'Anshan': '鞍山', 'Jilin': '吉林',
  // 西南
  'Chengdu': '成都', 'Kunming': '昆明', 'Guiyang': '贵阳', 'Lhasa': '拉萨',
  'Mianyang': '绵阳', 'Dali': '大理',
  // 西北
  'Xi\'an': '西安', 'XiAn': '西安', 'Lanzhou': '兰州', 'Xining': '西宁',
  'Yinchuan': '银川', 'Urumqi': '乌鲁木齐', 'Karamay': '克拉玛依',
  // 港澳台
  'Hong Kong': '香港', 'Macau': '澳门', 'Macao': '澳门', 'Taipei': '台北',
  'Kaohsiung': '高雄'
};

// 城市名规范化
function normalizeCityName(name) {
  if (!name) return name;
  name = name.trim();
  // 1. 精确匹配
  if (CITY_CN_MAP[name]) return CITY_CN_MAP[name];
  // 2. 中文去后缀
  if (/[\u4e00-\u9fa5]/.test(name)) {
    return name.replace(/(市|区|县|省|特别行政区|自治州|盟|旗)$/, '');
  }
  // 3. 去空格标点后匹配
  var compact = name.replace(/[\s'\-]/g, '');
  if (CITY_CN_MAP[compact]) return CITY_CN_MAP[compact];
  for (var key in CITY_CN_MAP) {
    if (key.replace(/[\s'\-]/g, '') === compact) return CITY_CN_MAP[key];
  }
  // 4. 前缀匹配
  for (var key2 in CITY_CN_MAP) {
    var kc = key2.replace(/[\s'\-]/g, '');
    if (compact.length > kc.length && compact.slice(0, kc.length).toLowerCase() === kc.toLowerCase()) {
      return CITY_CN_MAP[key2];
    }
  }
  // 5. 其他英文：原样返回
  return name;
}

/**
 * 获取定位信息，按优先级：
 *   1. 浏览器 Geolocation API（GPS，最准确）
 *   2. ipinfo.io（IP 归属地，仅 HTTPS）
 *   3. 配置的 fallback_city
 *
 * 关键设计：query 与 displayName 分离。
 *   - query      拿去请求 wttr.in；GPS 时是"纬度,经度"原始坐标，wttr.in 原生支持
 *     这样避免了"坐标 -> Nominatim 反查城市名 -> 再用城市名查天气"的有损往返。
 *   - displayName 拿去显示；Nominatim 反查只为拿中文城市名，不参与天气定位。
 * 返回 { query, displayName, source }
 */
async function resolveCity(fallbackCity) {
  // Level 1: 浏览器 GPS 定位（坐标是唯一真值，直接给 wttr.in）
  var geo = await tryBrowserGeo();
  if (geo && geo.lat != null && geo.lon != null) {
    return {
      query: geo.lat.toFixed(4) + ',' + geo.lon.toFixed(4),
      displayName: normalizeCityName(geo.city || fallbackCity),
      source: 'geo'
    };
  }

  // Level 2: IP 定位（只有城市名，没有坐标）
  var ipCity = await tryIpGeo();
  if (ipCity) {
    return { query: ipCity, displayName: normalizeCityName(ipCity), source: 'ip' };
  }

  // Level 3: 配置默认值
  return { query: fallbackCity, displayName: normalizeCityName(fallbackCity), source: 'config' };
}

/** 浏览器原生定位 -> { lat, lon, city }（city 仅用于显示） */
async function tryBrowserGeo() {
  // 先检查缓存（GPS 坐标一天内有效）
  try {
    var cachedGeo = localStorage.getItem(GEO_CACHE_KEY);
    if (cachedGeo) {
      var g = JSON.parse(cachedGeo);
      if (g.lat != null && g.lon != null && (Date.now() - g.time) < GEO_CACHE_TTL) return g;
    }
  } catch (e) { }

  if (!('geolocation' in navigator)) return null;

  try {
    var pos = await new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        { enableHighAccuracy: true, timeout: 10000, maximumAge: GEO_CACHE_TTL }
      );
    });
    var lat = parseFloat(pos.coords.latitude.toFixed(4));
    var lon = parseFloat(pos.coords.longitude.toFixed(4));

    var city = await reverseGeocode(lat, lon);

    try {
      localStorage.setItem(GEO_CACHE_KEY, JSON.stringify({ time: Date.now(), lat: lat, lon: lon, city: city }));
    } catch (e) { }
    return { lat: lat, lon: lon, city: city };
  } catch (e) {
    // 用户拒绝授权 / 超时 / 离线 -> 静默降级
    return null;
  }
}

/** 坐标反查中文城市名（Nominatim，失败返回 null，不影响主流程） */
async function reverseGeocode(lat, lon) {
  try {
    var res = await fetch(
      'https://nominatim.openstreetmap.org/reverse?format=json&zoom=10&lat=' + lat + '&lon=' + lon,
      { signal: AbortSignal.timeout(5000), headers: { 'Accept-Language': 'zh-CN,zh;q=0.9' } }
    );
    if (!res.ok) return null;
    var data = await res.json();
    var addr = data.address || {};
    return addr.city || addr.town || addr.county || null;
  } catch (e) { return null; }
}

/** IP 归属地定位（ipinfo.io 免费 HTTPS，50k/月） */
async function tryIpGeo() {
  try {
    var res = await fetch('https://ipinfo.io/json', {
      signal: AbortSignal.timeout(5000)
    });
    if (!res.ok) return null;
    var data = await res.json();
    return data.city || null;
  } catch (e) { return null; }
}

export default async function initWeather() {
  var container = document.getElementById('redefine-weather');
  if (!container) return;
  var config = window.hexo_config && window.hexo_config.plugins && window.hexo_config.plugins.weather
    ? window.hexo_config.plugins.weather : {};
  var fallbackCity = config.fallback_city || '南昌';
  container.innerHTML = '<div class="weather-loading">加载中...</div>';

  var cached = readCache();
  if (cached) {
    var cachedCity = normalizeCityName(cached.city);
    _lastWeatherData = cached.data;
    _lastCity = cachedCity;
    renderCard(container, cachedCity, buildWeatherContent(cached.data));
    startClock(container);
    // 缓存过期则后台静默刷新
    if (isCacheStale(cached)) refreshWeather(container, fallbackCity);
  } else {
    await refreshWeather(container, fallbackCity);
  }
  startRefreshTimer(container, fallbackCity);
}

async function refreshWeather(container, fallbackCity) {
  try {
    // 三级定位：GPS 坐标 → IP 城市 → 配置默认
    var resolved = await resolveCity(fallbackCity);
    var weatherData = await getWeatherJSON(resolved.query);
    var city = resolved.displayName;
    _lastWeatherData = weatherData;
    _lastCity = city;
    writeCache(city, weatherData);
    renderCard(container, city, buildWeatherContent(weatherData));
    startClock(container);
  } catch (error) {
    console.error('[Weather] 刷新失败:', error);
    // 已有旧数据就继续显示旧数据；完全没有才报错
    if (!_lastWeatherData) {
      container.innerHTML =
        '<div class="weather-error">' +
        '天气获取失败<br>' +
        '<button onclick="Weather.init()" style="margin-top:8px;padding:4px 12px;border-radius:4px;border:1px solid var(--border-color);background:var(--card-background);color:var(--text-primary);cursor:pointer;">重试</button>' +
        '</div>';
    }
  }
}

function startRefreshTimer(container, fallbackCity) {
  if (window.__weatherRefreshTimer) clearInterval(window.__weatherRefreshTimer);
  window.__weatherRefreshTimer = setInterval(function () {
    var el = document.getElementById('redefine-weather');
    if (!el) return; // 卡片不在页面上就先不刷
    refreshWeather(el, fallbackCity);
  }, CACHE_TTL);

  // 监听明暗模式切换，立即换色（不等定时刷新）
  watchModeChange();

  // 用户把标签页切回来时，如果数据已过期就立即刷新
  if (!window.__weatherVisBound) {
    window.__weatherVisBound = true;
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState !== 'visible') return;
      if (!isCacheStale(readCache())) return;
      var el = document.getElementById('redefine-weather');
      if (el) refreshWeather(el, _lastCity || '南昌');
    });
  }
}

async function getWeatherJSON(city) {
  // city 为空时 wttr.in 会根据请求方 IP 自动定位
  var base = city ? 'https://wttr.in/' + encodeURIComponent(city) : 'https://wttr.in/';
  var url = base + '?format=j1&lang=zh';
  var res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  var data = await res.json();
  if (!data.current_condition || !data.current_condition[0]) throw new Error('无效天气数据');
  return data;
}

function renderCard(container, city, content) {
  var now = new Date();
  var card = container.closest ? (container.closest('.weather-card') || container) : container;
  var artType = getArtType();
  // Light：inline background 直接盖（优先级高于一切 class 规则）
  // Dark：清空 inline，交给 CSS 的 .dark-mode 规则还原主题背景
  if (isDarkMode()) {
    card.style.background = '';
  } else if (artType && BG_LIGHT[artType]) {
    card.style.background = BG_LIGHT[artType];
  } else {
    card.style.background = '';
  }
  if (artType) {
    card.setAttribute('data-weather', artType);
  } else {
    card.removeAttribute('data-weather');
  }
  console.log('[Weather] renderCard', {
    city: city,
    isDark: isDarkMode(),
    artType: artType,
    bodyClass: document.body.className,
    varBg: getComputedStyle(document.body).getPropertyValue('--background-color').trim(),
    inlineBg: card.style.background,
    dataWeather: card.getAttribute('data-weather')
  });
  // 数据到位后，若期间模式变过，这里用当前模式补一次背景（覆盖上面写的旧值）
  if (window.__weatherModeDirty) {
    window.__weatherModeDirty = false;
    if (isDarkMode()) {
      card.style.background = '';
    } else if (artType && BG_LIGHT[artType]) {
      card.style.background = BG_LIGHT[artType];
    }
    console.log('[Weather] 补渲染（数据到达前模式曾变化）->', isDarkMode() ? 'dark' : 'light', card.style.background);
  }
  container.innerHTML =
    '<div class="weather-card-content">' +
    '  <div class="weather-title-line" id="weather-title">' +
    '    <span class="weather-city">' + escapeHtml(city) + '</span>' +
    '    <span class="weather-time">' + formatDate(now) + '</span>' +
    '  </div>' +
    '  <div class="weather-pre">' + content + '</div>' +
    '</div>';
}

// ---- 7c. 卡片背景色 ----
//  用 inline style 直接写，优先级仅次于 !important，压过主题 .sidebar-links 的
//  background（该规则嵌套编译为 .home-sidebar-container .sidebar-links）。
//  CSS 里的 9 档规则保留作为降级与文档，inline style 会覆盖它。
var BG_LIGHT = {
  sunny: '#FFF3CD', partly_cloudy: '#FFF8E1', cloudy: '#EFF1F4', overcast: '#E3E7EC',
  mist: '#EFEAF6', haze: '#EFEAF6', fog: '#EFEAF6', ice_fog: '#EFEAF6',
  drizzle: '#E3F2FD', light_rain: '#E3F2FD', rain: '#E3F2FD', heavy_rain: '#E3F2FD',
  heavy_downpour: '#E3F2FD', showers: '#E3F2FD',
  thunderstorm: '#E8EAF6',
  light_snow: '#F2F7FB', snow: '#F2F7FB', heavy_snow: '#F2F7FB', snow_showers: '#F2F7FB',
  freezing_rain: '#E0F2F1', sleet: '#E0F2F1', rain_snow_showers: '#E0F2F1'
};

/** 从当前天气数据反推 ASCII 图类型（用于背景色） */
function getArtType() {
  try {
    if (_lastWeatherData && _lastWeatherData.current_condition && _lastWeatherData.current_condition[0]) {
      var code = String(_lastWeatherData.current_condition[0].weatherCode || '113');
      return codeToArtType[code] || 'sunny';
    }
  } catch (e) { }
  return null;
}

/** 监听明暗模式切换：立即重渲染，让 ASCII 字符色（inline style）和 data-weather 同步更新，
 *  不必等 15 分钟定时刷新 */
function watchModeChange() {
  if (window.__weatherModeObserver || !document.body || !window.MutationObserver) return;
  window.__weatherModeObserver = new MutationObserver(function () {
    var el = document.getElementById('redefine-weather');
    if (!el) return;
    // 数据还没到（首次加载时 main.js 往往比 wttr.in 响应更快）——
    // 此时不能直接返回，否则这次模式切换就丢了。打个标记，等数据到位后补渲染。
    if (!_lastWeatherData) { window.__weatherModeDirty = true; return; }
    renderCard(el, _lastCity || '', buildWeatherContent(_lastWeatherData));
    startClock(el);
  });
  window.__weatherModeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
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

// ---- 9. 缓存数据 ----
var _lastWeatherData = null;
var _lastCity = null;

// ---- 10. 测试函数 ----
function testWeather(code) {
  if (!_lastWeatherData) {
    console.warn('请先加载天气: w.init()');
    return;
  }
  var data = JSON.parse(JSON.stringify(_lastWeatherData));
  data.current_condition[0].weatherCode = String(code);
  var content = buildWeatherContent(data);
  var container = document.getElementById('redefine-weather');
  if (!container) return;
  var pre = container.querySelector('.weather-pre');
  if (pre) {
    pre.innerHTML = content;
  }
  var desc = weatherCodeMap[code] || '未知';
  console.log('测试: ' + desc + ' (代码 ' + code + ')');
}

// ---- 11. 天气类型列表 ----
function listAllCodes() {
  // 构建名称到代码的映射（取第一个出现的代码）
  var nameToCode = {};
  for (var code in weatherCodeMap) {
    var name = weatherCodeMap[code];
    if (!nameToCode[name]) {
      nameToCode[name] = code;
    }
  }
  // 转换为数组并按名称排序
  var data = Object.keys(nameToCode).sort().map(function(name) {
    return { '代码': nameToCode[name], '天气': name };
  });
  console.log('%c不重复的天气类型 (共 ' + data.length + ' 种)', 'font-size:16px;font-weight:bold;color:#4fc3f7;');
  console.table(data);
}

// ---- 12. 帮助命令 ----
function helpCommands() {
  console.log('%c天气命令:', 'font-size:16px;font-weight:bold;color:#4fc3f7;');
  console.log('  %cw.init()%c        - 加载真实天气', 'color:#ffd700;', 'color:#aaa;');
  console.log('  %cw.test(代码)%c    - 测试天气（如 113）', 'color:#ffd700;', 'color:#aaa;');
  console.log('  %cw.getCode()%c     - 查看天气代码', 'color:#ffd700;', 'color:#aaa;');
  console.log('  %cw.list()%c        - 显示所有不重复的天气类型及代码', 'color:#ffd700;', 'color:#aaa;');
  console.log('%c常用: 113晴天 151烟雾霾 296大雨 227小雪 311雷阵雨', 'color:#aaa;');
}

// ---- 13. 初始化 ----
var isInitialized = false;
function init() {
  if (isInitialized) return;
  isInitialized = true;
  // 先注册模式监听，再拉数据。
  // weather.js 与主题 main.js 都是 type="module"，按声明顺序执行（weather 在前），
  // initWeather 里的 await 会让出控制权，main.js 可能在数据返回前就挂好了
  // body.light-mode/.dark-mode。若此时才注册 observer，这次 class 变化会被永久错过，
  // 导致卡片停留在旧模式的背景上。故必须最先注册。
  watchModeChange();
  initWeather();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else { init(); }
// window.load 时主题 main.js 的 initMain 已确保跑完，模式 class 必定就位。
// 此时无条件用最终模式重渲染一次，根治「数据先到 / 模式后定」的竞态。
window.addEventListener('load', function () {
  window.__weatherModeDirty = true;
  var el = document.getElementById('redefine-weather');
  if (el && _lastWeatherData) {
    renderCard(el, _lastCity || '', buildWeatherContent(_lastWeatherData));
    startClock(el);
  }
});
document.addEventListener('swup:pageView', function () {
  var container = document.getElementById('redefine-weather');
  if (container) {
    if (window.__weatherTimer) clearInterval(window.__weatherTimer);
    isInitialized = false;
    init();
  }
});

// ---- 14. 暴露全局 API ----
window.Weather = {
  init: initWeather,
  test: testWeather,
  getCode: function() {
    return _lastWeatherData ? _lastWeatherData.current_condition[0].weatherCode : null;
  },
  getData: function() {
    return _lastWeatherData;
  },
  list: listAllCodes,
  help: helpCommands
};

window.w = {
  init: initWeather,
  test: testWeather,
  getCode: function() {
    return _lastWeatherData ? _lastWeatherData.current_condition[0].weatherCode : null;
  },
  getData: function() {
    return _lastWeatherData;
  },
  list: listAllCodes,
  help: helpCommands
};

// ---- 首次提示 ----
console.log('%c输入 w.help() 查看天气命令', 'color:#4fc3f7;font-size:14px;');