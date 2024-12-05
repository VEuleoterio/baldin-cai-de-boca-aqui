import { useEffect, useState } from "react";
import { api } from "../../axios";
import { NotFound } from "../../molecules/NotFound";
import FlavorsList from "../../interfaces/FlavorList";
import { useNavigate } from "react-router-dom";

interface FlavorsComponentProps {}

const FlavorsComponent = (props: FlavorsComponentProps) => {
  const navigate = useNavigate();
  const [flavorsList, setFlavorList] = useState<FlavorsList[]>([]);
  const [lineBelowMenu, setLineBelowMenu] = useState(1);
  const [saborNome, setSaborNome] = useState<String>();
  const [valorBola, setValorBola] = useState(0.0);

  const cssClicked =
    "w-full h-10 text-pink-900 border-b-2 border-b-white p-4 mb-2 bg-gradient-to-r from-yellow-300 to-pink-200 rounded-lg shadow-md";
  const cssNotClicked =
    "w-full h-10 text-pink-800 p-4 mb-2 bg-gradient-to-r from-yellow-200 to-pink-100 hover:bg-gradient-to-r hover:from-yellow-300 hover:to-pink-200 transition duration-300 rounded-lg shadow-sm";

  const handleFlavors = async () => {
    const response = await api.get(api.getUri() + "api/sabores");
    setFlavorList(response.data);
  };

  const saveFlavor = async () => {
    var newFlavor = {
      nome: saborNome,
      valor: valorBola ?? 0,
    };
    const response = await api.post(api.getUri() + "api/sabores", newFlavor);
    if (response.status === 201) {
      handleFlavors();
    }
  };

  const handleDeleteFlavor = (flavorId: number) => {
    api.patch(api.getUri() + `api/pedidos/excluir/${flavorId}`).then((res) => {
      if (res.status === 200) handleFlavors();
    });
  };

  useEffect(() => {
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
      {/* Menu lateral */}
      <div className="flex flex-col justify-start h-full w-56 bg-opacity-80 bg-pink-100 shadow-lg">
        <div
          className={lineBelowMenu === 0 ? cssClicked : cssNotClicked}
          onClick={() => navigate("/orders", { replace: true })}
        >
          Pedidos
        </div>
        <div className={lineBelowMenu === 1 ? cssClicked : cssNotClicked}>
          Sabores
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-row w-full h-full p-12 border-2 border-pink-200 m-4 mr-14 bg-opacity-80 bg-white rounded-lg shadow-lg">
        <div className="w-1/2">
          <h1 className="text-2xl font-bold text-pink-900 mb-4">Sabores</h1>
          {flavorsList && flavorsList.length > 0 ? (
            <div>
              {flavorsList.map((flavor, index) => (
                <div
                  className="flex flex-col justify-center text-center p-4 bg-gradient-to-r from-yellow-300 to-pink-200 text-pink-900 mb-4 rounded-lg shadow-lg"
                  key={index}
                >
                  <span className="font-semibold">Nome do sabor: {flavor.nome}</span>
                  <span className="font-semibold">Valor da bola: {flavor.valorBola}</span>
                </div>
              ))}
            </div>
          ) : (
            <NotFound
              principalMessage="Nenhum sabor encontrado"
              secondaryMessage="Talvez tente cadastrar um!"
            />
          )}
        </div>

        {/* Formulário de cadastro */}
        <div className="w-1/2">
          <h1 className="text-2xl font-bold text-pink-900 mb-4">Adicionar Sabor</h1>
          <div className="flex flex-col gap-4 p-8 bg-opacity-90 bg-white rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="Nome do Sabor"
              className="w-full p-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              onChange={(e) => setSaborNome(e.target.value)}
            />
            <input
              type="number"
              placeholder="Valor"
              className="w-full p-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              onChange={(e) => setValorBola(Number(e.target.value))}
            />
            <button
              onClick={saveFlavor}
              className="w-full p-2 bg-gradient-to-r from-pink-400 via-yellow-300 to-pink-400 text-white font-semibold rounded-full hover:opacity-90 transition duration-300"
            >
              Cadastrar Sabor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlavorsComponent;
