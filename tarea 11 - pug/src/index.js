const express = require("express");
const routerProductos = require("./routers/producto-api");
const path = require('path');
const handlebars = require("express-handlebars");
 




const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>
  console.log("Server up en puerto", puerto)
);

server.on("error", (err) => {
  console.log("ERROR", err);
});
app.set('view engine', 'pug');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);


const publicPath = path.resolve(__dirname,'../public');
app.use(express.static(publicPath))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos',routerProductos);
