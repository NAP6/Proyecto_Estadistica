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
            snapshot.val().Hora,
            snapshot.val().Dia_Semana
        );
        document.getElementById("temperatura_R").innerHTML = value.temperatura;
        document.getElementById("humedad_R").innerHTML = value.humedad;
        document.getElementById("co_R").innerHTML = value.co;
        ArrNico[pos - 2] = value;
        if (aux) {
            tem_F = frecuencia('temperatura');
            hum_F = frecuencia('humedad');
            co_F = frecuencia('co');
            graficar();
            frec_h = frecuenciaH('h', 24);
            frec_d = frecuenciaH('d', 7);
            graficar2();
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

//Recupera informacion de la base de datos
function getData(nombre, pos, fin) {
    const dat = firebase.database().ref('Datos/' + nombre + '/' + pos);
    dat.once('value', (snapshot) => {
        let value = new Dato(
            snapshot.val().Humedad_por,
            snapshot.val().Monoxido_Carbono_PPM_,
            snapshot.val().Sensacion_Termica,
            snapshot.val().Temperatura_C,
            snapshot.val().Hora,
            snapshot.val().Dia_Semana
        );
        ArrNico[pos - 2] = value;
        if (pos >= fin - 1) {
            tem_F = frecuencia('temperatura');
            hum_F = frecuencia('humedad');
            co_F = frecuencia('co');
            graficar();
            frec_h = frecuenciaH('h', 24);
            frec_d = frecuenciaH('d', 7);
            graficar2();
        }
    });
}

// Clase usada ara manerar los datos
class Dato {
    constructor(hum, co, sensTer, tempe, h, d) {
        this.humedad = hum;
        this.co = co;
        this.Sensacio_Termica = sensTer;
        this.temperatura = tempe;
        this.h = h;
        this.d = d;
    }
}

// #########################################################################
// #########################################################################
//Graficas de frecuencia del inicio
google.charts.load('current', {
    'packages': ['corechart']
});

function graficar() {
    google.charts.setOnLoadCallback(dibujarTemperatura);
    google.charts.setOnLoadCallback(dibujarHumedad);
    google.charts.setOnLoadCallback(dibujarCO);
}
var tem_F;
var hum_F;
var co_F;
var frec_h;

function graficar2() {
    console.log(frec_h)
    google.charts.setOnLoadCallback(dibujarHora);
    google.charts.setOnLoadCallback(dibujarDia);
}

var options = {
    height: 400,
    bar: {
        groupWidth: "95%"
    },
    legend: {
        position: "none"
    }
};

var options2 = {
    title: 'Gafica de medias, en torno a la dia de la semana',
    legend: { position: 'top', maxLines: 3 },
    vAxis: { minValue: 0 }
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

function dibujarHora() {
    var data = google.visualization.arrayToDataTable(frec_h);

    options2['title'] = 'Gafica de medias, en torno a la hora del dia';
    options2['hAxis'] = { title: 'Hora de la seman', titleTextStyle: { color: '#333' } };
    var chart = new google.visualization.AreaChart(document.getElementById('hora_f'));
    chart.draw(data, options2);
}

function dibujarDia() {
    var data = google.visualization.arrayToDataTable(frec_d);

    options2['title'] = 'Gafica de medias, en torno a la dia de la semana';
    options2['hAxis'] = { title: 'Dia de la semana', titleTextStyle: { color: '#333' } };
    var chart = new google.visualization.AreaChart(document.getElementById('dia_f'));
    chart.draw(data, options2);
}
// #########################################################################
// #########################################################################