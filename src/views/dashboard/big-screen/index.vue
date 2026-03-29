<!-- 动物宏观行为监控平台 - 大屏页面 -->
<!-- 图表：vue-data-ui | 装饰：datav-vue3 | 视频：vue3-video-play -->
<template>
  <div class="big-screen">
    <!-- 整页外层科技边框：datav-vue3 BorderBox11 -->
    <BorderBox11
      class="bs-border-outer"
      :color="['#003366', '#00c8ff']"
      backgroundColor="transparent"
    >
      <!-- 顶部标题栏 -->
      <header class="bs-header">
        <div class="bs-header__left">
          <span class="bs-header__support">技术支持：Art Design Pro</span>
          <!-- datav-vue3 Decoration6 标题栏左侧装饰线 -->
          <Decoration6
            class="bs-header__deco"
            :color="['#003366', '#00c8ff']"
            style="width: 120px; height: 30px"
          />
        </div>
        <div class="bs-header__center">
          <div class="bs-header__title">动物宏观行为监控平台</div>
          <div class="bs-header__subtitle">实时监测 / 视频分析 / 异常预警</div>
        </div>
        <div class="bs-header__right">
          <!-- datav-vue3 Decoration6 标题栏右侧装饰线 -->
          <Decoration6
            class="bs-header__deco bs-header__deco--right"
            :color="['#00c8ff', '#003366']"
            style="width: 120px; height: 30px"
          />
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
          <BorderBox8
            class="bs-panel bs-panel--flex-col bs-left__top"
            :color="['#003366', '#00c8ff']"
          >
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
                  <ArtCountTo
                    class="bs-stat-card__value"
                    :target="anomalyCount"
                    :duration="1500"
                  />
                  <div class="bs-stat-card__label">异常数量</div>
                </div>
                <div class="bs-stat-card bs-stat-card--danger">
                  <ArtCountTo
                    class="bs-stat-card__value"
                    :target="alertCount"
                    :duration="1500"
                  />
                  <div class="bs-stat-card__label">告警数量</div>
                </div>
              </div>
              <!-- vue-data-ui VueUiXy 折线图 -->
              <VueUiXy :dataset="trendDataset" :config="trendConfig" />
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
          </BorderBox8>

          <!-- B2: 行为统计分布 -->
          <BorderBox8
            class="bs-panel bs-panel--flex-col bs-left__bottom"
            :color="['#003366', '#00c8ff']"
          >
            <div class="bs-panel__header">
              <span class="bs-panel__title">行为统计分布</span>
            </div>
            <div class="bs-panel__body bs-panel__body--row">
              <div class="bs-chart-half">
                <div class="bs-chart-label">按时段统计</div>
                <!-- vue-data-ui VueUiXy 柱状图 -->
                <VueUiXy :dataset="barDataset" :config="barConfig" />
              </div>
              <div class="bs-chart-half">
                <div class="bs-chart-label">行为类型占比</div>
                <!-- vue-data-ui VueUiDonut 环形图 -->
                <VueUiDonut :dataset="ringDataset" :config="donutConfig" />
              </div>
            </div>
          </BorderBox8>
        </section>

        <!-- 中间视频主区域 -->
        <section class="bs-center">
          <!-- C1: 视频标题栏 -->
          <div class="bs-video-header">
            <!-- datav-vue3 Decoration10 左侧装饰 -->
            <Decoration10
              class="bs-video-deco"
              :color="['#00c8ff', '#003366']"
              style="width: 80px; height: 30px"
            />
            <div class="bs-video-header__info">
              <span class="bs-video-header__cam">{{ activeCam.name }}</span>
              <span class="bs-badge bs-badge--live">
                <span class="bs-live-dot"></span>
                {{ activeCam.status }}
              </span>
              <span class="bs-video-header__id">ID: {{ activeCam.id }}</span>
            </div>
            <div class="bs-video-header__loc">{{ activeCam.location }}</div>
            <!-- datav-vue3 Decoration10 右侧装饰（镜像） -->
            <Decoration10
              class="bs-video-deco"
              :color="['#003366', '#00c8ff']"
              style="width: 80px; height: 30px; transform: scaleX(-1)"
            />
          </div>

          <!-- C2: 视频播放区 - vue3-video-play 包裹在 datav-vue3 BorderBox12 中 -->
          <BorderBox12
            class="bs-video-wrap"
            :color="['#00c8ff', '#003366']"
            backgroundColor="transparent"
          >
            <vue3-video-play
              :key="activeCam.id"
              :src="activeCam.url"
              :title="activeCam.name"
              width="100%"
              height="100%"
              :autoPlay="false"
              :loop="false"
              :muted="false"
              :volume="0.3"
              color="#00c8ff"
              :control="true"
            />
          </BorderBox12>

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
                  :class="
                    cam.online ? 'bs-cam-item__status--online' : 'bs-cam-item__status--offline'
                  "
                ></span>
              </div>
              <div class="bs-cam-item__name">{{ cam.name }}</div>
            </div>
          </div>
        </section>

        <!-- 右侧状态区 -->
        <section class="bs-right">
          <!-- D1: 边缘设备信息 -->
          <BorderBox8
            class="bs-panel bs-panel--flex-col bs-right__top"
            :color="['#003366', '#00c8ff']"
          >
            <div class="bs-panel__header">
              <span class="bs-panel__title">边缘设备信息</span>
              <span class="bs-device-total"
                >共 <b>{{ deviceStats.total }}</b> 台</span
              >
            </div>
            <div class="bs-panel__body bs-panel__body--row">
              <!-- vue-data-ui VueUiDonut 环形图（在线率） -->
              <div class="bs-device-ring">
                <VueUiDonut :dataset="deviceRingDataset" :config="deviceDonutConfig" />
              </div>
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
          </BorderBox8>

          <!-- D2: 异常提示 -->
          <BorderBox8
            class="bs-panel bs-panel--flex-col bs-right__mid"
            :color="['#331000', '#ff4d4d']"
          >
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
          </BorderBox8>

          <!-- D3: 异常排行 -->
          <BorderBox8
            class="bs-panel bs-panel--flex-col bs-right__bottom"
            :color="['#003366', '#00c8ff']"
          >
            <div class="bs-panel__header">
              <span class="bs-panel__title">异常排行 TOP5</span>
            </div>
            <div class="bs-panel__body">
              <!-- vue-data-ui VueUiHorizontalBar 水平条形图 -->
              <VueUiHorizontalBar :dataset="rankingDataset" :config="hbarConfig" />
            </div>
          </BorderBox8>
        </section>
      </main>

      <!-- 底部区域 -->
      <footer class="bs-footer">
        <!-- 实时告警列表 -->
        <BorderBox3
          class="bs-panel bs-footer__block"
          :color="['#003366', '#00c8ff']"
        >
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
        </BorderBox3>

        <!-- 今日统计汇总 -->
        <BorderBox3
          class="bs-panel bs-footer__block"
          :color="['#003366', '#00c8ff']"
        >
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
        </BorderBox3>

        <!-- 系统运行状态 -->
        <BorderBox3
          class="bs-panel bs-footer__block"
          :color="['#003366', '#00c8ff']"
        >
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
        </BorderBox3>
      </footer>
    </BorderBox11>
  </div>
