$(document).ready(function(){

let user=JSON.parse(localStorage.getItem("currentUser"));

if(user==null){

window.location="login.html";

return;

}

$("#userName").text(user.name);

$("#userEmail").text(user.email);

$("#rating").text(user.rating);

$("#games").text(user.games);

$("#wins").text(user.wins);

const stats = JSON.parse(localStorage.getItem("chessStats"));

if(stats){

    document.getElementById("games").innerHTML = stats.games;

    document.getElementById("wins").innerHTML = stats.wins;

    document.getElementById("losses").innerHTML = stats.losses;

    document.getElementById("draws").innerHTML = stats.draws;

    let rate = 0;

    if(stats.games > 0){

        rate = ((stats.wins / stats.games) * 100).toFixed(1);

    }

    document.getElementById("winRate").innerHTML = rate + "%";

}

$("#logoutBtn").click(function(){

localStorage.removeItem("currentUser");

window.location="index.html";

});

});