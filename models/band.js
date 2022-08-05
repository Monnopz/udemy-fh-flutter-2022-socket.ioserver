const { v4: uuidV4 } = require('uuid'); //Se le pone el alias de v4
//formato de uuid: asdfgh-asdfg-asdfg-asdf

class Band {

    constructor(name = 'no-name') {

        //Instalar paquete de id unico: npm i uuid

        this.id = uuidV4();
        this.name = name;
        this.votes = 0;

    }

}

module.exports = Band; //Exportacion por defecto en Node