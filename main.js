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