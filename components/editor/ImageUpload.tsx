/* eslint-disable @next/next/no-img-element */
'use client'

import { Upload } from 'lucide-react'
import React, { ChangeEvent } from 'react'
import { useImageOptions } from '@/hooks/use-image-options'

const ImageUpload = () => {
  const { isImageUploaded, setIsImageUploaded, image, setImage, imageSize } =
    useImageOptions()

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
      {!image && !isImageUploaded && (
        <>
          <div className="h-25 absolute-center w-4/5 lg:w-3/5">
            <div className="scale flex flex-col gap-4 rounded-xl border-[3px] border-dashed border-border text-center shadow-md ">
              <div className="flex flex-col items-center justify-center rounded-lg bg-sidebar p-10">
                <Upload
                  className="mx-auto h-10 w-10 text-gray-400"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-base leading-6 text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="focus-within:ring-purple relative cursor-pointer rounded-md font-semibold text-purple focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                  </label>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="sr-only"
                  />
                  <p className="hidden pl-1 sm:block">or drag and drop</p>
                </div>

                <p className="text-sm leading-5 text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {image && isImageUploaded && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform ">
          <img
            className={`h-full w-full rounded-2xl shadow-xl`}
            src={image}
            alt="Uploaded image"
            style={{
              scale: `${imageSize}`,
            }}
          />
        </div>
      )}
    </>
  )
}

export default ImageUpload

/*
With separator & input

const [selectedLink, setSelectedLink] = useState('')

<div className="relative mb-6 mt-5">
    <div className="relative flex justify-center text-[0.75rem]">
        <span className="bg-sidebar px-6 text-gray-500 dark:text-dark/80">
           OR
        </span>
    </div>
</div>

<div className="mx-auto flex gap-3">
  <Button
    type="submit"
    size="lg"
    onClick={async (e) => {
      e.preventDef
      setSelectedLink(
        'https://cataas.com/cat?width=500&height=500'
      )
      setIsImageUploaded(true)
    }}
    variant="stylish"
    className="rounded-lg px-8 text-sm"
  >
    Insert a random cat image 🐱
  </Button>
</div>

{selectedLink && isImageUploaded && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform ">
          <img
            className="h-full w-full scale-125 rounded-2xl shadow-xl"
            src={selectedLink}
            alt="Uploaded image"
          />
        </div>
      )}
*/
