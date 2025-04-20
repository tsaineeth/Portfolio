document.getElementById('themeSwitcher').addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light')
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
    }
})

function createCard() {
    const card = document.createElement("div");
    card.classList.add("card")
    card.classList.add("border-0")
    card.classList.add("mx-auto")
    // card.classList.add("mt-1")
    return card
}

document.addEventListener("DOMContentLoaded", () => {

    fetch("assets/data/skills.json")
        .then(response => response.json())
        .then(skills => {
            fillSkills(skills)
        })
        .catch(error => console.error("Error loading projects:", error));


    fetch("assets/data/experience.json")
        .then(response => response.json())
        .then(experience => {
            fillExperience(experience)
        })
        .catch(error => console.error("Error loading projects:", error));


    fetch("assets/data/about.json")
        .then(response => response.json())
        .then(about => {
            document.getElementById("firstName").innerText = about['first_name']
            document.getElementById("lastName").innerText = about['last_name']
            document.getElementById("aboutTitle").innerText = about['title']
            document.getElementById("aboutBio").innerText = about['bio']
            // document.getElementById("contact-email").innerText = data['email']
            // document.getElementById("contact-linkedin").href = data['linkedin']
            // document.getElementById("contact-github").href = data['github']
            fillEduction(about);
        })
        .catch(error => console.error("Error loading projects:", error));
});

function fillEduction(about) {
    const sectionEducation = document.getElementById('education')
    const education = about['education']

    // For each institution create a different card.
    education.forEach(value => {
        const card = createCard();
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${value.institution}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${value.name}</h6>
                <p class="card-text fw-normal mb-1">Major: ${value.major}</p>
                <p class="card-text fw-normal mb-1">Grad: ${value.month} ${value.year} | ${value.location}</p>
            </div>`;
        sectionEducation.appendChild(card);
    })
}


function getCertifications(certifications) {
    const card = createCard();
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body")
    cardBody.innerHTML = `<h5 class="card-title">Certifications</h5>`
    certifications.forEach(certificate => {

        const div = document.createElement("div");
        div.classList.add("row")

        div.innerHTML += `<p class="card-text text-body-secondary col-2">${certificate.year}</p>`
        div.innerHTML += `<p class="card-text text-body-secondary col-4">${certificate.name}</p>`
        div.innerHTML += `<p class="card-text text-body-secondary col-2">${certificate.description}</p>`

        cardBody.appendChild(div)
    })
    card.appendChild(cardBody)
    return card
}

function getTechnicalSkills(technicalSkills) {
    // Add all technical skills under the same card.
    const card = createCard()
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body")
    cardBody.innerHTML = `<h5 class="card-title">Technical SKills</h5>`
    for (const key in technicalSkills) {
        cardBody.innerHTML += `<h6 class="card-subtitle mb-1 text-body-secondary">${key}</h6>`
        const skillText = technicalSkills[key].join(" | ")
        cardBody.innerHTML += `<p class="card-text fw-lighter">${skillText}</p>`
    }
    card.appendChild(cardBody)

    return card

}

function getSoftSkills(softSkills){
    const card = createCard();
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body")
    cardBody.innerHTML = `<h5 class="card-title">Soft Skills</h5>`
    cardBody.innerHTML += `<h6 class="card-subtitle mb-1 text-body-secondary">Strong</h6>`
    const innerText = softSkills.join(" &bull; ")
    cardBody.innerHTML += `<p class="card-text fw-lighter">${innerText}</p>`

    card.appendChild(cardBody)
    return card

}

function fillSkills(skills) {
    const sectionTechnicalSkills = document.getElementById('technicalSkills')
    const sectionSoftSkills = document.getElementById('softSkills')
    const sectionCertifications = document.getElementById('certifications')

    sectionTechnicalSkills.appendChild(getTechnicalSkills(skills['technical_skills']));
    sectionSoftSkills.appendChild(getSoftSkills(skills['soft_skills']));
    sectionCertifications.appendChild(getCertifications(skills["certifications"]));
}


function getExperience(experience, sectionExperience) {

    experience.forEach(value => {
        const title = value?.company.toUpperCase() + " | " + value?.role
        const subtitle = value?.start_date + " - " + value?.end_date + " | " + value?.location

        const card = createCard();
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body")
        cardBody.innerHTML = `<h5 class="card-title">${title}</h5>`
        cardBody.innerHTML += `<h6 class="card-subtitle mb-2 text-body-secondary">${subtitle}</h6>`
        cardBody.innerHTML += `<h6 class="card-subtitle mb-2 text-body-secondary">Project</h6>`

        const projects = value?.projects

        projects.forEach(project => {
            const projectTitle = project?.name
            cardBody.innerHTML += `<h6 class="card-subtitle text-body-secondary">${projectTitle}</h6>`

            const ul = document.createElement("ul");
            ul.classList.add("text-body-secondary");
            const summary = project?.summary
            console.log(summary)
            summary.forEach(line => {
                const li = document.createElement("li");
                li.textContent = line;
                ul.appendChild(li);
            });
            cardBody.appendChild(ul)
        })



        card.appendChild(cardBody)
        sectionExperience.appendChild(card)
    })

}


function getAwards(awards) {
    const card = createCard();
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body")


    awards.forEach(award => {
        const div = document.createElement("div");
        div.classList.add("row")

        div.innerHTML += `<p class="card-text text-body-secondary col-2">${award.year}</p>`
        div.innerHTML += `<p class="card-text text-body-secondary col-4">${award.name}</p>`
        div.innerHTML += `<p class="card-text text-body-secondary col-4">${award.company}</p>`

        cardBody.appendChild(div)
    })


    card.appendChild(cardBody)
    return card

}

function fillExperience(experience) {
    const sectionExperience = document.getElementById('experience')
    const sectionAwards = document.getElementById('awards')

    getExperience(experience["experience"], sectionExperience);
    sectionAwards.appendChild(getAwards(experience["awards"]));
}
