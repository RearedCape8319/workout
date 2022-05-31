async function enterWorkout() {
    let target = document.getElementById("target").value;
    let name = document.getElementById("name").value;
    let sets = document.getElementById("sets").value;
    let reps = document.getElementById("reps").value;
    let options = {
        method: "post",
        body: JSON.stringify({ target, name, sets, reps }),
        headers: { "Content-Type": "application/json" }
    };
    const response = await fetch("/api/storeWorkout", options);
    const data = await response.json();
    console.log(data);
    location.reload();
}

async function getAllWorkouts() {
    let options = {
        method: "get",
        headers: { "Content-Type": "application/json" }
    };
    const response = await fetch("/api/allWorkouts", options);
    const data = await response.json();
    console.log(data);
    let host = document.getElementById("all");
    for (let w of data) {
        let p = document.createElement("p");
        p.textContent = `${w.target}, ${w.name}, ${w.sets}x${w.reps}`;
        host.appendChild(p);
    }
    document.getElementById("name").focus();
}