import React from 'react';
import { useState, useEffect } from 'react';
import api from "../../api/gatewayApi";
import { Link, useParams } from "react-router-dom";

function AcceptedEvents() {
    const { id } = useParams();
    // states
    const [teachers, setTeachers] = useState([]);

    // initial values
    useEffect(() => {
        api
            .get(`teacher/status/true/request/${id}`)
            .then((res) => {
                console.log(res.data);
                setTeachers(res.data);
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
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Correo</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teachers.map((teacher, index) => (
                                        <tr key={index}>
                                            <td>{teacher.email}</td>
                                            <td>{teacher.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AcceptedEvents;
