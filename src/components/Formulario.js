import React, {useEffect, useState} from 'react';
import Swal from 'sweetalert2';

const Formulario = ({agregarEmpresa, selected, editarEmpresa}) => {
  const initialState = {
    id: 0,
    nombre: '',
    direccion: '',
    nit: '',
    telefono: ''
  };

	const [datos, cambiarDatos] = useState(initialState);

  useEffect(() => {
    const cargarSeleccionada = () => {
      if (selected && Object.keys(selected).length !== 0) {
        cambiarDatos(selected);
      } else {
        console.log(selected);
      }
    }
    cargarSeleccionada();
  }, [selected]);

	// Funcion que se encargara de validar los datos y enviar el formulario
	const handleSubmit = (e) => {
		e.preventDefault();
    if (!nombre.trim() || !direccion.trim() || !nit.trim() || !telefono.trim()) {
      Swal.fire({
        title: 'Error!',
        text: 'Llenar todos los campos, por favor',
        icon: 'error'
      });
      return;
    }
    if (id === 0) {
      agregarEmpresa({nombre, direccion, nit, telefono});
      Swal.fire({
        title: 'Éxito!',
        text: 'Empresa agregada',
        icon: 'success'
      });
    } else {
      editarEmpresa(id, {nombre, direccion, nit, telefono});
      Swal.fire({
        title: 'Éxito!',
        text: 'Empresa editada',
        icon: 'success'
      });
    }  
    cambiarDatos(initialState);
	}

	// Funcion que se encarga de cambiar los estados
	const handleInputChange = (e) => {
		cambiarDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
	}

  const {id, nombre, direccion, nit, telefono} = datos;

	return (
		<>
      <div className='contenedor'><h2>Agregar Empresa</h2></div>
			<form action='' onSubmit={handleSubmit} className='formulario'>
				<div>
					<label htmlFor='nombre'>Nombre</label>
					<input
						type='text'
            className='form-control mb-2'
						name='nombre'
						placeholder='Nombre'
						id='nombre'
						value={nombre}
						onChange={handleInputChange}
					/>
				</div>

        <div>
					<label htmlFor='direccion'>Direccion</label>
					<input
						type='text'
            className='form-control mb-2'
						name='direccion'
						placeholder='Direccion'
						id='direccion'
						value={direccion}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					<label htmlFor='nit'>Nit</label>
					<input
						type='number'
            className='form-control mb-2'
						name='nit'
						placeholder='Nit'
						id='nit'
						value={nit}
						onChange={handleInputChange}
					/>
				</div>

        <div>
					<label htmlFor='telefono'>Teléfono</label>
					<input
						type='number'
            className='form-control mb-2'
						name='telefono'
						placeholder='Teléfono'
						id='telefono'
						value={telefono}
						onChange={handleInputChange}
					/>
				</div>

				<button type='submit' className='btn btn-primary'>Enviar</button>
			</form>
		</>
	);
}
 
export default Formulario;