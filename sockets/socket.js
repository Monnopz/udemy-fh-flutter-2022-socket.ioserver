const { io } = require('../index'); //Se esta importando io del modulo exportado en index
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

// bands.addBand( new Band('Beatles') );
// bands.addBand( new Band('ACDC') );
// bands.addBand( new Band('Pink Floyd') );
// bands.addBand( new Band('Metallica') );


//http://localhost:3000/socket.io/socket.io.js es el archivo necesario para que se ejecute socket.io

//Mensajes de Sockets
//Cada refresh del navegador desconecta y vuelve a conectar al usuario, generando cada vez un id unico del dispositivo conectado
io.on('connection', client => {//Client es un dispositivo que se conecta al server (nombreevento, callback)
    // client.on('event', data => { /* … */ });
    console.log('Cliente conectado');
    
    client.emit('active-bands', bands.getBands() );
    
    client.on('disconnect', () => { //client es el cliente conectado
        console.log('Cliente desconectado');
    }); //Notifica cuando el cliente se desconecta (nombreevento, callback)
    client.on('mensaje', ( payload ) => { //(nombreevento, callback) es para escuchar
        console.log('Mensaje', payload)
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });
    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands() ); //io es el servidor (con todos los clientes conectados)
    });
    client.on('add-band', (payload) => {
        bands.addBand( new Band(payload.name) );
        io.emit('active-bands', bands.getBands() ); //io es el servidor (con todos los clientes conectados)
    });
    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands() ); //io es el servidor (con todos los clientes conectados)
    });
    // client.on('emitir-mensaje', (payload) => {
    //     // io.emit('nuevo-mensaje', payload); //emite a todos
    //     client.broadcast.emit('nuevo-mensaje', payload); //emite a todos menos al que lo emitio
    // })
});