// document.addEventListener("touchstart", function() {},false);
// 
// $(window).scroll(function() {
//     var height = $(window).scrollTop();
//     if (height > 100) {
//         $('.scroll-top a').fadeIn();
//     } else {
//         $('.scroll-top a').fadeOut();
//     }
// });
// 
// $(document).ready(function() {
//     $("#scroll-top").click(function(event) {
//         event.preventDefault();
//         $("html, body").animate({ scrollTop: 0 }, "slow");
//         return false;
//     });
// 
// });

////space launch
//document.querySelector('h1').addEventListener('click', getFetch)


//disabled for now to not spam requests!

// function getFetch(){
//   //const choice = document.querySelector('input').value
//   const url = `https://ll.thespacedevs.com/2.2.0/launch/upcoming/
// `//+choice
// 
//   fetch(url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data.results[1])
//         document.querySelector('h2').innerText = data.results[1].name
//         document.querySelector('h3').innerText = data.results[1].net
//         document.querySelector('img').src = data.results[1].image
//         document.querySelector('#sldescription').innerText = data.results[1].mission.description
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }
// getFetch()