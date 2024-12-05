import { useEffect, useState } from "react";
import { api } from "../../axios";
import { NotFound } from "../../molecules/NotFound";
import OrdersList from "../../interfaces/OrdersList";
import Combobox from "react-widgets/cjs/Combobox";
import { useNavigate } from "react-router-dom";

interface OrdersComponentProps {}

const OrdersComponent = (props: OrdersComponentProps) => {
  const navigate = useNavigate();

  const [ordersList, setOrdersList] = useState<OrdersList[]>([]);
  const [lineBelowMenu, setLineBelowMenu] = useState(0);
  const [clientName, setClientName] = useState<String>();
  const [flavorQuantity, setFlavorQuantity] = useState<Number>();
  const [flavor1, setFlavor1] = useState<any>();
  const [flavor2, setFlavor2] = useState<any>();
  const [flavorList, setFlavorList] = useState<any>();

  const cssClicked =
    "w-full h-10 text-white bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 p-4 mb-2 rounded-lg shadow-md";
  const cssNotClicked =
    "w-full h-10 text-white bg-gradient-to-r from-indigo-400 via-pink-400 to-orange-400 p-4 mb-2 rounded-lg hover:shadow-lg transition-all duration-300";

  const handleOrders = async () => {
    try {
      let response = await api.get(api.getUri() + "api/pedidos");
      setOrdersList(response.data);
    } catch (error) {
      window.alert("Ocorreu um erro carregando os pedidos :(");
    }
  };

  const handleFlavors = async () => {
    const response = await api.get(api.getUri() + "api/sabores");
    setFlavorList(response.data);
  };

  const saveOrder = async () => {
    var newOrder = {
      nomeCliente: clientName,
      quantidadeBolas: flavorQuantity,
      sabor1Id: flavor1.id,
      sabor2Id: flavor2?.id ?? null,
      valor: flavor1.valorBola + (flavor2?.valorBola ?? 0),
    };
    const response = await api.post(api.getUri() + "api/pedidos", newOrder);
    if (response.data === 201) {
      handleOrders();
    }
  };

  const handleDeleteOrder = (orderId: number) => {
    api.patch(api.getUri() + `api/pedidos/excluir/${orderId}`).then((res) => {
      if (res.data === 200) handleOrders();
    });
  };

  useEffect(() => {
    handleOrders();
    handleFlavors();
  }, []);

  return (
    <div
      className="flex flex-row h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20230711/pngtree-melted-ice-cream-art-collage-a-creative-depiction-of-food-and-image_3840120.jpg')",
      }}
    >
      {/* Menu Lateral */}
      <div className="flex flex-col justify-start h-full w-56 bg-gradient-to-b from-purple-300 via-pink-300 to-blue-400 opacity-90">
        <div className={lineBelowMenu === 0 ? cssClicked : cssNotClicked}>
          Pedidos
        </div>
        <div
          className={lineBelowMenu === 1 ? cssClicked : cssNotClicked}
          onClick={() => navigate("/flavors", { replace: true })}
        >
          Sabores
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex flex-row w-full h-full p-12 m-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-lg shadow-xl opacity-90">
        <div className="w-1/2">
          <h1 className="text-2xl font-bold text-white mb-6">Lista de Pedidos</h1>
          {ordersList && ordersList.length > 0 ? (
            <div>
              {ordersList.map((order, index) => (
                <div
                  className="flex flex-col justify-center text-center align-middle p-4 bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200 text-white mb-4 rounded-lg shadow-lg"
                  key={index}
                >
                  <span className="font-semibold">
                    Nome do cliente: {order.nomeCliente}
                  </span>
                  <span className="font-semibold">
                    Quantidade de Sabores: {order.quantidadeBolas}
                  </span>
                  <span className="font-semibold">
                    Sabor 1: {order.sabor1.nome}
                  </span>
                  <span className="font-semibold">
                    Sabor 2: {(order.sabor2 && order.sabor2.nome) ?? "N/A"}
                  </span>
                  <span className="font-semibold">
                    Valor: R$ {order.valor.toFixed(2)}
                  </span>
                  <button
                    className="mt-4 p-2 bg-orange-300 text-white rounded-full shadow-md hover:bg-orange-400"
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    Deletar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <NotFound
              principalMessage="Nenhum pedido encontrado"
              secondaryMessage="Talvez tente cadastrar um!"
            />
          )}
        </div>

        {/* Formulário de Cadastro */}
        <div className="w-1/2 flex flex-col">
          <h1 className="text-2xl font-bold text-white mb-6">Adicionar Pedido</h1>
          <div className="flex flex-col gap-4 p-6 bg-white bg-opacity-50 backdrop-blur-lg rounded-lg shadow-xl">
            <input
              type="text"
              placeholder="Nome do Cliente"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setClientName(e.target.value)}
            />
            <input
              type="number"
              placeholder="N° de bolas"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setFlavorQuantity(Number(e.target.value))}
            />
            <Combobox
              defaultValue={"Selecione o sabor 1"}
              dataKey={"id"}
              textField={"nome"}
              data={flavorList}
              onChange={(e) => setFlavor1(e)}
            />
            <Combobox
              defaultValue={"Selecione o sabor 2"}
              dataKey={"id"}
              textField={"nome"}
              data={flavorList}
              onChange={(e) => setFlavor2(e)}
            />
            <button
              onClick={saveOrder}
              className="w-full p-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-white font-semibold rounded-full hover:opacity-90 transition duration-300"
            >
              Cadastrar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersComponent;
