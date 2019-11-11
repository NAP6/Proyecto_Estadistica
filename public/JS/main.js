alert("Cosa");


var Nicolas_bd = firebase.database();
Nicolas_bd.on('value', function (snapshot) {
    snapshot.forEach(function(e){
        var obj=e.val();
        document.write(obj.IndiceUlt);
    });
    //updateStarCount(postElement, snapshot.val());
});
