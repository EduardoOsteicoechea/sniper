import ArticleSeriesFormatter from "./article_series_formatter.js";

const componentContainerElement =  document.getElementsByTagName("main")[0];

const pageDatasetElement = document.getElementById("page_dataset_attributes");

const websiteUrl = "https://eduardoos.com";

const mainApiEndpoint = websiteUrl + pageDatasetElement.dataset.mainApiEndpoint;

const mainDataFileUrl = websiteUrl + pageDatasetElement.dataset.mainDataFileUrl;

setTimeout(()=>{
    var articleGenerator = new ArticleSeriesFormatter(
        mainDataFileUrl, 
        componentContainerElement, 
        mainApiEndpoint
    );
    articleGenerator.print();
},100)

document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'c') {
    var articleGenerator = new ArticleSeriesFormatter(
        mainDataFileUrl, 
        componentContainerElement, 
        mainApiEndpoint
    );
    articleGenerator.print();
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
    var articleGenerator = new ArticleSeriesFormatter(
        mainDataFileUrl, 
        componentContainerElement,
        mainApiEndpoint
    );
    articleGenerator.print();
    touchCount = 0;
    clearTimeout(timeoutId);
  }
});