import React, { useState, useEffect } from "react";
import { Cita } from "./components/Cita";
import { Formulario } from "./components/Formulario";



function App() {
  let CitasIniciales = JSON.parse(localStorage.getItem('citas'))
  //Citas en local Storage
  if (!CitasIniciales) {
    CitasIniciales = [];
  }

  //Arreglo de citas principal
  const [citas, guardarCitas] = useState([]);

  //UseEffect para realizar varias operacines cuando el state cambia
  useEffect(() => {
    let CitasIniciales = JSON.parse(localStorage.getItem('citas'))
   if (CitasIniciales) {
    localStorage.setItem('citas' , JSON.stringify(citas));
   }
   else{
    localStorage.setItem('citas', JSON.stringify([]));
   }
  },[citas])
  
  //Funcion que toma las citas actuales y agrega las nueva
  const crearCita = (cita) => {
    guardarCitas([...citas, cita])
  }

  //Funcion que elimina una cita por su Id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas)
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Admonistra tus citas';
  return (
    <>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
              key={cita.id} 
              cita={cita}
              eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
