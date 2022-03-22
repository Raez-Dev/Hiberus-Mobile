import React from 'react';

const styleOpen = {
    display: 'block',
}

const Modal = ({ open = { isOpen: false, type: "detail" }, onCloseModal, children }) => {

    return (
        <>
            <div className={`${open.isOpen ? 'modal-backdrop show' : ''}`}></div>
            <div id="exampleModalCenter"
                className={`modal fade ${open.isOpen ? 'show' : ''} position-fixed`}
                tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                style={open.isOpen ? styleOpen : {}}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">{open.type === 'detail' ? 'User detail' : 'User edit'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => onCloseModal()}></button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>                        
                    </div>
                </div>
            </div>
        </>

    )
}

export default Modal