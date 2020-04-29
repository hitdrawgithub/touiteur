const touitZone = document.getElementById("touit-zone");
const touitSend = document.getElementById("touit-send");
const touitName = document.getElementById("name");
const touitMessage = document.getElementById("message");

const request = new XMLHttpRequest();
request.open("GET", "http://touiteur.cefim-formation.org/list", true);
request.addEventListener("readystatechange", function() {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        const response = JSON.parse(request.responseText);
        for (let touit of response.messages) {
            addTouit(touit.name, touit.message, touit.ts, touit.comments_count, touit.id);
        }
    }
});
request.send();


function addTouit(name, message, ts, comments_count, id) {
    const touit = document.createElement("div");
    touit.className = ("border px-3 mt-3");
    
    const touitName = document.createElement("span");
    touitName.textContent = name;

    const touitText = document.createElement("p");
    touitText.className = ("text-break");
    touitText.textContent = message;

    const touitTs = document.createElement("span");
    touitTs.textContent = new Date(ts*1000).toLocaleString();

    const touitNbComments = document.createElement("button");
    touitNbComments.type = "button";
    touitNbComments.id = id;
    touitNbComments.className = "btn btn-info float-right";
    touitNbComments.textContent = comments_count+" comments";
    touitNbComments.addEventListener("click", showComments)

    touitZone.insertBefore(touit, touitZone.childNodes[2]);
    touit.appendChild(touitName);
    touit.appendChild(touitText);
    touit.appendChild(touitTs);
    touit.appendChild(touitNbComments);
}

// function addComment()

function showComments(ev) {
    ev.preventDefault();
    console.log(ev);
    
}

function payeTonTouit(ev) {
    ev.preventDefault();
    console.log(ev);

    const name = touitName.value;
    touitName.value = "";
    const message = touitMessage.value;
    touitMessage.value = ""; 
    const ts = Date.now()/1000;

    addTouit(name, message, ts);
}

touitSend.addEventListener("click", payeTonTouit);