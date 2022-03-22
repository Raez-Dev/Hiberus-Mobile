import React, { useEffect, useState } from 'react';
import { useUseService } from '../../../Services/userService';
import Swal from 'sweetalert2';
import Modal from '../../../Components/Modal/Modal';
import EditUser from "../EditUser/EditUser";
import UserDetail from "../UserDetail/UserDetail";
import Pagination from '../../../Components/Pagination/Pagination';

const UserList = () => {

    const [ListUsers, setListUsers] = useState([]);
    const [User, setUser] = useState({ email: '', password: '', name: '', surname: '', id: '' });
    const [paginationList, setPaginationList] = useState([])
    const [pagination, setPagination] = useState({
        currentPage: 1, size: 1, pageSize: 10
    })

    const [open, setOpen] = useState({ isOpen: false, type: null });
    const { userService } = useUseService();

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        getPaginate();
    }, [pagination, ListUsers]);

    const getPaginate = () => {
        const newPaginateList = ListUsers.map((item, index) => {
            let starUser = (pagination.currentPage === 1 ? 0 : ((pagination.currentPage - 1) * pagination.pageSize));
            let endUser = (pagination.currentPage * pagination.pageSize);

            if (index < endUser && index >= starUser) {
                return item
            }
        }).filter(notUndefined => notUndefined !== undefined);
        setPaginationList(newPaginateList);
    }

    const getUsers = async () => {
        const response = await userService.getUsers();

        if (response.statusCode === 200) {
            setPagination({ ...pagination, size: response.items.length })
            setListUsers(response.items);
        } else {
            Swal.fire({
                icon: 'error',
                title: `${response.error}`,
                html: `${response.message}`,
                showConfirmButton: false,
                timer: 1500
            })
        }
    };

    const getUser = async (id) => {
        const response = await userService.getUser(id);
        if (response.statusCode === 200) {
            setUser({ ...response, password: '' });
            return true;
        } else {
            Swal.fire({
                icon: 'error',
                title: `${response.error}`,
                html: `${response.message}`,
                showConfirmButton: false,
                timer: 1500
            });
            return false;
        }
    };

    const onHandleClickButton = async (e, id) => {
        e.preventDefault();
        if (e.target.name === 'delete') {
            await userService.deleteUser(id);
            getUsers();
        }
        else if (e.target.name === 'detail') {
            if (await getUser(id) === true) {
                setOpen({ isOpen: true, type: 'detail' });
            }
        }
        else if (e.target.name === 'updated') {
            if (await getUser(id) === true) {
                setOpen({ isOpen: true, type: 'updated' });
            }
        }
    }

    const onCloseModal = () => {
        setOpen({ isOpen: false, type: null });
    }

    const saveUpdated = async (user) => {

        const response = await userService.putUser(
            user.id,
            {
                id: user.id,
                email: user.email,
                password: user.password,
                name: user.name,
                surname: user.surname
            }
        )

        if (response.statusCode !== 200) {
            Swal.fire({
                icon: 'error',
                title: `${response.error}`,
                html: `${response.message}`,
                showConfirmButton: false,
                timer: 1500
            })
        }
        else {
            onCloseModal()
        }
    }

    const onHandleChange = (page) => {
        setPagination({ ...pagination, currentPage: page })
    }

    return (
        <>
            <Modal open={open} onCloseModal={onCloseModal} >
                {
                    open.type === 'detail' ?
                        <UserDetail User={User} />
                        :
                        <EditUser User={User} saveUpdated={saveUpdated} />
                }
            </Modal>

            {
                paginationList.length > 0 ?
                    <>
                        <div className="table-responsive mb-2">
                            <table className="table">
                                <thead>
                                    <tr>
                                        {
                                            Object.keys(paginationList[0]).map((item, index) => {

                                                return (
                                                    <th scope="col" key={index}>{item === 'id' ? 'Options' : item.charAt(0).toUpperCase() + item.slice(1)}</th>
                                                )
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        paginationList.map((user, index) => {

                                            return (
                                                <tr key={index}>
                                                    <td>{user.email}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.surname}</td>
                                                    <td>
                                                        <div className="btn-group" role="group">
                                                            <button name='delete' type="button" className="btn btn-danger me-1" onClick={(e) => onHandleClickButton(e, user.id)}>Delete</button>
                                                            <button name='updated' type="button" className="btn btn-primary me-1" onClick={(e) => onHandleClickButton(e, user.id)}>Update</button>
                                                            <button name='detail' type="button" className="btn btn-warning" onClick={(e) => onHandleClickButton(e, user.id)}>Detail</button>
                                                        </div>

                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>
                        <Pagination currentPage={pagination.currentPage} size={pagination.size} pageSize={pagination.pageSize} onChange={onHandleChange} />
                    </>
                    :
                    <></>
            }
        </>
    )
};

export default UserList;