document.addEventListener("DOMContentLoaded", function(event) {
    var sections = document.querySelectorAll(".section");
    sections.forEach(function(section) {
        section.addEventListener("click", function() {
            loadItem(section.id);
            var detailsContainer = document.querySelector("#details-container");
            toggleStylesheets();
        });
        var backButton = document.getElementById("back-button");
        var originalContent = document.getElementById("details-container").innerHTML;
    
        backButton.addEventListener("click", function() {
            loadOriginalContent(originalContent);
            toggleStylesheets();
        });
    });




});

function loadItem(sectionId) {
    var xttp = new XMLHttpRequest();
    xttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var itemsArray = JSON.parse(this.responseText);
            var sectionName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);

            var itemTemplate = `
            
           <a href "index.html">back 

            <h1 class="menu-title">${sectionName} Menu</h1>
                <div class="con">
                    
            `;

            itemsArray.forEach(function(entry) {
                var itemTemplatePart = `
                    <div class="subsec">
                        <h2 class="subtitle">${entry.name}</h2>
                        <p>${entry.description}</p>
                    </div>
                    
                `;
                itemTemplate += itemTemplatePart;
            });

            itemTemplate += `</div>`;

            var detailsContainer = document.querySelector("#details-container");
            detailsContainer.innerHTML = itemTemplate;
        }
    };

    // Modify the URL to dynamically load the JSON file based on the sectionId
    xttp.open("GET", "js/" + sectionId + ".json", true);
    xttp.send(null);
    function loadOriginalContent(content) {
        var detailsContainer = document.querySelector("#details-container");
        detailsContainer.innerHTML = content; // Restore the original content
    }
    
}




function toggleStylesheets() {
    var examStylesheet = document.getElementById("exam-stylesheet");
    var itemStylesheet = document.querySelector("link[href='css/item.css']");

    if (examStylesheet && itemStylesheet) {
        examStylesheet.disabled = true;
        itemStylesheet.disabled = false;
    }
}
