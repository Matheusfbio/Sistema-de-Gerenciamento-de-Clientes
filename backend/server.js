const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const { v4: uuidv4 } = require("uuid");
const pool = require("./database/db");
const port = 3000;

const app = express();
app.use(cors(), bodyParser.json());

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API de Gerenciamento de Clientes",
      description: "API para cadastrar, listar e excluir clientes",
      version: "1.0.0",
    },
  },
  apis: ["server.js"], // Substitua 'index.js' pelo nome do seu arquivo principal
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cadastra um novo cliente
 *     tags:
 *       - Clientes
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *             email:
 *               type: string
 *             telefone:
 *               type: string
 *     responses:
 *       200:
 *         description: Cliente cadastrado com sucesso
 *       500:
 *         description: Erro interno
 */

/**
 * Configuração do banco de dados.
 * @swagger
 * /setup:
 *   get:
 *     summary: Configuração do banco de dados
 *     tags:
 *       - Banco de Dados
 *     responses:
 *       200:
 *         description: Tabela criada com sucesso
 *       500:
 *         description: Erro no lado do servidor
 */
app.get("/setup", async (req, res) => {
  try {
    // Adicione esta query para criar a extensão uuid-ossp
    await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // Agora crie a tabela clientes com id UUID
    await pool.query(`
      CREATE TABLE clientes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        nome VARCHAR(100),
        email VARCHAR(100),
        telefone VARCHAR(100)
      )
    `);

    res.status(200).send({ message: "Tabela criada com sucesso" });
  } catch (error) {
    console.error("Erro ao criar a tabela", error);
    res.status(500).send({ message: "Erro no lado do servidor" });
  }
});

/**
 * Listar todos os clientes.
 * @swagger
 * /clientes:
 *   get:
 *     summary: Listar clientes
 *     tags:
 *       - Clientes
 *     responses:
 *       200:
 *         description: Lista de clientes
 *       500:
 *         description: Erro interno
 */
app.get("/clientes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clientes");

    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar clientes", error);
    res.status(500).send("Erro interno");
  }
});

/**
 * Filtrar clientes pelo nome exato.
 * @swagger
 * /clientes/{filtro}:
 *   get:
 *     summary: Filtrar clientes pelo nome exato
 *     tags:
 *       - Clientes
 *     parameters:
 *       - name: filtro
 *         in: path
 *         required: true
 *         type: string
 *         description: Nome do cliente a ser filtrado
 *     responses:
 *       200:
 *         description: Lista de clientes filtrados
 *       500:
 *         description: Erro no lado do servidor
 */
app.get("/clientes/:filtro", async (req, res) => {
  const { filtro } = req.params;
  try {
    const result = await pool.query("SELECT * FROM clientes WHERE nome = $1", [
      filtro,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao filtrar clientes", error);
    res.status(500).send({ message: "Erro no lado do servidor" });
  }
});

/**
 * Cadastrar novo cliente.
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cadastrar novo cliente
 *     tags:
 *       - Clientes
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *             email:
 *               type: string
 *             telefone:
 *               type: string
 *     responses:
 *       200:
 *         description: Cliente cadastrado com sucesso
 *       500:
 *         description: Erro interno
 */
app.post("/clientes", async (req, res) => {
  const { nome, email, telefone } = req.body;
  const clienteId = uuidv4(); // Gera um UUID

  try {
    const result = await pool.query(
      "INSERT INTO clientes (id, nome, email, telefone) VALUES ($1, $2, $3, $4)",
      [clienteId, nome, email, telefone]
    );

    res.status(200).send({ message: "Cliente cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar cliente", error);
    res.status(500).send("Erro interno");
  }
});

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente existente
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Objeto contendo os dados do cliente
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Erro ao editar cliente
 */
app.put("/clientes/:id", async (req, res) => {
  const id = req.params.id;
  const { nome, email, telefone } = req.body;
  try {
    const result = await pool.query(
      "UPDATE clientes SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *",
      [nome, email, telefone, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao editar cliente", error);
    res.status(500).send("Erro ao editar cliente");
  }
});

/**
 * Excluir cliente.
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Excluir cliente
 *     tags:
 *       - Clientes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID do cliente a ser excluído
 *     responses:
 *       200:
 *         description: Cliente excluído com sucesso
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno
 */
app.delete("/clientes/:id", async (req, res) => {
  const clienteId = req.params.id;

  try {
    // Verifique se o cliente existe antes de excluir
    const checkResult = await pool.query(
      "SELECT * FROM clientes WHERE id = $1",
      [clienteId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).send({ message: "Cliente não encontrado" });
    }

    // Execute a exclusão
    await pool.query("DELETE FROM clientes WHERE id = $1", [clienteId]);

    res.status(200).send({ message: "Cliente excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir cliente", error);
    res.status(500).send("Erro interno");
  }
});

app.get("/calcular-rota", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clientes");

    // Transformar os resultados do banco de dados para um formato adequado ao TSP
    const locations = result.rows.map((cliente) => ({
      id: cliente.id,
      nome: cliente.nome,
      x: cliente.coordenada_x,
      y: cliente.coordenada_y,
    }));

    // Implementar o algoritmo TSP aqui para encontrar a ordem de visitação otimizada

    // Simplesmente retornando a lista de clientes para fins de exemplo
    res.json(locations);
  } catch (error) {
    console.error("Erro ao calcular rota otimizada", error);
    res.status(500).send("Erro no lado do servidor");
  }
});

// Rota para cadastrar um novo cliente
app.post("/clientes", async (req, res) => {
  const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
  const clienteId = uuidv4();

  try {
    const result = await pool.query(
      "INSERT INTO clientes (id, nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5, $6)",
      [clienteId, nome, email, telefone, coordenada_x, coordenada_y]
    );

    res.status(200).send({ message: "Cliente cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar cliente", error);
    res.status(500).send("Erro interno");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} ✅`);
});
