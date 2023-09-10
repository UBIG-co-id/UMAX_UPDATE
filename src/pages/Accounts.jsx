import React from 'react'
import Navbar from '../components/Navbar'
import AccountsTable from '../components/AccountsTable'

const Accounts = () => {
    return (
        <div className='bg-slate-100 min-h-screen '>
            <div><Navbar /></div>
            <div className='main max-w-[2300px] mt-[76px] flex flex-1 justify-between'>
                <div className={`main overflow-auto w-full h-full z-10`}>
                    <div className='flex gap-4 flex-wrap'>
                        <div className='p-6 w-full my-4 lg-w-[64%] bg-white rounded-xl'>
                            <span className="p-10 relative top-4 text-gray-600 font-medium text-2xl">
                                Accounts
                            </span>
                            <div className='flex p-4 ml-3 pb-1 items-center'></div>
                            <AccountsTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accounts