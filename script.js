let players = JSON.parse(localStorage.getItem("arenaPlayers")) || [];

function getCategory(pushups){
    if(pushups >= 1000) return "Mythic";
    if(pushups >= 200) return "Legend";
    if(pushups >= 100) return "Epic";
    return "Veterano";
}

function getClassName(category){
    switch(category){
        case "Mythic": return "mythic";
        case "Legend": return "legend";
        case "Epic": return "epic";
        default: return "veterano";
    }
}

function addPushups(){

    const name = document.getElementById("playerName").value.trim();
    const amount = Number(document.getElementById("pushups").value);

    if(!name || amount <= 0){
        alert("Preencha os campos corretamente.");
        return;
    }

    let player = players.find(
        p => p.name.toLowerCase() === name.toLowerCase()
    );

    if(player){
        player.pushups += amount;
    }else{
        players.push({
            name:name,
            pushups:amount
        });
    }

    saveData();

    document.getElementById("playerName").value="";
    document.getElementById("pushups").value="";

    renderRanking();
}

function saveData(){
    localStorage.setItem(
        "arenaPlayers",
        JSON.stringify(players)
    );
}

function renderRanking(){

    players.sort((a,b)=>b.pushups-a.pushups);

    const ranking = document.getElementById("ranking");

    ranking.innerHTML="";

    let guildXP = 0;

    players.forEach((player,index)=>{

        guildXP += player.pushups;

        const category = getCategory(player.pushups);

        ranking.innerHTML += `
            <div class="player-card ${getClassName(category)}">

                <div class="player-name">
                    #${index+1} ${player.name}
                </div>

                <div class="player-info">
                    ${category} • Lv ${Math.floor(player.pushups/10)}
                </div>

                <div class="player-info">
                    ${player.pushups} flexões
                </div>

            </div>
        `;
    });

    document.getElementById("guildText").innerText =
        guildXP + " / 10000 XP";

    const percentage =
        Math.min((guildXP/10000)*100,100);

    document.getElementById("guildBar").style.width =
        percentage + "%";
}

renderRanking();
