import React from 'react';
import styles from "./Pagination.module.css";

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
    let lastPage = Math.ceil(totalPosts / postsPerPage);
    let pages = [];

    for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
    }

    return (
        <div className={styles.pagination}>
            <button 
                onClick={() => setCurrentPage(1)} 
                disabled={currentPage === 1}
            >
                &lt;&lt;
            </button>
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
            >
                &lt;
            </button>

            {pages.map((page, index) => (
                <button
                    className={page === currentPage ? styles.active : ''}
                    key={index}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}

            <button 
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === lastPage}
            >
                &gt;
            </button>
            <button 
                onClick={() => setCurrentPage(lastPage)} 
                disabled={currentPage === lastPage}
            >
                &gt;&gt;
            </button>
        </div>
    );
};

export default Pagination;
