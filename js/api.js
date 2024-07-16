var selectElement = document.querySelector("#selectapi");
var btnSubmite = document.querySelector("button");
var allData = [];

var contaner = ``;

//<!-- ========== prepare Api and get data ========== -->

async function callapi(slection) {
  var request = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${slection}`
  );
  var data = await request.json();
  allData = data.recipes;
  console.log(allData);
  display();

}

function getdata() {
  callapi(selectElement.value);
}

btnSubmite.addEventListener("click", function () {
  getdata();
});
//<!-- ========== Start Section Api display data ========== -->
function display() {
  var name;
  for (let i = 0; i < allData.length; i++) {
    name=allData[i].title;

    contaner += ` <div class="col-3 ">
            <div class=" mt-5">
               <h2 class="text-white">${name.split(' ').splice(0,2).join(" ")}</h2>
               <img onclick="source_url(${i})" src="${allData[i].image_url}" class=" w-100  object-fit-contain" alt="">
            </div>
         </div>`;
  }

  document.querySelector("#displayAPI").innerHTML = contaner;
  contaner=``;
}

var remove = document.querySelector('a') 
remove.addEventListener('click',function () {
  location.replace('index.html')
    localStorage.removeItem('user name')
})

function source_url(index) {
  window.open(`${allData[index].source_url}`)
  
}