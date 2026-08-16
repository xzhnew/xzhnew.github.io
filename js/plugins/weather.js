// ============================================================
// 天气卡片 - 完全参照 wttr.in 的 ASCII 图形 + 颜色方案
// ============================================================

// ---- 1. 天气代码 -> 中文描述（按类型分组） ----
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
// ---- 2. 天气代码 -> 图形类型（按图形类型分组） ----
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
  'N': '↓', 'NNE': '↙', 'NE': '←', 'ENE': '↙',
  'E': '←', 'ESE': '↖', 'SE': '↑', 'SSE': '↖',
  'S': '↑', 'SSW': '↗', 'SW': '→', 'WSW': '↗',
  'W': '→', 'WNW': '↘', 'NW': '↓', 'NNW': '↘'
};

// ---- 4. 颜色 ----
var C = {
  sun:       '#ffff00',
  cloud:     '#bcbcbc',
  rain:      '#87afff',
  snow:      '#ffffff',
  fog:       '#b39ddb',
  mist:      '#ce93d8',
  haze:      '#9e9e9e',
  lightning: '#ffeb3b',
  temp:      '#ffd700',
  tempF:     '#ffaf00',
  wind:      '#87ff00',
  vis:       '#87afff',
  precip:    '#87afff'
};

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
    [{ t: '     .-.', c: 'cloud' }],
    [{ t: '    (   ).', c: 'cloud' }],
    [{ t: '   (___(__)', c: 'cloud' }],
    [{ t: '', c: '' }],
    [{ t: '', c: '' }]
  ],
  overcast: [
    [{ t: '     .--.', c: 'cloud' }],
    [{ t: '  .-(    ).', c: 'cloud' }],
    [{ t: ' (___.__)__)', c: 'cloud' }],
    [{ t: '', c: '' }],
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
    [{ t: ' _`/""', c: 'sun' }, { t: '.-.', c: 'cloud' }],
    [{ t: '  ,\\_', c: 'sun' }, { t: '(   ).', c: 'cloud' }],
    [{ t: '   /', c: 'sun' }, { t: '(___(__)', c: 'cloud' }],
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
    [{ t: ' _`/""', c: 'sun' }, { t: '.-.', c: 'cloud' }],
    [{ t: '  ,\\_', c: 'sun' }, { t: '(   ).', c: 'cloud' }],
    [{ t: '   /', c: 'sun' }, { t: '(___(__)', c: 'cloud' }],
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
    if (seg.c && C[seg.c]) {
      html.push('<span style="color:' + C[seg.c] + ' !important">' + escapeHtml(seg.t) + '</span>');
    } else {
      html.push(escapeHtml(seg.t));
    }
  }
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
  var desc = weatherCodeMap[code] || '晴天';
  var artType = codeToArtType[code] || 'sunny';
  var arrow = windArrowMap[windDir] || '→';

  var art = ART[artType] || ART.sunny;

  var dataLines = [
    { text: desc, color: null },
    { text: temp + '(' + feels + ')°C', color: C.temp },
    { text: arrow + ' ' + wind + ' km/h', color: C.wind },
    { text: vis + ' km', color: C.vis },
    { text: precip + ' mm', color: C.precip }
  ];

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

// ---- 8a. 定位（三级优先链：浏览器GPS → IP定位 → 配置城市） ----

var GEO_CACHE_KEY = 'weather_geo_v2';
var GEO_CACHE_TTL = 24 * 60 * 60 * 1000; // GPS 坐标缓存 24 小时（人不会突然搬家）

// 英文城市名 -> 中文（ipinfo.io / wttr.in 返回英文时用，覆盖全国省会及主要城市）
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

