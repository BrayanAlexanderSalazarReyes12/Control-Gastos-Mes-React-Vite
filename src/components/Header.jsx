import ControlPresupuesto from "./ControlPresupuesto"
import NuevoPresupuesto from "./NuevoPresupuesto"

const Header = ({
        presupuesto, 
        setPresupuesto, 
        isValidPresupuesto, 
        setIsValidPresupuesto,
        nuevoGasto,
        GastosT,
        DisponibleT,
        setNuevoGasto,
        setGastosTotal,
        setFiltroGasto,
        setFiltros
    }) => {
  return (
    <header>
        <h1>Planificador De Gastos</h1>
        {isValidPresupuesto ? (
            <ControlPresupuesto 
                presupuesto = {presupuesto}
                nuevoGasto = {nuevoGasto}
                GastosT = {GastosT}
                DisponibleT = {DisponibleT}
                setNuevoGasto = {setNuevoGasto}
                setPresupuesto = {setPresupuesto}
                setIsValidPresupuesto = {setIsValidPresupuesto}
                setGastosTotal = {setGastosTotal}
                setFiltroGasto = {setFiltroGasto}
                setFiltros = {setFiltros}
            />
        ):(
            <NuevoPresupuesto 
                presupuesto = {presupuesto}
                setPresupuesto = {setPresupuesto}
                setIsValidPresupuesto = {setIsValidPresupuesto}
            />
        )}
        
    </header>
  )
}

export default Header
