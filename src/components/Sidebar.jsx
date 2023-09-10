import React, { useContext, useState, useRef } from 'react';
import { Context } from '../context';
import { google, facebook, tiktok } from '../assets';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [activeTab, setActiveTab] = useState('draft');
  const [searchText, setSearchText] = useState('');
  let { state, dispatch } = useContext(Context);
  const customCircleColors = ['#8F8F8F', '#00FF00', '#00FF00', '#FF8A00', '#FF8A00'];
  const sidebarRef = useRef(null);

  const handleItemClick = (item) => {
    setActiveItem(item === activeItem ? null : item);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveItem(null);
  };
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const tabStyle = {
    all: {
      backgroundColor: activeTab === 'all' ? '#CDCDCD' : '#EBECF0',
      color: activeTab === 'all' ? '#494949' : '#6b7280',
      circleColor: activeTab === 'all' ? '#000' : '#00FF00',
    },
    draft: {
      backgroundColor: activeTab === 'draft' ? '#CDCDCD' : '#EBECF0',
      color: activeTab === 'draft' ? '#494949' : '#6b7280',
      circleColor: activeTab === 'draft' ? '#8F8F8F' : '#8F8F8F',
    },
    active: {
      backgroundColor: activeTab === 'active' ? '#CDCDCD' : '#EBECF0',
      color: activeTab === 'active' ? '#494949' : '#6b7280',
      circleColor: activeTab === 'active' ? '#00FF00' : '#00FF00',
    },
    completed: {
      backgroundColor: activeTab === 'completed' ? '#CDCDCD' : '#EBECF0',
      color: activeTab === 'completed' ? '#494949' : '#6b7280',
      circleColor: activeTab === 'completed' ? '#FF8A00' : '#FF8A00',
    },
  };

  const filteredItems = (items) => {
    if (searchText === '') {
      return items;
    }

    return items.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const renderItems = (items) => {
    const filtered = filteredItems(items);

    if (filtered.length === 0) {
      return <li className="mb-6 text-center ">Tidak ada hasil</li>;
    }

    return filtered.map((item, index) => {
      let circleColor;

      if (activeTab === 'all') {
        circleColor = customCircleColors[index % customCircleColors.length];
      } else {
        circleColor = tabStyle[activeTab].circleColor;
      }
      return (
        <li
          key={index}
          className={`mb-8 -ml-2 ${activeItem === item.title ? 'bg-blue-200 ' : ''}`}
          onClick={() => handleItemClick(item.title)}>
          {index > 0 && <hr className="border-gray-500 mb-6 -mt-8 " />}
          <div className={`${activeTab === item.title.toLowerCase() ? 'bg-blue-200' : ''}`} />
          <a
            href="#"
            className={`relative -top-3 pl-3 flex items-center ${activeTab === item.title.toLowerCase() ? 'text-blue-500' : 'text-gray-700'
              } font-medium ${
                state.darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
              }`}

          >
            <img src={item.icon} alt="icon" className='w-6 mr-2' />
            <span
              className={`${activeTab === item.title.toLowerCase() ? 'text-blue-500' : ''
                }`}
            />
            {item.title}
            <span
              className="ml-auto mr-3 w-3 h-3 rounded-full"
              style={{ backgroundColor: circleColor }}
            ></span>
          </a>
          <div className="aside__container-list_information">
            <div className="flex justify-between">
              <div className="flex">
                <div className='ml-4'>
                  <p>Amount Spent</p>
                  <p>{item.amountSpent}</p>
                </div>
                <div className="ml-7"> {/* Add left margin for distance */}
                  <p>Reach</p>
                  <p>{item.reach}</p>
                </div>
              </div>
              <div className="ml-4"> {/* Add left margin for distance */}
                <p>Start Date</p>
                <p>{item.startDate}</p>
              </div>
            </div>
          </div>

        </li>

      );
    });
  };

  return (
    <div className={`w-96 ${state.toggleNavbar ? 'block' : 'hidden'}`}>
      <div
        onClick={() => {
          dispatch({ type: 'SET_TOGGLE_NAVBAR', payload: false });
        }}
        className=" md:hidden z-40 left-0 top-0 right-0 bottom-0 bg-slate-700 backround:blur-md opacity-60"
      ></div>
      <div className="my-4 bg-gray-200 mx-1 p-1 rounded-lg flex justify-center mb-4">
        <div className="flex-col overflow-hidden md:oveflow-auto justify-start gap-4 flex bg-white px-4 py-6 min-h-full w-96"
        
        >
          <div className="flex justify-center mb-4 ">
            <button
              style={tabStyle.all}
              className="px-2 py-1 rounded-s"
              onClick={() => handleTabChange('all')}
            >
              All
            </button>
            <button
              style={tabStyle.draft}
              className="px-2 py-1 "
              onClick={() => handleTabChange('draft')}
            >
              Draft
            </button>
            <button
              style={tabStyle.active}
              className="px-2 py-1 "
              onClick={() => handleTabChange('active')}
            >
              Active
            </button>
            <button
              style={tabStyle.completed}
              className="px-2 py-1 rounded-e"
              onClick={() => handleTabChange('completed')}
            >
              Completed
            </button>
          </div>
          <div className="relative">
  <input
    type="text"
    placeholder="Search..."
    className="w-full px-2 py-1 bg-white border border-gray-300 shadow-md rounded pl-10"
    value={searchText}
    onChange={handleSearchChange}
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 absolute left-3 top-2.5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-4.78-4.78M9 17a8 8 0 100-16 8 8 0 000 16z"
    />
  </svg>
</div>

          <div ref={sidebarRef}
            style={{ overflowY: 'scroll', maxHeight: 'calc(130vh - 85px)' }}>
            <div className="relative lebar-list -left-2 border-slate-500 pt-2 max-h-[calc(130vh-85px)]"
            >
              <ul className="  mt-5">
                {activeTab === 'all' && (
                  <>
                    <hr className="border-gray-500" />
                    {renderItems([
                      {
                        title: 'Program Bimbingan Karir...',
                        icon: tiktok,
                        amountSpent: 'Rp. 3.000.000',
                        reach: '220.000',
                        startDate: 'Sep 4, 14:09',
                      },
                      {
                        title: 'Santri Berwirausaha',
                        icon: google,
                        amountSpent: 'Rp. 2.000.000',
                        reach: '97.000',
                        startDate: 'Mart 1, 12:36',
                      },
                      {
                        title: 'Program Tahfidz',
                        icon: facebook,
                        amountSpent: 'Rp. 4.000.000',
                        reach: '120.000',
                        startDate: 'Feb 4, 12:36',
                      },
                      {
                        title: 'Campaign Tahfidz',
                        icon: google,
                        amountSpent: 'Rp. 3.000.000',
                        reach: '250.000',
                        startDate: 'Apr 12, 14:00',
                      },
                      {
                        title: 'Tahfidz Ramadhan',
                        icon: facebook,
                        amountSpent: 'Rp. 1.000.000',
                        reach: '10.000',
                        startDate: 'Agust 25, 11:19',
                      },
                      {
                        title: 'Bilingual - 15/10',
                        icon: google,
                        amountSpent: 'Rp. 2.000.000',
                        reach: '100.000',
                        startDate: 'May 21, 14:00',
                      },
                      {
                        title: 'Peduli Pangan',
                        icon: google,
                        amountSpent: 'Rp. 1.000.000',
                        reach: '97.000',
                        startDate: 'Apr 12, 12:36',
                      },
                      {
                        title: 'Retarget CA Web Visitor',
                        icon: tiktok,
                        amountSpent: 'Rp. 5.000.000',
                        reach: '100.000',
                        startDate: 'Mei 24, 09:36',
                      },
                      {
                        title: 'Campaign Tahfidz FB IG EN...',
                        icon: google,
                        amountSpent: 'Rp. 4.000.000',
                        reach: '200.000',
                        startDate: 'jan 24, 17:55',
                      },
                    ])}
                  </>
                )}

                {activeTab === 'draft' && (
                  <>
                    <hr className="border-gray-500 mb-5" />
                    {renderItems([
                      {
                        title: 'Retarget VV 50-95% Tahfidz',
                        icon: google,
                        amountSpent: 'Rp. 2.000.000',
                        reach: '100.000',
                        startDate: 'May 21, 14:00',
                      },
                      {
                        title: 'Campaign Tahfidz FB IG EN...',
                        icon: google,
                        amountSpent: 'Rp. 4.000.000',
                        reach: '200.000',
                        startDate: 'jan 24, 17:55',
                      },
                      {
                        title: 'Retarget CA Web Visitor',
                        icon: google,
                        amountSpent: 'Rp. 4.000.000',
                        reach: '97.000',
                        startDate: 'Desc 22, 13:06',
                      },
                      {
                        title: 'Campaign Tahfidz',
                        icon: facebook,
                        amountSpent: 'Rp. 3.000.000',
                        reach: '250.000',
                        startDate: 'Apr 12, 14:00',
                      },
                      {
                        title: 'Program Tahfidz',
                        icon: tiktok,
                        amountSpent: 'Rp. 4.000.000',
                        reach: '120.000',
                        startDate: 'Feb 4, 02:12',
                      },
                      {
                        title: 'Kampung Pesantren Berkah',
                        icon: google,
                        amountSpent: 'Rp. 7.000.000',
                        reach: '120.000',
                        startDate: 'Feb 4, 07:26',
                      },
                      {
                        title: 'Tahfidz Ramadhan',
                        icon: facebook,
                        amountSpent: 'Rp. 1.000.000',
                        reach: '10.000',
                        startDate: 'Agust 25, 11:19',
                      },
                      {
                        title: 'Program Bimbingan Karir...',
                        icon: tiktok,
                        amountSpent: 'Rp. 3.000.000',
                        reach: '220.000',
                        startDate: 'Sep 4, 14:09',
                      },
                      {
                        title: 'Santri Berwirausaha',
                        icon: google,
                        amountSpent: 'Rp. 2.000.000',
                        reach: '97.000',
                        startDate: 'Mart 1, 12:36',
                      },
                    ])}
                  </>
                )}

                {activeTab === 'active' && (
                  <>
                    <hr className="border-gray-500 mb-5" />
                    {renderItems([
                      {
                        title: 'Bilingual - 15/10',
                        icon: google,
                        amountSpent: 'Rp. 2.000.000',
                        reach: '100.000',
                        startDate: 'May 21, 14:00',
                      },
                      {
                        title: 'Campaign Tahfidz FB IG EN...',
                        icon: google,
                        amountSpent: 'Rp. 4.000.000',
                        reach: '200.000',
                        startDate: 'jan 24, 17:55',
                      },
                      {
                        title: 'Retarget CA Web Visitor',
                        icon: google,
                        amountSpent: 'Rp. 4.000.000',
                        reach: '97.000',
                        startDate: 'Apr 12, 12:36',
                      },
                      {
                        title: 'Campaign Tahfidz',
                        icon: facebook,
                        amountSpent: 'Rp. 3.000.000',
                        reach: '250.000',
                        startDate: 'Apr 12, 14:50',
                      },
                      {
                        title: 'Program Tahfidz',
                        icon: tiktok,
                        amountSpent: 'Rp. 4.000.000',
                        reach: '120.000',
                        startDate: 'Feb 4, 12:36',
                      },
                    ])}
                  </>
                )}
                {activeTab === 'completed' && (
                  <>
                    <hr className="border-gray-500 mb-5" />
                    {renderItems([
                      {
                        title: 'Retarget VV 50-95% Tahfidz',
                        icon: facebook,
                        amountSpent: 'Rp. 2.000.000',
                        reach: '100.000',
                        startDate: 'May 21, 14:00',
                      },
                      {
                        title: 'Campaign Tahfidz FB IG EN...',
                        icon: google,
                        amountSpent: 'Rp. 4.000.000',
                        reach: '200.000',
                        startDate: 'jan 24, 17:55',
                      },
                      {
                        title: 'Retarget CA Web Visitor',
                        icon: tiktok,
                        amountSpent: 'Rp. 5.000.000',
                        reach: '100.000',
                        startDate: 'Mei 24, 09:36',
                      },
                      {
                        title: 'Peduli Pangan',
                        icon: google,
                        amountSpent: 'Rp. 1.000.000',
                        reach: '97.000',
                        startDate: 'Apr 12, 12:36',
                      },
                    ])}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
