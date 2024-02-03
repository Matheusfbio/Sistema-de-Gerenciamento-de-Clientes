import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [clientes, setClientes] = useState([]);
  const [semResultados, setSemResultados] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [ordemVisita, setOrdemVisita] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
    coordenada_x: 0, // Defina o valor padrão conforme necessário
    coordenada_y: 0, // Defina o valor padrão conforme necessário
  });

  const fetchClientes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/clientes");
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes", error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleInputChange = (e) => {
    setNovoCliente({ ...novoCliente, [e.target.name]: e.target.value });
  };

  const cadastrarCliente = async () => {
    const { nome, email, telefone, coordenada_x, coordenada_y } = novoCliente;

    // Verifica se todos os campos estão preenchidos, incluindo coordenadas
    if (
      !nome ||
      !email ||
      !telefone ||
      coordenada_x === null ||
      coordenada_y === null
    ) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    try {
      await axios.post("http://localhost:3000/clientes", novoCliente);
      fetchClientes();
      setNovoCliente({
        nome: "",
        email: "",
        telefone: "",
        coordenada_x: 0,
        coordenada_y: 0,
      });
    } catch (error) {
      console.error("Erro ao cadastrar cliente", error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const filtrarClientes = async () => {
    if (!filtroNome) {
      alert("Por favor, insira um nome para filtrar");
      return;
    }
    
//alterar para axios
    const response = await fetch(
      `http://localhost:3000/clientes/${filtroNome}`
    );
    const data = await response.json();
    setClientes(data);

    // Se nenhum cliente for encontrado, exibir mensagem ou botão
    setSemResultados(data.length === 0);
  };

  const editarCliente = async (id) => {
    const clienteParaEditar = clientes.find((cliente) => cliente.id === id);

    const novoNome = prompt("Novo Nome:", clienteParaEditar.nome);
    const novoEmail = prompt("Novo Email:", clienteParaEditar.email);
    const novoTelefone = prompt("Novo Telefone:", clienteParaEditar.telefone);

    // Solicite as coordenadas X e Y ao usuário
    const novaCoordenadaX = prompt(
      "Nova Coordenada X:",
      clienteParaEditar.coordenada_x
    );
    const novaCoordenadaY = prompt(
      "Nova Coordenada Y:",
      clienteParaEditar.coordenada_y
    );

    if (
      novoNome ||
      novoEmail ||
      novoTelefone ||
      novaCoordenadaX ||
      novaCoordenadaY
    ) {
      //alterar para axios
      await fetch(`http://localhost:3000/clientes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: novoNome || clienteParaEditar.nome,
          email: novoEmail || clienteParaEditar.email,
          telefone: novoTelefone || clienteParaEditar.telefone,
          coordenada_x: novaCoordenadaX || clienteParaEditar.coordenada_x,
          coordenada_y: novaCoordenadaY || clienteParaEditar.coordenada_y,
        }),
      });
      fetchClientes();
    }
  };

  const excluirCliente = async (id) => {
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir este cliente?"
    );
    if (confirmacao) {
      //alterar para axios
      await fetch(`http://localhost:3000/clientes/${id}`, {
        method: "DELETE",
      });

      fetchClientes();
    }
  };
  const calcularRotaOtimizada = async () => {
    try {
      const response = await axios.get("http://localhost:3000/calcular-rota");
      setOrdemVisita(response.data);
      setMostrarModal(true);
    } catch (error) {
      console.error("Erro ao calcular rota otimizada", error);
    }
  };

  const closeModal = () => {
    setMostrarModal(false);
  };

  return (
    <div className="flex flex-col p-6 m-16 rounded-lg border border-black space-y-4 items-center justify-center">
      <h1 className="items-center justify-center">
        Sistema de Gerenciamento de Clientes
      </h1>
      <div className="flex-col px-4 rounded-lg space-y-4 max-w-2xl">
        <h2 className="flex flex-col p-2 items-center justify-center">
          Lista de Clientes
        </h2>
        {semResultados ? (
          <p className="text-red-600">
            Nenhum cliente encontrado. insira o mesmo nome do cadastro.
          </p>
        ) : (
          <ul className="px-9 rounded-lg border border-black space-y-3 max-h-96">
            {clientes.map((cliente) => (
              <li className="space-x-3" key={cliente.id}>
                {cliente.nome} - {cliente.email} - {cliente.telefone} - (
                {cliente.coordenada_x}) - ({cliente.coordenada_y})
                <div className="text-center p-2">
                  <button
                    className="rounded-lg text-center border border-black mx-2  hover:bg-green-500"
                    onClick={() => editarCliente(cliente.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="rounded-lg text-center border border-black  hover:bg-red-500"
                    onClick={() => excluirCliente(cliente.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col px-16  p-5 space-y-4 rounded-lg border border-black max-w-full">
        <h2 className="flex items-center justify-center">
          Cadastrar Novo Cliente
        </h2>
        <input
          className="rounded-lg px-40 text-center border border-black"
          type="text"
          name="nome"
          placeholder="Nome"
          value={novoCliente.nome}
          onChange={handleInputChange}
        />
        <input
          className="rounded-lg text-center border border-black"
          type="text"
          name="email"
          placeholder="Email"
          value={novoCliente.email}
          onChange={handleInputChange}
        />
        <input
          className="rounded-lg text-center border border-black"
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={novoCliente.telefone}
          onChange={handleInputChange}
        />
        <input
          className="rounded-lg text-center border border-black"
          type="number"
          placeholder="Coordenada X"
          value={novoCliente.coordenada_x}
          onChange={(e) =>
            setNovoCliente({ ...novoCliente, coordenada_x: e.target.value })
          }
        />
        <input
          className="rounded-lg text-center border border-black"
          type="number"
          placeholder="Coordenada Y"
          value={novoCliente.coordenada_y}
          onChange={(e) =>
            setNovoCliente({ ...novoCliente, coordenada_y: e.target.value })
          }
        />
        <button
          className="rounded-lg text-center border border-black"
          onClick={cadastrarCliente}
        >
          Cadastrar
        </button>
      </div>
      <div className="flex flex-col px-56 p-10 space-y-2 rounded-lg border border-black max-w-full">
        <h2 className="flex flex-col p-2 items-center justify-center">
          Filtrar Clientes por Nome
        </h2>
        <input
          className="rounded-lg  text-center border border-black"
          type="text"
          placeholder="Nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
        />
        <button
          className="rounded-lg text-center border border-black hover:bg-blue-500"
          onClick={filtrarClientes}
        >
          Filtrar
        </button>
      </div>
      <div className="flex flex-col space-y-3 max-w-full items-center justify-center">
        <h1>Clientes e Rotas</h1>
        <button
          className="rounded-lg px-12 text-center border border-black hover:bg-blue-500"
          onClick={calcularRotaOtimizada}
        >
          Calcular Rota Otimizada
        </button>
        <ul>
          {clientes.map((cliente) => (
            <li
              key={cliente.id}
            >{`${cliente.nome} - (${cliente.coordenada_x}, ${cliente.coordenada_y})`}</li>
          ))}
        </ul>

        {mostrarModal && (
          <div>
            <div className="rounded-lg text-center items-center justify-center">
              <span
                className="rounded-lg px-12 text-center items-center justify-center border border-black hover:bg-blue-500"
                onClick={closeModal}
              >
                &times;
              </span>
              <h2>Ordem de Visitação dos Clientes</h2>
              <ul className="flex flex-col space-x-1">
                {ordemVisita.map((cliente) => (
                  <li
                    key={cliente.id}
                  >{`Cliente ${cliente.id} - ${cliente.nome} - (${cliente.x}, ${cliente.y})`}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
