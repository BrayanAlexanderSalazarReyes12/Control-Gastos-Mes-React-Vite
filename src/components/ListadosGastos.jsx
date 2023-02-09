import Gasto from "./Gasto"

const ListadosGastos = ({
    nuevoGasto,
    setGastoEditar,
    eliminarGasto,
    filtros,
    filtroGasto
  }) => {
  return (
    <div className="listado-gastos contenedor">
        {
          filtros ? (
            <>
              <h2>{filtroGasto.length ? 'Gastos' : 'No hay gastos aún para esta categoria'}</h2>
              {filtroGasto.map(gasto => (
                  <Gasto 
                      key = {gasto.id}
                      gasto = {gasto}
                      setGastoEditar = {setGastoEditar}
                      eliminarGasto = {eliminarGasto}
                      filtros = {filtros}
                  />
              ))}
            </>
          ):(
            <>
              <h2>{nuevoGasto.length ? 'Gastos' : 'No hay gastos aún'}</h2>
              {nuevoGasto.map(gasto => (
                  <Gasto 
                      key = {gasto.id}
                      gasto = {gasto}
                      setGastoEditar = {setGastoEditar}
                      eliminarGasto = {eliminarGasto}
                      filtros = {filtros}
                  />
              ))}
            </>
          )
        }
    </div>
  )
}

export default ListadosGastos
