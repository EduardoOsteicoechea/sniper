export default class ArticleSeriesFormater {
    DataFileUrl = "";
    DataFileContent = "";
    DataHolderComponent = "";
    ArticleApiUrl = "";

    constructor
        (
            dataFileUrl,
            dataHolderComponent,
            articleApiUrl,
        ) {
        this.DataFileUrl = dataFileUrl;
        this.DataHolderComponent = dataHolderComponent;
        this.ArticleApiUrl = articleApiUrl
    }

    async fetchArticleDataFile() {
        await fetch(this.DataFileUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.DataFileContent = data;
                console.log(this.DataFileContent);
            })
            .catch(error => {
                this.DataFileContent = error;
                console.error('Failed fetch operation:', this.DataFileContent);
                this.DataHolderComponent.innerHTML = this.DataFileContent;
            });
    }

    async print() {
        await this.fetchArticleDataFile();
        let html = "";
        const article_series_header = this.DataFileContent.article_series_header;
        const articles = this.DataFileContent.articles;
        html += this.generateArticleSeriesHeader(article_series_header);
        html += this.generateArticlesContent(articles);
        this.DataHolderComponent.innerHTML = html;
    }

    generateArticleSeriesHeader(data) {
        return `
        <div class="article_series_header">
            <h3 class="article_series_title">${data.title}</h3>
        </div>
        `;
    }

    generateArticlesContent(data) {
        let html = '<div class="articles">';
        data.forEach(article => {
            html += '<article class="article">';
            html += this.generateArticleHeader(article.article_header);
            html += this.generateArticleBody(article.article_body);
            html += '</article>';
        });
        html += '</div>';
        return html;
    }

    generateArticleHeader(data) {
        return `
        <div class="article_header_container">
            <h1 class="article_title">${data.title}</h1>
            <p class="article_header_small_item article_key_idea">Síntesis: ${data.key_idea}</p>
            <p class="article_header_small_item article_date">Fecha: ${data.date}</p>
            <p class="article_header_small_item article_author">Autor: ${data.author}</p>
        </div>
        `;
    }

    generateArticleBody(data) {
        let html = '<ol class="article_ideas">';

        const article_ideas = data.ideas

        article_ideas.forEach(article_idea => {
            html += '<li class="article_idea">';
            html += this.generateArticleIdeaHeader(article_idea.header);
            html += this.generateArticleIdeaBody(article_idea.body);
            html += '</li>';
        });

        html += '/<ol>';
        return html;
    }

    generateArticleIdeaHeader(data) {
        let html = ""
        if (data.heading) {
            html += '<div class="article_idea_heading">';
            html += `<h2>${data.heading}</h2>`;
            html += "</div>"
        }
        return html;
    }

    generateArticleIdeaBody(data) {
        let html = '<div class="article_idea_body">'

        data.subideas.forEach(subidea => {
            if (subidea.type === "biblical_quote") {
                html += this.generateArticleSubideaBiblicalQuote(subidea)
            }
            else if (subidea.type === "image") {
                html += this.generateArticleSubideaImage(subidea)
            }
            else {
                html += this.generateArticleSubideaParagraph(subidea)
            }
        });

        html += '</div>';
        return html;
    }

    generateArticleSubideaBiblicalQuote(data) {
        let html = "<div>"
        if (data.key_phrases) {
            data.key_phrases.forEach(key_phrase => {
                data.content = data.content.replace(key_phrase, `<span class="biblical_quote_key_prhase">${key_phrase}</span>`)
            });
        }
        html += `
                <div class="biblical_quote">
                  <p class="biblical_quote_text">${data.content}</p>
                  <p class="biblical_quote_reference">${data.biblical_reference}</p>
                </div>
                `
        html += '</div>';
        return html;
    }

    generateArticleSubideaParagraph(data) {
        return `<p>${data.content}</p>`;
    }

    generateArticleSubideaImage(data) {
        return `
        <div class="image">
            <img src="static/images/${data.content}">
        </div>
        `;
    }





    ///////////////////////
    /// Class end
    ///////////////////////
}