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