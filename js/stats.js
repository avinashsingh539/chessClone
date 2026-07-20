function getStats(){

    let stats = JSON.parse(localStorage.getItem("chessStats"));

    if(stats == null){

        stats = {

            games : 0,
            wins : 0,
            losses : 0,
            draws : 0

        };

        localStorage.setItem("chessStats", JSON.stringify(stats));

    }

    return stats;

}

function saveStats(stats){

    localStorage.setItem("chessStats", JSON.stringify(stats));

}

function addWin(){

    let stats = getStats();

    stats.games++;
    stats.wins++;

    saveStats(stats);

}

function addLoss(){

    let stats = getStats();

    stats.games++;
    stats.losses++;

    saveStats(stats);

}

function addDraw(){

    let stats = getStats();

    stats.games++;
    stats.draws++;

    saveStats(stats);

}