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

//Carga los valores al arreglo
ArrNico=new Array();
function carga() {
    const indi = firebase.database().ref('Cantidad_Dat');
    indi.on('value', (snapshot) => {
        pos = snapshot.val().IndiceNicolas
        for (i = 0; i < pos; i++) {
            getData('Nicolas',pos);
            ArrNico[i]=value
            console.log(ArrNico[i])
        }
    });
}
carga();

//Recupera informacion de la base de datos
var value;
function getData(nombre, pos) {
    const dat = firebase.database().ref('Datos/' + nombre + '/' + pos);
    dat.on('value', (snapshot) => {
        value = new Dato(
            snapshot.val().Humedad_por,
            snapshot.val().Monoxido_Carbono_PPM_,
            snapshot.val().Sensacion_Termica,
            snapshot.val().Temperatura_C,
            snapshot.val().Tiempo
        );
    });
}

//Cambia el valor de los datos en tiempo real
const indi = firebase.database().ref('Cantidad_Dat');
indi.on('value', (snapshot) => {
    pos = snapshot.val().IndiceNicolas
    getData('Nicolas', pos);
    document.getElementById("temperatura_R").innerHTML = value.getTemperatura();
    document.getElementById("humedad_R").innerHTML = value.getHumedad();
    document.getElementById("co_R").innerHTML = value.getCO();
});


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

class Lista {

    constructor() {
        lis = new Array();
    }

    add(d) {
        lis.push(d);
    }
}