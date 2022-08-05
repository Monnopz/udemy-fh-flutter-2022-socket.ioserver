const express = require('express'); //Se obtiene el paquete de express
const path = require('path'); //Se obtiene paquete path
require('dotenv').config(); //Dentro del config se pueden establecer valores, pero asi vacio se establecen las variables de entorno

// App de Express
const app = express(); //Se inicializa el express

// Node Server
const server = require('http').createServer(app); //app(Express) es compatible con 'http' y por eso se manda
// const io = require('socket.io')(server); //Le mandamos el servidor de Node
module.exports.io = require('socket.io')(server); //Le mandamos el servidor de Node; lleva un metodo de exportacion similar a js, pero asi se hace en node
require('./sockets/socket.js')

//Path publico
const publicPath = path.resolve(__dirname, 'public'); //El __dirname hace que se obtenga el path completo tanto de local como de produccion
app.get('/favicon.ico', (req, res) => res.status(204));
app.use(express.static(publicPath)); //Sirve el archivo statico que hay en public

server.listen(process.env.PORT, (err) => { //Puerto, callback; process.env.PORT Permite obtener la variable de entorno PORT del archivo .env
    //El callback retorna el error

    if(err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);

});