</template>

<script setup lang="ts">
  // vue-data-ui：数据图表组件
  import { VueUiXy, VueUiDonut, VueUiHorizontalBar } from 'vue-data-ui'
  import type { VueUiXyDatasetItem, VueUiXyConfig } from 'vue-data-ui'
  import 'vue-data-ui/style.css'
  // vue3-video-play：视频播放控件
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error – vue3-video-play has no type declarations
  import { videoPlay as Vue3VideoPlay } from 'vue3-video-play/dist/index.mjs'
  import 'vue3-video-play/dist/style.css'

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

  // ──────────────── vue-data-ui: VueUiXy 折线图数据 ────────────────
  const trendDataset = ref<VueUiXyDatasetItem[]>([
    {
      name: '正常行为',
      type: 'line',
      series: [45, 52, 68, 74, 85, 79, 92],
      color: '#00c8ff',
      smooth: true
    },
    {
      name: '异常行为',
      type: 'line',
      series: [12, 18, 9, 23, 15, 28, 19],
      color: '#ff4d4d',
      smooth: true
    },
    {
      name: '告警事件',
      type: 'line',
      series: [3, 5, 2, 8, 4, 9, 6],
      color: '#ffd700',
      smooth: true
    }
  ])
  const trendConfig: VueUiXyConfig = {
    chart: {
      backgroundColor: 'transparent',
      color: '#d0e8ff',
      height: 130,
      padding: { top: 12, left: 32, right: 12, bottom: 28 },
      grid: {
        stroke: 'rgba(0,200,255,0.12)',
        labels: {
          show: true,
          color: '#d0e8ff',
          fontSize: 9,
          xAxisLabels: {
            values: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
            show: true,
            color: '#d0e8ff',
            fontSize: 9
          }
        }
      },
      legend: { show: false }
    }
  }

  // ──────────────── 行为类型表 ────────────────
  const behaviorList = ref([
    { type: '觅食行为', count: 45, status: '正常' },
    { type: '聚集行为', count: 38, status: '正常' },
    { type: '应激逃跑', count: 12, status: '异常' },
    { type: '打架行为', count: 8, status: '异常' },
    { type: '静止不动', count: 25, status: '正常' }
  ])

  // ──────────────── vue-data-ui: VueUiXy 柱状图数据 ────────────────
  const barDataset = ref<VueUiXyDatasetItem[]>([
    { name: '行为数', type: 'bar', series: [32, 28, 75, 68, 82, 45], color: '#00c8ff' }
  ])
  const barConfig: VueUiXyConfig = {
    chart: {
      backgroundColor: 'transparent',
      color: '#d0e8ff',
      height: 120,
      padding: { top: 12, left: 32, right: 12, bottom: 28 },
      grid: {
        stroke: 'rgba(0,200,255,0.12)',
        labels: {
          show: true,
          color: '#d0e8ff',
          fontSize: 9,
          xAxisLabels: {
            values: ['00-04', '04-08', '08-12', '12-16', '16-20', '20-24'],
            show: true,
            color: '#d0e8ff',
            fontSize: 9
          }
        }
      },
      legend: { show: false }
    }
  }

  // ──────────────── vue-data-ui: VueUiDonut 行为类型环形图 ────────────────
  const ringDataset = ref([
    { name: '觅食', color: '#00c8ff', values: [35] },
    { name: '聚集', color: '#ffd700', values: [28] },
    { name: '逃跑', color: '#ff4d4d', values: [12] },
    { name: '打架', color: '#a855f7', values: [8] },
    { name: '静止', color: '#52c41a', values: [17] }
  ])
  const donutConfig = {
    style: {
      chart: {
        backgroundColor: 'transparent',
        color: '#d0e8ff',
        height: 120,
        layout: {
          labels: { dataLabels: { show: false } }
        },
        legend: {
          backgroundColor: 'transparent',
          color: '#d0e8ff',
          fontSize: 9
        }
      }
    }
  }

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

  // vue-data-ui: VueUiDonut 设备在线率环形图
  const deviceRingDataset = computed(() => [
    { name: '在线', color: '#52c41a', values: [deviceStats.value.online] },
    { name: '离线', color: '#ff4d4d', values: [deviceStats.value.offline] },
    { name: '告警', color: '#ffd700', values: [deviceStats.value.warning] }
  ])
  const deviceDonutConfig = {
    style: {
      chart: {
        backgroundColor: 'transparent',
        color: '#d0e8ff',
        height: 100,
        layout: {
          labels: { dataLabels: { show: false } }
        },
        legend: { show: false }
      }
    }
  }
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

  // ──────────────── vue-data-ui: VueUiHorizontalBar 异常排行 ────────────────
  const rankingDataset = ref([
    { name: '3号区域', value: 48, color: '#ff4d4d' },
    { name: '1号区域', value: 35, color: '#ff7a45' },
    { name: '2号区域', value: 28, color: '#ffa940' },
    { name: '5号区域', value: 17, color: '#ffc53d' },
    { name: '4号区域', value: 12, color: '#ffd700' }
  ])
  const hbarConfig = {
    style: {
      chart: {
        backgroundColor: 'transparent',
        color: '#d0e8ff',
        height: 130,
        padding: { top: 8, left: 60, right: 16, bottom: 8 },
        labels: { color: '#d0e8ff', fontSize: 10 },
        bars: {
          borderRadius: 2,
          dataLabels: { color: '#d0e8ff', fontSize: 10 }
        }
      },
      legend: { show: false }
    }
  }

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

  /* datav-vue3 外层边框容器 */
  .bs-border-outer {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
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
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .bs-header__support {
    font-size: 11px;
    color: var(--bs-text-muted);
  }

  .bs-header__deco {
    opacity: 0.8;
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
    position: relative;
    overflow: hidden;

    &--flex-col {
      display: flex;
      flex-direction: column;
      padding: 10px 12px;
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
    overflow: hidden;
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
    gap: 8px;
  }

  .bs-video-deco {
    opacity: 0.8;
    flex-shrink: 0;
  }

  .bs-video-header__info {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
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

  /* datav-vue3 BorderBox12 视频外框 */
  .bs-video-wrap {
    flex: 1;
    min-height: 0;
    overflow: hidden;
    background: #000;

    /* vue3-video-play 播放器内部样式适配 */
    :deep(.d-player-wrap) {
      width: 100% !important;
      height: 100% !important;
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

  .bs-device-ring {
    width: 100px;
    flex-shrink: 0;
    overflow: hidden;
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
      background: rgba(0, 200, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;
    }

    &__fill {
      height: 100%;
      border-radius: 2px;
      transition: width 1s ease;
    }
  }

  /* ─────── 告警列表 ─────── */
  .bs-alert-list {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-right: 2px;

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--bs-border-glow);
    }
  }

  .bs-alert-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    padding: 4px 6px;
    border-radius: 3px;
    border-left: 2px solid;

    &--high {
      border-color: var(--bs-danger);
      background: rgba(255, 77, 77, 0.06);
    }

    &--mid {
      border-color: var(--bs-warn);
      background: rgba(255, 215, 0, 0.04);
    }

    &--low {
      border-color: var(--bs-success);
      background: rgba(82, 196, 26, 0.04);
    }

    &__time {
      color: var(--bs-text-muted);
      flex-shrink: 0;
    }

    &__device {
      color: var(--bs-primary);
      font-weight: 600;
      flex-shrink: 0;
    }

    &__msg {
      color: var(--bs-text);
      flex: 1;
    }
  }

  /* ─────── 底部 ─────── */
  .bs-footer {
    display: flex;
    gap: 8px;
    height: 130px;
    padding: 0 10px 8px;
    flex-shrink: 0;
  }

  .bs-footer__block {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 8px 10px;
    overflow: hidden;
  }

  /* ─────── 底部滚动告警 ─────── */
  .bs-scroll-list {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--bs-border-glow);
    }

    &__item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 10px;
      padding: 2px 0;

      &--high .bs-scroll-list__level-dot {
        background: var(--bs-danger);
        box-shadow: 0 0 4px var(--bs-danger);
      }

      &--mid .bs-scroll-list__level-dot {
        background: var(--bs-warn);
      }

      &--low .bs-scroll-list__level-dot {
        background: var(--bs-success);
      }
    }

    &__level-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    &__time {
      color: var(--bs-text-muted);
      flex-shrink: 0;
    }

    &__target {
      color: var(--bs-primary);
      flex-shrink: 0;
    }

    &__content {
      color: var(--bs-text);
      flex: 1;
    }
  }

  /* ─────── 底部今日统计 ─────── */
  .bs-today-stats {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 8px;
  }

  .bs-today-stat {
    text-align: center;

    &__value {
      font-size: 18px;
      font-weight: 700;
      color: var(--bs-primary);
    }

    &__label {
      font-size: 10px;
      color: var(--bs-text-muted);
      margin-top: 2px;
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
        color: var(--bs-text-muted);
      }
    }
  }

  /* ─────── 底部系统状态 ─────── */
  .bs-sys-stats {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
  }

  .bs-sys-stat {
    &__header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 10px;
      margin-bottom: 2px;
    }

    &__label {
      flex: 1;
      color: var(--bs-text-muted);
    }

    &__value {
      color: var(--bs-text);
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
    }

    &--error {
      background: var(--bs-danger);
      box-shadow: 0 0 4px var(--bs-danger);
    }
  }
</style>
