import { Button } from '@/components/ui/Button'
import { Slider } from '@/components/ui/Slider'
import { useMoveable } from '@/store/use-moveable'
import { RotateCcw } from 'lucide-react'
import { useImageOptions } from '@/store/use-image-options'

export default function TranslateOption() {
  const { images, setImages, selectedImage } =
    useImageOptions()
  const { setShowControls } = useMoveable()

  return (
    <>
      <div className="mb-3 mt-2 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Translate X</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {`${Math.round(images[selectedImage - 1]?.style.translateX)}px`}
        </p>
        <Button
          aria-label="reset size"
          variant="secondary"
          size="sm"
          className="ml-auto translate-x-2"
          onClick={() =>
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        translateX: 0,
                      },
                    }
                  : image
              )
            )
          }
        >
          <RotateCcw size={15} className="text-primary/70 dark:text-dark/80" />
        </Button>
      </div>

      <div className="mb-3 flex max-w-[70%] gap-4 text-[0.85rem]">
        <Slider
          defaultValue={[0]}
          max={1000}
          min={-1000}
          step={0.001}
          value={[images[selectedImage - 1]?.style.translateX]}
          onValueChange={(value: number[]) => {
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        translateX: value[0],
                      },
                    }
                  : image
              )
            )
            setShowControls(false)
          }}
          onValueCommit={() => setShowControls(true)}
        />
      </div>

      <div className="mb-3 mt-3 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Translate Y</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {`${Math.round(images[selectedImage - 1]?.style.translateY)}px`}
        </p>
        <Button
          aria-label="reset size"
          variant="secondary"
          size="sm"
          className="ml-auto translate-x-2"
          onClick={() =>
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        translateY: 0,
                      },
                    }
                  : image
              )
            )
          }
        >
          <RotateCcw size={15} className="text-primary/70 dark:text-dark/80" />
        </Button>
      </div>

      <div className="flex max-w-[70%] gap-4 text-[0.85rem]">
        <Slider
          defaultValue={[0]}
          max={500}
          min={-500}
          step={0.001}
          value={[images[selectedImage - 1]?.style.translateY]}
          onValueChange={(value: number[]) => {
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        translateY: value[0],
                      },
                    }
                  : image
              )
            )
            setShowControls(false)
          }}
          onValueCommit={() => setShowControls(true)}
        />
      </div>
    </>
  )
}
