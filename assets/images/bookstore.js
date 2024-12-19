var book1 = {
    "id": 1,
    "name": "Lasagna: A Retrospective",
    "author": "Garfield",
    "pictureUrl": "http://graphics8.nytimes.com/images/2015/10/15/dining/15RECIPE20DIN/15RECIPE20DIN-articleLarge.jpg",
    "price": 24,
    "sellingPoints": [
        "Lasagna is delicious.",
        "The essential guide to Italian casseroles of all types.",
        "Real G's move silent, like Lasagna. -Lil Wayne"
    ]
}
$('#book-1-id li p').text(book1.id)
$('#book-1-name li p').text(book1.name)
$('#book-1-author li p').text(book1.author)
$('#book-1-picture li img').attr("src", book1.pictureUrl)
$('#book-1-price li p').text(book1.price)
// loop through array to get selling points.
var i = 0
while (i < book1.sellingPoints.length) {
  $('#book-1-sellingpoints ul').append('<li>' + book1.sellingPoints[i] + '</li>');
  console.log(book1.sellingPoints[i]);
  i ++
}

// $('#book-1-sellingpoints-2').text(book1.sellingPoints[1])
// $('#book-1-sellingpoints-3').text(book1.sellingPoints[2])