/* eslint-disable @next/next/no-img-element */
'use client'

import { ImageIcon, Upload } from 'lucide-react'
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useImageOptions } from '@/store/use-image-options'
import BrowserFrame from './BrowserFrame'
import { Button } from '../ui/Button'
import demoImage from '@/public/images/demo-tweet.png'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import { useBackgroundOptions } from '@/store/use-background-options'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import { useMoveable } from '@/store/use-moveable'
import { useFrameOptions } from '@/store/use-frame-options'
import MoveableComponent from './MoveableComponent'
import { calculateEqualCanvasSize, convertHex } from '@/utils/helperFns'
import { useColorExtractor } from '@/store/use-color-extractor'
import analyze from 'rgbaster'
import ContextMenuImage from './ContextMenuImage'
import Dropzone from 'react-dropzone'

const ImageUpload = () => {
  const targetRef = useRef<HTMLDivElement>(null)

  const {
    images,
    setImages,
    setSelectedImage,
    selectedImage,
    setInitialImageUploaded,
    initialImageUploaded,
  } = useImageOptions()
  const { setShowControls, showControls } = useMoveable()

  const { browserFrame } = useFrameOptions()
  const { imagesCheck } = useColorExtractor()

  useEffect(() => {
    if (images.length === 0) {
      return
    }
    setInitialImageUploaded(true)
    const extractColors = async () => {
      const result = await analyze(images[images.length - 1].image, {
        scale: 0.3,
      })
      const extractedColors = result.slice(0, 12)
      setImages(
        images.map((image, index) =>
          index === images.length - 1
            ? {
                ...image,
                extractedColors,
                style: {
                  ...image.style,
                  insetColor: extractedColors[0].color,
                },
              }
            : image
        )
      )
    }
    extractColors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesCheck])
  console.log(imagesCheck)
  console.log(images)

  const handleImageClick = useCallback(
    (id: number) => {
      setShowControls(!showControls)
      setSelectedImage(id)
    },
    [setShowControls, showControls, setSelectedImage]
  )

  useOnClickOutside(targetRef, () => {
    setShowControls(false)
  })

  // const {
  //   imageSize,
  //   imageRoundness,
  //   imageShadow,
  //   borderSize,
  //   borderColor,
  //   rotate,
  // } = images[selectedImage - 1]?.style || {}

  return (
    <>
      {!initialImageUploaded && <LoadAImage />}
      {images && (
        <>
          <div className="absolute flex items-center">
            {images.map((image) => {
              if (image.image !== '')
                return (
                  <ContextMenuImage key={image.id}>
                    <div
                      key={image.image}
                      className={`image flex h-full w-full flex-col overflow-hidden `}
                      ref={image.id === selectedImage ? targetRef : null}
                      style={{
                        transform: `scale(${image.style.imageSize}) translate(${image.style.translateX}px, ${image.style.translateY}px) rotate(${image.style.rotate}deg)`,
                        borderRadius: `${image.style.imageRoundness}rem`,
                        boxShadow:
                          image.style.shadowName !== 'Small'
                            ? `${image.style.imageShadow} ${convertHex(
                                image.style.shadowColor,
                                image.style.shadowOpacity
                              )}`
                            : `0 10px 25px -5px ${convertHex(
                                image.style.shadowColor,
                                image.style.shadowOpacity - 0.25
                              )}, 0 8px 10px -6px ${convertHex(
                                image.style.shadowColor,
                                image.style.shadowOpacity - 0.25
                              )}`,

                        padding:
                          browserFrame !== 'None'
                            ? ''
                            : `${image.style.insetSize}px`,

                        backgroundColor:
                          image.style.insetSize !== '0'
                            ? `${image?.style.insetColor}`
                            : '',
                      }}
                      id={`${image.id}`}
                      onClick={() => handleImageClick(image.id)}
                      // on right click too do the same
                      onContextMenu={(e) => {
                        handleImageClick(image.id)
                      }}
                    >
                      <BrowserFrame />

                      <img
                        className={`h-full w-full flex-1`}
                        src={image.image}
                        alt="Uploaded image"
                        style={{
                          borderRadius:
                            browserFrame !== 'None'
                              ? ''
                              : `calc(${image.style.imageRoundness}rem - ${image.style.insetSize}px)`,

                          padding:
                            browserFrame === 'None'
                              ? ''
                              : `${image.style.insetSize}px`,
                        }}
                      />
                    </div>
                  </ContextMenuImage>
                )
            })}
          </div>
        </>
      )}
      {showControls && <MoveableComponent id={`${selectedImage}`} />}
    </>
  )
}

export default ImageUpload

