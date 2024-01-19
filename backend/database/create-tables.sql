import { sql } from "./db.js";

// sql`DROP TABLE IF EXISTS users`.then(() => {
//   console.log("users table deleted");
// });

// sql`DROP TABLE IF EXISTS tasks`.then(() => {
//   console.log("tasks table deleted");
// });

sql`
  CREATE TABLE clientes (
	  id 		TEXT PRIMARY KEY,
	  nome	TEXT,
	  email		TEXT
	  telefone		INTEGER
)
	`.then(() => {
  console.log("Tabela clientes criada com sucesso");
});

// sql`
//    CREATE TABLE tasks (
// 		id 			TEXT PRIMARY KEY,
// 		title		TEXT,
// 		description TEXT,
// 		status		TEXT
// 	)`.then(() => {
//   console.log("tasks table created");
// });
