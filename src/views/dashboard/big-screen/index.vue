<!-- 动物宏观行为监控平台 - 大屏页面 -->
<template>
  <div class="big-screen">
    <!-- 顶部标题栏 -->
    <header class="bs-header">
      <div class="bs-header__left">
        <span class="bs-header__support">技术支持：Art Design Pro</span>
      </div>
      <div class="bs-header__center">
        <div class="bs-header__title">动物宏观行为监控平台</div>
        <div class="bs-header__subtitle">实时监测 / 视频分析 / 异常预警</div>
      </div>
      <div class="bs-header__right">
        <div class="bs-header__time">{{ currentTime }}</div>
        <div class="bs-header__date">{{ currentDate }}</div>
        <div class="bs-status-dot bs-status-dot--online">
          <span class="bs-status-dot__ring"></span>
          系统在线
        </div>
      </div>
    </header>

    <!-- 主体区域 -->
    <main class="bs-body">
      <!-- 左侧分析区 -->
      <section class="bs-left">
        <!-- B1: 行为趋势分析 -->
        <div class="bs-panel bs-panel--flex-col bs-left__top">
          <div class="bs-panel__header">
            <span class="bs-panel__title">异常行为动态趋势</span>
            <span class="bs-badge bs-badge--blue">实时</span>
          </div>
          <div class="bs-panel__body">
            <div class="bs-stat-row">
              <div class="bs-stat-card">
                <ArtCountTo
                  class="bs-stat-card__value"
                  :target="activeBehaviorCount"
                  :duration="1500"
                />
                <div class="bs-stat-card__label">当前活跃</div>
              </div>
              <div class="bs-stat-card bs-stat-card--warn">
                <ArtCountTo class="bs-stat-card__value" :target="anomalyCount" :duration="1500" />
                <div class="bs-stat-card__label">异常数量</div>
              </div>
              <div class="bs-stat-card bs-stat-card--danger">
                <ArtCountTo class="bs-stat-card__value" :target="alertCount" :duration="1500" />
                <div class="bs-stat-card__label">告警数量</div>
              </div>
            </div>
            <ArtLineChart
              height="120px"
              :data="trendChartData"
              :xAxisData="trendXAxis"
              :showAreaColor="true"
              :smooth="true"
              :showLegend="true"
              legendPosition="bottom"
              :colors="['#00c8ff', '#ff4d4d', '#ffd700']"
            />
          </div>
          <!-- 行为类型表格 -->
          <div class="bs-table">
            <div class="bs-table__head">
              <span>序号</span>
              <span>行为类型</span>
              <span>发生次数</span>
              <span>状态</span>
            </div>
            <div
              v-for="(item, idx) in behaviorList"
              :key="idx"
              class="bs-table__row"
              :class="{ 'bs-table__row--warn': item.status === '异常' }"
            >
              <span class="bs-table__idx">{{ idx + 1 }}</span>
              <span>{{ item.type }}</span>
              <span class="bs-table__count">{{ item.count }}</span>
              <span
                class="bs-badge"
                :class="item.status === '异常' ? 'bs-badge--danger' : 'bs-badge--success'"
                >{{ item.status }}</span
              >
            </div>
          </div>
        </div>

        <!-- B2: 行为统计分布 -->
        <div class="bs-panel bs-panel--flex-col bs-left__bottom">
          <div class="bs-panel__header">
            <span class="bs-panel__title">行为统计分布</span>
          </div>
          <div class="bs-panel__body bs-panel__body--row">
            <div class="bs-chart-half">
              <div class="bs-chart-label">按时段统计</div>
              <ArtBarChart
                height="120px"
                :data="barChartData"
                :xAxisData="barXAxis"
                :colors="['#00c8ff']"
                barWidth="40%"
              />
            </div>
            <div class="bs-chart-half">
              <div class="bs-chart-label">行为类型占比</div>
              <ArtRingChart
                height="120px"
                :data="ringChartData"
                :showLegend="true"
                legendPosition="right"
                centerText="占比"
                :colors="['#00c8ff', '#ffd700', '#ff4d4d', '#52c41a', '#a855f7']"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- 中间视频主区域 -->
      <section class="bs-center">
        <!-- C1: 视频标题栏 -->
        <div class="bs-video-header">
          <div class="bs-video-header__info">
            <span class="bs-video-header__cam">{{ activeCam.name }}</span>
            <span class="bs-badge bs-badge--live">
              <span class="bs-live-dot"></span>
              {{ activeCam.status }}
            </span>
            <span class="bs-video-header__id">ID: {{ activeCam.id }}</span>
          </div>
          <div class="bs-video-header__loc">{{ activeCam.location }}</div>
        </div>

        <!-- C2: 视频播放区 -->
        <div class="bs-video-wrap">
          <div class="bs-video-corner bs-video-corner--tl"></div>
          <div class="bs-video-corner bs-video-corner--tr"></div>
          <div class="bs-video-corner bs-video-corner--bl"></div>
          <div class="bs-video-corner bs-video-corner--br"></div>
          <ArtVideoPlayer
            :playerId="`big-screen-player-${activeCam.id}`"
            :videoUrl="activeCam.url"
            posterUrl=""
            :autoplay="false"
            :volume="0.5"
            :key="activeCam.id"
          />
        </div>

        <!-- C3: 摄像头缩略图切换 -->
        <div class="bs-cam-list">
          <div
            v-for="cam in camList"
            :key="cam.id"
            class="bs-cam-item"
            :class="{ 'bs-cam-item--active': cam.id === activeCam.id }"
            @click="activeCam = cam"
          >
            <div class="bs-cam-item__thumb">
              <ArtSvgIcon icon="ri:vidicon-line" class="bs-cam-item__icon" />
              <span
                class="bs-cam-item__status"
                :class="cam.online ? 'bs-cam-item__status--online' : 'bs-cam-item__status--offline'"
              ></span>
            </div>
            <div class="bs-cam-item__name">{{ cam.name }}</div>
          </div>
        </div>
      </section>

      <!-- 右侧状态区 -->
      <section class="bs-right">
        <!-- D1: 边缘设备信息 -->
        <div class="bs-panel bs-panel--flex-col bs-right__top">
          <div class="bs-panel__header">
            <span class="bs-panel__title">边缘设备信息</span>
            <span class="bs-device-total"
              >共 <b>{{ deviceStats.total }}</b> 台</span
            >
          </div>
          <div class="bs-panel__body bs-panel__body--row">
            <ArtRingChart
              height="100px"
              :data="deviceRingData"
              centerText="在线率"
              :showLegend="false"
              :colors="['#52c41a', '#ff4d4d', '#ffd700']"
            />
            <div class="bs-device-stats">
              <div v-for="s in deviceStatList" :key="s.label" class="bs-device-stat-item">
                <span class="bs-device-stat-item__dot" :style="{ background: s.color }"></span>
                <span class="bs-device-stat-item__label">{{ s.label }}</span>
                <span class="bs-device-stat-item__value">{{ s.value }}</span>
              </div>
            </div>
          </div>
          <div class="bs-progress-list">
            <div v-for="prog in deviceProgresses" :key="prog.label" class="bs-progress-item">
              <div class="bs-progress-item__header">
                <span>{{ prog.label }}</span>
                <span>{{ prog.value }}%</span>
              </div>
              <div class="bs-progress-item__bar">
                <div
                  class="bs-progress-item__fill"
                  :style="{ width: prog.value + '%', background: prog.color }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- D2: 异常提示 -->
        <div class="bs-panel bs-panel--flex-col bs-right__mid">
          <div class="bs-panel__header">
            <span class="bs-panel__title">实时异常提示</span>
            <span class="bs-badge bs-badge--danger">{{ alertList.length }} 条</span>
          </div>
          <div class="bs-alert-list">
            <div
              v-for="(alert, idx) in alertList"
              :key="idx"
              class="bs-alert-item"
              :class="`bs-alert-item--${alert.level}`"
            >
              <span class="bs-alert-item__time">{{ alert.time }}</span>
              <span class="bs-alert-item__device">{{ alert.device }}</span>
              <span class="bs-alert-item__msg">{{ alert.msg }}</span>
            </div>
          </div>
        </div>

        <!-- D3: 异常排行 -->
        <div class="bs-panel bs-panel--flex-col bs-right__bottom">
          <div class="bs-panel__header">
            <span class="bs-panel__title">异常排行 TOP5</span>
          </div>
          <div class="bs-panel__body">
            <ArtHBarChart
              height="130px"
              :data="rankingData"
              :xAxisData="rankingLabels"
              :colors="['#ff4d4d']"
              barWidth="40%"
            />
          </div>
        </div>
      </section>
    </main>

    <!-- 底部区域 -->
    <footer class="bs-footer">
      <!-- 实时告警列表 -->
      <div class="bs-panel bs-footer__block">
        <div class="bs-panel__header">
          <span class="bs-panel__title">实时告警</span>
        </div>
        <div class="bs-scroll-list">
          <div
            v-for="(item, idx) in realtimeAlerts"
            :key="idx"
            class="bs-scroll-list__item"
            :class="`bs-scroll-list__item--${item.level}`"
          >
            <span class="bs-scroll-list__level-dot"></span>
            <span class="bs-scroll-list__time">{{ item.time }}</span>
            <span class="bs-scroll-list__target">{{ item.target }}</span>
            <span class="bs-scroll-list__content">{{ item.content }}</span>
          </div>
        </div>
      </div>

      <!-- 今日统计汇总 -->
      <div class="bs-panel bs-footer__block">
        <div class="bs-panel__header">
          <span class="bs-panel__title">今日统计汇总</span>
        </div>
        <div class="bs-today-stats">
          <div v-for="stat in todayStats" :key="stat.label" class="bs-today-stat">
            <ArtCountTo class="bs-today-stat__value" :target="stat.value" :duration="2000" />
            <div class="bs-today-stat__label">{{ stat.label }}</div>
            <div class="bs-today-stat__sub" :class="`bs-today-stat__sub--${stat.type}`">
              {{ stat.sub }}
            </div>
          </div>
        </div>
      </div>

      <!-- 系统运行状态 -->
      <div class="bs-panel bs-footer__block">
        <div class="bs-panel__header">
          <span class="bs-panel__title">系统运行状态</span>
        </div>
        <div class="bs-sys-stats">
          <div v-for="sys in sysStats" :key="sys.label" class="bs-sys-stat">
            <div class="bs-sys-stat__header">
              <span class="bs-sys-indicator" :class="`bs-sys-indicator--${sys.level}`"></span>
              <span class="bs-sys-stat__label">{{ sys.label }}</span>
              <span class="bs-sys-stat__value">{{ sys.value }}</span>
            </div>
            <div class="bs-progress-item__bar">
              <div
                class="bs-progress-item__fill"
                :style="{ width: sys.percent + '%', background: sys.color }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'BigScreen' })

  // ──────────────── 时间 ────────────────
  const now = ref(new Date())
  const currentTime = computed(() => now.value.toLocaleTimeString('zh-CN', { hour12: false }))
  const currentDate = computed(() =>
    now.value.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    })
  )
  let timer: ReturnType<typeof setInterval>
  onMounted(() => {
    timer = setInterval(() => {
      now.value = new Date()
    }, 1000)
  })
  onUnmounted(() => clearInterval(timer))

  // ──────────────── 顶部统计数字 ────────────────
  const activeBehaviorCount = ref(128)
  const anomalyCount = ref(23)
  const alertCount = ref(7)

  // ──────────────── 行为趋势折线图 ────────────────
  const trendXAxis = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00']
  const trendChartData = ref([
    { name: '正常行为', data: [45, 52, 68, 74, 85, 79, 92] },
    { name: '异常行为', data: [12, 18, 9, 23, 15, 28, 19] },
    { name: '告警事件', data: [3, 5, 2, 8, 4, 9, 6] }
  ])

  // ──────────────── 行为类型表 ────────────────
  const behaviorList = ref([
    { type: '觅食行为', count: 45, status: '正常' },
    { type: '聚集行为', count: 38, status: '正常' },
    { type: '应激逃跑', count: 12, status: '异常' },
    { type: '打架行为', count: 8, status: '异常' },
    { type: '静止不动', count: 25, status: '正常' }
  ])

  // ──────────────── 行为统计柱状图 ────────────────
  const barXAxis = ['00-04', '04-08', '08-12', '12-16', '16-20', '20-24']
  const barChartData = ref([32, 28, 75, 68, 82, 45])

  // ──────────────── 行为类型环形图 ────────────────
  const ringChartData = ref([
    { name: '觅食', value: 35 },
    { name: '聚集', value: 28 },
    { name: '逃跑', value: 12 },
    { name: '打架', value: 8 },
    { name: '静止', value: 17 }
  ])

  // ──────────────── 摄像头列表 ────────────────
  interface CamItem {
    id: string
    name: string
    location: string
    status: string
    online: boolean
    url: string
  }
  const DEMO_VIDEO =
    '//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/xgplayer-demo.mp4'
  const camList = ref<CamItem[]>([
    {
      id: 'CAM-01',
      name: '1号摄像头',
      location: 'A区北侧监控点',
      status: '直播中',
      online: true,
      url: DEMO_VIDEO
    },
    {
      id: 'CAM-02',
      name: '2号摄像头',
      location: 'A区南侧监控点',
      status: '直播中',
      online: true,
      url: DEMO_VIDEO
    },
    {
      id: 'CAM-03',
      name: '3号摄像头',
      location: 'B区东侧监控点',
      status: '直播中',
      online: true,
      url: DEMO_VIDEO
    },
    {
      id: 'CAM-04',
      name: '4号摄像头',
      location: 'B区西侧监控点',
      status: '断流',
      online: false,
      url: DEMO_VIDEO
    },
    {
      id: 'CAM-05',
      name: '5号摄像头',
      location: 'C区中心监控点',
      status: '直播中',
      online: true,
      url: DEMO_VIDEO
    }
  ])
  const activeCam = ref<CamItem>(camList.value[0])

  // ──────────────── 边缘设备统计 ────────────────
  const deviceStats = ref({ total: 24, online: 20, offline: 3, warning: 1 })
  const deviceRingData = computed(() => [
    { name: '在线', value: deviceStats.value.online },
    { name: '离线', value: deviceStats.value.offline },
    { name: '告警', value: deviceStats.value.warning }
  ])
  const deviceStatList = computed(() => [
    { label: '在线设备', value: deviceStats.value.online, color: '#52c41a' },
    { label: '离线设备', value: deviceStats.value.offline, color: '#ff4d4d' },
    { label: '告警设备', value: deviceStats.value.warning, color: '#ffd700' }
  ])
  const deviceProgresses = ref([
    { label: 'CPU 占用', value: 42, color: '#00c8ff' },
    { label: '内存占用', value: 67, color: '#a855f7' },
    { label: '传输带宽', value: 55, color: '#52c41a' },
    { label: '存储使用', value: 38, color: '#ffd700' }
  ])

  // ──────────────── 异常提示列表 ────────────────
  const alertList = ref([
    { time: '17:42:18', device: 'CAM-02', msg: '检测到打架行为', level: 'high' },
    { time: '17:35:04', device: 'EDGE-07', msg: '设备 CPU 占用过高', level: 'mid' },
    { time: '17:28:51', device: 'CAM-04', msg: '视频流中断', level: 'high' },
    { time: '17:15:33', device: 'CAM-01', msg: '检测到应激逃跑行为', level: 'mid' },
    { time: '16:58:20', device: 'EDGE-03', msg: '存储空间不足 20%', level: 'low' }
  ])

  // ──────────────── 异常排行 ────────────────
  const rankingLabels = ['3号区域', '1号区域', '2号区域', '5号区域', '4号区域']
  const rankingData = ref([48, 35, 28, 17, 12])

  // ──────────────── 底部实时告警 ────────────────
  const realtimeAlerts = ref([
    { time: '17:42', target: 'A区-CAM02', content: '打架行为告警', level: 'high' },
    { time: '17:35', target: 'EDGE-07', content: 'CPU过载告警', level: 'mid' },
    { time: '17:28', target: 'A区-CAM04', content: '视频流中断告警', level: 'high' },
    { time: '17:15', target: 'B区-CAM01', content: '应激逃跑行为', level: 'mid' },
    { time: '16:58', target: 'EDGE-03', content: '存储告警', level: 'low' }
  ])

  // ──────────────── 底部今日统计 ────────────────
  const todayStats = ref([
    { label: '今日告警总数', value: 37, sub: '↑12% vs 昨日', type: 'up' },
    { label: '已处理数量', value: 30, sub: '81% 处理率', type: 'good' },
    { label: '未处理数量', value: 7, sub: '待跟进', type: 'warn' },
    { label: '识别成功率', value: 96, sub: '优', type: 'good' },
    { label: '在线设备数', value: 20, sub: '共 24 台', type: 'info' }
  ])

  // ──────────────── 底部系统运行状态 ────────────────
  const sysStats = ref([
    { label: '平台在线', value: '正常', percent: 100, color: '#52c41a', level: 'ok' },
    { label: '视频流', value: '4/5路', percent: 80, color: '#00c8ff', level: 'ok' },
    { label: '边缘设备', value: '83%在线', percent: 83, color: '#00c8ff', level: 'ok' },
    { label: '网络延迟', value: '18ms', percent: 20, color: '#52c41a', level: 'ok' },
    { label: 'CPU占用', value: '42%', percent: 42, color: '#ffd700', level: 'warn' },
    { label: '内存占用', value: '67%', percent: 67, color: '#a855f7', level: 'warn' }
  ])
