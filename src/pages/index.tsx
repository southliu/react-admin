import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToken } from '@/hooks/useToken'
import Image from '@/assets/images/welcome.png'

function Page() {
  const [getToken] = useToken()
  const token = getToken()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) navigate('/login')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])
  
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