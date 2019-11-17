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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// #########################################################################
var nombre = 'Nicolas';
var aux =false;

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
        if(aux){
            mostrar();
        }
    });
});

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
            aux=true;
        }
    });
}

/*
function myFunction() {
    var d = new Date(18000 + 1573723000 * 1000);
    var n = d.toString();
    alert(n);
}
myFunction();*/


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