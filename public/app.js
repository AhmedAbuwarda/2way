let app = document.querySelector("#app");
// create button
let button = document.createElement("button");
button.innerText = "Keep Alive";
button.id = "keep_alive_button";
app.appendChild(button);

let p = document.createElement("p");
p.textContent = "You are alive!";
app.appendChild(p);

setInterval(async function() {
    // fetch keep alive endpoint
    const keep_alive = fetch("/keep_alive", {
        method: "GET"
    }).then(res => {
        if (res.status === 200) {
            p.textContent = "You are still alive";
        }
    }).catch(err => {
        p.textContent = "You are dead";
    });
} , 5000);