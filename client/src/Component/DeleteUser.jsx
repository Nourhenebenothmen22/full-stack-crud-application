import React, { useRef } from 'react';

function DeleteUser({ handleUserDelet }) {
    const CloseRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleUserDelet();
        if (CloseRef.current) CloseRef.current.click();
    };

    return (
        <div id="deleteEmployeeModal" className="modal fade">
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
                                <i className="bi bi-trash me-2"></i>
                                Delete Employee
                            </h4>
                            <button 
                                ref={CloseRef}
                                type="button" 
                                className="btn-close btn-close-white" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            ></button>
                        </div>
                        
                        <div className="modal-body p-4 text-center" style={{ background: '#f8f5ff' }}>
                            <div className="mb-4" style={{ fontSize: '5rem', color: '#ff6b6b' }}>
                                <i className="bi bi-exclamation-triangle"></i>
                            </div>
                            
                            <h5 className="fw-bold text-purple mb-3">
                                Are you sure you want to delete this record?
                            </h5>
                            
                            <p className="text-muted">
                                <small>This action cannot be undone and will permanently remove the employee data.</small>
                            </p>
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
                                className="btn btn-danger-glow text-white"
                                style={{
                                    background: 'linear-gradient(90deg, #ff6b6b, #ff4757)',
                                    border: 'none',
                                    fontWeight: '500',
                                    boxShadow: '0 4px 10px rgba(255, 107, 107, 0.4)'
                                }}
                            >
                                <i className="bi bi-trash me-1"></i> Delete Employee
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
                    
                    <style>
                        {`
                            .text-purple {
                                color: #6a0dad;
                            }
                            
                            .btn-outline-purple:hover {
                                background-color: rgba(138, 43, 226, 0.1);
                            }
                            
                            .btn-danger-glow:hover {
                                box-shadow: 0 6px 15px rgba(255, 107, 107, 0.5) !important;
                                transform: translateY(-2px);
                                transition: all 0.3s ease;
                            }
                        `}
                    </style>
                </div>
            </div>
        </div>
    );
}

export default DeleteUser;