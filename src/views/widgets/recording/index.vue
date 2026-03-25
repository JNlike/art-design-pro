<!-- 录像回放浏览页 -->
<template>
  <div class="page-content !mb-5">
    <!-- 搜索与筛选 -->
    <ElRow justify="space-between" :gutter="10">
      <ElCol :lg="6" :md="8" :sm="14" :xs="16">
        <ElInput
          v-model="searchVal"
          :prefix-icon="Search"
          clearable
          placeholder="搜索录像标题"
          @keyup.enter="handleSearch"
          @clear="handleSearch"
        />
      </ElCol>
      <ElCol :lg="12" :md="10" :sm="0" :xs="0">
        <div class="recording-segmented">
          <ElSegmented v-model="categoryVal" :options="CATEGORY_OPTIONS" @change="handleSearch" />
        </div>
      </ElCol>
    </ElRow>

    <!-- 录像列表 -->
    <div class="mt-5">
      <ElEmpty v-if="showEmpty" description="暂无录像" />
      <div
        v-else
        class="grid grid-cols-4 gap-5 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1"
      >
        <div
          v-for="item in displayList"
          :key="item.id"
          class="group c-p overflow-hidden border border-g-300/60 rounded-custom-sm"
          @click="openPlayer(item)"
        >
          <!-- 缩略图区域 -->
          <div class="relative aspect-[16/9]">
            <ElImage class="w-full h-full bg-gray-200" :src="item.thumbnail" lazy fit="cover" />
            <!-- 悬停播放遮罩 -->
            <div
              class="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <div
                class="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow"
              >
                <ArtSvgIcon icon="ri:play-fill" class="text-2xl text-gray-800 ml-1" />
              </div>
            </div>
            <!-- 时长标签 -->
            <span
              class="absolute bottom-1 right-1 bg-black/60 rounded text-xs px-1.5 py-0.5 text-white"
            >
              {{ item.duration }}
            </span>
            <!-- 分类标签 -->
            <span
              class="absolute top-1 left-1 bg-black/50 rounded text-xs px-1.5 py-0.5 text-white"
            >
              {{ item.category }}
            </span>
          </div>

          <!-- 信息区 -->
          <div class="px-3 py-2">
            <h3 class="text-sm font-medium text-g-800 line-clamp-2 leading-5 min-h-10">
              {{ item.title }}
            </h3>
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center text-g-500">
                <ArtSvgIcon icon="ri:time-line" class="mr-1 text-sm" />
                <span class="text-xs">{{
                  useDateFormat(item.recordedAt, 'YYYY-MM-DD').value
                }}</span>
              </div>
              <span class="text-xs text-g-400">{{ item.size }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div v-if="!showEmpty" class="flex justify-center mt-6">
      <ElPagination
        background
        v-model:current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, total"
        :total="total"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 视频播放弹窗 -->
    <ElDialog
      v-model="dialogVisible"
      :title="currentRecording?.title"
      width="800px"
      align-center
      destroy-on-close
    >
      <ArtVideoPlayer
        v-if="dialogVisible"
        playerId="recording-dialog-player"
        :videoUrl="currentRecording?.videoUrl || ''"
        :posterUrl="currentRecording?.thumbnail || ''"
        :autoplay="true"
        :playbackRates="[0.5, 0.75, 1, 1.25, 1.5, 2]"
      />
      <template #footer>
        <div class="flex items-center justify-between text-g-500 text-sm px-1">
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <ArtSvgIcon icon="ri:time-line" />
              {{ currentRecording?.duration }}
            </span>
            <span class="flex items-center gap-1">
              <ArtSvgIcon icon="ri:file-line" />
              {{ currentRecording?.size }}
            </span>
            <span class="flex items-center gap-1">
              <ArtSvgIcon icon="ri:calendar-line" />
              {{
                currentRecording
                  ? useDateFormat(currentRecording.recordedAt, 'YYYY-MM-DD HH:mm').value
                  : ''
              }}
            </span>
          </div>
          <ElButton @click="dialogVisible = false">关闭</ElButton>
        </div>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
  import { Search } from '@element-plus/icons-vue'
  import { useDateFormat } from '@vueuse/core'
  import { RecordingList, type Recording } from '@/mock/temp/recordingList'
  import ArtVideoPlayer from '@/components/core/media/art-video-player/index.vue'

  defineOptions({ name: 'Recording' })

  const CATEGORY_OPTIONS = ['全部', '培训录像', '会议录像', '教学录像', '活动录像']

  const searchVal = ref('')
  const categoryVal = ref('全部')
  const currentPage = ref(1)
  const pageSize = ref(12)
  const total = ref(0)
  const allRecordings = ref<Recording[]>([])
  const displayList = ref<Recording[]>([])

  const dialogVisible = ref(false)
  const currentRecording = ref<Recording | null>(null)

  const showEmpty = computed(() => displayList.value.length === 0)

  const filterAndPaginate = () => {
    let filtered = allRecordings.value

    if (searchVal.value.trim()) {
      const kw = searchVal.value.trim().toLowerCase()
      filtered = filtered.filter((item) => item.title.toLowerCase().includes(kw))
    }

    if (categoryVal.value !== '全部') {
      filtered = filtered.filter((item) => item.category === categoryVal.value)
    }

    total.value = filtered.length
    const start = (currentPage.value - 1) * pageSize.value
    displayList.value = filtered.slice(start, start + pageSize.value)
  }

  const handleSearch = () => {
    currentPage.value = 1
    filterAndPaginate()
  }

  const handlePageChange = (val: number) => {
    currentPage.value = val
    filterAndPaginate()
  }

  const openPlayer = (item: Recording) => {
    currentRecording.value = item
    dialogVisible.value = true
  }

  onMounted(() => {
    allRecordings.value = RecordingList
    filterAndPaginate()
  })
</script>

<style lang="scss">
  .recording-segmented .el-segmented {
    height: 40px;
    padding: 6px;

    --el-border-radius-base: 8px;
  }
</style>
