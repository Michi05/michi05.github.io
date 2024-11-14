function generateHTMLFromJSON(data) {
    // Create a container element
    var container = document.createElement('div');
    container.classList.add('container');

    // Iterate over each object in the JSON array
    data.forEach(function(obj) {
        // Create a detail element
        var detail = document.createElement('div');
        detail.classList.add('detail');

        // Create a detailTag element and set its text content
        var detailTag = document.createElement('div');
        detailTag.classList.add('detailTag');
        detailTag.textContent = obj.date;

        // Create an infoRow element
        var infoRow = document.createElement('div');
        infoRow.classList.add('infoRow');

        // Create a detDestac element and set its text content
        var detDestac = document.createElement('span');
        detDestac.classList.add('detDestac');
        detDestac.textContent = obj.title;

        // Append detDestac to infoRow
        infoRow.appendChild(detDestac);

        // Check if obj.second exists (optional)
        if (obj.second) {
            // Create a detSecond element and set its text content
            var detSecond = document.createElement('span');
            detSecond.classList.add('detSecond');
            detSecond.textContent = obj.second;

            // Append detSecond to infoRow
            infoRow.appendChild(detSecond);
        }

        // Append detailTag and infoRow to detail
        detail.appendChild(detailTag);
        detail.appendChild(infoRow);

        // Append detail to container
        container.appendChild(detail);
    });

    // Return the container element
    return container;
}

// Example JSON data
var jsonData = [
    {
        "date": "Sep 2023 - Present",
        "title": "Lead Technical Architect at Kainos"
    },
    {
        "date": "Nov 2019 - Mar 2023",
        "title": "Technical Solutions Architect at FlyForm"
    },
    {
        "date": "Oct 2017 - Nov 2019",
        "title": "Principal Tech Consultant at Accenture"
    },
    {
        "date": "Jan 2016 - Oct 2017",
        "title": "Senior Tech Consultant at Focus Group Europe"
    },
    {
        "date": "March 2013 - Dec 2015",
        "title": "ServiceNow Developer at CERN"
    },
    {
        "date": "2012 (6 months)",
        "title": "Research Assistant internship at European Centre for Soft Computing",
        "second": "Integration of Microsoft Kinect as part of a general robotic architecture",
        "third": "Main technologies: Python, C++, Microsoft Kinect and Robot Operating System",
        "fourth": "Principal Researcher: Enrique Ruspini - Supervisor: Kevin LeBlanc"
    },
    {
        "date": "2010 (6 months)",
        "title": "Research Assistant internship at University of Oviedo",
        "second": "Use of two Nintendo Wii controllers to develop a Computer Vision stereo system",
        "third": "Principal Researcher and Supervisor: Santiago Martín González (Univ. of Oviedo)"
    }
]


// Generate HTML structure from JSON data
var generatedHTML = generateHTMLFromJSON(jsonData);

// Get the "Experience" section
var experienceSection = document.getElementById('Experience'); // 

// Append generated HTML to the "Experience" section
if (experienceSection)
    experienceSection.appendChild(generatedHTML);
else
    alert ('nochild')