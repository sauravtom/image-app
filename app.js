$('textarea').bind("enterKey",function(e){
alert("Enter");
});
$('textarea').keyup(function(e){
if(e.keyCode == 13)
{
  $(this).trigger("enterKey");
}
});
 



$("body").keypress(function(event) {
  if ( event.which == 13 ) {
     lookup();
   }
});


function lookup(){
	
	var input = document.getElementById('input').value;
	console.log(input);
	var imgcont = document.getElementById('imgcont');
	
	imgcont.innerHTML = '';	
	
	var req = new XMLHttpRequest();
req.open(
    "GET",
    "http://api.flickr.com/services/rest/?" +
        "method=flickr.photos.search&" +
        "api_key=90485e931f687a9b9c2a66bf58a3861a&" +
        //"text=london&" + 
        "text=" + input + 
        "&safe_search=1&" +  // 1 is "safe"
        "content_type=1&" +  // 1 is "photos only"
        "sort=relevance&" +  // another good one is "interestingness-desc"
        "per_page=30",
    true);
req.onload = showPhotos;
req.send(null);

function showPhotos() {
  var photos = req.responseXML.getElementsByTagName("photo");

  for (var i = 0, photo; photo = photos[i]; i++) {
    var img = document.createElement("image");
    img.src = constructImageURL(photo);
    img.id='img';
    
    var li = document.createElement("li");
    li.appendChild(img);
    
    imgcont.appendChild(li);
    console.log('hoooyaaa');
  }
}


// See: http://www.flickr.com/services/api/misc.urls.html
function constructImageURL(photo) {
  return "http://farm" + photo.getAttribute("farm") +
      ".static.flickr.com/" + photo.getAttribute("server") +
      "/" + photo.getAttribute("id") +
      "_" + photo.getAttribute("secret") +
      "_z.jpg";
      
}	

// image corousel

$("li").on("click", function(){
  $(this).addClass("active").siblings().removeClass("active");
  
  var pos = $(this).index();
  var val = "-"+(pos * 515)+"px";
  $("ul").css("left", val);
  
});



};