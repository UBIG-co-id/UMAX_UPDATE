import React, { useEffect,Fragment, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FiSun, FiMoon } from "react-icons/fi";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BiSolidMegaphone, BiGroup, BiBell, BiLogOut } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { logo, profile } from "../assets"
import { Context } from '../context';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    let { state, dispatch } = useContext(Context)
    let toggle = () => {
        dispatch({ type: 'SET_TOGGLE_NAVBAR', payload: !state.toggleNavbar })
    }
    const location = useLocation();
    const [activePage, setActivePage] = useState(location.pathname);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
        // Save dark mode preference to local storage
        localStorage.setItem('darkMode', !darkMode);
    };


    useEffect(() => {
        setActivePage(location.pathname);

        // Retrieve dark mode preference from local storage
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
            setDarkMode(savedDarkMode === 'true');
        }
    }, [location]);


    const navigation = [
        { name: 'Dashboard', href: '/Dashboard' },
        { name: 'Campaigns', href: '/Campaigns' },
        { name: 'Accounts', href: '/Accounts' },
        { name: 'Clients', href: '/Clients' },
    ];
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationCount = 2; //jumlah badge notif

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <div className={`z-50 fixed left-0 right-0 top-0 h-[76px] px-6 py-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <div className="flex justify-between items-center">
                <div className="flex gap-6 items-center">
                    <div className="border-r pr-6 border-[#e4e4e4] ">
                        <img
                            className="h-8 w-auto "
                            src={logo}
                            alt="logo"
                            onClick={toggle}
                        />
                    </div>
                    <div className="text-xl font-semibold leading-8 text-[#19191c] hidden md:block">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={classNames(
                                    activePage === item.href
                                    ? 'bg-cyan-100 ' + (darkMode ? 'text-black' : 'text-blue-600')
                                    : 'text-gray-500 ',
                                  'rounded-md px-3 py-2 text-sm font-medium'
                                )}
                                onClick={() => setActivePage(item.href)}
                            >
                                <span className="relative top-1 mr-4 inline-block">
                                    {item.name === 'Dashboard' && <MdDashboard className="h-5 w-5" />}
                                    {item.name === 'Campaigns' && <BiSolidMegaphone className="h-5 w-5" />}
                                    {item.name === 'Accounts' && <AiOutlineUser className="h-5 w-5" />}
                                    {item.name === 'Clients' && <BiGroup className="h-5 w-5" />}
                                </span>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center " >
                    {/* Dark Mode Toggle */}
                    <label htmlFor="darkModeToggle" className="relative right-7 flex items-center cursor-pointer">
                    <div className="relative">
                        <button
                            type="button"
                            className={`w-14 h-7 bg-white rounded-full p-1 flex items-center bordernya border border-blue-500 transition-transform ${darkMode ? 'justify-end' : 'justify-start'
                                    } ease-in-out duration-300`}
                            onClick={toggleDarkMode}>
                            <span  className={`dot w-5 h-5 bg-cyan-100 rounded-full shadow transition-transform ${darkMode ? '' : ''
                                        }`}>
                            {darkMode ? <FiMoon className="h-5 w-5 text-sky-600" /> : <FiSun className="h-5 w-5 text-sky-600" />}
                            </span>
                        </button>
                    </div>
                    </label>

                    {/* Adjust the margin-right to create space */}
                    <div className="md:mr-3" />

                    {/* Notifications Button */}
                    <button
                        type="button"
                        className="relative right-3 text-gray-500 hover:text-gray-800 hidden md:block"
                        onClick={toggleNotifications}
                    >
                        {notificationCount > 0 && (
                            <span className="absolute -top-1 -right-2 -mt-1 -mr-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                {notificationCount}
                            </span>
                        )}
                        <span className="sr-only">View notifications</span>
                        <BiBell className="h-6 w-6" aria-hidden="true" />
                    </button>
                    {showNotifications && (
                        <Transition
                            show={showNotifications}
                            enter="transition ease-out duration-200 transform"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-100 transform"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Menu as="div" className="absolute z-10 -ml-48 mt-8 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-transform">
                                {/* Notifikasi Dropdown */}
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                'relative bottom-2 rounded-t-md block px-4 py-2 text-sm bg-red-500 text-white'
                                            )}
                                        >
                                            Notification
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm text-gray-700'
                                            )}
                                        >
                                            Notification 1
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm text-gray-700'
                                            )}
                                        >
                                            Notification 2
                                        </a>
                                    )}
                                </Menu.Item>
                            </Menu>
                        </Transition>
                    )}

                    {/* Profile Dropdown */}
                    <Menu as="div" className="relative ml-3">
                        <div>
                            <Menu.Button className="relative flex rounded-full text-sm hidden md:block">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src={profile}
                                    alt="profile"
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-transform">
                                <Menu.Item>
                                    <a
                                        href="#"
                                        className={classNames('bg-slate-500 rounded-t-md block px-4 py-2 text-sm text-white')}
                                    >
                                        Hello, Rizky
                                    </a>
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(active ? 'bg-gray-100' : '', 'flex items-center px-4 py-2 text-sm text-gray-700')}
                                        >
                                            <AiOutlineUser className="mr-2" /> Profile
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(active ? 'bg-gray-100' : '', 'flex items-center px-4 py-2 text-sm text-gray-700')}
                                        >
                                            <CiSettings className="mr-2" /> Settings
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(active ? 'bg-gray-100' : '', 'flex items-center px-4 py-2 text-sm text-gray-700')}
                                        >
                                            <BiLogOut className="mr-2" /> Sign out
                                        </a>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
