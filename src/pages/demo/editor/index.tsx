import { useState } from 'react';
import { useTitle } from '@/hooks/useTitle';
import { useTranslation } from 'react-i18next';
import WangEditor from '@/components/WangEditor';

function MyEditor() {
  const { t } = useTranslation();
  useTitle(t, t('content.richText'));
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