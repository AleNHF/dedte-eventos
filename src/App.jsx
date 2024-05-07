import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar';
import Events from './pages/events/Events';
import CreateEvent from './pages/events/CreateEvent';
import ReadEventPage from './pages/events/ReadEventPage';
import AcceptedEvents from './pages/docentes/acepted_events';

function App() {
  // options
  let arNavBarOption = [
    { option: 'bi bi-question-circle', to: '/ayuda' },
    { option: 'bi bi-gear', to: '/configuracion' },
  ];

  const menuItemsOrganizador = [
    { icon: 'bi-grid-fill', name: 'Inicio', route: '/admin' },
    { icon: 'bi-grid-fill', name: 'Gestionar Solicitudes', route: '/admin/eventos' },
    //{ icon: 'bi-calendar', name: 'Revisar solicitudes', route: '/admin/docentes' },
  ];

  return (
    <div>
      <BrowserRouter>
        <NavBar opciones={arNavBarOption} />

        <Routes>
          {/* <Route index element={<LoginPage />} />
          <Route path='/registro' element={<RegisterPage />}/> */}
          <Route path='/' element={<Events />} />

          <Route path='/admin' element={
            <div className='d-flex'>
              <div className="col-2">
                <SideBar menuItems={menuItemsOrganizador} />
              </div>
              <Outlet />
            </div>
          }>
            <Route index element={<Events />} />
            <Route path='eventos' element={<Events />} />
            <Route path='eventos/crear' element={<CreateEvent />} />
            <Route path='fotografos' element={<CreateEvent />} />
            <Route path=':id' element={<ReadEventPage />} />
            <Route path='teacher/accepted/:id' element={<AcceptedEvents />} />
          </Route>

        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
