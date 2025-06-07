import {AnimationDuration} from './AnimationDuration'
import {FrameInterval} from './AnimationFrameInterval'
import {FramesList} from './FramesList/FramesList'
import {useContext} from 'react'
import {SvgAnimatorContext} from '@/context/SvgAnimatorContext'

export const Animation = () => {
  const {svgs, generateAnimation} = useContext(SvgAnimatorContext)
  if (svgs.length === 0)
    return (
      <div className='text-center pointer-events-none'>
        List of SVGs is empty. Please upload some SVGs.
      </div>
    )

  return (
    <div className='flex flex-col gap-1'>
      <Animation.Duration />
      <Animation.FrameInterval />
      <Animation.FramesList />

      <svg
        className='w-56 mx-auto'
        viewBox='0 0 512 512'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g dangerouslySetInnerHTML={{__html: generateAnimation()}} />
      </svg>
    </div>
  )
}

Animation.Duration = AnimationDuration
Animation.FrameInterval = FrameInterval
Animation.FramesList = FramesList
