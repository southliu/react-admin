import '@wangeditor/editor/dist/css/style.css'
import { useState } from 'react'
import WangEditor from '@/components/WangEditor'

function MyEditor() {
  // 编辑器内容
  const [html, setHtml] = useState('<p>hello</p>')

  return (
    <div className='m-30px'>
      <WangEditor
        content={html}
        handleChange={content => setHtml(content)}
      />
    </div>
  )
}

export default MyEditor