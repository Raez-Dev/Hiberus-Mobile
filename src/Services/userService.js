//  Dependencies
import { useContext } from 'react';
import { instance as interceptor } from './interceptor'

//  Context
import { LSContext } from '../Context/LSContext';

const baseUrl = 'http://51.38.51.187:5050/api/v1/';
const urlGetMe = `${baseUrl}users/me`;
const urlGetUsers = `${baseUrl}users`;
const urlPostUsers = `${baseUrl}users`;
const urlGetUser = `${baseUrl}users/`;
const urlPutUser = `${baseUrl}users/`;
const urlDeleteUser = `${baseUrl}users/`;

export const useUseService = () => {

    const { localStorage } = useContext(LSContext);

    const getMe = async(token = '') => {
        try {
            const response = await interceptor.get(urlGetMe, {
                headers: {
                    Authorization: `Bearer ${token === '' ? localStorage.accessToken : token}`
                }
            });
            return response;
        } catch (error) {
            return error;
        }
    }

    const getUsers = async() => {
        try {
            const response = await interceptor.get(urlGetUsers, {
                headers: {
                    Authorization: `Bearer ${localStorage.accessToken}`
                }
            });
            return response;
        } catch (error) {
            return error;
        }
    }

    const postUsers = async(User) => {
        try {
            const response = await interceptor.post(urlPostUsers, { "body": User }, {
                headers: {
                    Authorization: `Bearer ${localStorage.accessToken}`
                }
            });
            return response;
        } catch (error) {
            return error;
        }
    }

    const getUser = async(id) => {
        try {
            const response = await interceptor.get(`${urlGetUser}${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.accessToken}`
                }
            });
            return response;
        } catch (error) {
            return error;
        }
    }

    const putUser = async(id, User) => {
        try {
            const response = await interceptor.put(`${urlPutUser}${id}`, { "body": User }, {
                headers: {
                    Authorization: `Bearer ${localStorage.accessToken}`,
                }

            });
            return response;
        } catch (error) {
            return error;
        }
    }

    const deleteUser = async(id) => {
        try {
            const response = await interceptor.delete(`${urlDeleteUser}${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.accessToken}`
                }
            });
            return response;
        } catch (error) {
            return error;
        }
    }

    return { userService: { getMe, getUsers, postUsers, getUser, putUser, deleteUser } };
}