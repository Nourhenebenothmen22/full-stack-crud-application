import React, { useState, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function AddUser(props) {
    const [value, setValue] = useState({
        firstName: '', 
        lastName: '', 
        email: '', 
        position: '', 
        department: '', 
        salary: '', 
        hireDate: '' 
    });

    const CloseRef = useRef(null);

    const handleChange = (e) => {
        const { name, value: inputValue } = e.target;
        setValue(prev => ({ 
            ...prev, 
            [name]: inputValue 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!value.email.includes('@')) {
            toast.error("Email invalide");
            return;
        }

        const formattedData = {
            ...value,
            salary: Number(value.salary),
            hireDate: new Date(value.hireDate).toISOString().split('T')[0]
        };

        try {
            const response = await axios.post('http://localhost:4000/api/user', formattedData);
            
            if (response.data.success) {
                toast.success(response.data.Message);
                
                if (CloseRef.current) {
                    CloseRef.current.click();
                }
                
                setValue({
                    firstName: '', 
                    lastName: '', 
                    email: '', 
                    position: '', 
                    department: '', 
                    salary: '', 
                    hireDate: '' 
                });
                
                if (props.onUserAdded) {
                    props.onUserAdded();
                }
            }
        } catch (error) {
            console.error("Erreur complète:", error);
            
            if (error.response) {
                if (error.response.data.errors) {
                    const messages = Object.values(error.response.data.errors).map(err => err.message);
                    toast.error(messages.join(", "));
                } else {
                    toast.error(error.response.data.message || error.response.data);
                }
            } else if (error.request) {
                toast.error("Pas de réponse du serveur");
            } else {
                toast.error("Erreur de configuration: " + error.message);
            }
        }
    };

    return (
        <div id="addEmployeeModal" className="modal fade">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg" style={{
                    borderRadius: '15px',
                    overflow: 'hidden',
                    background: 'linear-gradient(145deg, #f9f0ff, #e6e6fa)'
                }}>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header text-white" style={{
                            background: 'linear-gradient(90deg, #6a0dad, #8a2be2)',
                            borderBottom: 'none'
                        }}>
                            <h4 className="modal-title fw-bold">
                                <i className="bi bi-person-plus me-2"></i>
                                Add New Employee
                            </h4>
                            <button 
                                ref={CloseRef}
                                type="button" 
                                className="btn-close btn-close-white" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            ></button>
                        </div>
                        
                        <div className="modal-body p-4" style={{ background: '#f8f5ff' }}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold text-purple">
                                        <i className="bi bi-person me-1"></i> First Name
                                    </label>
                                    <input 
                                        type="text" 
                                        name="firstName" 
                                        className="form-control" 
                                        placeholder="Enter first name"
                                        value={value.firstName}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                                
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold text-purple">
                                        <i className="bi bi-person me-1"></i> Last Name
                                    </label>
                                    <input 
                                        type="text" 
                                        name="lastName" 
                                        className="form-control" 
                                        placeholder="Enter last name"
                                        value={value.lastName}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label fw-bold text-purple">
                                    <i className="bi bi-envelope me-1"></i> Email Address
                                </label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    className="form-control" 
                                    placeholder="Enter email address"
                                    value={value.email}
                                    onChange={handleChange}
                                    required 
                                />
                                <div className="form-text text-muted">We'll never share your email with anyone else.</div>
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold text-purple">
                                        <i className="bi bi-briefcase me-1"></i> Position
                                    </label>
                                    <input 
                                        type="text" 
                                        name="position" 
                                        className="form-control" 
                                        placeholder="Enter position"
                                        value={value.position}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                                
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold text-purple">
                                        <i className="bi bi-building me-1"></i> Department
                                    </label>
                                    <select 
                                        name="department" 
                                        className="form-select"
                                        value={value.department}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select department...</option>
                                        <option value="IT">IT</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="HR">Human Resources</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Operations">Operations</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold text-purple">
                                        <i className="bi bi-currency-euro me-1"></i> Salary
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">€</span>
                                        <input 
                                            type="number" 
                                            name="salary" 
                                            className="form-control" 
                                            placeholder="Enter salary"
                                            value={value.salary}
                                            onChange={handleChange}
                                            min="0"
                                            step="100"
                                            required 
                                        />
                                    </div>
                                </div>
                                
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold text-purple">
                                        <i className="bi bi-calendar me-1"></i> Hire Date
                                    </label>
                                    <input 
                                        type="date" 
                                        name="hireDate" 
                                        className="form-control" 
                                        value={value.hireDate}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="modal-footer" style={{ 
                            background: 'linear-gradient(90deg, #f9f0ff, #e6e6fa)',
                            borderTop: '1px solid rgba(138, 43, 226, 0.2)'
                        }}>
                            <button 
                                type="button" 
                                className="btn btn-outline-purple" 
                                data-bs-dismiss="modal"
                                style={{
                                    borderColor: '#8a2be2',
                                    color: '#8a2be2',
                                    fontWeight: '500'
                                }}
                            >
                                <i className="bi bi-x-circle me-1"></i> Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-purple-glow text-white"
                                style={{
                                    background: 'linear-gradient(90deg, #6a0dad, #8a2be2)',
                                    border: 'none',
                                    fontWeight: '500',
                                    boxShadow: '0 4px 10px rgba(138, 43, 226, 0.4)'
                                }}
                            >
                                <i className="bi bi-plus-circle me-1"></i> Add Employee
                            </button>
                        </div>
                    </form>
                    
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '20px',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(138, 43, 226, 0.1), transparent 70%)',
                        zIndex: '0'
                    }}></div>
                </div>
            </div>
        </div>
    );
}

export default AddUser;