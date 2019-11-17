// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCgaY_dxaX2RfqMPXcgzdsg0XthF94aYX4",
    authDomain: "datos-climaticos-f76b2.firebaseapp.com",
    databaseURL: "https://datos-climaticos-f76b2.firebaseio.com",
    projectId: "datos-climaticos-f76b2",
    storageBucket: "datos-climaticos-f76b2.appspot.com",
    messagingSenderId: "328572715982",
    appId: "1:328572715982:web:22c4d50b22004363d2619f",
    measurementId: "G-T9FXW8V8ES"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// #########################################################################
// #########################################################################

var nombre = 'Nicolas';
var aux = false;
//Cambia el valor de los datos en tiempo real
const indi = firebase.database().ref('Cantidad_Dat');
indi.on('value', (snapshot) => {
    pos = snapshot.val().IndiceNicolas
    const dat = firebase.database().ref('Datos/' + nombre + '/' + pos);
    dat.on('value', (snapshot) => {
        const value = new Dato(
            snapshot.val().Humedad_por,
            snapshot.val().Monoxido_Carbono_PPM_,
            snapshot.val().Sensacion_Termica,
            snapshot.val().Temperatura_C,
            snapshot.val().Tiempo
        );
        document.getElementById("temperatura_R").innerHTML = value.getTemperatura();
        document.getElementById("humedad_R").innerHTML = value.getHumedad();
        document.getElementById("co_R").innerHTML = value.getCO();
        ArrNico[pos - 2] = value;
        if (aux) {
            mostrar();
        }
    });
});

// #########################################################################
// #########################################################################

//Carga los valores al arreglo
ArrNico = new Array();

function carga() {
    const indi = firebase.database().ref('Cantidad_Dat');
    indi.once('value', (snapshot) => {
        pos = snapshot.val().IndiceNicolas;
        for (i = 2; i < pos; i++) {
            getData(nombre, i, pos);
        }
    });
}
carga();

//Auxiliar temporal para mostrar los datos
function mostrar() {
    let txt = "<pre style=\"font-size: 25px;\">Indice  Temperatura Humedad CO</pre></br>";
    for (i = 0; i < ArrNico.length; i++) {
        txt += "<pre style=\"font-size: 25px;\">" + i + "    " + ArrNico[i].getTemperatura() + "    " + ArrNico[i].getHumedad() + "    " + ArrNico[i].getCO() + "</pre></br>";
    }
    document.getElementById("Lista").innerHTML = txt;
}

//Recupera informacion de la base de datos
function getData(nombre, pos, fin) {
    const dat = firebase.database().ref('Datos/' + nombre + '/' + pos);
    dat.once('value', (snapshot) => {
        let value = new Dato(
            snapshot.val().Humedad_por,
            snapshot.val().Monoxido_Carbono_PPM_,
            snapshot.val().Sensacion_Termica,
            snapshot.val().Temperatura_C,
            snapshot.val().Tiempo
        );
        ArrNico[pos - 2] = value;
        if (pos >= fin - 1) {
            mostrar();
            aux = true;
        }
    });
}

// Clase usada ara manerar los datos
class Dato {
    constructor(hum, co, sensTer, tempe, time) {
        this.humedad = hum;
        this.co = co;
        this.Sensacio_Termica = sensTer;
        this.temperatura = tempe;
        this.time = time;
    }

    getHumedad() {
        return this.humedad;
    }

    getCO() {
        return this.co;
    }

    getSensacion_Termica() {
        return this.Sensacio_Termica;
    }

    getTemperatura() {
        return this.temperatura;
    }

    getTime() {
        return this.time;
    }
}

// #########################################################################
// #########################################################################
//Graficas de frecuencia del inicio
google.charts.load('current', {
    'packages': ['corechart']
});

google.charts.setOnLoadCallback(dibujarTemperatura);
google.charts.setOnLoadCallback(dibujarHumedad);
google.charts.setOnLoadCallback(dibujarCO);

var tem_F = [
    ["Rango", "Frecuencia"]

];
var hum_F = [
    ["Rango", "Frecuencia"]

];
var co_F = [
    ["Rango", "Frecuencia"]

];

var tit = ['Cosa 1', 'Cosa 2', 'Cosa 3'];
var elem = [5, 10, 6];
for (i = 0; i < tit.length; i++) {
    tem_F[i + 1] = [tit[i], elem[i]];
    hum_F[i + 1] = [tit[i], elem[i]];
    co_F[i + 1] = [tit[i], elem[i]];
}

var options = {
    title: "No se cargo el titulo",
    height: 400,
    bar: {
        groupWidth: "95%"
    },
    legend: {
        position: "none"
    }
};

function dibujarTemperatura() {
    var data = google.visualization.arrayToDataTable(tem_F);

    var view = new google.visualization.DataView(data);
    options['title'] = "Temperatura";
    var chart = new google.visualization.ColumnChart(document.getElementById("temperatura_G"));
    chart.draw(view, options);
}

function dibujarHumedad() {
    var data = google.visualization.arrayToDataTable(hum_F);

    var view = new google.visualization.DataView(data);
    options['title'] = "Humedad";
    var chart = new google.visualization.ColumnChart(document.getElementById("humedad_G"));
    chart.draw(view, options);
}

function dibujarCO() {
    var data = google.visualization.arrayToDataTable(co_F);

    var view = new google.visualization.DataView(data);
    options['title'] = "Monoxido de Carbono";
    var chart = new google.visualization.ColumnChart(document.getElementById("co_G"));
    chart.draw(view, options);
}

// #########################################################################
// #########################################################################