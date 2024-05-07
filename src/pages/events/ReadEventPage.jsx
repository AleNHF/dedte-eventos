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
          <div className="card border-info mb-3" >
            <div className="card-header bg-transparent border-info">
            </div>
            <div className="card-body">
              <h5 className="card-title">{event.subject}</h5>
              <div className="row">
                <div className="col">
                  <p className="card-text">{event.description}</p>
                </div>
              </div>
            </div>
            <Link to={`/admin/teacher/accepted/${id}`}type="button" class="btn btn-primary">
              <i className="bi bi-eye"></i> Ver solicitudes aceptadas
            </Link>
          </div>
          <Link to={"/"} type="button" class="btn btn-primary">
            <i className="bi bi-arrow-left"></i> Volver
          </Link>
        </div>
      </div>
    </div>
  );
}