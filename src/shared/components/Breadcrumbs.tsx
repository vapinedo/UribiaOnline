import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const uuidRegex = /^[a-f\d]{8}-([a-f\d]{4}-){3}[a-f\d]{12}$/i;

// Convierte 'nueva-persona' => 'Nueva Persona'
function normalizarTexto(texto: string) {
  return texto.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const crumbsArr = pathname.split('/').filter((crumb) => crumb !== '');
  const noUUIDCrumbsArr = crumbsArr.filter((crumb) => !uuidRegex.test(crumb));

  if (noUUIDCrumbsArr.length < 1) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumbs d-flex align-items-center list-unstyled m-0 p-0">
        <li>
          <Link to="/">Inicio</Link>
        </li>

        {noUUIDCrumbsArr.map((name, index) => {
          const path = '/' + noUUIDCrumbsArr.slice(0, index + 1).join('/');
          const isLast = index === noUUIDCrumbsArr.length - 1;

          return (
            <React.Fragment key={name}>
              <li className="mx-2">
                <i className="bx bx-chevron-right" />
              </li>
              <li aria-current={isLast ? 'page' : undefined}>
                {isLast ? (
                  <span className="text-secondary">{normalizarTexto(name)}</span>
                ) : (
                  <NavLink to={path}>{normalizarTexto(name)}</NavLink>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
