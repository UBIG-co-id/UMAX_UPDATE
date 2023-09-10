import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Context } from '../context';
import { useParams } from 'react-router-dom'
import Main from '../components/Main';
import Performance from '../sections/Performance';
import Metrics from '../sections/Matrics';
import { google } from '../assets';
import History from '../sections/History';
import Setting from '../sections/Setting';

const Dashboard = () => {
  const { category } = useParams()

  const [activeTab, setActiveTab] = useState('performance');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const renderContent = () => {
    switch (activeTab) {
      case 'performance':
        return <Performance />;
      case 'metrics':
        return <Metrics />;
      case 'history':
        return <History />;
      case 'setting':
        return <Setting />;
      default:
        return null;
    }
  };

  // let {state,dispatch} = useContext(Context)
  // let [size,setSize] = useState(1000)
  // window.addEventListener('resize', (e) => {
  //   setSize(e.currentTarget.inneWidth)
  // })
  // useEffect(() =>{
  //   size < 768 ? dispatch({type: 'SET_TOGGLE_NAVBAR', payload:false}) : dispatch({type: 'SET_TOGGLE_NAVBAR', payload:true})
  // })
  return (
    <div className='bg-slate-100 min-h-screen '>
      <div><Navbar  /></div>
      {/* <div className='flex gap-5  px-5'> */}
      <div className='main max-w-[2300px] mt-[76px] flex flex-1 justify-between'>
        <Sidebar />
        <div className={`main overflow-auto w-full h-full z-10`}>
          <div className='flex gap-4 flex-wrap'>
            <div className='p-6 w-full my-4 lg-w-[64%] bg-white rounded-xl'>
              <div className='border-b-2  border-gray-600'>
                <div className='flex p-4 ml-3 pb-1 items-center'>
                  <img src={google} alt="google" width={50} /> <h1 className='text-2xl pl-3 font-bold text-gray-700'>Campaign Tahfidz</h1>
                </div>
                <div className='flex justify-center'>
                  <ul className='flex -mb-1'>
                    <li
                      className={`p-3 px-5  ${activeTab === 'performance' ? ' atas text-sky-500 cursor-pointer font-semibold  border-b-4 border-sky-500 transition-colors ' : 'text-gray-500'
                        }`}
                      onClick={() => handleTabClick('performance')}
                    >
                      Performance
                    </li>
                    <li
                      className={`p-3 px-5  ${activeTab === 'metrics' ? 'text-sky-500 atas cursor-pointer font-semibold border-b-4 border-sky-500 transition-colors' : 'text-gray-500'
                        }`}
                      onClick={() => handleTabClick('metrics')}
                    >
                      Metrics
                    </li>
                    <li
                      className={`p-3 px-5  ${activeTab === 'history' ? 'text-sky-500 atas cursor-pointer font-semibold border-b-4 border-sky-500 transition-colors' : 'text-gray-500'
                        }`}
                      onClick={() => handleTabClick('history')}
                    >
                      History
                    </li>
                    <li
                      className={`p-3 px-5  ${activeTab === 'setting' ? 'text-sky-500 atas cursor-pointer font-semibold border-b-4 border-sky-500 transition-colors' : 'text-gray-500'
                        }`}
                      onClick={() => handleTabClick('setting')}
                    >
                      Setting
                    </li>
                  </ul>
                </div>
              </div>
              {renderContent()}

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
