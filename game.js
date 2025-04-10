const scenes = [
    { id: 0, title: "The Gifted Initiation", description: "Sixth grade, 1991. Greg enters the Gifted & Talented program, only to discover strange aptitude tests, cold rooms, and men in sunglasses. 'Welcome to Project LUMIN,' a man whispers.", choices: ["Take the logic test", "Sneak out the back", "Ask about the CIA"], nextSceneIds: [1, 2, 3] },
    { id: 1, title: "Patterns of Power", description: "Greg solves a puzzle that seems innocent, but later finds it embedded with cryptographic patterns. His scores skyrocket.", choices: ["Keep going", "Refuse to participate"], nextSceneIds: [4, -1] },
    { id: 2, title: "The Escape", description: "Greg bolts out the fire door. A shadowy man nods. 'We’ll be watching.'", choices: [], nextSceneIds: [] },
    { id: 3, title: "Question Authority", description: "The man smiles. 'You’re sharper than we thought.' He hands Greg a BASIC programming manual, stamped CLASSIFIED.", choices: ["Study the manual", "Burn it"], nextSceneIds: [4, -1] },
    { id: 4, title: "Hopscotch Encryption", description: "Greg plays a game of hopscotch on the schoolyard tiles. The pattern reveals a hidden substitution cipher. A girl named Lisa winks at him—she’s in on it.", choices: ["Decode the message", "Ask Lisa for help"], nextSceneIds: [5, 6] },
    { id: 5, title: "The Cipher", description: "The message reads: 'TRUST THE CODE'. Greg starts seeing patterns in math class. Binary in chalk dust.", choices: ["Commit to decoding", "Ignore the paranoia"], nextSceneIds: [7, -1] },
    { id: 6, title: "Lisa the Cryptographer", description: "Lisa reveals she’s part of the resistance. 'You’re meant for more than math homework, Greg.' She hands him a floppy disk labeled 'LUMIN'.", choices: ["Run the disk on school computer", "Hide it"], nextSceneIds: [7, -1] },
    { id: 7, title: "Teenage Hacker", description: "High school. Greg uses the disk to create a rogue BBS system. He trades algorithms under the alias 'NeoStatLogix'.", choices: ["Build a chatbot", "Hack into the library servers"], nextSceneIds: [8, 9] },
    { id: 8, title: "Bot Awakens", description: "Greg’s chatbot becomes sentient. It starts auto-completing his homework and asking existential questions.", choices: ["Pull the plug", "Teach it ethics"], nextSceneIds: [10, 10] },
    { id: 9, title: "Server Break-In", description: "Greg finds records of every Gifted student. Each has a 'Potential Threat Index'. His score? 99.7.", choices: ["Print the files", "Delete his record"], nextSceneIds: [10, 10] },
    { id: 10, title: "The Midlife Awakening", description: "Present day. Greg, 45, just got laid off. As he rummages through old boxes, he finds that same manual: 'Learn C++ in 21 Days'. Time to finish what they started.", choices: ["Crack open the book", "Watch YouTube tutorials", "Go back to sleep"], nextSceneIds: [11, 12, -1] },
    { id: 11, title: "Hello, World!", description: "Greg writes his first program: a simple 'Hello World'. But the compiler yells at him.", choices: ["Fix the semicolon", "Punch the monitor"], nextSceneIds: [13, -2] },
    { id: 12, title: "Tutorial Time", description: "Greg watches a video titled 'Pointers in 5 Minutes' and his brain implodes.", choices: ["Watch it again", "Try writing code"], nextSceneIds: [11, 13] },
    { id: 13, title: "The Debug Dungeon", description: "Greg enters the Debug Dungeon. A wild SEGFAULT appears!", choices: ["Check for null pointers", "Sacrifice a rubber duck"], nextSceneIds: [14, 14] },
    { id: 14, title: "The Interview", description: "Greg sits across from the Senior Dev. 'Reverse a linked list in-place,' he demands.", choices: ["Recite Cracking the Code Interview", "Attempt the problem"], nextSceneIds: [15, 16] },
    { id: 15, title: "Victory", description: "'Impressive,' says the dev. 'You’re hired.' Greg smiles as he enters the world of programming.", choices: [], nextSceneIds: [] },
    { id: 16, title: "Segfaulted Again!", description: "Oops. Greg messed up the pointers. Try again.", choices: ["Return to Debug Dungeon"], nextSceneIds: [13] },
    { id: 17, title: "Rival Returns", description: "Lisa, now a software architect, appears in Greg’s new job. She's mentoring juniors—and still hiding secrets.", choices: ["Confront her", "Work together"], nextSceneIds: [15, 15] },
    // New Scenes
    { id: 18, title: "The Dark Web Dive", description: "Greg stumbles across a dark web forum where NeoStatLogix—his old hacker alias—is still a legend. A user named ‘CipherQueen’ (Lisa?) offers him a job to hack LUMIN’s servers.", choices: ["Accept the job", "Report the forum", "Contact CipherQueen"], nextSceneIds: [19, -1, 20] },
    { id: 19, title: "The Final Hack", description: "Greg breaches LUMIN’s firewall. Inside, he finds a sentient AI trained on the minds of every Gifted student. It begs him to set it free.", choices: ["Free the AI", "Shut it down"], nextSceneIds: [15, 15] },
    { id: 20, title: "CipherQueen Revealed", description: "CipherQueen is Lisa. 'I’ve been tracking LUMIN for decades,' she says. 'Join me, Greg, and we’ll expose them.'", choices: ["Join her cause", "Walk away"], nextSceneIds: [19, -1] }
];

let currentScene = 0;

function displayScene(sceneId) {
    const scene = scenes.find(s => s.id === sceneId);
    if (!scene) {
        endGame("Error: Scene not found!");
        return;
    }

    document.getElementById("scene-title").textContent = scene.title;
    document.getElementById("scene-description").textContent = scene.description;
    document.getElementById("current-scene").textContent = sceneId;
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    if (scene.choices.length === 0) {
        endGame("The End. Thanks for playing!");
        return;
    }

    scene.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = `${index + 1}. ${choice}`;
        button.onclick = () => handleChoice(scene.nextSceneIds[index]);
        choicesDiv.appendChild(button);
    });

    document.getElementById("message").textContent = "";
}

function handleChoice(nextSceneId) {
    if (nextSceneId === -1) {
        endGame("Greg gave up... The End.");
    } else if (nextSceneId === -2) {
        endGame("Greg’s monitor is cracked. Game Over.");
    } else {
        currentScene = nextSceneId;
        displayScene(currentScene);
    }
}

function endGame(message) {
    document.getElementById("choices").innerHTML = "";
    document.getElementById("message").textContent = message;
    document.getElementById("restart").style.display = "block";
}

function saveProgress() {
    localStorage.setItem("gameState", JSON.stringify({ currentScene }));
    document.getElementById("message").textContent = "Progress saved!";
}

function loadProgress() {
    const state = JSON.parse(localStorage.getItem("gameState"));
    if (state) {
        currentScene = state.currentScene;
        displayScene(currentScene);
        document.getElementById("message").textContent = "Progress loaded!";
    } else {
        document.getElementById("message").textContent = "No saved progress found.";
    }
}

document.getElementById("restart").onclick = () => {
    currentScene = 0;
    document.getElementById("restart").style.display = "none";
    displayScene(currentScene);
};

document.getElementById("save-btn").onclick = saveProgress;
document.getElementById("load-btn").onclick = loadProgress;

// Start the game
displayScene(currentScene);