function LoadAImage() {
  const {
    images,
    setImages,
    defaultStyle,
    setSelectedImage,
    setInitialImageUploaded,
  } = useImageOptions()
  const { imagesCheck, setImagesCheck } = useColorExtractor()
  const { setResolution, automaticResolution } = useResizeCanvas()
  const { setBackground } = useBackgroundOptions()
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const handleImageLoad = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]

      if (file) {
        const imageUrl = URL.createObjectURL(file)
        setInitialImageUploaded(true)

        setImagesCheck([...imagesCheck, imageUrl])
        setImages([
          ...images,
          { image: imageUrl, id: images.length + 1, style: defaultStyle },
        ])
        setSelectedImage(images.length + 1)

        if (images.length > 0) return
        if (automaticResolution) {
          const padding = 200
          const img = new Image()
          img.src = imageUrl

          img.onload = () => {
            const { naturalWidth, naturalHeight } = img
            const newResolution = calculateEqualCanvasSize(
              naturalWidth,
              naturalHeight,
              padding
            )
            setResolution(newResolution.toString())
          }
        }
      }
    },
    [
      setInitialImageUploaded,
      setImagesCheck,
      imagesCheck,
      setImages,
      images,
      defaultStyle,
      setSelectedImage,
      automaticResolution,
      setResolution,
    ]
  )

  const handleImageChange = useCallback(
    (file: any) => {
      // const file = event.target.files?.[0]

      if (file) {
        const imageUrl = URL.createObjectURL(file)
        setInitialImageUploaded(true)

        setImagesCheck([...imagesCheck, imageUrl])
        setImages([
          ...images,
          { image: imageUrl, id: images.length + 1, style: defaultStyle },
        ])
        setSelectedImage(images.length + 1)

        if (images.length > 0) return
        if (automaticResolution) {
          const padding = 250
          const img = new Image()
          img.src = imageUrl

          img.onload = () => {
            const { naturalWidth, naturalHeight } = img
            const newResolution = calculateEqualCanvasSize(
              naturalWidth,
              naturalHeight,
              padding
            )
            setResolution(newResolution.toString())
          }
        }
      }
    },
    [
      setInitialImageUploaded,
      setImagesCheck,
      imagesCheck,
      setImages,
      images,
      defaultStyle,
      setSelectedImage,
      automaticResolution,
      setResolution,
    ]
  )

  const loadDemoImage = () => {
    setBackground('linear-gradient(var(--gradient-angle), #898aeb, #d8b9e3)')
    document.documentElement.style.setProperty(
      '--gradient-bg',
      ' linear-gradient(var(--gradient-angle), #898aeb, #d8b9e3)'
    )
    setImages([
      ...images,
      {
        image: demoImage.src,
        id: 1,
        style: {
          ...defaultStyle,
          borderSize: '15',
          imageRoundness: 2,
          imageSize: '0.78',
          insetSize: '10',
        },
      },
    ])
    setImagesCheck([...imagesCheck, demoImage.src])
    document.documentElement.style.setProperty('--borderSize1', `15px`)
    document.documentElement.style.setProperty(
      '--borderColor1',
      defaultStyle.borderColor
    )
    document.documentElement.style.setProperty('--borderRoundness1', '2rem')
    setResolution('1920x1080')
  }

  return (
    <Dropzone
      multiple={false}
      onDrop={(acceptedFiles) => {
        handleImageChange(acceptedFiles[0])
      }}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      noClick
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="h-25 absolute-center w-4/5 lg:w-3/5"
        >
          <div className="scale flex flex-col gap-4 rounded-xl border-[3px] border-border text-center shadow-md ">
            <div className="flex flex-col items-center justify-center rounded-lg bg-sidebar p-10">
              <Upload
                style={{
                  transition: 'all 0.8s cubic-bezier(0.6, 0.6, 0, 1)',
                }}
                className={`mx-auto h-10 w-10 text-gray-400 ${
                  isDragging ? 'rotate-180' : 'rotate-0'
                }`}
                aria-hidden="true"
              />
              <div className="mt-4 flex text-base leading-6 text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="focus-within:ring-purple relative cursor-pointer rounded-md font-semibold text-purple focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Load a image</span>
                </label>
                <input {...getInputProps()} />
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  onChange={handleImageLoad}
                  accept="image/*"
                  className="sr-only"
                />
                <p className="hidden pl-1 sm:block">or drag and drop</p>
              </div>

              <p className="text-sm leading-5 text-gray-400/80">
                All image types supported!
              </p>

              <p className="mt-4 text-sm font-semibold leading-5 text-gray-500">
                OR
              </p>

              <Button
                onClick={loadDemoImage}
                className="z-[120] mt-4 rounded-md"
                variant="stylish"
              >
                Try with a demo image
                <ImageIcon className="ml-2" size={19} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Dropzone>
  )
}
