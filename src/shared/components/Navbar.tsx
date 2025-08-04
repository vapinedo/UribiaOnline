import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@core/stores/useAuthStore';
import { toastError } from '@infrastructure/notifications/notificationAdapter';

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/personas', label: 'Personas' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toastError('Error al cerrar sesión');
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary bg-dark animate__animated animate__fadeInDown animate_faster"
      role="navigation"
      data-bs-theme="dark"
      aria-label="Barra de navegación principal"
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Resume Builder
        </NavLink>

        <button
          type="button"
          aria-expanded="false"
          data-bs-toggle="collapse"
          className="navbar-toggler"
          aria-label="Toggle navigation"
          aria-controls="navbarSupportedContent"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navLinks.map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <NavLink className="nav-link" to={to}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {user && (
            <button onClick={handleLogout} className="btn btn-danger">
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
