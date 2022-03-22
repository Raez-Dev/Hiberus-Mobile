import React from 'react'

const UserDetail = ({ User }) => {
    return (
        <>
            {
                User !== null ?
                    <div className='container'>
                        <form className="row g-3">
                            <div className="col-md-12">
                                <label htmlFor="email" className="visually-hidden">Email</label>
                                <input autoComplete='off' className='form-control' type="text" name="email" placeholder='Email' value={User.email} readOnly />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="name" className="visually-hidden">Name</label>
                                <input autoComplete='off' className='form-control' type="text" name="name" placeholder='Name' value={User.name} readOnly />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="surname" className="visually-hidden">Surname</label>
                                <input autoComplete='off' className='form-control' type="text" name="surname" placeholder='Surname' value={User.surname} readOnly />
                            </div>
                        </form>
                    </div>
                    : <></>
            }


        </>
    )
}

export default UserDetail