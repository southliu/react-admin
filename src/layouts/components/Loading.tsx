import { Icon } from '@iconify/react'

function LayoutLoading() {
  return (
    <div className={`
      absolute
      left-50%
      top-50%
      -rotate-x-50%
      -rotate-y-50%
    `}>
      <Icon
        className='text-40px animate-spin'
        icon='ri:loader-2-fill'
      />
    </div>
  )
}

export default LayoutLoading