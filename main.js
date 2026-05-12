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

fetch("figur-1-gjennomsnittlig.csv")
    .then(response => response.text())
    .then(text => {
        const statlines = text.split("\n");

        for (let i = 1; i < statlines.length; i++) {
            const parts = statlines[i].split(";");

            const stat = new Statistic(parts[0], parts[1], "minutter");
            screenTimeData.push(stat);
        }

        console.log(screenTimeData);

    });
    // console.log(statlines)

