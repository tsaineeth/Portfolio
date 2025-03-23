document.getElementById('themeSwitcher').addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light')
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
    }
})

function fill_eduction(data) {
    const main_col_left = document.getElementById('main_col_left')
    const education = data['education']
    education.forEach(value => {
        const card = document.createElement("div");
        card.classList.add("card")
        card.classList.add("mx-auto")
        card.classList.add("mt-2")
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${value.institution}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${value.name}</h6>
                <p class="card-text fw-normal mb-1">Major: ${value.major}</p>
                <p class="card-text fw-normal mb-1">Grad: ${value.month} ${value.year} | ${value.location}</p>
            </div>`;
        main_col_left.appendChild(card);
    })
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("assets/data/about.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("first_name").innerText = data['first_name']
            document.getElementById("last_name").innerText = data['last_name']
            document.getElementById("about-title").innerText = data['title']
            document.getElementById("about-bio").innerText = data['bio']
            // document.getElementById("contact-email").innerText = data['email']
            // document.getElementById("contact-linkedin").href = data['linkedin']
            // document.getElementById("contact-github").href = data['github']
            fill_eduction(data);
        })
        .catch(error => console.error("Error loading projects:", error));
});

function fill_skills(skills) {
    const main_col_left = document.getElementById('main_col_left')
    const technical_skills = skills['technical_skills']
    const soft_skills = skills['soft_skills']

    const card = document.createElement("div");
    card.classList.add("card")
    card.classList.add("mx-auto")
    card.classList.add("mt-2")

    const card_body = document.createElement("div");
    card_body.classList.add("card-body")
    card_body.innerHTML = `<h5 class="card-title">Technical SKills</h5>`
    for (const key in technical_skills) {
        card_body.innerHTML += `<h6 class="card-subtitle mb-1 text-body-secondary">${key}</h6>`
        const skill_text = technical_skills[key].join(" | ")
        card_body.innerHTML += `<p class="card-text fw-lighter">${skill_text}</p>`
    }

    card.appendChild(card_body)
    main_col_left.appendChild(card)

}

document.addEventListener("DOMContentLoaded", () => {
    fetch("assets/data/skills.json")
        .then(response => response.json())
        .then(skills => {
            fill_skills(skills)
        })
        .catch(error => console.error("Error loading projects:", error));
});

