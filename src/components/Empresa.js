const Empresa = ({ empresa, eliminarEmpresa, idEmpresaEditar = () => {} }) => {
  const { id, nombre, direccion, nit, telefono } = empresa;

  return (
    <li className='list-group-item d-flex justify-content-between align-items-start'>
      <div className='ms-2 me-auto'>
        <div className='fw-bold'>
          {nombre} (NIT: {nit})
        </div>
        <p>Dirección: {direccion}</p>
        <div>
          <button className='btn btn-success' onClick={() => idEmpresaEditar(empresa)}>Editar</button>
          <button className='btn btn-danger me-2' onClick={() => eliminarEmpresa(id)}>Eliminar</button>
        </div>
      </div>

      <div>
        <span className='badge bg-primary rounded-pill'>Teléfono: {telefono}</span>
      </div>
    </li> 
  );
};

export default Empresa;