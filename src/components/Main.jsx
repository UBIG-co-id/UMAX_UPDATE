import React from 'react'
import Cards from './Cards'

const Main = () => {
  return (
    <div className='p-6 mb-6 bg-slate-50 min-h-screen'>
        <div><Cards /></div>
        <div className='flex gap-4 flex-wrap'>
            <div className='p-6 w-full my-4 lg:w-[64%] bg-white rounded'>
                <div className='text-zinc-900 font-medium leading-normal mb-8'>
                    color
                </div>

            </div>
        </div>
        </div>
  )
}

export default Main