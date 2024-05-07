import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/gatewayApi";
import Card from "../../components/Card";

export default function PhotographsPage() {
  // navigation
  const navigate = useNavigate();

  // states
  const [events, setEvents] = useState([]);
  
  const photographerId = +localStorage.getItem("idPhotographer");
  console.log('photographerId', photographerId);
  // initial values
  useEffect(() => {
    api
      .get('request')
      .then((res) => {
        console.log(res.data);
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container m-5">
      <h2>Solicitudes</h2>
      <div className="row">
        {events.map((event) => {
          return (
            <div className="col-3" key={event.id}>
              <Card
                id={event.id} 
                title={`Fecha: ${event.subject}`} 
                description={`Descripción: ${event.description}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}