import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'

export const Formulario = ({crearCita}) => {
    const [cita, setCita] =  useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    const [error, setError] = useState(false) 

    //Funcion que se ejcuta cda vez que el usuario escriba en un input
    const actualizarState = e =>{
        setCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // Extraer los valores 

    const { mascota, propietario, fecha, hora, sintomas } = cita

    //Cuando el usuario presiona agregar cita

    const submitCita = e => {
        e.preventDefault()
        //Validar
        if (mascota.trim() === '' || propietario.trim() === '' || 
            fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            setError(true);
            console.log('No esta completo');
            return;
        }

        // Eliminar el mensaje previo
        setError(false);
        //Asignar un ID
        cita.id = uuidv4()
        //Crear la cita
        crearCita(cita)
        //Reiniciar el form
        setCita({
          mascota: '',
          propietario: '',
          fecha: '',
          hora: '',
          sintomas: ''
        })
    }
    return (
      <>
        <h2>Crear cita</h2>
        {error ? <p className='alerta-error'>Todos los cambios son obligatorios</p> : '' }
        <form action="" onSubmit={submitCita}>
          <label htmlFor="">Nombre mascota</label>
          <input
            type="text"
            name="mascota"
            className="u-full-width"
            placeholder="Nombre mascota"
            onChange={actualizarState}
            value={mascota}
          />
          <label htmlFor="">Nombre del Dueño</label>
          <input
            type="text"
            name="propietario"
            className="u-full-width"
            placeholder="Nombre Dueño de la mascota"
            onChange={actualizarState}
            value={propietario}
          />
          <label htmlFor="">Fecha</label>
          <input 
            type="date" 
            name="fecha" 
            className="u-full-width" 
            onChange={actualizarState}
            value={fecha}
            />
          <label htmlFor="">Hora</label>
          <input 
            type="time" 
            name="hora" 
            className="u-full-width" 
            onChange={actualizarState}
            value={hora}
            />
          <label htmlFor="">Sintomas</label>
          <textarea 
            name="sintomas" 
            className="u-full-width"
            onChange={actualizarState}
            value={sintomas}
            ></textarea>
          <button type="submit" className="u-full-width button-primary">
            Agregar cita
          </button>
        </form>
      </>
    );
}

Formulario.propType = {
  crearCita:PropTypes.func.isRequired
}