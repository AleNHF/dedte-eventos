import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/gatewayApi";

export default function CreateEvent() {
  // navigate
  const navigate = useNavigate();

  const [guests, setGuests] = useState([]);
  const [email, setEmail] = useState("");

  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handlers
  const handleCreateEvent = (data) => {
    const eventData = { ...data, people: guests };
    console.log('eventData', eventData);
    //crear
    api
      .post("/request", eventData) //http://localhost:3000/api/request
      .then((res) => {
        navigate("/eventos");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleClicAddPerson = () => {
    setGuests([...guests, { email: email }]);

    console.log(guests);
  }

  const handleDeleteGuest = (index) => {
    const updatedGuests = [...guests];
    updatedGuests.splice(index, 1);

    setGuests(updatedGuests);
  };

  return (
    <div className="container m-5">
      <h1>Crear Solicitud</h1>
      <form onSubmit={handleSubmit(handleCreateEvent)} className="row">
        <div className="col-12">
          <label className="form-label">Asunto del correo:</label>
          <input
            type="text"
            {...register("subject", { required: true })}
            className="form-control" id="name" />
          {errors?.name?.type === "required" && <p className="text-danger">El campo asunto es obligatorio*</p>}
        </div>
        <div className="col-12">
          <label className="form-label">Mensaje:</label>
          <input
            type="text"
            {...register("description", { required: true })}
            className="form-control" id="description"
          />
          {errors?.description?.type === "required" && <p className="text-danger">El campo mensaje es obligatorio*</p>}
        </div>

        <h4 className="m-3 text-center">Ingresa los datos del personal docente</h4>

        <div className="row d-flex align-items-end">
          <div className="col-5">
            <label className="form-label">Correo electrónico del docente:</label>
            <input
              type="email"
              className="form-control" id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors?.email?.type === "required" && <p className="text-danger">El campo correo electrónico es obligatorio*</p>}
          </div>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClicAddPerson}>
              Agregar
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <table className="table text-center my-5">
              <thead className="table-primary">
                <tr>
                  <th scope="col">Correo Electrónico</th>
                  <th scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest, index) => {
                  return (
                    <tr key={index}>
                      <td>{guest.email}</td>
                      <td>
                        <button className="btn btn-danger"
                          onClick={() => handleDeleteGuest(index)}>
                          <i className="bi bi-trash"></i> Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-12 text-end mt-3">
          <Link className="btn btn-secondary me-2" to={'/'}>
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary">
            Crear Solicitud
          </button>
        </div>
      </form>
    </div>
  );
}