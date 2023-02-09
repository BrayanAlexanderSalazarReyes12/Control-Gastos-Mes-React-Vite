export const generarId = () =>{
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)
    return random + fecha
}

export const  formatearCantidad = (dinero) => {
    return dinero.toLocaleString('en-ES',{
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })
}

export const formatearFecha = (fecha) =>{
    return fecha.toLocaleString('es-Es',{
        year:'numeric',
        month:'long',
        day:'2-digit'
    })
}
