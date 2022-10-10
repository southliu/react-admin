import '@wangeditor/editor/dist/css/style.css'
import { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { FILE_API } from '@/utils/config'

interface IProps {
  content: string; // 富文本内容
  handleChange: (content: string) => void; // 处理更改内容
  height?: number; // 富文本高度
  className?: string;
}

function WangEditor(props: IProps) {
  const { content, height, className, handleChange } = props

  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)

  // 编辑器内容
  const [html, setHtml] = useState(content)

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        // 上传图片地址
        server: FILE_API
      },
      uploadVideo: {
        // 上传视频地址
        server: FILE_API
      }
    }
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor === null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  /**
   * 更改富文本内容
   */
  const onChange = (editor: IDomEditor) => {
    setHtml(editor.getHtml())
    handleChange(editor.getHtml())
  }

  return (
    <div
      className={className}
      style={{ border: '1px solid #ccc', zIndex: 100}}
    >
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: '1px solid #ccc' }}
      />
      <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        onChange={onChange}
        mode="default"
        style={{ height: height || 300, overflowY: 'hidden' }}
      />
    </div>
  )
}

export default WangEditor