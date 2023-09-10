import React from 'react'
import { BiRefresh } from 'react-icons/bi';
import Chart from '../dates/Chart';
import { Carddata, Carddata2 } from '../dates/Carddata';
import Card from '../dates/Card';
import CardInfo from '../components/CardInfo';
import { FiAlertTriangle } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Performance = () => {
  const renderCardInfo = () => {
    return Carddata.map((item, index) => {
      return <CardInfo key={index} title={item.title} value={item.value} color={item.color} className='relative flex top-5 flex-col justify-between h-24' />
    })
  }

  const renderCardInfo2 = () => {
    return Carddata2.map((item, index) => {
      return <CardInfo key={index} title={item.title} value={item.value} color={item.color} className='w-full  flex flex-col justify-between h-24' />
    })
  }
  return (
    <div>
      {/* bagian filter */}
      <div className='flex justify-end'>
        <div className='flex gap-5 items-center'>
          <div className='flex gap-2 text-gray-500'>
            <BiRefresh size={25} />
            Feb 4, 20:12
          </div>
          <select name="" id="" className='focus:outline-none p-2 px-5 border border-gray-300 text-gray-500 rounded-md'>
            <option value="">Last Week</option>
          </select>
        </div>
      </div>
      {/* end */}

      {/* bagian content */}
      <div>
        <div className='flex flex-col md:flex-row mt-5 md:gap-5'>
          {/* Card Info */}
          <div className='w-full md:w-2/6 flex flex-col h-full gap-5'>
            {renderCardInfo()}
          </div>
          {/* Chart */}
          <div className='w-full md:w-full flex flex-col gap-5 justify-between'>
            <Chart />
            <div className='flex flex-col md:flex-row w-full gap-5 -mt-4'>
              {renderCardInfo2()}
            </div>
          </div>
        </div>
      </div>

      {/* end */}


      {/* bagian sugesti */}
      <div>
        <div className='relative top-5 border-t-2 border-gray-600 p-5 px-10 pb-5'>
          <h1 className='text-xl font-bold text-gray-700'>Suggestion</h1>
          <div className='flex mt-5 gap-5'>
            <Card color='yellow'>
              <div className='max-w-sm'>
                <div className='flex gap-3'>
                  <div>
                    <FiAlertTriangle size={25} className='text-yellow-500' />
                  </div>
                  <div>
                    <div className='font-medium mb-2'>Nilai CTR rendah</div>
                    <p>Pastikan iklan atau tautan Anda memiliki judul atau gambar yang menarik</p>
                  </div>
                </div>
                <a href="https://chat.openai.com/share/3bb35f6a-4b3b-4182-b6f9-c880722b3c72" target="_blank" rel="noopener noreferrer">
                  <div className='mt-2 hover:underline  text-end text-sm'>
                    learn more
                  </div>
                </a>
              </div>
            </Card>
            <Card color='red'>
              <div className='max-w-sm'>
                <div className='flex gap-3'>
                  <div>
                    <AiOutlineCloseCircle size={25} className='text-red-500' />
                  </div>
                  <div>
                    <div className='font-medium mb-2'>Nilai OCL rendah</div>
                    <p>Pastikan bahwa landing page Anda memiliki konten yang relavan, menarik, dan informatif</p>
                  </div>
                </div>
                <a href="https://chat.openai.com/share/cb290ced-08a9-4153-93dc-470a1e0fd126" target="_blank" rel="noopener noreferrer">
                  <div className='mt-2 hover:underline  text-end text-sm'>
                    learn more
                  </div>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* end */}
    </div>
  )
}

export default Performance