import React, { useEffect, useState } from 'react'

const Pagination = ({ currentPage, size, pageSize, onChange }) => {


    const [pageQtyList, setPageQtyList] = useState([]);

    useEffect(() => {
        let list = [];
        const pageQty = Math.ceil(size / pageSize);

        for (let i = 1; i <= pageQty; i++) {
            list.push(i);
        }
        setPageQtyList(list);
    }, [size, pageSize])


    const onHandleClick = (item) => {
        onChange(item);
    }
    return (
        <>
            {
                pageQtyList.length > 0 ?

                    <div className='d-flex justify-content-center'>
                        <nav>
                            <ul className="pagination">
                                <li className="page-item">
                                    <p className="page-link" aria-label="Previous" onClick={() => onHandleClick(1)}>
                                        <span aria-hidden="true">&laquo;</span>
                                    </p>
                                </li>

                                {
                                    pageQtyList.map((item, index) => {
                                        return (<li className="page-item" key={index}><p className="page-link" onClick={() => onHandleClick(item)} >{item}</p></li>)
                                    })
                                }

                                <li className="page-item">
                                    <p className="page-link" aria-label="Next" onClick={() => onHandleClick(pageQtyList[pageQtyList.length - 1])}>
                                        <span aria-hidden="true">&raquo;</span>
                                    </p>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    :
                    <></>
            }
        </>
    )
}

export default Pagination