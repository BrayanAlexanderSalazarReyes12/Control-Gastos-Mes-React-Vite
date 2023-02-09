import {formatearCantidad} from '../helpers'
import { Imagenes } from './Imagenes'
import {LeadingActions,SwipeableList,SwipeableListItem,SwipeAction,TrailingActions} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {
    const {categoria,cantidad,nombreGasto,id,fecha} = gasto
    
    const leadingActions  = () =>(
        <LeadingActions>
            <SwipeAction onClick={()=>setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () =>(
        <TrailingActions>
            <SwipeAction onClick={()=>eliminarGasto(id)} destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
                <div className="gasto sombra" id={id}>
                    <div className="contenido-gasto">
                        <img src={Imagenes[categoria]} alt="Icono Gasto"/>
                        <div className="descripcion-gasto">
                            <p className="categoria">{categoria}</p>
                            <p className="nombre-gasto">{nombreGasto}</p>
                            <p className="fecha-gasto">
                                Agregado el: {''}
                                <span>{fecha}</span>
                            </p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">{formatearCantidad(cantidad)}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Gasto
