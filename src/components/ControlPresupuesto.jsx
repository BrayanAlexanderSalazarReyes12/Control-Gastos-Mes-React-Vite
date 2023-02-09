import {formatearCantidad} from '../helpers'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
const ControlPresupuesto = ({
        presupuesto,
        GastosT,
        DisponibleT,
        setNuevoGasto,
        setPresupuesto,
        setIsValidPresupuesto,
        setGastosTotal,
        setFiltroGasto,
        setFiltros
    }) => { 
    
        const [porcentaje,setPorcentaje] = useState(0)
    
    useEffect(()=>{
        if(GastosT() > 0){    
            const calporcentaje = ((GastosT() * 100)/presupuesto).toFixed(2)
            setTimeout(() => {
                setPorcentaje(calporcentaje)
            }, 1500);  
        }else{
            setTimeout(() => {
                setPorcentaje(0)
            }, 1500);
        }
    },[GastosT])

    const handleResetApp = () =>{
        Swal.fire({
            title: 'Desea reniciar presupuesto y gastos?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'App Reiniciada!'
              )
              setNuevoGasto([])
              setPresupuesto(0)
              setGastosTotal(0)
              setFiltroGasto([])
              setFiltros('')
              setIsValidPresupuesto(false)
            }
        })
        
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            
            <div className="contenido-presupuesto">
                <button className='reset-app' type='button' onClick={handleResetApp}>
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
                </p>

                <p className={`${DisponibleT() < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span>{formatearCantidad(DisponibleT())}
                </p>

                <p>
                    <span>Gastada: </span>{formatearCantidad(GastosT())}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
