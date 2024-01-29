// Funktions för att ladda kursdata
async function loadCourses() {
    try {
        //Utför anrop för att hämta kursdata
        const response = await fetch("https://dahlgren.miun.se/ramschema_ht23.php");
        //Konverterar kursdata till JSON
        const data = await response.json();
        //Returnerar JSON-data
        return data;

    } catch (error) {
        //Hanterar fel och visar felmeddelande
        document.getElementById("error").innerHTML = `
            <p>Något gick fel</p>
            <p>Data kunde inte laddas.</p>
        `;
    }
}

//Kör funktion insertTable när DOM är laddad
document.addEventListener('DOMContentLoaded', insertTable);

//Funktion för att infoga kursdata i tabell
async function insertTable() {
    //Anropar funktion för att få kursdata
    const courses = await loadCourses();
    //Hämtar element där kursdata/listan ska visas
    const courseListEl = document.getElementById("courseList");
    //Rensa befintligt tabellinnehåll
    courseListEl.innerHTML = "";
    //Itererar över varje kurs i kurslistan
    courses.forEach((course) => {
        //Lägger till ny rad i tabelled för varje kurs + data från loadCourses
        courseListEl.innerHTML += `
            <tr>
                <td>${ course.code }</td>
                <td>${ course.coursename }</td>
                <td>${ course.progression }</td>
            </tr>
        `;
    })
}

// -------------------------------------------------------------- SORTERING --------------------------------------------------------------
//Ingen snygg kod. Försökte kombinera funktionerna så att jag hade en stor mer mångsidig funktion, men lyckades inte.

//Händelselyssnare för klick på Kurskod -> kör funktion sortCourses
const thCodeEl = document.getElementById("thCode");
thCodeEl.addEventListener('click', sortCourses);

//Funktion för sortering av kurskord vid klick på Kurskod
async function sortCourses() {
    //Anropar funktion för att få kursdata
    const courses = await loadCourses();
    //Sorterar hämtad data
    const sortedData = courses.sort((a, b) => (a.code > b.code) ? 1 : -1);

    insertSortedTable(sortedData);
}

//Händelselyssnare för klick på Namn -> kör funktion sortCoursename
const thIdEl = document.getElementById("thId");
thIdEl.addEventListener('click', sortCoursename);

//Funktion för sortering av kursnamn vid klick på Namn
async function sortCoursename() {
    const courses = await loadCourses();
    const sortedData = courses.sort((a, b) => (a.coursename > b.coursename) ? 1 : -1);

    insertSortedTable(sortedData);
}

//Händelselyssnare för klick på Progression -> kör funktion sortProgression
const thProgEl = document.getElementById("thProg");
thProgEl.addEventListener('click', sortProgression);

//Funktion för sortering av progression vid klick på Progression
async function sortProgression() {
    const courses = await loadCourses();
    const sortedData = courses.sort((a, b) => (a.progression > b.progression) ? 1 : -1);

    insertSortedTable(sortedData);
}

//Funktion för att infoga sorterad (och sökt) kursdata i tabell
async function insertSortedTable(sortedData) {
    //Hämtar element där kursdata/listan ska visas
    const courseListEl = document.getElementById("courseList");
    //Rensa befintligt tabellinnehåll
    courseListEl.innerHTML = "";
    //Itererar över varje kurs i kurslistan
    sortedData.forEach((course) => {
        //Lägger till ny rad i tabelled för varje kurs + data från loadCourses
        courseListEl.innerHTML += `
            <tr>
                <td>${ course.code }</td>
                <td>${ course.coursename }</td>
                <td>${ course.progression }</td>
            </tr>
        `;
    })
}