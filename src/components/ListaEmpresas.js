import { useEffect, useState } from 'react';
import Formulario from './Formulario';
import Empresa from './Empresa';
import { consulta, crear_form_data, formulario } from '../global/js/funciones';
import Swal from 'sweetalert2';

const ListaEmpresas = () => {
  const [empresas, cambiarEmpresas] = useState([]);
  const [selected, setSelected] = useState({});
  // const [modal, cambiarModal] = useState(false);

  useEffect(() => {
    listaEmpresas();
  }, []);

  const listaEmpresas = () => {
    consulta(`api/v1.0/empresas`, null, 'get', (error, estado, resp) => {
      if (estado === 200) cambiarEmpresas(resp);
    });
  }

  const agregarEmpresa = empresa => {
    crearEmpresa(empresa);
  }

  const borrarEmpresa = (id) => {
    eliminarEmpresa(id);
    Swal.fire({
      title: 'Eliminada!',
      text: 'Empresa eliminada correctamente',
      icon: 'success'
    });
    listaEmpresas();
  }

  const editarEmpresa = (id, empresa) => {
    modificarEmpresa(id, empresa);
  }

  const crearEmpresa = async(data) => {
    const form = await crear_form_data(data);
    formulario(`api/v1.0/empresa/crear`, form, 'post', (error, estado, resp) => {
      if (!error) {
        if (estado === 200) {
          listaEmpresas();
        } else {
          console.log('Hubo un error');
        }
      }
    });
  }

  const modificarEmpresa = async(id, data) => {
    const form = await crear_form_data(data);
    formulario(`api/v1.0/empresa/editar/${id}`, form, 'put', (error, estado, resp) => {
      if (!error) {
        if (estado === 200) {
          listaEmpresas();
        } else {
          console.log('Hubo un error');
        }
      }
    });
  }

  const eliminarEmpresa = (id) => {
    consulta(`api/v1.0/empresa/eliminar/${id}`, null, 'delete', (error, estado, resp) => {
      if (!error) {
        if (estado === 200) {
          console.log('Eliminada');
        } else {
          console.log('Hubo un error');
        }
      }
    });
  }

  return (
    <div>
      <Formulario agregarEmpresa={agregarEmpresa} selected={selected} editarEmpresa={editarEmpresa} />
      {/* <button className='btn btn-secondary' onClick={ () => cambiarModal(true) }>Agregar empresa</button> */}
      <h1>ListaEmpresas</h1>
      <ul className='list-group list-group-numbered mt-2'>
        {
          empresas.map((item, index) => (
            <Empresa key={index} empresa={item} eliminarEmpresa={borrarEmpresa} idEmpresaEditar={ (selected) => setSelected(selected) } />
          ))
        }
      </ul>
    </div>
  );
};

export default ListaEmpresas;