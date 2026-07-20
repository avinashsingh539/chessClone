const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const username = currentUser ? currentUser.name : "Player";

const players = [

    {name:"Magnus Carlsen", rating:2832},
    {name:"Hikaru Nakamura", rating:2805},
    {name:"Gukesh D", rating:2788},
    {name:"Arjun Erigaisi", rating:2776},
    {name:"Praggnanandhaa", rating:2769},
    {name:"Fabiano Caruana", rating:2765},
    {name:"Ian Nepomniachtchi", rating:2758},
    {name:"Ding Liren", rating:2750},

    {name:username, rating:800}

];

const tbody = document.getElementById("leaderboardBody");

players.forEach((player,index)=>{

    const row=document.createElement("tr");

    let rank=index+1;

    if(rank==1) rank="GOLD";
    else if(rank==2) rank="Silver";
    else if(rank==3) rank="Bronze";

    if(player.name==username){

        row.classList.add("table-success");

    }

    const nameCell = (player.name==username) ? `${player.name} <span class="badge bg-warning text-dark ms-2">You</span>` : player.name;

    row.innerHTML = `

        <td>${rank}</td>

        <td class="text-start">${nameCell}</td>

        <td>${player.rating}</td>

    `;

    tbody.appendChild(row);

    if(player.name==username){
        // make it extra visible and scroll into view
        row.classList.add("fw-bold");
        row.scrollIntoView({behavior: "smooth", block: "center"});
    }

});