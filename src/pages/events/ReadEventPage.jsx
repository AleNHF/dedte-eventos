import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/gatewayApi";

export default function ReadEventPage() {
  const { id } = useParams();

  // states
  const [event, setEvent] = useState([]);

  // initial values
  useEffect(() => {
    api
      .get(`/request/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container m-5">
      <div className="row d-flex justify-content-center">
        <div className="col-10">
          <Link to={"/eventos"} type="button" class="btn btn-primary mb-3">
            <i className="bi bi-arrow-left"></i> Volver
          </Link>
          <div className="card border-info mb-3" >
            <div className="card-body">
              <h5 className="card-title">Asunto del correo: {event.subject}</h5>
              <div className="row">
                <div className="col">
                  <p className="card-text">Mensaje: {event.description}</p>
                </div>
              </div>
              <div class="d-grid gap-2 d-md-block mt-3">
                <Link to={`/teacher/accepted/${id}`} type="button" class="btn btn-primary">
                  <i className="bi bi-person-check"></i> Ver solicitudes aceptadas
                </Link>
                <Link to={`/teacher/rejected/${id}`} type="button" class="btn btn-secondary mx-3">
                  <i className="bi bi-person-x"></i> Ver solicitudes rechazadas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}