import Image from '@/assets/images/welcome.png'

function Page() {
  return (
    <div className='flex justify-center'>
      <img
        src={Image}
        alt="Image"
        className='w-980px h-full container'
      />
    </div>
  )
}

export default Page