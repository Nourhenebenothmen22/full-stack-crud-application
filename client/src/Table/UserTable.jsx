import React, { useState, useEffect } from 'react';
import Table from '../Component/Table';
import AddUser from '../Component/AddUser';
import DeletUser from '../Component/DeleteUser';
import axios from 'axios';
import toast from 'react-hot-toast';
import EditUser from '../Component/EditUser';

export default function UserTable() {
    const [userId, setUserId] = useState();
    const [updatedUserId, setUpdatedUserId] = useState();
    const [users, setUsers] = useState([]);
    const [formValue, setFormValue] = useState({
        firstName: "",
        lastName: "",
        email: "",
        position: "",
        department: "",
        salary: "",
        hireDate: ""
    });

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/users');
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else if (response.data && Array.isArray(response.data.users)) {
                setUsers(response.data.users);
            } else if (response.data && Array.isArray(response.data.data)) {
                setUsers(response.data.data);
            } else {
                console.error("Format de réponse inattendu:", response.data);
                toast.error("Format de données inattendu de l'API");
            }
        } catch (error) {
            console.error("Erreur de récupération des données:", error);
            toast.error("Erreur lors du chargement des employés");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deletuser = (userid) => {
        setUserId(userid);
    };

    const handleUserDelet = async () => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/user/${userId}`);
            if (response.data.success) {
                toast.success(response.data.message);
                fetchUsers();
            } else {
                toast.error(response.data.message || "Échec de la suppression");
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || 
                error.message || 
                "Erreur lors de la suppression"
            );
        }
    };

    const handlechange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    const UpadteUserData = (Updatedid) => {
        setUpdatedUserId(Updatedid);
        const userToUpdate = users.find(user => user._id === Updatedid);
        if (userToUpdate) {
            setFormValue({
                firstName: userToUpdate.firstName,
                lastName: userToUpdate.lastName,
                email: userToUpdate.email,
                position: userToUpdate.position,
                department: userToUpdate.department,
                salary: userToUpdate.salary.toString(),
                hireDate: userToUpdate.hireDate.split('T')[0]
            });
        }
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...formValue,
                salary: Number(formValue.salary)
            };

            const updateResponse = await axios.put(
                `http://localhost:4000/api/user/${updatedUserId}`,
                dataToSend
            );
            
            if (updateResponse.data.success) {
                toast.success(updateResponse.data.message);
                fetchUsers();
                setFormValue({
                    firstName: "",
                    lastName: "",
                    email: "",
                    position: "",
                    department: "",
                    salary: "",
                    hireDate: ""
                });
            } else {
                toast.error(updateResponse.data.message || "Échec de la mise à jour");
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || 
                error.message || 
                "Erreur lors de la mise à jour"
            );
        }
    };

    return (
        <>
            <Table 
                data={users} 
                Deletuser={deletuser} 
                UpdatedUser={UpadteUserData} 
            />
            <AddUser onUserAdded={fetchUsers} />
            <EditUser 
                handleOnSubmit={handleOnSubmit} 
                value={formValue} 
                handlechange={handlechange} 
            />
            <DeletUser handleUserDelet={handleUserDelet} />
        </>
    );
}