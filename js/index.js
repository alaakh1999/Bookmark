var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var closeBtn = document.getElementById("closeBtn");
var tbody = document.getElementById("tbody");
var box = document.querySelector('.box')









submitBtn.onclick = function () {
    if (websiteNameVaild() && websiteUrlVaild() ) {
      addWebsite()  ;
    }
    else{
        box.classList.remove('d-none')
        reset()
    }
    
}



var bookMarks = [];
if (localStorage.getItem("websites") != null) {
    bookMarks = JSON.parse(localStorage.getItem("websites"));
    displayWebsite(bookMarks)
}



function addWebsite() {
    var website =
    {
        websiteName: siteName.value,
        websiteUrl: siteUrl.value,

    }
    bookMarks.push(website);
    console.log(bookMarks);
    localStorage.setItem("websites", JSON.stringify(bookMarks));
    displayWebsite(bookMarks);

    reset();

}
function displayWebsite(arr) {
    var box = '';
    for (var i = 0; i < arr.length; i++) {
        box += `
       <tr>
       <td>${[i+1]}</td>
       <td>${arr[i].websiteName}</td>
    
       <td><a href="${arr[i].websiteUrl}" target="_blank"><button class="btn btn-success"><i class="fa-solid fa-eye" style="color: #ffffff;"></i> Visit</button></a></td>
       <td><button class="btn btn-danger" onclick="deleteWebsite(${i})"><i class="fa-solid fa-trash-can" style="color: #ffffff;"></i> Delete</button></td>
        </tr>
       `
    }
    document.getElementById('tbody').innerHTML = box
}
function reset() {
    siteName.value = "";
    siteUrl.value = ""

}

function deleteWebsite(Index) {
    bookMarks.splice(Index, 1);
    localStorage.setItem("websites", JSON.stringify(bookMarks));
    displayWebsite(bookMarks);
}

var websiteNameregex = /^[A-Z a-z][a-z]{2,}$/
function websiteNameVaild() {
    if (websiteNameregex.test(siteName.value)) {
        return true
    }
    else {
        return false
    }

}

var websiteUrlregex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

function websiteUrlVaild() 
{
    if (websiteUrlregex.test(siteUrl.value))
    {
        return true
    }
    else{
        return false
    }
}

function closeBox() {
    box.classList.add("d-none");
}

closeBtn.addEventListener('click', closeBox)

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("box")) {
        closeBox();
    }
});

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        closeBox();
    }
});


