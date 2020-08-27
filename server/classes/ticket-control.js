const fs = require(`fs`);

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;

    }
}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickes = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickes = data.tickes;
            this.ultimos4 = data.ultimos4;

        } else {

            this.reiniciarConteo();

        }

    }

    siguiente() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickes.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {

        return `Ticket ${this.ultimo}`;

    }
    getUltimos4() {
        return this.ultimos4
    }

    atenderTicket(escritorio) {

        if (this.tickes.length === 0) {
            return 'no hay tickets';
        }
        let numeroTicket = this.tickes[0].numero;
        this.tickes.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }
        this.grabarArchivo();
        console.log(this.ultimos4);

        return atenderTicket;

    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickes = [];
        this.grabarArchivo();
        this.ultimos4 = [];
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickes: this.tickes,
            ultimos4: this.ultimos4
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }
}

module.exports = {

    TicketControl

}