import { NavLink, useMatch } from 'react-router-dom';
import logo_dedte from '../assets/images/logo_dedte.png'
import PropTypes from 'prop-types'

export default function SideBar({ menuItems }) {
  return (
    <aside className="bg-white shadow-sm text-dark w-full">
      <div className="text-center border-bottom pb-3 ">
        <div className="row justify-content-center text-center">
          <img
            className="img-fluid col-3 mt-3"
            src={logo_dedte}
            alt="logo"
            style={{ width: '50%', maxWidth: '500px' }}
          />
        </div>
      </div>
      <nav>
        <ul className='nav flex-column vh-100'>
          {menuItems.map((item, index) => {
            const match = useMatch(item.route);
            return (
              <li key={index} className="my-1 mx-2">
                <NavLink
                  to={item.route}
                  className={match ? "nav-link active bg-primary rounded text-light" : "nav-link"}
                >
                  <i className={`bi ${item.icon} icono`}></i>&nbsp;
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

SideBar.proptypes = {
  menuItems: PropTypes.array.isRequired,
}