//
const SearchBTN = document.querySelector('.searcLOG');

// document.cookie = "name="+searchKEY+"; path=/api/search/key_ingredient/";
// function getCookies(search){
//     let cookies = document.cookie.split(';');

//     for(let i = 0; i < cookies.length; i++) {
//         let one = cookies[i];
//         while (one.charAt(0) == ' ') { one = one.substring(1); }
//         if (one.indexOf(search) == 0) {return one.substring(search.length, one.length);} 
//     }
//     return "";
// }

//// push the search arguments to array
// function search (){
//     let searchName = getCookies("name=");
//     let searchPATH = getCookies("namePATH=");

//     let searchResults = JSON.parse(localStorage.getItem("searchResults"));
//     let searchARG = JSON.parse(localStorage.getItem("searchARG"));
    
//     if(searchName != ""){
//         if(!searchResults.includes(searchName)){ 
//             //check if there are more than 4 searches
//               if(searchResults.length === 1){ 
//                   searchResults.shift();searchARG.shift(); }
//               //save the new search 
//               searchResults.push(searchName); searchARG.push(searchPATH);
//         }
//     }

  //remove existing search history displaied to displayed new one
    // while(SearchBTN.lastChild){
    //     SearchBTN.removeChild(SearchBTN.lastChild);
    // }

  // display the history stored
//     for(let i = 0; i < searchResults.length; i++){
//         const divSear = document.createElement('div');
//         const displayHISBTN = document.createElement('button');
//         displayHISBTN.setAttribute('class', 'btn material-icons');
//         displayHISBTN.setAttribute('class', searchARG[i]);
//         displayHISBTN.textContent = searchResults[i];
//         divSear.appendChild(displayHISBTN);
//         SearchBTN.appendChild(divSear);
//     }
//     localStorage.setItem("searchResults",JSON.stringify(searchResults));
//     localStorage.setItem("searchARG",JSON.stringify(searchARG));
// }

//event listner for the search history
const searchTHElog = (event) =>{
    event.preventDefault();
  
    if(event.target.classList.contains('btn')){
        switch (event.target.classList.contains){
          case 'key_ingredient': document.location.replace(`/api/search/key_ingredient/${event.target.textContent}`); break;
          case 'title': document.location.replace(`/api/search/title/${event.target.textContent}`); break;
          case 'author_id': document.location.replace(`/api/search/author_id/${event.target.textContent}`); break;
          default: document.location.replace('/');
        }
    }
  };

// SearchBTN.forEach((SearchBTN) => {
    SearchBTN.addEventListener('click', searchTHElog);
// });

search();

