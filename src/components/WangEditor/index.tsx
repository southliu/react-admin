import '@wangeditor/editor/dist/css/style.css';
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { FILE_API } from '@/utils/config';

export interface EditorProps {
  value: string; // 富文本内容
  onChange: (value: string) => void; // 处理更改内容
  height?: number; // 富文本高度
  className?: string;
}

function WangEditor(props: EditorProps) {
  const { value, height, className, onChange } = props;
  const { t } = useTranslation();

  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  // 编辑器内容
  const [html, setHtml] = useState(value);

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: t('public.inputPleaseEnter'),
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
  };

  // 监听值变化
  useEffect(() => {
    setHtml(value || '');
  }, [value]);

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor === null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  /**
   * 更改富文本内容
   */
  const handleChange = (editor: IDomEditor) => {
    setHtml(editor.getHtml());
    onChange(editor.getHtml());
  };

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
        onChange={handleChange}
        mode="default"
        style={{ height: height || 300, overflowY: 'hidden' }}
      />
    </div>
  );
}

export default WangEditor;