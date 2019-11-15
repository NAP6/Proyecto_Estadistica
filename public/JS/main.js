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

//Cambia el valor de los datos en tiempo real
const indi = firebase.database().ref('Cantidad_Dat');
indi.on('value', (snapshot) => {
    pos = snapshot.val().IndiceNicolas
    const dat = firebase.database().ref('Datos/Nicolas/' + pos);
    dat.on('value', (snapshot) => {
        const value = {
            Aire: snapshot.val().Monoxido_Carbono_PPM_,
            Temperatura: snapshot.val().Temperatura_C,
            Humedad: snapshot.val().Humedad_por,
        };
        document.getElementById("temperatura_R").innerHTML = value.Temperatura;
        document.getElementById("humedad_R").innerHTML = value.Humedad;
        document.getElementById("co_R").innerHTML = value.Aire;
    });
});

/*
function myFunction() {
    var d = new Date(18000 + 1573723000 * 1000);
    var n = d.toString();
    alert(n);
}
myFunction();*/