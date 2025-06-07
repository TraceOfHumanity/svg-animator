import {AnimationDuration} from './AnimationDuration'
import {FrameInterval} from './AnimationFrameInterval'
import {FramesList} from './FramesList/FramesList'
import {useContext} from 'react'
import {SvgAnimatorContext} from '@/context/SvgAnimatorContext'
import {AnimationPreview} from './AnimationPreview'

export const Animation = () => {
  const {svgs} = useContext(SvgAnimatorContext)
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
      <Animation.Preview />
    </div>
  )
}

Animation.Duration = AnimationDuration
Animation.FrameInterval = FrameInterval
Animation.FramesList = FramesList
Animation.Preview = AnimationPreview
