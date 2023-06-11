import { useState } from 'react';
import { useTitle } from '@/hooks/useTitle';
import WangEditor from '@/components/WangEditor';

function MyEditor() {
  useTitle('富文本');
  // 编辑器内容
  const [html, setHtml] = useState('<p>hello</p>');

  return (
    <div className='m-10px p-5 rounded-5 bg-white'>
      <WangEditor
        value={html}
        onChange={content => setHtml(content)}
      />
    </div>
  );
}

export default MyEditor;