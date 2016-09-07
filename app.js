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
  layoutData: {top: 40, centerX: 0}
}).appendTo(page);




var fragen = ["", "Frage1", "Frage2"];
var antworten = ["", "Antwort1", "Antwort2"];
//var images = [{src: "images/frage0.jpg", scale: 3}, {src: "images/frage1.jpg", scale: 3}, {src: "images/frage3.jpg", scale: 3}];


function getImage(index) {
  var imagesrc = "images/frage" + index + ".jpg";
  return {src: imagesrc};
}

/*
function getImage(index) {
  return images[index];
}
*/


var frage = tabris.create("TextView", {
  layoutData: {left: 10, top: 120, right: 10},
  text: fragen[aktuelleAufgabe],
  alignment: "left"
}).appendTo(page);


var antwort = new tabris.TextInput({
  layoutData: {top: 160, left: "20%", right: "20%"},
  message: "Antwort"
}).on("accept", function(widget, text) {
  new tabris.TextView({
    layoutData: {top: "prev() 20", left: "20%"},
    text: text
  }).appendTo(page);
}).appendTo(page);



var button = new tabris.Button({
  layoutData: {left: 10, top: 210, width : 300},
  text: "Starten"
}).on("select", function() {
  pruefeAntwort();

}).appendTo(page);


var ergebnis = tabris.create("TextView", {
  layoutData: {left: 10, top: 350, right: 10},
  text: "",
  alignment: "left"
}).appendTo(page);


var buttonRestart = new tabris.Button({
  layoutData: {left: 10, top: 410, width : 300},
  text: "Von vorne"
}).on("select", function() {
  aktuelleAufgabe = 0;
  pruefeAntwort();

}).appendTo(page);



function pruefeAntwort() {

  if (aktuelleAufgabe == 0 || button.get("text") == "Weiter") {
    // nächste aufgabe einblenden
    aktuelleAufgabe++;
    localStorage.setItem("aktuelleAufgabe", aktuelleAufgabe);
    ergebnis.set("text","");
    button.set("text","Prüfe Antwort");
    frage.set("text",fragen[aktuelleAufgabe]);
    imageView.set("image", getImage(aktuelleAufgabe));
  } else if (button.get("text") != "Weiter" ) {
    if (antworten[aktuelleAufgabe] != antwort.get("text")) {
      // antwort falsch
      ergebnis.set("text","falsch");
    } else {
      // antwort richtig
      ergebnis.set("text","richtig");
      button.set("text","Weiter");
    }
  } 
}



page.open();