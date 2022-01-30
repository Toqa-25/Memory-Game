// ser variables

let parentSection = document.getElementById("all"),
    data = document.querySelector(".data"),
    game = document.querySelector(".game"),
    inputName = document.querySelector(".data input"),
    nameValue = document.getElementById("name-value"),
    levelValue = document.getElementById("level-value"),
    trueTries = document.getElementById("true-tries-value"),
    tries = document.getElementById("tries-value"),
    startButton = document.getElementById("start"),
    blockItemContent = document.querySelector(".block-game-content"),
    blockItems, randomElements,
    n = 9, right, users,  newUser={},
    nextSection = document.createElement("section");
    nextSection.id="next"
    nextSection.innerHTML = `<div class="next-level">
    <p class="next-level-text">Awesome</p>
    <div class="next-img"><img src="images/next/fireworks.png" alt=""></div>
    <button class="next-btn">Next</button>
    </div>`;
    localStorage.setItem("numberOfElements" , n) 
/*********************************************************/
   // 1- start game
   let objUsers = localStorage.getItem("users")
     ? JSON.parse(localStorage.getItem("users"))
     : [];
startButton.onclick = function startGame() {     
        trueTries.innerHTML = 0;
    if (inputName.value == null || inputName.value == "") {
            nameValue.innerHTML = "Unknown";
            newUser["Name"] = "Unknown";
            localStorage.setItem("Player", JSON.stringify("Unknown User"));
        } 
    else {
            nameValue.innerHTML = inputName.value;
          
        localStorage.setItem("Player", JSON.stringify(inputName.value));
        newUser["Name"] = inputName.value;
    }
    newUser["score"] = 0;

    objUsers=[ ...objUsers ,newUser ]
    localStorage.setItem("users" , JSON.stringify(objUsers))
    data.remove();                                                          //1                     
    game.style.display = "block";//2 
    createElements((localStorage.getItem("numberOfElements")));             //3
    /**************************************/       
    rotate();
    leaders();
}


/*********************************************************/
  // 1-create element                            
function createElements() {
    nextSection.remove()
    blockItemContent.innerHTML = ""  //1
    for (i = 1; i <= n && i < 16; i++) {    
     blockItemContent.innerHTML+=
         `  <div class="block-item" data-product="product-${i}.png">
                <div class="face back">
                    <img src="images/product-${i}.png" alt="">
                </div>
                <div class="face front "></div>
            </div>
            <div class="block-item" data-product="product-${i}.png">
                <div class="face back">
                    <img src="images/product-${i}.png" alt="">
                </div>
                <div class="face front"></div>
            </div>`
    }
    tries.innerHTML = 0;
    right = 0
    levelValue.innerHTML++;
    blockItems = Array.from(document.querySelectorAll(".block-item"));
    randomElements = [...Array(blockItems.length).keys()];      
    shuffle(randomElements);
       blockItems.forEach((blockItem, index) => {
         blockItem.style.order = randomElements[index];
       });
}
/**************************************/       
// 2- rotateElements function
function rotate() { 
    blockItems.forEach((e , index) => {
        e.onclick = () => {
            e.classList.add("is-Rotate");
            noClick();
        }   
    })
}
/**************************************/       
//3-rotate 2 elements && checked rotate elements
function noClick() {
let rotateArray = Array.from(document.querySelectorAll(".is-Rotate"));
if (rotateArray.length > 1) {
    checkElements();          //1
        blockItems.forEach((e, index) => {  //stop rotate another elements
            e.classList.add("no-Click");  
                setTimeout(() => {        
                    e.classList.remove("no-Click");
                    e.classList.remove("is-Rotate");
                } , 1500)
    });
}
}
/**************************************/       
  //  4- check same elements
function checkElements(n){
 let rotateArray = Array.from(document.querySelectorAll(".is-Rotate"));
    if (rotateArray[0].dataset.product === rotateArray[1].dataset.product ){
        rotateArray.forEach((e) => e.classList.add("is-match"));
        trueTries.innerHTML++;
        right++
        newUser["score"]++
        localStorage.setItem("users", JSON.stringify(objUsers));
        if (right == (blockItems.length / 2)) {
            next()
         }
    }
    else{
        tries.innerHTML ++
    }
} 
/*********************************************************/
    // 5- random itemes 
     // shuffle function
function shuffle(array) {
    let count = array.length,
        random, temp 
    while (count > 0) {        
     random = Math.floor(Math.random() * count)
     count--
        temp = array[count]
        array[count] = array[random];
        array[random]= temp
    }
    return array
}
/*********************************************************/
    // 6-next-level
function next() {
    parentSection.after(nextSection);
    let nextLevel = document.getElementById("next-level"),
      nextLevelButton = document.querySelector(".next-btn");
    nextLevelButton.onclick =  function () {
        console.log("hi")
        n = JSON.parse(localStorage.getItem("numberOfElements"))*2 //2
          localStorage.setItem("numberOfElements", n);
        createElements(localStorage.getItem("numberOfElements"));
        rotate()
        leaders();
       }   
}

/*********************************************************/
    // 7-leaders
    let winUsers = JSON.parse(localStorage.getItem("users")),
    leadersWin = winUsers.sort((a, b) => b.score - a.score),
    firstLeader = document.querySelector(".first-leader"),
    seconedLeader = document.querySelector(".seconed-leader"),
      thirdLeader = document.querySelector(".third-leader");
 function leaders(){
    if (winUsers && leadersWin[0].score > 0) {
        //leader one
      firstLeader.innerHTML = `1 - ${leadersWin[0].Name} <i class="fas fa-trophy"></i> `;
    } else {
      document.querySelector(".leaders").style.display = "none";
    }
    if (winUsers.length >= 2 && leadersWin[1].score > 0) {
        seconedLeader.innerHTML = `2 - ${leadersWin[1].Name} `;
    } else {
      seconedLeader.style.display = "none";
    }
    if (winUsers.length >= 4 && leadersWin[2].score > 0) {
        thirdLeader.innerHTML = `3 - ${leadersWin[2].Name} `;
    } else {
        thirdLeader.style.display = "none";
    }   
}
if (winUsers && leadersWin[0].score > 0) {




// let countNumer = document.getElementById("count-number"),
// project = setInterval(projectDone , 5),
// count1 =1

// function projectDone() {
//     count1++;
//     countNumer.innerHTML = count1
//     if (count1 == winUsers.length) {
//         clearInterval(project);
//     }
// }