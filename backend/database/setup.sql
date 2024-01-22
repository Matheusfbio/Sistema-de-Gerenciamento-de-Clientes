// DDL para criar a tabela no banco de dados
  CREATE TABLE IF NOT EXISTS clientes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(100),
    coordenada_x DOUBLE PRECISION,
    coordenada_y DOUBLE PRECISION
  );