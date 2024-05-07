import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo_dedte from "../../assets/images/logo_dedte.png";
import api from "../../api/gatewayApi";
import { useEffect, useState } from "react";

export default function LoginPage() {
  // navigate
  const navigate = useNavigate();

  // states
  const [roles, setRoles] = useState([]);
  const [rol, setRole] = useState("");

  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    api
      .get("/rol")
      .then((res) => {
        console.log(res.data);
        setRoles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ESTA FUNCION ES PARA MANEJAR LA NAVEGACION DEL USUARIO DESPUES DE LOGUEARSE

  // const handleUser = () => {
  //     const fetchUser = async () => {
  //     try {
  //         const token = localStorage.getItem("token");
  //         const response = await api.get('/usuario/token', {
  //             headers: {
  //                 "x-token": token
  //             }
  //         })
  //         .then((response)=>{
  //           usuario = response.data.usuario;

  //           switch (usuario.rol.name) {
  //             case 'Organizador':
  //                 return navigate('/organizadores')
  //             case 'Fotografo':
  //                 return navigate('/fotografos')
  //             default:
  //                 return navigate('/')
  //           }
  //         });
  //     } catch (error) {
  //         console.error(error);
  //     }
  //     };
  //     fetchUser();
  // };

  const handleProviderSubmit = (data) => {
    if (rol === "admin") {
      // Iniciar sesion como organizador
      api
        .post("/auth/organizer/signin", data)
        .then((res) => {
          localStorage.setItem("idOganizer", res.data.id);
          navigate("/admin/eventos");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center text-center mt-5">
        <img
          className="img-fluid col-3"
          src={logo_dedte}
          alt="logo"
          style={{ width: '50%', maxWidth: '500px' }}
        />
      </div>
      <div className="row justify-content-center text-start mt-5">
        <div className="col-6">
          <form
            className="row g-3"
            onSubmit={handleSubmit(handleProviderSubmit)}
          >
            <div className="col-12">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="form-control" id="email" />
              {errors?.email?.type === "required" && <p className="text-red-600">El campo correo electrónico es obligatorio*</p>}
            </div>
            <div className="col-12">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="form-control" id="password"
              />
              {errors?.password?.type === "required" && <p className="text-red-600">El campo contraseña es obligatorio*</p>}
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Iniciar Sesión
              </button>
              {/* <Link
                to="/registro"
                className="btn link-primary"
              >
                Aún no tienes una cuenta?, Regístrate
              </Link> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
