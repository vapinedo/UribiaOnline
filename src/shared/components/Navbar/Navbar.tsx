import '@shared/components/Navbar/Navbar.css';
import { APP_NAME } from '@shared/constants/config';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@feature/auth/stores/useAuthStore';
import { toastError } from '@infra/ui/notifications/toast/toastAdapter';

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/fundaciones', label: 'Fundaciones' },
  {
    label: 'Formatos',
    children: [
      { to: '/formato-rpp', label: 'Formato RPP - ICBF' },
      { to: '/resumes', label: 'Formato Unico Hoja de Vida' },
    ],
  },
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
          {APP_NAME}
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
            {navLinks.map((item) =>
              item.children ? (
                <li className="nav-item dropdown" key={item.label}>
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id={`dropdown-${item.label}`}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {item.label}
                  </a>
                  <ul className="dropdown-menu custom-navbar-dropdown" aria-labelledby={`dropdown-${item.label}`}>
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <NavLink className="dropdown-item" to={child.to}>
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li className="nav-item" key={item.to}>
                  <NavLink className="nav-link" to={item.to}>
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
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
