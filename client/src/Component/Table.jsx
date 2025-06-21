import React from 'react';

function Table({ data, UpdatedUser, Deletuser }) {
  // Formater la date pour l'affichage
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Formater le salaire
  const formatSalary = (salary) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(salary);
  };

  return (
    <div className="container mt-5">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row mb-5">
            <div className="col-sm-6">
              <h2>Gestion <b>Employés</b></h2>
            </div>
            <div className="col-sm-6 text-end">
              <a 
                href="#addEmployeeModal" 
                className="btn btn-purple-glow text-white" 
                data-bs-toggle="modal"
                style={{
                  background: 'linear-gradient(90deg, #6a0dad, #8a2be2)',
                  border: 'none',
                  fontWeight: '500',
                  boxShadow: '0 4px 10px rgba(138, 43, 226, 0.4)'
                }}
              >
                <i className="bi bi-plus-circle me-1"></i> Nouvel Employé
              </a>
            </div>
          </div>
        </div>
        
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Poste</th>
                <th>Département</th>
                <th>Salaire</th>
                <th>Date Embauche</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.position}</td>
                  <td>{user.department}</td>
                  <td>{formatSalary(user.salary)}</td>
                  <td>{formatDate(user.hireDate)}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-warning me-2"
                      data-bs-toggle="modal" 
                      data-bs-target="#editEmployeeModal"
                      onClick={() => UpdatedUser(user._id)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      data-bs-toggle="modal" 
                      data-bs-target="#deleteEmployeeModal"
                      onClick={() => Deletuser(user._id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {(!data || data.length === 0) && (
          <div className="alert alert-info text-center mt-4">
            <i className="bi bi-info-circle me-2"></i>
            Aucun employé trouvé. Cliquez sur "Nouvel Employé" pour en ajouter un.
          </div>
        )}
      </div>
      
      {/* Styles supplémentaires */}
      <style>
        {`
          .btn-purple-glow:hover {
            box-shadow: 0 6px 15px rgba(138, 43, 226, 0.5) !important;
            transform: translateY(-2px);
            transition: all 0.3s ease;
          }
          
          .table-responsive {
            overflow-x: auto;
          }
          
          @media (max-width: 768px) {
            .table-responsive {
              display: block;
              width: 100%;
              overflow-x: auto;
              -webkit-overflow-scrolling: touch;
            }
            
            table {
              min-width: 700px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Table;