import React, { useEffect, useState } from 'react'

const EditUser = ({ User, saveUpdated }) => {
    const [UserForm, setUserForm] = useState(User);
    const [ReadyToGo, setReadyToGo] = useState(false);


    useEffect(() => {
        setUserForm(User);
    }, [User])

    useEffect(() => {
        if (Object.values(UserForm).length === Object.values(UserForm).reduce((p, c) => c !== '' ? p + 1 : p, 0)) {
            setReadyToGo(true)
        } else {
            setReadyToGo(false)
        }
    }, [UserForm])

    const onHandleInputChange = (e) => {
        e.preventDefault();
        setUserForm({ ...UserForm, [e.target.name]: e.target.value })
    }

    const onClickUpdated = (e) => {
        e.preventDefault();
        saveUpdated(UserForm);
    }

    return (
        <>
            {UserForm !== null ?
                <>
                    <div className='container'>
                        <form className="row g-3">
                            <div className="col-md-12">
                                <label htmlFor="email" className="visually-hidden">Email</label>
                                <input autoComplete='off' className='form-control' type="text" name="email" placeholder='Email' value={UserForm.email} onChange={onHandleInputChange} />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="password" className="visually-hidden">Password</label>
                                <input autoComplete='off' className='form-control' type="password" name="password" placeholder='Password' value={UserForm.password} onChange={onHandleInputChange} />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="name" className="visually-hidden">Name</label>
                                <input autoComplete='off' className='form-control' type="text" name="name" placeholder='Name' value={UserForm.name} onChange={onHandleInputChange} />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="surname" className="visually-hidden">Surname</label>
                                <input autoComplete='off' className='form-control' type="text" name="surname" placeholder='Surname' value={UserForm.surname} onChange={onHandleInputChange} />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-primary mb-3 " type='submit' disabled={!ReadyToGo} onClick={onClickUpdated} >Updated</button>
                            </div>
                        </form>
                    </div>
                </>
                :
                <></>
            }
        </>
    )
}

export default EditUser