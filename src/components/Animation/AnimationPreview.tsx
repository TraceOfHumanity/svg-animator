import {SvgAnimatorContext} from '@/context/SvgAnimatorContext'
import {useContext} from 'react'

export const AnimationPreview = () => {
  const {generateAnimation} = useContext(SvgAnimatorContext)
  
  return (
    <svg
      className='w-56 mx-auto'
      viewBox='0 0 512 512'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g dangerouslySetInnerHTML={{__html: generateAnimation()}} />
    </svg>
  )
}
