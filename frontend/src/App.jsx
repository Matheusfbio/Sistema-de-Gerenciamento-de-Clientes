import { useEffect, useState } from "react";

export default function App() {
  const [clientes, setClientes] = useState([]);
  const [semResultados, setSemResultados] = useState(false);
  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
  });

  const [filtroNome, setFiltroNome] = useState("");

  const fetchClientes = async () => {
    const response = await fetch("http://localhost:3000/clientes");
    const data = await response.json();
    setClientes(data);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleInputChange = (e) => {
    setNovoCliente({ ...novoCliente, [e.target.name]: e.target.value });
  };

  const cadastrarCliente = async () => {
    if (!novoCliente.nome || !novoCliente.email || !novoCliente.telefone) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    await fetch("http://localhost:3000/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoCliente),
    });

    setNovoCliente({ nome: "", email: "", telefone: "" });
    fetchClientes();
  };
  const filtrarClientes = async () => {
    if (!filtroNome) {
      alert("Por favor, insira um nome para filtrar");
      return;
    }

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

    if (novoNome || novoEmail || novoTelefone) {
      await fetch(`http://localhost:3000/clientes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: novoNome || clienteParaEditar.nome,
          email: novoEmail || clienteParaEditar.email,
          telefone: novoTelefone || clienteParaEditar.telefone,
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
      await fetch(`http://localhost:3000/clientes/${id}`, {
        method: "DELETE",
      });

      fetchClientes();
    }
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
                {cliente.nome} - {cliente.email} - {cliente.telefone}
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
        <button
          className="rounded-lg text-center border border-black  hover:bg-green-500"
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
    </div>
  );
}
