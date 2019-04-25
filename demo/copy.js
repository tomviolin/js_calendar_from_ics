// copy button for ics
document.querySelector("#copyLink1").addEventListener("click", function(){copy("ics-url1");});
document.querySelector("#copyLink2").addEventListener("click", function(){copy("ics-url2");});

// copy button for ics
function copy(myurl) {
  selection = document.getElementById(myurl).innerText;
  navigator.clipboard.writeText(selection).then(function() {
    /* clipboard successfully set */
  }, function() {
    /* clipboard write failed */
  });
}


