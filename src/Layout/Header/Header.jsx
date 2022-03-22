import React, { useState, useContext } from 'react'

//  Context
import { LSContext } from '../../Context/LSContext';

const Header = () => {

    const [showDialog, setShowDialog] = useState(false);
    const { user, deleteLS } = useContext(LSContext);

    const onCloseSession = async (e) => {
        e.preventDefault();
        deleteLS();
    }

    return (
        <nav className="navbar navbar-light bg-light fixed-top">
            <div className="container-md">
                <span className="navbar-brand mb-0 h1">Hiberus</span>
                <div className="dropdown ms-3">
                    <button className={`btn btn-bd-light ${showDialog ? 'show' : ''}`} onClick={() => setShowDialog(!showDialog)}>
                        {`${user.name} ${user.surname}`}
                    </button>
                    <ul className={`dropdown-menu dropdown-menu-end ${showDialog ? 'show' : ''}`} aria-labelledby="bd-versions">
                        <li><p className="dropdown-item">{`${user.name} ${user.surname}`}</p></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><p className="dropdown-item" onClick={onCloseSession}>Log out</p></li>
                    </ul>
                </div>
            </div>
        </nav >


    )
}

export default Header;