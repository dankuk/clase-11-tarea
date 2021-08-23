const { json } = require("express");
const fs = require("fs");
const path = require("path");
const ruta = "./producto/productos.txt";

class archivo {
  constructor(id, title, price, thumbnail) {
    (this.id = id),
      (this.title = title),
      (this.price = price),
      (this.thumbnail = thumbnail);
  }
}

const guardar = async (title, price, thumbnail) => {
  try {
    let arreglo = [];
    let id = 1;
    const data = await fs.promises.readFile(ruta, "utf-8");
    if (data) {
      const jData = JSON.parse(data);
      id = jData.length + 1;
      arreglo.push(...jData);
    }
    const nuevo = new archivo(id, title, price, thumbnail);
    arreglo.push(nuevo);
    console.log("añadido correctamente");
    await fs.promises.writeFile(ruta, JSON.stringify(arreglo, null, "\t"));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const eliminar = async (idBuscado) => {
  try {
    const productos = await fs.promises.readFile(ruta, "utf-8");
    console.log(idBuscado);

    if (productos) {
      let prod = JSON.parse(productos);
      const arrayProductos = prod.filter(
        (aProduct) => aProduct.id !== idBuscado
      );

      console.log("eliminado correctamente");
      await fs.promises.writeFile(ruta, JSON.stringify(arrayProductos, null, "\t"));
      return;
    }
  } catch (error) {
    console.log(error);
    return;
  }
}

const modificar = async (idBuscado, title, price, thumbnail) => {
  try {
    let arreglo = [];
    const productos = await fs.promises.readFile(ruta, "utf-8");
    console.log(idBuscado);

    if (productos) {
      let jData = JSON.parse(productos);
      for (const value of jData) {
        if (value.id == idBuscado) {
          value.title = title;
          value.price = price;
          value.thumbnail = thumbnail;
        }
      }
      console.log(jData);

      console.log("modificado correctamente");
      await fs.promises.writeFile(ruta, JSON.stringify(jData, null, "\t"));
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const leer = async () => {
  const data = await fs.promises.readFile(ruta, "utf-8");
  if (data) {
    const jData = JSON.parse(data);
    return jData;
  }
  console.log("prooducto: " + data);
  return;
};

const borrar = async () => {
  await fs.promises.unlink(ruta);
  console.log("borrado");
};

module.exports = {
  borrar,
  eliminar,
  leer,
  guardar,
  modificar,
};
