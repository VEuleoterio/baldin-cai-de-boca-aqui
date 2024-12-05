import { useEffect, useState } from "react";
import { api } from "../../axios";
import { NotFound } from "../../molecules/NotFound";
import OrdersList from "../../interfaces/OrdersList";
import Combobox from "react-widgets/cjs/Combobox";
import { useNavigate } from "react-router-dom";

interface OrdersComponentProps {}

const OrdersComponent = (props: OrdersComponentProps ) => {
  
  const navigate = useNavigate()
  const [ordersList, setOrdersList] = useState<OrdersList[]>([])
  const [lineBelowMenu, setLineBelowMenu] = useState(0)
  const [clientName, setClientName] = useState<String>()
  const [flavorQuantity, setFlavorQuantity] = useState<Number>()
  const [flavor1, setFlavor1] = useState<any>()
  const [flavor2, setFlavor2] = useState<any>()
  const [flavorList, setFlavorList] = useState<any>()
  const cssClicked = 'w-full h-10 text-slate-50 border-b-2 border-b-white p-4 mb-2'
  const cssNotClicked = 'w-full h-10 text-slate-50 p-4 mb-2'
  const handleOrders = async () => {
    
    try {
      
      let response = await api.get(api.getUri() + 'api/pedidos')
      setOrdersList(response.data)
    } catch (error) {
      window.alert('Ocorreu um erro carregando os pedidos :d')
    }
  }
  const handleFlavors = async () => 
    {
      const response = await api.get(api.getUri() + 'api/sabores')
      console.log(typeof(response.data))
      setFlavorList(response.data)
    }
  const saveOrder = async () => {
    
    console.log('nome ',clientName,'n bolas', flavorQuantity)
    console.log('  sabor 1 ',flavor1,'  sabor 2  ', flavor2)
    
    var newOrder = {
      nomeCliente: clientName,
      quantidadeBolas: flavorQuantity,
      sabor1Id: flavor1.id,
      sabor2Id: flavor2?.id ?? null,
      valor: flavor1.valorBola + (flavor2?.valorBola ?? 0) 
    }
    const response = await api.post(api.getUri() + 'api/pedidos', newOrder)
    if(response.data === 201)
    {
    handleOrders();
    }
    
  }
  const handleDeleteOrder = (orderId: number) => {
    
    api.patch(api.getUri() + `api/pedidos/excluir/${orderId}`).then((res) =>{
      
      if(res.data === 200)
      handleOrders();
    })
  }
  useEffect(() => {
    handleOrders()
    handleFlavors()
  }, [])
  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="flex flex-col justify-start h-full w-56 bg-lime-800">
        <div className={lineBelowMenu === 0 ? cssClicked : cssNotClicked}>
          Pedidos
        </div>
        <div className={lineBelowMenu === 1 ? cssClicked : cssNotClicked} onClick={() => navigate('/flavors', {replace: true})}>
          Sabores
        </div>
      </div>
      <div className="flex flex-row w-full h-full p-12 border-2 border-b-2 border-slate-800 m-4 mr-14">
        <div>
          Pedidos
          {
            ordersList && ordersList.length > 0 ? (
            <div>
              {
                ordersList.map((order, index) => 
                  <div className="flex flex-col justify-center text-center align-middle p-2 bg-orange-950 mb-2" key={index}>
                    <span>Nome do cliente {order.nomeCliente}</span>
                    <span>Quantidade de Sabores {order.quantidadeBolas}</span>
                    <span>Sabor 1 {order.sabor1.nome}</span>
                    <span>Sabor 2{(order.sabor2 && order.sabor2.nome) ?? ''}</span>
                    <span>Valor {order.valor}</span>
                    <div className="w-full h-full bg-red-500" onClick={() => handleDeleteOrder(order.id)}>Deletar</div>
                  </div>
                )
              }
            </div>
            ) : (
            <div>
              <NotFound principalMessage="Nenhum pedido encontrado" secondaryMessage="Talvez tente cadastrar um!"></NotFound>
            </div>
          )
          }
        </div>

        <div>
            <div className='flex m-0 justify-center align-middle items-center'>
            <div className='flex flex-col p-12'>
                Adicionar Pedido
                <input type="text" name='Nome do Cliente' placeholder="Nome do Cliente" className='bg-gray-50' onChange={(e) => setClientName(e.target.value)}/>
                <input type="number" name='Quantidade de bolas' placeholder="N° de bolas" className='bg-gray-50' onChange={(e) => setFlavorQuantity(Number(e.target.value))}/>
                {/* <input type="password" name='password' className='bg-gray-50' onChange={(e) => setPassword(e.target.value)}/> */}
                <Combobox
                  defaultValue={"Selecione um valor"}
                  dataKey={"id"}
                  textField={"nome"}
                  data={flavorList}
                  onChange={(e) => setFlavor1(e)}
                  />
                <Combobox
                  defaultValue={"Selecione um valor"}
                  dataKey={"id"}
                  textField={"nome"}
                  data={flavorList}
                  onChange={(e) => setFlavor2(e)}
                />
                <button onClick={saveOrder}>Cadastrar Pedido</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default OrdersComponent;
