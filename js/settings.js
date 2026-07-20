const darkMode = document.getElementById("darkMode");
const sound = document.getElementById("sound");
const highlight = document.getElementById("highlight");
const difficulty = document.getElementById("difficulty");

const settings = JSON.parse(localStorage.getItem("settings"));

if(settings){

    darkMode.checked = settings.darkMode;
    sound.checked = settings.sound;
    highlight.checked = settings.highlight;
    difficulty.value = settings.difficulty;

}

document.getElementById("saveSettings").onclick = function(){

    const settings = {

        darkMode: darkMode.checked,
        sound: sound.checked,
        highlight: highlight.checked,
        difficulty: difficulty.value

    };

    localStorage.setItem("settings", JSON.stringify(settings));

    applyTheme();

    alert("Settings Saved Successfully!");

}

function applyTheme(){

    const settings = JSON.parse(localStorage.getItem("settings"));

    if(settings.darkMode){

        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");

    }
    else{

        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");

    }

}

applyTheme();