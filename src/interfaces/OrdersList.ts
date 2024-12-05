export default interface OrdersList {
    id: number,
    nomeCliente: string,
    quantidadeBolas: number,
    sabor1: {
        id: number,
        nome: string,
        valorBola: number
    }
    sabor2?: {
        id: number,
        nome: string,
        valorBola: number
    }
    valor: number
}