// 把城市名规范成"尽量两个中文"的展示名
function normalizeCityName(name) {
  if (!name) return name;
  name = name.trim();
  // 1. 精确匹配
  if (CITY_CN_MAP[name]) return CITY_CN_MAP[name];
  // 2. 已是中文：去掉 市/区/县/省 等后缀，尽量保留核心字
  if (/[\u4e00-\u9fa5]/.test(name)) {
    return name.replace(/(市|区|县|省|特别行政区|自治州|盟|旗)$/, '');
  }
  // 3. 去空格/标点后匹配（如 "Xi An" -> "XiAn", "Xi'an" -> "Xian"）
  var compact = name.replace(/[\s'\-]/g, '');
  if (CITY_CN_MAP[compact]) return CITY_CN_MAP[compact];
  for (var key in CITY_CN_MAP) {
    if (key.replace(/[\s'\-]/g, '') === compact) return CITY_CN_MAP[key];
  }
  // 4. 前缀匹配（如 Nanchangfu -> Nanchang -> 南昌）
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
 * 获取城市名，按优先级：
 *   1. 浏览器 Geolocation API（GPS/WiFi定位，最准确，需用户授权一次）
 *   2. ipinfo.io（免费、支持HTTPS、无需key）
 *   3. 配置的 fallback_city
 * 返回 { city: string, source: 'geo'|'ip'|'config' }
 */
async function resolveCity(fallbackCity) {
  // Level 1: 浏览器 GPS 定位（只问一次，结果缓存到 localStorage）
  var geoCity = await tryBrowserGeo();
  if (geoCity) return { city: normalizeCityName(geoCity), source: 'geo' };

  // Level 2: IP 定位（ipinfo.io 免费版支持 HTTPS）
  var ipCity = await tryIpGeo();
  if (ipCity) return { city: normalizeCityName(ipCity), source: 'ip' };

  // Level 3: 配置默认值
  return { city: normalizeCityName(fallbackCity), source: 'config' };
}

/** 浏览器原生定位 → 反查城市名 */
async function tryBrowserGeo() {
  // 先检查缓存（GPS 坐标一天内有效）
  try {
    var cachedGeo = localStorage.getItem(GEO_CACHE_KEY);
    if (cachedGeo) {
      var g = JSON.parse(cachedGeo);
      if (g.city && (Date.now() - g.time) < GEO_CACHE_TTL) return g.city;
    }
  } catch (e) { }

  // 没有缓存或过期，请求浏览器定位
  if (!('geolocation' in navigator)) return null;

  try {
    var pos = await new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        { enableHighAccuracy: false, timeout: 8000, maximumAge: GEO_CACHE_TTL }
      );
    });
    var lat = pos.coords.latitude.toFixed(4);
    var lon = pos.coords.longitude.toFixed(4);

    // 用坐标反查城市名（走 Nominatim OpenStreetMap，免费无 key）
    var res = await fetch(
      'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lon + '&zoom=10&addressdetails=1',
      { signal: AbortSignal.timeout(5000), headers: { 'Accept-Language': 'zh-CN,zh;q=0.9' } }
    );
    if (!res.ok) return null;
    var data = await res.json();

    // 优先取 city → town → county → state
    var addr = data.address || {};
    var city = addr.city || addr.town || addr.county || addr.state || addr.province;
    if (!city) return null;

    // 缓存（存归一化后的城市名）
    var normCity = normalizeCityName(city);
    try {
      localStorage.setItem(GEO_CACHE_KEY, JSON.stringify({ time: Date.now(), city: normCity }));
    } catch (e) { }
    return normCity;
  } catch (e) {
    // 用户拒绝授权 / 超时 / 离线 → 静默降级
    return null;
  }
}

/** IP 归属地定位（ipinfo.io 免费 HTTPS，50k/月） */
async function tryIpGeo() {
  try {
    var res = await fetch('https://ipinfo.io/json', {
      signal: AbortSignal.timeout(5000)
    });
    if (!res.ok) return null;
    var data = await res.json();
    // ipinfo.io 返回英文城市名（如 "Nanchang"）
    return data.city || null;
  } catch (e) { return null; }
}

function detectCity(weatherData, resolvedCity) {
  try {
    var area = weatherData.nearest_area && weatherData.nearest_area[0];
    if (area && area.areaName && area.areaName[0] && area.areaName[0].value) {
      // wttr.in 返回英文城市名；如果已通过 GPS/IP 解析出更准确的城市名，优先用解析结果
      return resolvedCity;
    }
  } catch (e) { }
  return resolvedCity;
}

export default async function initWeather() {
  var container = document.getElementById('redefine-weather');
  if (!container) return;
  var config = window.hexo_config && window.hexo_config.plugins && window.hexo_config.plugins.weather
    ? window.hexo_config.plugins.weather : {};
  var fallbackCity = config.fallback_city || '南昌';
  container.innerHTML = '<div class="weather-loading">加载中...</div>';

  // 先用缓存立即渲染（15 分钟内的旧数据也先显示，避免白屏等待）
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
    // 三级定位：GPS → IP → 配置默认
    var resolved = await resolveCity(fallbackCity);
    var city = resolved.city;

    // 用解析出的城市名请求天气（比让 wttr.in 猜 IP 准得多）
    var weatherData = await getWeatherJSON(city);
    city = detectCity(weatherData, city); // 最终确认城市名
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
  container.innerHTML =
    '<div class="weather-card-content">' +
    '  <div class="weather-title-line" id="weather-title">' +
    '    <span class="weather-city">' + escapeHtml(city) + '</span>' +
    '    <span class="weather-time">' + formatDate(now) + '</span>' +
    '  </div>' +
    '  <div class="weather-pre">' + content + '</div>' +
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

// ---- 11. 显示不重复的天气类型及代码 ----
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