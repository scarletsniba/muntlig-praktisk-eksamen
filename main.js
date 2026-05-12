const tabs = document.querySelectorAll(".tab");             // henter alle knappene i indexen og legger de inn i en NodeList som heter tabs
const sections = document.querySelectorAll(".tab-content"); // henter alle seksjonene i indexen og legger de inn i en Nodelist som heter sections

tabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
        const activeTab = this.dataset.tab;
        console.log(activeTab);

        showTab(activeTab);    // sjuler alle tabs og viser tabben man nyligst trykket på
    });
});

function showTab(tabName) {
    sections.forEach(function(section) {
        section.classList.add("hidden");
    })

    document.getElementById(tabName).classList.remove("hidden");
}

showTab("forside");

class Statistic {
    constructor(label, value, unit) {
        this.label = label;
        this.value = value;
        this.unit = unit;   // måleenhet som minutter / prosent
    }
}

const screenTimeData = [];
const platformData = [
    new Statistic("YouTube", 80, "prosent"),
    new Statistic("Snapchat", 65, "prosent"),
    new Statistic("TikTok", 55, "prosent"),
    new Statistic("Instagram", 53, "prosent"),
    new Statistic("Facebook", 35, "prosent"),
    new Statistic("X/Twitter", 15, "prosent"),
];

fetch("figur-1-gjennomsnittlig.csv")
    .then(response => response.text())
    .then(text => {
        const statlines = text.split("\n");

        for (let i = 1; i < statlines.length; i++) {
            const parts = statlines[i].split(";");
            if (parts.length >= 2 && parts[0] !== "") {
                const value = Number(parts[1].replace(/"/g, ""));
                const label = parts[0].replace(/"/g, "");
                const stat = new Statistic(label, value, "minutter");
                screenTimeData.push(stat);
            }
        }
        console.log(screenTimeData.map(s => s.value))

        const ctx = document.getElementById("screenTimeChart");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: screenTimeData.map(s => s.label),
                datasets: [{
                    label: "Gjennomsnittlig skjermtid (minutter per dag)",
                    data: screenTimeData.map(s => s.value)
                }]
            }
        });;

    });

const ctx2 = document.getElementById("platformChart");
new Chart(ctx2, {
    type: "bar",
    data: {
        labels: platformData.map(s => s.label),
        datasets: [{
            label: "Andel 9-18-åringer som bruker hvert sosiale medie",
            data: platformData.map(s => s.value)
        }]
    }
})

console.log(platformData.map(s => s.value))