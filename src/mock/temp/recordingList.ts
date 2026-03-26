import cover1 from '@imgs/cover/img1.webp'
import cover2 from '@imgs/cover/img2.webp'
import cover3 from '@imgs/cover/img3.webp'
import cover4 from '@imgs/cover/img4.webp'
import cover5 from '@imgs/cover/img5.webp'
import cover6 from '@imgs/cover/img6.webp'
import cover7 from '@imgs/cover/img7.webp'
import cover8 from '@imgs/cover/img8.webp'
import cover9 from '@imgs/cover/img9.webp'
import cover10 from '@imgs/cover/img10.webp'

const DEMO_VIDEO_URL =
  '//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/xgplayer-demo.mp4'

export interface Recording {
  id: number
  title: string
  thumbnail: string
  videoUrl: string
  duration: string
  recordedAt: string
  category: string
  size: string
}

export const RecordingList: Recording[] = [
  {
    id: 1,
    title: '前端开发培训第一期 - Vue3 核心基础',
    thumbnail: cover1,
    videoUrl: DEMO_VIDEO_URL,
    duration: '1:23:45',
    recordedAt: '2024-08-26T10:00:00.000Z',
    category: '培训录像',
    size: '245 MB'
  },
  {
    id: 2,
    title: '产品需求评审会议 - 2024年Q3版本规划',
    thumbnail: cover2,
    videoUrl: DEMO_VIDEO_URL,
    duration: '45:12',
    recordedAt: '2024-08-20T14:30:00.000Z',
    category: '会议录像',
    size: '132 MB'
  },
  {
    id: 3,
    title: 'TypeScript 进阶教学 - 泛型与装饰器',
    thumbnail: cover3,
    videoUrl: DEMO_VIDEO_URL,
    duration: '2:05:30',
    recordedAt: '2024-08-15T09:00:00.000Z',
    category: '教学录像',
    size: '380 MB'
  },
  {
    id: 4,
    title: '公司年中技术分享活动录像',
    thumbnail: cover4,
    videoUrl: DEMO_VIDEO_URL,
    duration: '3:12:08',
    recordedAt: '2024-07-30T13:00:00.000Z',
    category: '活动录像',
    size: '560 MB'
  },
  {
    id: 5,
    title: '后端架构设计培训 - 微服务入门',
    thumbnail: cover5,
    videoUrl: DEMO_VIDEO_URL,
    duration: '1:48:22',
    recordedAt: '2024-07-22T10:00:00.000Z',
    category: '培训录像',
    size: '315 MB'
  },
  {
    id: 6,
    title: '周例会记录 - 项目进度同步',
    thumbnail: cover6,
    videoUrl: DEMO_VIDEO_URL,
    duration: '32:55',
    recordedAt: '2024-07-15T16:00:00.000Z',
    category: '会议录像',
    size: '98 MB'
  },
  {
    id: 7,
    title: 'Node.js + Docker 部署实战教学',
    thumbnail: cover7,
    videoUrl: DEMO_VIDEO_URL,
    duration: '1:15:40',
    recordedAt: '2024-07-08T10:30:00.000Z',
    category: '教学录像',
    size: '220 MB'
  },
  {
    id: 8,
    title: '团队建设活动 - 年度运动会精彩回顾',
    thumbnail: cover8,
    videoUrl: DEMO_VIDEO_URL,
    duration: '58:30',
    recordedAt: '2024-06-28T08:00:00.000Z',
    category: '活动录像',
    size: '175 MB'
  },
  {
    id: 9,
    title: '前端性能优化专题培训',
    thumbnail: cover9,
    videoUrl: DEMO_VIDEO_URL,
    duration: '1:32:10',
    recordedAt: '2024-06-20T10:00:00.000Z',
    category: '培训录像',
    size: '268 MB'
  },
  {
    id: 10,
    title: '跨部门协作沟通会议',
    thumbnail: cover10,
    videoUrl: DEMO_VIDEO_URL,
    duration: '1:02:18',
    recordedAt: '2024-06-12T15:00:00.000Z',
    category: '会议录像',
    size: '188 MB'
  },
  {
    id: 11,
    title: 'CSS 动画与过渡效果教学',
    thumbnail: cover1,
    videoUrl: DEMO_VIDEO_URL,
    duration: '55:48',
    recordedAt: '2024-06-05T10:00:00.000Z',
    category: '教学录像',
    size: '162 MB'
  },
  {
    id: 12,
    title: '新员工入职培训 - 研发流程规范',
    thumbnail: cover2,
    videoUrl: DEMO_VIDEO_URL,
    duration: '2:20:05',
    recordedAt: '2024-05-28T09:00:00.000Z',
    category: '培训录像',
    size: '412 MB'
  },
  {
    id: 13,
    title: '技术委员会季度评审会议',
    thumbnail: cover3,
    videoUrl: DEMO_VIDEO_URL,
    duration: '1:40:33',
    recordedAt: '2024-05-20T14:00:00.000Z',
    category: '会议录像',
    size: '295 MB'
  },
  {
    id: 14,
    title: 'React 与 Vue3 对比分析教学',
    thumbnail: cover4,
    videoUrl: DEMO_VIDEO_URL,
    duration: '1:10:22',
    recordedAt: '2024-05-10T10:30:00.000Z',
    category: '教学录像',
    size: '208 MB'
  },
  {
    id: 15,
    title: '公司五周年庆典活动全程录像',
    thumbnail: cover5,
    videoUrl: DEMO_VIDEO_URL,
    duration: '4:05:12',
    recordedAt: '2024-04-25T18:00:00.000Z',
    category: '活动录像',
    size: '720 MB'
  },
  {
    id: 16,
    title: '安全生产培训 - 数据安全与合规',
    thumbnail: cover6,
    videoUrl: DEMO_VIDEO_URL,
    duration: '1:25:00',
    recordedAt: '2024-04-15T09:00:00.000Z',
    category: '培训录像',
    size: '252 MB'
  }
]
