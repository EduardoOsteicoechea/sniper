const PageArticle001 = document.getElementsByTagName("article")[0];
const webUrl = `desertic_plan.json`;

setTimeout(() => {
    reloadArticle(webUrl)
}, 100)

document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'c') {
        reloadArticle(webUrl)
    }
});

let touchCount = 0;
let timeoutId = null;
document.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    touchCount++;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        touchCount = 0;
        console.log('Touch counter reset.');
    }, 300);
    if (touchCount === 3) {
        reloadArticle(webUrl)
        touchCount = 0;
        clearTimeout(timeoutId);
    }
});

function reloadArticle(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let htmlContent = "";
            htmlContent += `
        <div class="article_heading_container">
            <h1 class="article_title">${data.title}</h1>
            <p class="article_heading_small_item article_key_idea">Síntesis: ${data.key_idea}</p>
            <p class="article_heading_small_item article_series">Serie: ${data.series}</p>
            <p class="article_heading_small_item article_date">Fecha: ${data.date}</p>
            <p class="article_heading_small_item article_author">Autor: ${data.author}</p>
        </div>
        `;
            data.items.forEach(item => {
                if (item.name) {
                    htmlContent += `<h2 class="idea_heading">${item.name}</h2>`;
                }
                item.structure.forEach(structure_item => {
                    htmlContent += `<div class="structure_item">`
                    for (let x = 0; x < structure_item.content.length; x++) {
                        const content_piece = structure_item.content[x];
                        if (structure_item.type === "chorus" && x == 0) {
                            htmlContent += `<p class="structure_item_content_piece_item_type_name">[${structure_item.Name}]</p>`;
                        }
                        htmlContent += `<p class="structure_item_content_piece_item">${content_piece}</p>`;
                    }
                    htmlContent += `</div>`;
                });
            });

            PageArticle001.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            PageArticle001.innerHTML = `<p>Error loading content.</p>`;
        });
}
