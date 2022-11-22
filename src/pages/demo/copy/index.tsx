import { useTitle } from '@/hooks/useTitle'
import CopyInput from '@/components/Copy/CopyInput'
import CopyBtn from '@/components/Copy/CopyBtn'

function CopyPage() {
  useTitle('剪切板')
  return (
    <div className="max-w-350px m-30px">
      <h1>剪切板：</h1>
      <CopyInput className="w-350px" />

      <div className="flex items-center mt-50px">
        <span className="text-lg">将“admin”传入复制按钮中：</span>
        <CopyBtn text="复制" value="admin" />
      </div>
    </div>
  )
}

export default CopyPage