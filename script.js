const API = "917074d5a7c615cf5523f9a2872b3a41"
const baseURL = "https://gnews.io/api/v4"
const path = "/search"
const query = `?q=example&token=${API}`

// const fetchData = () => {
//     const url = baseURL + path + query;
//     const fromFetch = fetch(url)
//     fromFetch.then((success) => {
//         return success.json();
//     })
//     .then((xxx) => {
//         console.log(xxx)
//     });
// };

const FetchAsync = async()=>{
    const url = baseURL + path + query;
    let response = await fetch(url); //await    
    console.log("response", response)
    let data = await response.json(); //await
    console.log("data object", {data})
    const articles = data.articles;
    console.log("article", articles)
    const htmlTitleArea = document.getElementById("titleArea")
    const htmlOutput= articles.map((singleArticle) => {
    return renderArticle(singleArticle);
    })
    htmlTitleArea.innerHTML = htmlOutput;
    return
}

function renderArticle(singleArticle){
    return `
    <li class="mb-3 align-self-center article">
        ${singleArticle.title}
        <img src="${singleArticle.image}" alt="Snow" height="300"/>
       <h4 class="mb-0">${singleArticle.source.name}</h4>
        <h6 class="mb-0"><a href="${singleArticle.url}">${singleArticle.source.name}</a></h6>
      <p><i class="fa fa-envelope"></i>${singleArticle.content}</p>
    </li>
  `;
}
FetchAsync()