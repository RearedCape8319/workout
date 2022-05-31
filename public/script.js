async function show(query) {
    const url = `/api/${query}`;
    const options = {
        method: "get",
        headers: { "Content-Type": "application/json" }
    };
    const response = await fetch(url);
    const data = await response.json();
    let host = document.getElementById("divOutput");
    let target = data[0].target;
    target = target.charAt(0).toUpperCase() + target.slice(1);    
    host.innerHTML = `<h2><u>${target}</u></h2>`;
    for (let workout of data) {
        let p = document.createElement("p");
        p.innerHTML = `<b>${workout.reps}x${workout.sets}</b> ${workout.name}`;
        host.appendChild(p);
    }
}

