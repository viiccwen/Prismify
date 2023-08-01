/* eslint-disable @next/next/no-img-element */
import { GalleryVerticalEnd, RotateCcw, Ruler, Upload, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { useImageOptions } from '@/hooks/use-image-options'
import { ChangeEvent } from 'react'
import { useRef } from 'react'
import { Slider } from '@/components/ui/Slider'
import { Separator } from '../ui/Separator'
import { Switch } from '../ui/Switch'
import { ChevronDown } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover'

export default function ImageOptions() {
  const uploadRef = useRef<HTMLInputElement>(null)

  const {
    isImageUploaded,
    image,
    setImage,
    setIsImageUploaded,
    imageSize,
    setImageSize,
    setImageRoundness,
    imageRoundness,
    background,
  } = useImageOptions()

  const handleImageDelete = () => {
    setImage('')
    setIsImageUploaded(false)
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
      setIsImageUploaded(true)
    }
  }

  return (
    <>
      <div className="mb-3 mt-4 flex h-[5rem] gap-6 px-1 text-sm">
        <div className="relative flex h-full basis-2/5 flex-col rounded-xl  border-2 border-[#898aeb]/30 p-1 hover:border-[#898aeb]/60">
          {!isImageUploaded && (
            <>
              <label
                htmlFor="upload"
                className="flex-center group h-full w-full cursor-pointer rounded-xl"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    uploadRef.current?.click()
                  }
                }}
              >
                <Upload
                  className="cursor-pointer text-purple/60 focus:ring-1 group-hover:text-purple/80"
                  size={28}
                />
              </label>
              <input
                id="upload"
                ref={uploadRef}
                name="upload"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="sr-only "
                tabIndex={-1}
              />
            </>
          )}
          {isImageUploaded && image && (
            <>
              <img
                className="h-full w-full rounded-lg object-cover"
                src={image}
                alt="uploaded image"
              />
              <button
                onClick={handleImageDelete}
                className="absolute right-1 top-1"
              >
                <X
                  className=" text-red-500 ring-1 ring-inset ring-red-500/10"
                  size={18}
                  aria-label="delete image"
                />
              </button>
            </>
          )}
        </div>
      </div>

      <h3 className="mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
        <Ruler size={20} />
        <span>Appearance</span>
      </h3>

      {/* Size */}
      <div className="mb-3 mt-8 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Size</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {Math.round(Number(imageSize) * 100)}%
        </p>
        <Button variant="secondary" size="sm" className="ml-auto translate-x-2">
          <RotateCcw size={15} className="text-primary/70 dark:text-dark/80" />
        </Button>
      </div>
      <div className="flex max-w-[70%] gap-4 text-[0.85rem]">
        <Slider
          defaultValue={[1]}
          max={3}
          min={0.25}
          step={0.01}
          onValueChange={(value: number[]) => {
            setImageSize(value[0].toString())
          }}
        />
      </div>

      {/* Roundness */}
      <div className="mb-3 mt-9 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Roundness</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {`${Math.round((imageRoundness / 4) * 100)} `}
        </p>

        <Button variant="secondary" size="sm" className="ml-auto translate-x-2">
          <RotateCcw size={15} className="text-primary/70 dark:text-dark/80" />
        </Button>
      </div>

      <div className="flex max-w-[70%] gap-4 text-[0.85rem]">
        <Slider
          defaultValue={[1]}
          max={4}
          min={0}
          step={0.01}
          onValueChange={(value) => {
            setImageRoundness(value[0])
          }}
        />
      </div>

      <Separator className="mt-10 h-[0.1rem] w-full" />

      <div className="mt-10 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
        <GalleryVerticalEnd size={20} className="rotate-90" />
        <label className="mr-2" htmlFor="toggle-shadow">
          Shadow
        </label>

        <Switch defaultChecked className="scale-[.85]" id="toggle-shadow" />
      </div>

      {/* Shadow */}
      <Popover>
        <PopoverTrigger className="relative mt-8 flex h-14 max-w-[70%] items-center overflow-hidden rounded-lg border border-border bg-formDark">
          <div
            style={{ background: background }}
            className="flex-center h-full basis-[25%]"
          >
            <div className="flex-center h-1/2 w-1/2 rounded-md bg-white shadow-xl"></div>
          </div>
          <div className="flex h-full w-full flex-1 items-center justify-between px-4">
            <p className="text-[0.85rem] text-primary/70 dark:text-dark/70">
              Small
            </p>
            <ChevronDown
              size={18}
              className="text-primary/70 dark:text-dark/80"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex w-[350px] flex-wrap gap-4"
        >
          Todo: Add shadow presets
        </PopoverContent>
      </Popover>

      <div className="mb-3 mt-8 flex max-w-[10%] items-center px-1">
        <h1 className="text-[0.85rem]">Color</h1>
      </div>

      <div className="flex h-16 w-28 max-w-[70%] rounded-xl bg-formDark">
        <div className="ml-4 flex h-full basis-[70%] items-center">
          <div className="flex h-[55%] w-[65%] rounded-md bg-sidebar"></div>
        </div>
        <div className="mr-4 flex flex-1 items-center">
          <ChevronDown
            size={20}
            className="text-primary/70 dark:text-dark/80"
          />
        </div>
      </div>
    </>
  )
}
