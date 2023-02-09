import { useEffect, useState } from 'react'
import Mensaje from './Mensaje'
import {generarId,formatearCantidad,formatearFecha} from '../helpers'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({
        setModal,
        animarModal,
        setAnimarModal,
        presupuesto,
        nuevoGasto,
        setNuevoGasto,
        gastado,
        gastoEditar,
        setGastoEditar
    }) => {
    
    const [nombreGasto,setNombreGasto] = useState('')
    const [cantidad,setCantidad] = useState('')
    const [categoria,setCategoria] = useState('')
    const [mensaje, SetMesnaje] = useState('')
    const [id,setId] = useState('')
    const [fecha,setFecha] = useState('')
    const [gastoAntiguo, setGastoAntiguo] = useState('')

    useEffect(()=>{
        if(Object.keys(gastoEditar).length > 0){
            setNombreGasto(gastoEditar.nombreGasto)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
            setGastoAntiguo(gastoEditar.cantidad)
        }
    },[])

    const handleCerrar = () =>{
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        },500);
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(id){
            if([nombreGasto,cantidad,categoria].includes('')){
                SetMesnaje('Todos los campos son obligatorios')
                setTimeout(() => {
                    SetMesnaje('')
                }, 3000);
            }else if(Number(presupuesto)<Number(cantidad)){
                SetMesnaje(`El valor de la cantidad: ${formatearCantidad(cantidad)} no puede superar al presupuesto: ${formatearCantidad(presupuesto)}`)
                setTimeout(() => {
                    SetMesnaje('')
                }, 5000);
            }else{
                const objetoGastosActualizado = {
                    nombreGasto,
                    cantidad,
                    categoria,
                    id,
                    fecha
                }
                const gastosActualizado = nuevoGasto.map(gastoState => objetoGastosActualizado.id === gastoState.id ? objetoGastosActualizado : gastoState)
                setNuevoGasto(gastosActualizado)
                handleCerrar()
                gastado(cantidad,gastoAntiguo,0)
            }
        }else{
            if([nombreGasto,cantidad,categoria].includes('')){
                SetMesnaje('Todos los campos son obligatorios')
                setTimeout(() => {
                    SetMesnaje('')
                }, 3000);
            }else if(Number(presupuesto)<Number(cantidad)){
                SetMesnaje(`El valor de la cantidad: ${formatearCantidad(cantidad)} no puede superar al presupuesto: ${formatearCantidad(presupuesto)}`)
                setTimeout(() => {
                    SetMesnaje('')
                }, 5000);
            }else{
                const objetoGastos = {
                    nombreGasto,
                    cantidad,
                    categoria
                }
                objetoGastos.id = generarId()
                objetoGastos.fecha = formatearFecha(new Date())
                setNuevoGasto([...nuevoGasto, objetoGastos])
                handleCerrar()
                gastado(cantidad,0,0)
            }
        }
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img src={CerrarBtn} alt="cerrar modal" onClick={handleCerrar}/>
            </div>

            <form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
                <legend>{gastoEditar.nombreGasto ? 'Editar gasto' : 'Nuevo gasto'}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <div className="campo">
                    <label htmlFor="nombre">{gastoEditar.nombreGasto ? 'Editar Gasto' : 'Nombre Gasto'}</label>
                    <input type="text" placeholder='Añade el nombre del gasto' id='nombre' value={nombreGasto} onChange={e => setNombreGasto(e.target.value)}/>
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input type="number" placeholder='Añade la cantidad del gasto: ej. 300' id='cantidad' value={cantidad} onChange={e => setCantidad(Number(e.target.value))}/>
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select name="" id="categorias" value={categoria} onChange={e => setCategoria(e.target.value)}>
                        <option value="">-- Selecione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gasto">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit" value={gastoEditar.nombreGasto ? 'Guardar Cambios' : 'Añadir Gasto'}/>
                
            </form>
        </div>
    )
}

export default Modal
