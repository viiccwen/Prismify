'use client'

import useTiptapEditor from '@/hooks/use-editor'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import { convertHex } from '@/utils/helperFns'
import { BubbleMenu, Editor, EditorContent } from '@tiptap/react'
import { useRef } from 'react'
import ContextMenuText from './ContextMenuText'

type MenuBarProps = {
  editor: Editor | null
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null
  }

  return (
    <>
      <BubbleMenu
        className="bubble-menu"
        tippyOptions={{ duration: 100 }}
        editor={editor}
      >
        <button
          onClick={() => {
            const { selection } = editor.state

            if (selection.empty) {
              // When there's no text selection, apply formatting to the entire paragraph
              editor.chain().focus().selectAll().toggleBold().run()
            } else {
              // When text is selected, toggle formatting for the selected text
              editor.chain().focus().toggleBold().run()
            }
          }}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          bold
        </button>
        <button
          onClick={() => {
            const { selection } = editor.state

            if (selection.empty) {
              // When there's no text selection, apply formatting to the entire paragraph
              editor.chain().focus().selectAll().toggleItalic().run()
            } else {
              // When text is selected, toggle formatting for the selected text
              editor.chain().focus().toggleItalic().run()
            }
          }}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          italic
        </button>

        <input
          type="color"
          onInput={(event: any) => {
            editor.chain().focus().setColor(event.target.value).run()
          }}
          value={editor.getAttributes('textStyle').color}
          data-testid="setColor"
        />
      </BubbleMenu>
    </>
  )
}

function TipTapEditor({ content = 'Double click to edit' }) {
  const { setShowTextControls, isEditable, setIsEditable } = useMoveable()
  const { defaultStyle } = useImageOptions()
  const { setSelectedText } = useSelectedLayers()

  const { editor } = useTiptapEditor()

  return (
    <>
      <div
        onDoubleClick={() => {
          editor?.chain().selectAll().focus()
          setIsEditable(true)
          setShowTextControls(false)
        }}
      >
        <MenuBar editor={editor} />
        <div
          className={`${
            isEditable
              ? 'pointer-events-auto cursor-text'
              : 'pointer-events-none'
          }`}
        >
          <EditorContent style={defaultStyle} editor={editor} />
        </div>
      </div>
    </>
  )
}

export default function TipTap() {
  const textRef = useRef<HTMLDivElement>(null)

  const { setShowTextControls, setIsEditable, setShowControls } = useMoveable()
  const { texts } = useImageOptions()
  const { selectedText, setSelectedText, setSelectedImage } =
    useSelectedLayers()

  useOnClickOutside(textRef, () => {
    setIsEditable(false)
    useMoveable.setState({ showTextControls: false })
  })

  return (
    <>
      {texts.map((text, index) => {
        return (
          <ContextMenuText key={text.id + index}>
            <div
              key={`text-${text.id}`}
              id={`text-${text.id}`}
              ref={text.id === selectedText ? textRef : null}
              className={`text apply-font absolute z-[120] flex cursor-pointer items-center justify-center ${
                text.content === '' ? 'pointer-events-none hidden' : 'image'
              }`}
              style={{
                fontSize: `${text.style.textSize}rem`,
                fontFamily: `${text.style.fontFamily}`,
                color: `${text.style.textColor}`,
                fontWeight: `${text.style.fontWeight}`,
                textAlign: `${text.style.textAlign}`,
                letterSpacing: `${text.style.letterSpacing}em`,
                filter: `drop-shadow(${text.style.textShadow} ${convertHex(
                  text.style.shadowColor,
                  text.style.shadowOpacity
                )})`,
              }}
              onContextMenu={() => {
                setShowTextControls(true)
                setSelectedText(text.id)
                setSelectedImage(null)
                setShowControls(false)
              }}
              onClick={() => {
                setShowTextControls(true)
                setSelectedText(text.id)
                setSelectedImage(null)
                setShowControls(false)
              }}
            >
              <TipTapEditor />
            </div>
          </ContextMenuText>
        )
      })}
    </>
  )
}
