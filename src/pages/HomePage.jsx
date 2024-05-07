import { useEffect, useState } from "react";
import api from "../api/gatewayApi.js";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";

export default function HomePage() {
  // navigation
  const navigate = useNavigate();

  // states
  const [events, setEvents] = useState([]);

  // initial values
  useEffect(() => {
    api
      .get("/admin/1/events")
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
                title={event.name} 
                description={event.description} 
                /* time={`Hora: ${event.time}`} */ />
            </div>
          );
        })}
      </div>
    </div>
  );
}