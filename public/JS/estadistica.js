function frecuencia(val) {
    let t = ArrNico.length;
    let k = 0;
    while (Math.pow(2, k) < t) {
        k++;
    }
    let max = ArrNico[0][val];
    let min = ArrNico[0][val];
    for (i = 1; i < t; i++) {
        max = Math.max(max, ArrNico[i][val]);
        min = Math.min(min, ArrNico[i][val]);
    }
    var intervalo = Math.round((max - min) / k);
    var frec = new Array(k);
    for (i = 0; i < k; i++) {
        frec[i] = 0;
    }
    min = Math.round(min) - 1;
    for (i = 0; i < t; i++) {
        for (j = 0; j < k; j++) {
            if (ArrNico[i][val] > (min + intervalo * j) && ArrNico[i][val] <= (min + intervalo * (j + 1))) {
                frec[j]++;
            }
        }
    }
    let s = "";
    let aux = 0;
    let res = [
        ["Rango", "Frecuencia"]
    ];
    for (j = 0; j < k; j++) {
        s = "" + (min + intervalo * j) + ":" + (min + intervalo * (j + 1));
        aux += frec[j];
        res[j + 1] = [s, frec[j]];
    }
    return res;
}

function frecuenciaH(val, n) {
    let res = new Array();
    let s = "";
    for (i = 0; i < n; i++) {
        res[i] = new Array();
        res[i]['t'] = 0;
        res[i]['h'] = 0;
        res[i]['c'] = 0;
        res[i]['sen'] = 0;
        res[i]['div'] = 0;
    }
    for (i = 0; i < ArrNico.length; i++) {
        console.log(val + ": " + ArrNico[i][val])
        res[ArrNico[i][val]]['t'] += ArrNico[i]['temperatura'];
        res[ArrNico[i][val]]['h'] += ArrNico[i]['humedad'];
        res[ArrNico[i][val]]['c'] += ArrNico[i]['co'];
        res[ArrNico[i][val]]['sen'] += ArrNico[i]['Sensacio_Termica'];
        res[ArrNico[i][val]]['div']++;
    }
    let aux = [
        ['Hora', 'Temperatura', 'Humedad', 'CO', 'sensacion termica']
    ];
    for (i = 0; i < res.length; i++) {
        aux.push([i,
            (res[i]['t'] / res[i]['div']),
            (res[i]['h'] / res[i]['div']),
            (res[i]['c'] / res[i]['div']),
            (res[i]['sen'] / res[i]['div'])
        ]);
    }
    return aux;
}