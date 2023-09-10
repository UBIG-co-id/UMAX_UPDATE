import React, { useEffect, useState, useRef } from 'react'
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import data from '../dates/DataClient';
import { BsTrash3, BsPlus } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineEdit, AiOutlineFilePdf } from 'react-icons/ai';
import { RiFileExcel2Line } from 'react-icons/ri';
import { useDownloadExcel } from "react-export-table-to-excel";
import { useReactToPrint } from 'react-to-print';

const ClientTable = () => {
    const [tableData, setTableData] = useState(data);
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [showAddPopup, setShowAddPopup] = useState(false);
    const tableRef = useRef(null);

    // PAGINATION
    const paginationStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        marginTop: '20px',
    };

    const buttonStyle = {
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '5px 10px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '0 5px',
    };

    const disabledButtonStyle = {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    };

    const pageInfoStyle = {
        fontSize: '16px',
        margin: '0 10px',
        color: '#333',
    };
    // END PAGINATION

    // TABLE
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Address',
                accessor: 'address',
            },
            {
                Header: 'Contact',
                accessor: 'contact',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Action',
                accessor: 'action',

                Cell: ({ row }) => (
                    <div className="flex space-x-2  justify-center">
                        <button
                            onClick={() => handleEdit(row.original.id)}
                            className="bg-red-200 hover:bg-red-300 text-red-600 py-1 px-1 rounded"
                        >
                            <BsTrash3 />
                        </button>
                        <button
                            onClick={() => handleDelete(row.original.id)}
                            className="bg-blue-200 hover:bg-blue-300 text-blue-600 py-1 px-1 rounded"
                        >
                            <AiOutlineEdit />
                        </button>
                    </div>
                ),
                headerClassName: 'action-column header', // Tambahkan kelas CSS khusus
                className: 'action-column', // Tambahkan kelas CSS khusus
            },
        ],
        []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Replace 'rows' with 'page' for paginated data
        state: { pageIndex, pageSize, globalFilter }, // Add these state properties
        setGlobalFilter, // Add this function
        gotoPage, // Add this function
        nextPage, // Add this function
        previousPage, // Add this function
        canNextPage, // Add this function
        canPreviousPage, // Add this function
        pageOptions, // Add this function
        pageCount, // Add this function
    } = useTable(
        {
            columns,
            data: tableData,
            initialState: { pageIndex: 0, pageSize: 5 }, // Initial page settings
        },
        useGlobalFilter,
        usePagination // Add this hook
    );
    // const { globalFilter } = state;
    const handleEdit = (rowId) => {
        console.log('Editing row with ID:', rowId);
    };
    const handleDelete = (rowId) => {
        const updatedData = tableData.filter((row) => row.id !== rowId);
        setTableData(updatedData);
    };
    // END

    // TOMBOL ESC
    useEffect(() => {
        // Add an event listener to listen for the "Esc" key press
        const handleEscKey = (event) => {
            if (event.keyCode === 27) {
                // Check if "Esc" key (keyCode 27) is pressed
                setShowAddPopup(false); // Close the popup
            }
        };
        // Attach the event listener when the component mounts
        window.addEventListener('keydown', handleEscKey);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, []);
    //   END

    // POPUP
    const toggleAddPopup = () => {
        setShowAddPopup(!showAddPopup);
    };
    const handleAddData = () => {
        toggleAddPopup();
    };
    //   END

    // EXPORT EXCEL
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: "DataClients",
        sheet: "DataClients",
    });
    //   END

    // EXPORT PDF
    const componentPDF = useRef();

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Data",
        onAfterPrint: () => alert("Data Saved in PDF")
    });
    // END

    return (
        <div className="container widht-100% border-2 border-slate-200 bg-white p-5 m-10 rounded-lg relative">
            <div className="container mx-auto px-0 p-4">
                <div className="mb-4 -mt-4 flex space-x-4 justify-start">
                    {/* Search bar */}
                    <div className="relative col-span-12 lg:col-span-3">
                        <input
                            type="text"
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search"
                            className="p-2 w-full min-w-0 h-9 pl-8 text-xs border focus:border-gray-500 focus:outline-none focus:ring-0 border-slate-300 rounded-lg"
                        />
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                            <CiSearch style={{ color: '#9BA0A8' }} />
                        </span>
                    </div>
                    <div className="relative col-span-12 lg:col-span-3">
                        <select
                            className="p-2 h-9 text-xs font-medium border focus:border-gray-500 focus:outline-none focus:ring-0 border-slate-300 rounded-lg sm:w-48"
                            value={selectedPlatform}
                            onChange={(e) => setSelectedPlatform(e.target.value)}>
                            <option hidden>Status</option>
                            <option value="Facebook">Active</option>
                            <option value="Instagram">Deactive</option>
                        </select>
                    </div>
                    <div className="hidden lg:block col-span-2"></div>
                </div>
                <div className="mb-4 -mt-14 flex space-x-1 justify-end">
                    <button
                        type="button"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        data-te-ripple-centered="true"
                        className="col-span-8 lg:col-span-2 inline-flex items-center border border-slate-300 h-9 focus:border-gray-500 focus:outline-none focus:ring-0 rounded-md bg-white px-6 pb-2.5 pt-2 text-xs font-medium leading-normal text-gray-800 hover:bg-gray-50"
                        onClick={toggleAddPopup}
                    >
                        <BsPlus className="relative right-5 font-medium text-lg" />
                        <span className="relative right-4">Add</span>
                    </button>
                    {showAddPopup && (
                        <div className="fixed z-50 inset-0 flex items-center justify-center">
                            <div className="fixed -z-10 inset-0 bg-black bg-opacity-50"></div>
                            <div className=" bg-white p-5 rounded-lg shadow-lg  max-h-[80vh] overflow-y-auto">
                                <h2 className="text-xl font-semibold mb-4">Client</h2>

                                <div className="flex flex-col md:flex-row gap-4 mb-4">
                                    <div className="basis-1/2">
                                        <label className='pb-2 text-sm ' htmlFor="">Name</label>
                                        <input
                                            type="text"
                                            className="p-2 h-9 w-full border  focus:border-blue-500 focus:outline-none  focus:border-2 bg-slate-100 border-slate-300 rounded-md"
                                        />
                                    </div>
                                    <div className="basis-1/2">
                                        <label className='pb-2 text-sm ' htmlFor="">Address</label>
                                        <input
                                            type="text"
                                            className="p-2 h-9 w-full border  focus:border-blue-500 focus:outline-none  focus:border-2 bg-slate-100 border-slate-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-4 mb-4">
                                    <div className="basis-1/2">
                                        <label className='pb-2 text-sm ' htmlFor="">Contact</label>
                                        <input
                                            type="number"
                                            className="p-2 h-9 w-full border  focus:border-blue-500 focus:outline-none  focus:border-2 bg-slate-100 border-slate-300 rounded-md"
                                        />
                                    </div>

                                    <div className="basis-1/2">
                                        <label className='pb-2 text-sm ' htmlFor="">Status</label>
                                        <select
                                            className="px-3 text-slate-500 h-9 w-full border  focus:border-blue-500 focus:outline-none  focus:border-2 bg-slate-100 border-slate-300 rounded-md select-custom-width"
                                        >
                                            <option value="option1">Active</option>
                                            <option value="option2">Deactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 mb-4">
                                    <div className="basis-1/2">
                                        <label className='pb-2 text-sm ' htmlFor="">Notes</label>
                                        <textarea
                                            className="container width-100% p-2 max-h-md select-custom-width text-slate-500 border  focus:border-blue-500 focus:outline-none  focus:border-2 bg-slate-100 border-slate-300 rounded-md"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    {/* Tombol Save */}
                                    <button
                                        type="button"
                                        onClick={toggleAddPopup}
                                        className=" text-gray-500 mr-4"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAddData}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Button export excel */}
                    <button
                        type="button"
                        className="col-span-2 lg:col-span-1 grid place-items-center border border-slate-300 h-9 rounded-md bg-white p-2 hover:bg-gray-50"
                        onClick={onDownload}
                    >
                        <RiFileExcel2Line className="relative font-medium text-lg" />
                    </button>
                    {/* End */}

                    {/* Button Export Pdf */}
                    <button
                        type="button"
                        className="col-span-2 lg:col-span-1 grid place-items-center border border-slate-300 h-9 rounded-md bg-white p-2 hover:bg-gray-50"
                        onClick={generatePDF}
                    >
                        <AiOutlineFilePdf className="relative font-medium text-lg" />
                    </button>
                    {/* END */}
                </div>
                <div className="w-full bg-white max-md:overflow-x-scroll" ref={componentPDF}>
                    <table
                        {...getTableProps()}
                        ref={tableRef}
                        className="table-auto border-collapse border w-full"
                    >
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps()}
                                            className={`p-2 text-white bg-sky-700 font-medium border-slate-300 border ${column.id === 'action' || column.id === 'status'
                                                ? 'text-center' // Untuk rata tengah
                                                : 'text-left' // Untuk kolom lainnya
                                                }`}
                                        >
                                            {column.render('Header')}
                                        </th>

                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}
                                        className={`border border-slate-300 text-gray-600 hover:bg-gray-200 hover:text-blue-600 ${i % 2 === 0 ? 'bg-gray-100' : 'bg-white' // Memberikan latar belakang selang-seling
                                            }`}    >
                                        {row.cells.map((cell) => {
                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className={`p-2 border-slate-300 border ${cell.column.id === 'status' ||
                                                        cell.column.id === 'id'
                                                        ? 'place-items-center'
                                                        : 'text-left'
                                                        }`}
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div style={paginationStyle}>
                    <button
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                        style={{
                            ...buttonStyle,
                            ...(canPreviousPage ? {} : disabledButtonStyle),
                        }}
                    >
                        {'<<'}
                    </button>{' '}
                    <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        style={{
                            ...buttonStyle,
                            ...(canPreviousPage ? {} : disabledButtonStyle),
                        }}
                    >
                        {'<'}
                    </button>{' '}
                    <span style={pageInfoStyle}>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        style={{
                            ...buttonStyle,
                            ...(canNextPage ? {} : disabledButtonStyle),
                        }}
                    >
                        {'>'}
                    </button>{' '}
                    <button
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                        style={{
                            ...buttonStyle,
                            ...(canNextPage ? {} : disabledButtonStyle),
                        }}
                    >
                        {'>>'}
                    </button>{' '}
                </div>
                {/* End Pagination */}
            </div>
        </div >
    )
}

export default ClientTable