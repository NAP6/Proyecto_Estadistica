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




function writeUserData() {
    const indi = firebase.database().ref('Emilio/IndiceUlt');

    for (i = 1; i < 10; i++) {
        const ref = firebase.database().ref('Emilio/' + i);
        ref.on('value', (snapshot) => {
            const value = {
                Aire: snapshot.val().Aire_PPM_,
                Temperatura: snapshot.val().Tempe_Celsius_,
                Humedad: snapshot.val().Hum_Porcentaje_,
                Indice_de_calor: snapshot.val().indice_de_calor_Celsius_
            };
            alert(i+"\n" + value.Aire + "\n" + value.Humedad + "\n" + value.Temperatura + "\n" + value
                .Indice_de_calor);

        });
    }
}

function myFunction() {
    var d = new Date(1573700000);
    var n = d.toString();
    alert(n);
}
myFunction();
//writeUserData();