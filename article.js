const PageArticle001 = document.getElementsByTagName("article");
const webUrl = `un_dios_prudente.json`;

setTimeout(()=>{
    reloadArticle(webUrl)
},100)

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

function reloadArticle(url){
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        ArticleTitle001_article_title_heading.innerHTML = data.title;
        
        let htmlContent = ""; 
        data.ideas.forEach(idea => {
            if(idea.heading)
            {
                htmlContent += `<h2>${idea.heading}</h2>`;
            }
            idea.subideas.forEach(subidea => {
              if(subidea.type === "biblical_quote")
              {
                if(subidea.key_phrases){
                  console.log(subidea.key_phrases)
                  subidea.key_phrases.forEach(key_phrase => {
                    
                    console.log(key_phrase)
                    subidea.content = subidea.content.replace(key_phrase, `<span class="biblical_quote_key_prhase">${key_phrase}</span>`)
                  });
                }
                htmlContent += `
                <div class="biblical_quote">
                  <p class="biblical_quote_text">${subidea.content}</p>
                  <p class="biblical_quote_reference">${subidea.biblical_reference}</p>
                </div>
                `
              }
              else if(subidea.type === "image"){
                htmlContent += `
                <div class="image">
                  <img src="static/images/${subidea.content}">
                </div>
                `
              }              
              else
              {
                htmlContent += `<p>${subidea.content}</p>`;
              }
            });
        });
        PageArticle001.innerHTML = htmlContent;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        PageArticle001.innerHTML = `<p>Error loading content.</p>`; 
    });
}
