import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabasePostgres {
  async clienteslista(search) {
    //Clientes
    let clientes;
    if (search) {
      clientes = await sql`select * from clientes where name ilike ${
        "%" + search + "%"
      }`;
    } else {
      clientes = await sql`select * from clientes`;
    }

    return clientes;
  }

  //clientes
  async create(clientes) {
    const clienteId = randomUUID();
    const { name, email, telefone } = tasks;

    await sql`insert into tasks (id , email) values(${clienteId},${name},${email})`;
  }

  async update(id, clientes, email, telefone) {
    const { name, email, telefone } = clientes;

    await sql`update tasks set name = ${name}, email = ${email}, telefone = ${telefone}, WHERE id = ${id}`;
  }

  async delete(id) {
    await sql`delete from tasks where id = ${id}`;
  }
}
