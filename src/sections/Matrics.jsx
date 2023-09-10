import React from 'react'
import { BiRefresh } from 'react-icons/bi';
import Metrics from '../components/Metrics';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import {
    chartData1,
    chartData2,
    chartData3,
    chartData4,
    chartData5,
    chartData6,
    chartData7,
    chartData8,
    chartData9,
    chartData10,
    chartData11,
    chartData12,
} from '../dates/Chartdata';

const Matrics = () => {
    return (
        <div>
            {/* bagian filter */}
            <div className='flex justify-end'>
                <div className='flex gap-5 items-center'>
                    <div className='flex gap-2 text-gray-500'>
                        <BiRefresh size={25} />
                        Feb 4, 20:12
                    </div>
                </div>
            </div>
            {/* end */}

            {/* bagian content */}
            <div className='flex flex-wrap justify-center gap-4 px-2 md:gap-8'>
                <Metrics
                    title="Amount Spent"
                    value="Rp. 4.000.000"
                    chartData={chartData1}
                    icon={<AiOutlineInfoCircle size={20} />}
                    persen="+2,0%"
                    description="Total Amount spent compared to the last 7 days"
                    persenTextColor="#656F84"
                    spanBackgroundColor="#1CD14F"
                    customClassName='w-full'
                />
                <Metrics
                    title="Reach"
                    value="97.000"
                    chartData={chartData2}
                    icon={<AiOutlineInfoCircle size={20} />}
                    persen="-2,0%"
                    description="Total Reach compared to the last 7 days"
                    persenTextColor="#D40B0B"
                    spanBackgroundColor="#FF6D6D"
                    customClassName='w-full'
                />
                <Metrics
                    title="Impression"
                    value="230.000"
                    chartData={chartData3}
                    icon={<AiOutlineInfoCircle size={20} />}
                    persen="+2,0%"
                    description="Total Impression compared to the last 7 days"
                    persenTextColor="#656F84"
                    spanBackgroundColor="#1CD14F"
                    customClassName='w-full'
                />
                <Metrics
                    title="Frequency"
                    value="2,3"
                    chartData={chartData4}
                    icon={<AiOutlineInfoCircle size={20} />}
                    persen="+2,0%"
                    description="Total Frequency compared to last 7 day"
                    persenTextColor="#656F84"
                    spanBackgroundColor="#1CD14F"
                    customClassName='w-full' />

                <Metrics
                    title="Reach Amount Ratio"
                    value="6,1%"
                    chartData={chartData5}
                    icon={<AiOutlineInfoCircle size={20} />}
                    persen="-2,0%"
                    description="Total Reach Amount Ratio compared to last 7 day"
                    persenTextColor="#656F84"
                    spanBackgroundColor="#1CD14F"
                    customClassName='w-full' />
                <Metrics
                    title="Cost per Click"
                    value="Rp. 2.000"
                    chartData={chartData6}
                    icon={<AiOutlineInfoCircle size={20} />}
                    persen="+2,0%"
                    description="Total Cost per Click compared to last 7 day"
                    persenTextColor="#656F84"
                    spanBackgroundColor="#1CD14F"
                    customClassName='w-full' />
                <Metrics
                    title="Click Through Rate"
                    value="1,0%"
                    chartData={chartData7}
                    icon={<AiOutlineInfoCircle size={20} />}
                    persen="+2,0%"
                    description="Total Click Through Rate compared to last 7 day"
                    persenTextColor="#656F84"
                    spanBackgroundColor="#1CD14F"
                    customClassName='w-full' />
                <Metrics
                    titleBig="Outbont Click Landing Page"
                    value="30%"
                    chartData={chartData8}
                    icon={<AiOutlineInfoCircle size={20} />}
                    persen="-2,0%"
                    description="Total OCLP compared to last 7 day"
                    persenTextColor="#D40B0B"
                    spanBackgroundColor="#FF6D6D"
                    customClassName='w-full' />
                <Metrics
                    title="Cost per Result"
                    value="Rp. 5.000"
                    chartData={chartData9}
                    icon={<AiOutlineInfoCircle size={20} />}
                    persen="+2,0%"
                    description="Total Cost per Result compared to last 7 day"
                    persenTextColor="#656F84"
                    spanBackgroundColor="#1CD14F"
                    customClassName='w-full' />
                <Metrics
                    title="Add to Cart"
                    value="2,5%"
                    chartData={chartData10}
                    icon={<AiOutlineInfoCircle size={20} />}
                    persen="+2,0%"
                    description="Total Add to Cart compared to last 7 day"
                    persenTextColor="#656F84"
                    spanBackgroundColor="#1CD14F"
                    customClassName='w-full' />
                <Metrics
                    title="Return on AD Spent"
                    value="3,1x"
                    chartData={chartData11}
                    icon={<AiOutlineInfoCircle size={20} />}
                    persen="-2,0%"
                    description="Total ROAS compared to last 7 day"
                    persenTextColor="#D40B0B"
                    spanBackgroundColor="#FF6D6D"
                    customClassName='w-full' />
                <Metrics
                    title="Real ROAS"
                    value="3,0x"
                    chartData={chartData12}
                    icon={<AiOutlineInfoCircle size={20} />}
                    persen="+2,0%"
                    description="Total Real ROAS compared to last 7 day"
                    persenTextColor="#656F84"
                    spanBackgroundColor="#1CD14F"
                    customClassName='w-full' />
            </div>

        </div>
    )
}

export default Matrics