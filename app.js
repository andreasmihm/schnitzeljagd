var time = Date.now();
var round = 0;
var bestclick = 1000;

var page = tabris.create("Page", {
  title: "Schnitzeljagd",
  topLevel: true
});

var aktuelleAufgabe = 0;

if (!isNaN(parseInt(localStorage.getItem("aktuelleAufgabe")))) {
  aktuelleAufgabe = parseInt(localStorage.getItem("aktuelleAufgabe"));
}

var ueberschrift = tabris.create("TextView", {
  layoutData: {left: 10, top: 20, right: 10},
  text: "Hallo Rosa, hier ist Deine Schnitzeljagd. Viel Spaß! ",
  alignment: "left"
}).appendTo(page);


var imageView = new tabris.ImageView({
  image: getImage(aktuelleAufgabe),
  background: "rgb(220, 220, 220)",
  layoutData: {top: 60, centerX: 0}
}).appendTo(page);




var fragen = ["", 
              "Findet diesem geheimen Ort!, Wenn Ihr dort seid, schaut über das Tal und sagt mir, welche Burg ihr seht.", 
              "Super, findet nun diese Bank und schaut von dort wieder hinunter. Wie heißt das Tal vor Euch?"];
var antworten = ["", 
                 "kunitzburg", 
                 "rautal"];
//var images = [{src: "images/frage0.jpg", scale: 3}, {src: "images/frage1.jpg", scale: 3}, {src: "images/frage3.jpg", scale: 3}];


function getImage(index) {
  var imagesrc = "images/frage" + index + ".jpg";
  return {src: imagesrc, scale: 2};
}

/*
function getImage(index) {
  return images[index];
}
*/


var frage = tabris.create("TextView", {
  layoutData: {left: 10, top: 320, right: 10},
  text: fragen[aktuelleAufgabe],
  alignment: "left"
}).appendTo(page);


var antwort = new tabris.TextInput({
  layoutData: {top: 400, left: "10%", right: "10%"},
  message: "Antwort"
}).appendTo(page);



var button = new tabris.Button({
  layoutData: {top: 450, left: "10%", right: "10%"},
  text: "Starten"
}).on("select", function() {
  pruefeAntwort();

}).appendTo(page);


var ergebnis = tabris.create("TextView", {
  layoutData: {top: 510, left: "10%", right: "10%"},
  text: "",
  alignment: "left"
}).appendTo(page);


var buttonRestart = new tabris.Button({
  layoutData: {top: 550, left: "10%", right: "10%"},
  text: "Von vorne"
}).on("select", function() {
  aktuelleAufgabe = 0;
  pruefeAntwort();
  var media = new Media(tabris.app.getResourceLocation("audio/rosa.mp3"));
  media.play();

}).appendTo(page);



function pruefeAntwort() {

  if (aktuelleAufgabe == 0 || button.get("text") == "Weiter") {
    // nächste aufgabe einblenden
    aktuelleAufgabe++;
    localStorage.setItem("aktuelleAufgabe", aktuelleAufgabe);
    ergebnis.set("text","");
    antwort.set("text","");
    button.set("text","Prüfe Antwort");
    frage.set("text",fragen[aktuelleAufgabe]);
    imageView.set("image", getImage(aktuelleAufgabe));
  } else if (button.get("text") != "Weiter" ) {
    if (antworten[aktuelleAufgabe] != antwort.get("text").toLowerCase()) {
      // antwort falsch
      ergebnis.set("text","Das ist leider falsch!");
    } else {
      // antwort richtig
      ergebnis.set("text","Super, das ist richtig!");
      button.set("text","Weiter");
    }
  } 
}



page.open();