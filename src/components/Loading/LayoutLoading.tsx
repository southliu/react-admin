import Layout from '@/layouts'

function LayoutLoading() {
  return (
    <Layout>
      <div className={`
        ma-line-scale
        absolute
        left-50%
        top-50%
        -rotate-x-50%
        -rotate-y-50%
      `}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Layout>
  )
}

export default LayoutLoading