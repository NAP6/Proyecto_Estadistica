function frecuencia(val) {
    let t = ArrNico.length;
    console.log("Total: " + t)
    let k = 0;
    while (Math.pow(2, k) < t) {
        k++;
    }
    console.log("Cantidad de clases: " + k)
    let max = ArrNico[0][val];
    let min = ArrNico[0][val];
    for (i = 0; i < t; i++) {
        max = Math.max(max, ArrNico[i][val]);
        min = Math.min(max, ArrNico[i][val]);
    }
    console.log("Menor: " + min + "   Mayor: " + max)
    var intervalo = Math.round((max - min) / k);
    console.log("Intervalo: " + intervalo)
    var frec = new Array(k);
    for (i = 0; i < k; i++) {
        frec[i] = 0;
    }
    min = Math.round(min) - 1;
    for (i = 0; i < t; i++) {
        let band = false;
        for (j = 0; j < k; j++) {
            if (ArrNico[i][val] > (min + intervalo * j) && ArrNico[i][val] <= (min + intervalo * j + 1)) {
                frec[j]++;
                band = true;
            }
        }
        if (!band) {
            console.log('No:    ' + ArrNico[i][val])
            for (j = 0; j < k; j++) {
                console.log('')
                console.log("" + (min + intervalo * j) + ":" + (min + intervalo * j + 1))
                if (ArrNico[i][val] > (min + intervalo * j) && ArrNico[i][val] <= (min + intervalo * j + 1)) {
                    console.log('entra')
                } else {
                    console.log('no entra')
                }
            }
        }
    }
    let s = "";
    let aux = 0;
    for (j = 0; j < k; j++) {
        s = "" + (min + intervalo * j) + ":" + (min + intervalo * j + 1);
        aux += frec[j];
        frec[j] = [s, frec[j]];
        console.log(frec[j])
    }
    console.log('total sumados: ' + aux)
    console.log('')
        //document.getElementById("Lista").innerHTML = txt;
}