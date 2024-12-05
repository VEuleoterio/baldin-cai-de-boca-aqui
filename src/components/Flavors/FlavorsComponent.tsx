import { useEffect, useState } from "react";
import { api } from "../../axios";
import { NotFound } from "../../molecules/NotFound";
import Combobox from "react-widgets/cjs/Combobox";
import FlavorsList from "../../interfaces/FlavorList";
import { useNavigate } from "react-router-dom";

interface FlavorsComponentProps {}

const FlavorsComponent = (props: FlavorsComponentProps ) => {
  
  const navigate = useNavigate()
  const [flavorsList, setFlavorList] = useState<FlavorsList[]>([])
  const [lineBelowMenu, setLineBelowMenu] = useState(1)
  const [saborNome, setSaborNome] = useState<String>()
  const [valorBola, setValorBola] = useState(0.00)
  const cssClicked = 'w-full h-10 text-slate-50 border-b-2 border-b-white p-4 mb-2'
  const cssNotClicked = 'w-full h-10 text-slate-50 p-4 mb-2'
  const handleFlavors = async () => 
    {
      const response = await api.get(api.getUri() + 'api/sabores')
      console.log(typeof(response.data))
      setFlavorList(response.data)
    }
  const saveFlavor = async () => {
    
    var newFlavor = {
      nome: saborNome,
      valor: valorBola ?? 0 
    }
    const response = await api.post(api.getUri() + 'api/sabores', newFlavor)
    if(response.data === 201)
    {
    handleFlavors();
    }
    
  }
  const handleDeleteFlavor = (flavorId: number) => {
    
    api.patch(api.getUri() + `api/pedidos/excluir/${flavorId}`).then((res) =>{
      
      if(res.data === 200)
      handleFlavors();
    })
  }
  useEffect(() => {
    handleFlavors()
  }, [])
  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="flex flex-col justify-start h-full w-56 bg-lime-800">
        <div className={lineBelowMenu === 0 ? cssClicked : cssNotClicked + 'border-b-2'} onClick={() => navigate('/orders', {replace: true})}>
          Pedidos
        </div>
        <div className={lineBelowMenu === 1 ? cssClicked : cssNotClicked}>
          Sabores
        </div>
      </div>
      <div className="flex flex-row w-full h-full p-12 border-2 border-b-2 border-slate-800 m-4 mr-14">
        <div>
          Sabores
          {
            flavorsList && flavorsList.length > 0 ? (
            <div>
              {
                flavorsList.map((flavor, index) => 
                  <div className="flex flex-col justify-center text-center align-middle p-2 bg-orange-950 mb-2" key={index}>
                    <span>Nome do sabor {flavor.nome}</span>
                    <span>Quantidade de Sabores {flavor.valorBola}</span>
                  </div>
                )
              }
            </div>
            ) : (
            <div>
              <NotFound principalMessage="Nenhum sabor encontrado" secondaryMessage="Talvez tente cadastrar um!"></NotFound>
            </div>
          )
          }
        </div>

        <div>
            <div className='flex m-0 justify-center align-middle items-center'>
            <div className='flex flex-col p-12'>
                Adicionar Sabor
                <input type="text" placeholder="Nome do Sabor" className='bg-gray-50' onChange={(e) => setSaborNome(e.target.value)}/>
                <input type="number" placeholder="Valor" className='bg-gray-50' onChange={(e) => setValorBola(Number(e.target.value))}/>
                <button onClick={saveFlavor}>Cadastrar Sabor</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default FlavorsComponent;