</script>

<style lang="scss" scoped>
  /* ─────── 颜色 & 基础 ─────── */
  .big-screen {
    --bs-bg: #050d1a;
    --bs-panel-bg: rgba(6, 20, 42, 0.85);
    --bs-border: rgba(0, 200, 255, 0.25);
    --bs-border-glow: rgba(0, 200, 255, 0.5);
    --bs-primary: #00c8ff;
    --bs-text: #d0e8ff;
    --bs-text-muted: rgba(160, 210, 255, 0.6);
    --bs-danger: #ff4d4d;
    --bs-warn: #ffd700;
    --bs-success: #52c41a;

    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background: var(--bs-bg);
    background-image:
      radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0, 80, 160, 0.35) 0%, transparent 70%),
      radial-gradient(ellipse 60% 60% at 10% 100%, rgba(0, 50, 120, 0.2) 0%, transparent 60%),
      linear-gradient(180deg, #050d1a 0%, #071525 100%);
    color: var(--bs-text);
    font-size: 13px;
    overflow: hidden;
    user-select: none;
  }

  /* ─────── 顶部标题栏 ─────── */
  .bs-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 0 20px;
    flex-shrink: 0;
    border-bottom: 1px solid var(--bs-border);
    background: linear-gradient(
      90deg,
      rgba(0, 20, 50, 0.95) 0%,
      rgba(0, 40, 80, 0.85) 50%,
      rgba(0, 20, 50, 0.95) 100%
    );
    box-shadow: 0 2px 20px rgba(0, 200, 255, 0.15);
  }

  .bs-header__left {
    flex: 1;
  }

  .bs-header__support {
    font-size: 11px;
    color: var(--bs-text-muted);
  }

  .bs-header__center {
    flex: 2;
    text-align: center;
  }

  .bs-header__title {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 4px;
    color: #fff;
    text-shadow:
      0 0 12px rgba(0, 200, 255, 0.8),
      0 0 24px rgba(0, 200, 255, 0.4);
  }

  .bs-header__subtitle {
    font-size: 11px;
    letter-spacing: 2px;
    color: var(--bs-primary);
    margin-top: 2px;
    opacity: 0.8;
  }

  .bs-header__right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
  }

  .bs-header__time {
    font-size: 20px;
    font-weight: 600;
    color: var(--bs-primary);
    font-variant-numeric: tabular-nums;
  }

  .bs-header__date {
    font-size: 11px;
    color: var(--bs-text-muted);
  }

  .bs-status-dot {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 20px;
    border: 1px solid var(--bs-border);

    &--online {
      color: var(--bs-success);
      border-color: rgba(82, 196, 26, 0.4);
    }
  }

  .bs-status-dot__ring {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--bs-success);
    box-shadow: 0 0 6px var(--bs-success);
    animation: bs-pulse 1.5s infinite;
  }

  @keyframes bs-pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.3);
    }
  }

  /* ─────── 主体三栏 ─────── */
  .bs-body {
    display: flex;
    flex: 1;
    gap: 10px;
    padding: 8px 10px;
    overflow: hidden;
    min-height: 0;
  }

  .bs-left,
  .bs-right {
    width: 25%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-shrink: 0;
  }

  .bs-center {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .bs-left__top {
    flex: 1.3;
    min-height: 0;
  }
  .bs-left__bottom {
    flex: 1;
    min-height: 0;
  }
  .bs-right__top {
    flex: 1.3;
    min-height: 0;
  }
  .bs-right__mid {
    flex: 0.9;
    min-height: 0;
  }
  .bs-right__bottom {
    flex: 1;
    min-height: 0;
  }

  /* ─────── 面板通用 ─────── */
  .bs-panel {
    background: var(--bs-panel-bg);
    border: 1px solid var(--bs-border);
    border-radius: 4px;
    padding: 8px 10px;
    box-shadow:
      inset 0 0 20px rgba(0, 200, 255, 0.03),
      0 0 12px rgba(0, 0, 0, 0.4);
    position: relative;
    overflow: hidden;

    /* 顶部发光线 */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--bs-primary), transparent);
      opacity: 0.7;
    }

    &--flex-col {
      display: flex;
      flex-direction: column;
    }
  }

  .bs-panel__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
    padding-bottom: 5px;
    border-bottom: 1px solid var(--bs-border);
    flex-shrink: 0;
  }

  .bs-panel__title {
    font-size: 12px;
    font-weight: 600;
    color: var(--bs-primary);
    letter-spacing: 1px;

    &::before {
      content: '▌';
      margin-right: 5px;
      color: var(--bs-primary);
    }
  }

  .bs-panel__body {
    flex: 1;
    min-height: 0;
    overflow: hidden;

    &--row {
      display: flex;
      gap: 8px;
    }
  }

  /* ─────── 徽章 ─────── */
  .bs-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    padding: 1px 6px;
    border-radius: 10px;
    border: 1px solid;

    &--blue {
      color: var(--bs-primary);
      border-color: rgba(0, 200, 255, 0.4);
      background: rgba(0, 200, 255, 0.08);
    }

    &--danger {
      color: var(--bs-danger);
      border-color: rgba(255, 77, 77, 0.4);
      background: rgba(255, 77, 77, 0.08);
    }

    &--success {
      color: var(--bs-success);
      border-color: rgba(82, 196, 26, 0.4);
      background: rgba(82, 196, 26, 0.08);
    }

    &--live {
      color: var(--bs-danger);
      border-color: rgba(255, 77, 77, 0.4);
      background: rgba(255, 77, 77, 0.08);
    }
  }

  .bs-live-dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--bs-danger);
    animation: bs-pulse 1s infinite;
  }

  /* ─────── 统计卡片 ─────── */
  .bs-stat-row {
    display: flex;
    gap: 6px;
    margin-bottom: 6px;
    flex-shrink: 0;
  }

  .bs-stat-card {
    flex: 1;
    text-align: center;
    padding: 5px 4px;
    border: 1px solid var(--bs-border);
    border-radius: 4px;
    background: rgba(0, 200, 255, 0.04);

    &__value {
      font-size: 20px;
      font-weight: 700;
      color: var(--bs-primary);
    }

    &__label {
      font-size: 10px;
      color: var(--bs-text-muted);
      margin-top: 2px;
    }

    &--warn &__value {
      color: var(--bs-warn);
    }
    &--danger &__value {
      color: var(--bs-danger);
    }
  }

  /* ─────── 行为表格 ─────── */
  .bs-table {
    flex-shrink: 0;
    margin-top: 6px;
    border: 1px solid var(--bs-border);
    border-radius: 3px;
    overflow: hidden;
    font-size: 11px;
  }

  .bs-table__head {
    display: grid;
    grid-template-columns: 28px 1fr 60px 48px;
    gap: 4px;
    padding: 4px 8px;
    background: rgba(0, 200, 255, 0.08);
    color: var(--bs-primary);
    font-size: 10px;
  }

  .bs-table__row {
    display: grid;
    grid-template-columns: 28px 1fr 60px 48px;
    gap: 4px;
    padding: 4px 8px;
    border-top: 1px solid rgba(0, 200, 255, 0.07);
    color: var(--bs-text);
    align-items: center;

    &--warn {
      background: rgba(255, 77, 77, 0.04);
    }
  }

  .bs-table__idx {
    color: var(--bs-text-muted);
  }

  .bs-table__count {
    color: var(--bs-primary);
    font-weight: 600;
  }

  /* ─────── 图表分半 ─────── */
  .bs-chart-half {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .bs-chart-label {
    font-size: 10px;
    color: var(--bs-text-muted);
    margin-bottom: 2px;
    text-align: center;
  }

  /* ─────── 视频区 ─────── */
  .bs-video-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 10px;
    border: 1px solid var(--bs-border);
    border-radius: 3px;
    background: var(--bs-panel-bg);
    flex-shrink: 0;
  }

  .bs-video-header__info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .bs-video-header__cam {
    font-size: 13px;
    font-weight: 600;
    color: #fff;
  }

  .bs-video-header__id {
    font-size: 10px;
    color: var(--bs-text-muted);
  }

  .bs-video-header__loc {
    font-size: 11px;
    color: var(--bs-text-muted);
  }

  .bs-video-wrap {
    flex: 1;
    min-height: 0;
    position: relative;
    border: 1px solid var(--bs-border-glow);
    border-radius: 3px;
    overflow: hidden;
    background: #000;

    :deep(.xgplayer) {
      width: 100% !important;
      height: 100% !important;
    }
  }

  /* 发光边角 */
  .bs-video-corner {
    position: absolute;
    width: 16px;
    height: 16px;
    z-index: 10;
    pointer-events: none;

    &--tl {
      top: 0;
      left: 0;
      border-top: 2px solid var(--bs-primary);
      border-left: 2px solid var(--bs-primary);
    }
    &--tr {
      top: 0;
      right: 0;
      border-top: 2px solid var(--bs-primary);
      border-right: 2px solid var(--bs-primary);
    }
    &--bl {
      bottom: 0;
      left: 0;
      border-bottom: 2px solid var(--bs-primary);
      border-left: 2px solid var(--bs-primary);
    }
    &--br {
      bottom: 0;
      right: 0;
      border-bottom: 2px solid var(--bs-primary);
      border-right: 2px solid var(--bs-primary);
    }
  }

  /* ─────── 摄像头缩略图 ─────── */
  .bs-cam-list {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
    overflow-x: auto;
    padding-bottom: 2px;

    &::-webkit-scrollbar {
      height: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--bs-border-glow);
      border-radius: 3px;
    }
  }

  .bs-cam-item {
    flex: 1;
    min-width: 80px;
    max-width: 110px;
    border: 1px solid var(--bs-border);
    border-radius: 3px;
    padding: 5px;
    cursor: pointer;
    transition:
      border-color 0.2s,
      background 0.2s;
    background: rgba(0, 0, 0, 0.3);

    &:hover {
      border-color: var(--bs-primary);
    }

    &--active {
      border-color: var(--bs-primary);
      background: rgba(0, 200, 255, 0.08);
    }

    &__thumb {
      height: 36px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    &__icon {
      font-size: 18px;
      color: var(--bs-text-muted);
    }

    &__status {
      position: absolute;
      top: 3px;
      right: 3px;
      width: 6px;
      height: 6px;
      border-radius: 50%;

      &--online {
        background: var(--bs-success);
        box-shadow: 0 0 4px var(--bs-success);
      }
      &--offline {
        background: var(--bs-danger);
      }
    }

    &__name {
      font-size: 10px;
      color: var(--bs-text-muted);
      text-align: center;
      margin-top: 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  /* ─────── 设备统计 ─────── */
  .bs-device-total {
    font-size: 11px;
    color: var(--bs-text-muted);

    b {
      color: var(--bs-primary);
    }
  }

  .bs-device-stats {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    padding-left: 4px;
  }

  .bs-device-stat-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;

    &__dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    &__label {
      flex: 1;
      color: var(--bs-text-muted);
    }

    &__value {
      font-weight: 600;
      color: var(--bs-text);
    }
  }

  /* ─────── 进度条 ─────── */
  .bs-progress-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 6px;
    flex-shrink: 0;
  }

  .bs-progress-item {
    &__header {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: var(--bs-text-muted);
      margin-bottom: 3px;
    }

    &__bar {
      height: 4px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 2px;
      overflow: hidden;
    }

    &__fill {
      height: 100%;
      border-radius: 2px;
      transition: width 0.6s ease;
    }
  }

  /* ─────── 异常告警列表 ─────── */
  .bs-alert-list {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-height: 0;

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--bs-border-glow);
      border-radius: 3px;
    }
  }

  .bs-alert-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 6px;
    border-radius: 3px;
    font-size: 10px;
    border-left: 2px solid;

    &--high {
      background: rgba(255, 77, 77, 0.06);
      border-color: var(--bs-danger);
    }

    &--mid {
      background: rgba(255, 215, 0, 0.05);
      border-color: var(--bs-warn);
    }

    &--low {
      background: rgba(0, 200, 255, 0.04);
      border-color: var(--bs-primary);
    }

    &__time {
      color: var(--bs-text-muted);
      font-variant-numeric: tabular-nums;
      flex-shrink: 0;
    }

    &__device {
      color: var(--bs-primary);
      flex-shrink: 0;
      font-weight: 500;
    }

    &__msg {
      flex: 1;
      color: var(--bs-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  /* ─────── 底部 ─────── */
  .bs-footer {
    display: flex;
    gap: 10px;
    padding: 0 10px 8px;
    height: 130px;
    flex-shrink: 0;
  }

  .bs-footer__block {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  /* ─────── 底部滚动告警 ─────── */
  .bs-scroll-list {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-height: 0;

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--bs-border-glow);
      border-radius: 3px;
    }
  }

  .bs-scroll-list__item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    padding: 2px 4px;
    border-radius: 2px;

    &--high {
      color: var(--bs-danger);
    }
    &--mid {
      color: var(--bs-warn);
    }
    &--low {
      color: var(--bs-primary);
    }
  }

  .bs-scroll-list__level-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
  }

  .bs-scroll-list__time {
    color: var(--bs-text-muted);
    flex-shrink: 0;
  }

  .bs-scroll-list__target {
    flex-shrink: 0;
    font-weight: 500;
  }

  .bs-scroll-list__content {
    flex: 1;
    color: var(--bs-text);
  }

  /* ─────── 底部今日统计 ─────── */
  .bs-today-stats {
    display: flex;
    gap: 4px;
    flex: 1;
    align-items: center;
  }

  .bs-today-stat {
    flex: 1;
    text-align: center;
    padding: 4px 2px;
    border: 1px solid var(--bs-border);
    border-radius: 3px;
    background: rgba(0, 200, 255, 0.03);

    &__value {
      font-size: 18px;
      font-weight: 700;
      color: var(--bs-primary);
    }

    &__label {
      font-size: 9px;
      color: var(--bs-text-muted);
      margin-top: 1px;
    }

    &__sub {
      font-size: 9px;
      margin-top: 1px;

      &--up {
        color: var(--bs-danger);
      }
      &--good {
        color: var(--bs-success);
      }
      &--warn {
        color: var(--bs-warn);
      }
      &--info {
        color: var(--bs-primary);
      }
    }
  }

  /* ─────── 底部系统状态 ─────── */
  .bs-sys-stats {
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex: 1;
    justify-content: center;
  }

  .bs-sys-stat {
    &__header {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 10px;
      margin-bottom: 2px;
    }

    &__label {
      flex: 1;
      color: var(--bs-text-muted);
    }

    &__value {
      color: var(--bs-text);
      font-weight: 500;
    }
  }

  .bs-sys-indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;

    &--ok {
      background: var(--bs-success);
      box-shadow: 0 0 4px var(--bs-success);
    }
    &--warn {
      background: var(--bs-warn);
      box-shadow: 0 0 4px var(--bs-warn);
    }
    &--err {
      background: var(--bs-danger);
      box-shadow: 0 0 4px var(--bs-danger);
    }
  }
</style>
