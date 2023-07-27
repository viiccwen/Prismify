export const MIN_RESOLUTION = 100
export const MAX_RESOLUTION = 4000

export const qualities = [
  { quality: '0.5x', value: 0.5 },
  { quality: '1x', value: 1 },
  { quality: '2x', value: 2 },
  {quality: '4x', value: 4}
]

export const resolutions = [
  {
    name: '1:1 (Pfp)',
    resolution: '1x1',
    icon: 'UserSquare2',
  },
  {
    name: '16:9 (Wide)',
    resolution: '16x9',
    icon: 'GalleryThumbnails',
  },
  {
    name: '9:16 (Story/Reels)',
    resolution: '9x16',
    icon: 'GalleryHorizontalEnd',
  },
  {
    name: '4:3 (Old TV)',
    resolution: '4x3',
    icon: 'MonitorPlay',
  },
  {
    name: '3:4 (Portrait)',
    resolution: '3x4',
    icon: 'Smartphone',
  },
  {
    name: '21:9 (Cinematic)',
    resolution: '21x9',
    icon: 'GalleryVerticalEnd',
  },
]
