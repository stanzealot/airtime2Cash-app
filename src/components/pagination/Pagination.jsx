import React from 'react'
import './pagination.scss'

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pages = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pages.push(i)
    }

    return (
        <nav className='pagination'>
            <ul className='pages'>
                {pages.map(page => (
                    <li key={page} onClick={()=> paginate(page)} className='page'>
                        <p  className='page-number'>{page}</p>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;