export function capitalize(string: String) {
    const nombres = String(string).toLowerCase().split(' ')
    let fixed = ''
    nombres.forEach((nombre) => {
        let capitalizado = nombre.charAt(0).toUpperCase() + nombre.substr(1) + ' '
        fixed += capitalizado
    })
    return String(fixed)
}