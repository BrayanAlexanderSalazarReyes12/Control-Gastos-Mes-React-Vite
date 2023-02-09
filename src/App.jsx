import { useState, useEffect } from 'react'
import Filtros from './components/Filtros';
import Header from './components/Header'
import ListadosGastos from './components/ListadosGastos';
import Modal from './components/Modal';
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [presupuesto,setPresupuesto] = useState(Number(localStorage.getItem("Presupuesto")) ?? 0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal,setAnimarModal] = useState(false)
  const [nuevoGasto,setNuevoGasto] = useState(localStorage.getItem("Gastos") ? JSON.parse(localStorage.getItem("Gastos")) : [])
  const [gastosTotal, setGastosTotal] = useState(0)
  const [gastoEditar,setGastoEditar] = useState({})
  const [filtros,setFiltros] = useState('')
  const [filtroGasto, setFiltroGasto] = useState([])

  const gastado = (gasto,gastoA,gastoE) => {
    if(Object.keys(gastoEditar).length > 0){
      setGastosTotal(gasto+gastosTotal-gastoA)
    }else{
      setGastosTotal(gasto+gastosTotal-gastoE)
    }
  }

  const GastosT = () =>{
    const valor = gastosTotal
    return valor
  }

  const DisponibleT = () =>{
    const DisponibleTotal = presupuesto - gastosTotal
    return DisponibleTotal
  }

  useEffect(()=>{
    localStorage.setItem("Presupuesto",presupuesto ?? 0)
  },[presupuesto])

  useEffect(()=>{
    localStorage.setItem("Gastos",JSON.stringify(nuevoGasto) ?? [])
  },[nuevoGasto])

  useEffect(()=>{
    if(filtros){
      const gastosFiltrado = nuevoGasto.filter(gasto => gasto.categoria === filtros)
      setFiltroGasto(gastosFiltrado)
    }
  },[filtros])

  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem("Presupuesto")) ?? 0
    const gastoLS = JSON.parse(localStorage.getItem("Gastos")) ?? []
    let gastomap = 0
    gastoLS.map(gasto => gastomap += gasto.cantidad)
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
    if(Object.keys(gastoLS).length > 0){
      gastado(Number(gastomap),0,0)
    }

  },[])

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const eliminarGasto = id =>{
    const gastosActualizado = nuevoGasto.filter(gasto => gasto.id !== id)
    let gastoEliminado = 0
    nuevoGasto.filter(gasto => {if(gasto.id === id){gastoEliminado=gasto.cantidad}})
    gastado(0,0,Number(gastoEliminado))
    setNuevoGasto(gastosActualizado)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto = {isValidPresupuesto}
        setIsValidPresupuesto = {setIsValidPresupuesto}
        nuevoGasto = {nuevoGasto}
        GastosT = {GastosT}
        DisponibleT = {DisponibleT}
        setNuevoGasto = {setNuevoGasto}
        setGastosTotal = {setGastosTotal}
        setFiltroGasto = {setFiltroGasto}
        setFiltros = {setFiltros}
      />

      {isValidPresupuesto &&(
        <>
          <main>
            <Filtros 
              filtros = {filtros}
              setFiltros = {setFiltros} 
            />
            <ListadosGastos 
              nuevoGasto = {nuevoGasto}
              setGastoEditar = {setGastoEditar}
              eliminarGasto = {eliminarGasto}
              filtros = {filtros}
              filtroGasto = {filtroGasto}
            />
          </main>
          <div className="nuevo-gasto">
            <img src={IconoNuevoGasto} onClick={handleNuevoGasto}/>
          </div>
        </>
      )}

      {modal && 
        <Modal 
          setModal = {setModal}
          animarModal = {animarModal}
          setAnimarModal = {setAnimarModal}
          presupuesto = {presupuesto}
          nuevoGasto = {nuevoGasto}
          setNuevoGasto = {setNuevoGasto}
          gastado = {gastado}
          gastoEditar = {gastoEditar}
          setGastoEditar = {setGastoEditar}
        />
      }
    </div>
  )
}

export default App
