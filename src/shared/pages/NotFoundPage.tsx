import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: '100vh', textAlign: 'center' }}
    >
      <h1 className="display-4 text-danger">404</h1>
      <p className="lead">Oops, la página que buscas no existe.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Volver al inicio
      </Link>
    </div>
  );
}
