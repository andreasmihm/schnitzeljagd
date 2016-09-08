var time = Date.now();
var round = 0;
var bestclick = 1000;

var page = tabris.create("Page", {
  title: "Rosas Schnitzeljagd",
  topLevel: true
});

var aktuelleAufgabe = 0;
var media = new Media(getMp3URL("richtig.mp3"));

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
}).on("tap", function() {
   playSound("frage"+ aktuelleAufgabe + ".mp3");
}).appendTo(page);




var fragen = ["", 
              "Findet diesem geheimen Ort!, Wenn Ihr dort seid, schaut über das Tal und sagt mir, welche Burg ihr seht.", 
              "Super, findet nun diese Bank und schaut von dort wieder hinunter. Wie heißt das Tal vor Euch?",
              "Toll, das nächste Ziel ist nicht so weit, sucht also diesen Waldeingang und sagt mir welcher Ortsname auf der Bank steht.",
              "Herzlich willkommen im Wald. Wisst Ihr auch, wo dieser Hexenbaum steht? Er ist nicht weit. Sucht ihn und sagt mir dann, was es für ein Baum ist!",
              "Ich hoffe, die hexe hat Euch nicht gefangen. Geht also schnell weiter und sucht die Traubeneiche. Welche Tiere wurden im Mittelalter hier her getrieben?",
              "Ihr kennt Euch ja im Wald gut aus. Könnt Ihr mir auch sagen, welcher Baum das hier ist?",
              "Geht nun weiter und sucht dieses Tor mitten im Wald. Was verbirgt sich denn hinter dem Tor?",
              "Kennt Ihr auch die Vögel des Waldes? Findet zuerst die Hinweistafel zu den Waldvögeln und sagt mir dann, wem diese Vogelstimme hier gehört",
              "Das ging ja gut. Und wem gehört diese Stimme?",
              "Dann habe ich noch eine Frage für Euch Vogelexperten: Welcher Waldvogel trägt blauweise Federn an seinen Flügeln?",
              "Kennt Ihr Euch auch mit den Pilzen des Waldes aus? Welcher Pilz ist das hier?",
              "Das war richtig. Kann man den Fliegenpilz essen?",
              "Das war noch leicht. Kennt Ihr auch diesen Pilz? Sein Name ist so ähnlich wie ein Geräusch, das man mit dem Mund machen kann.",
              "Die Pilze habt Ihr jetzt geschafft. Geht nun zu dieser kleinen Brücke. Wenn Ihr dort seid, zählt bitte nach, ob ihr niemanden verloren habt. Sind noch alle da?",
              "Jetzt wieder eine leichte Frage für Euch Waldforscher: Welcher Baum hat denn diese Blätter und Früchte?",
              "Begebt Euch jetzt zu diesem Ort. Wenn Ihr dort seid, findet heraus, wie man diesen Ort nennt.",
              "Welches besondere Insekt lebt hier?",
              "Die Erdkröte besucht den Tümpel auch manchmal. Womit fängt sie ihre Beute?",
              "Sehr gut, Ihr habt alle Fragen richtig beantwortet. Geht nun zum Süßigkeitenschatz. Habt Ihr Euch alle Buchstaben notiert? Dann dürft Ihr jetzt das Lösungswort eingeben. Wenn es richtig ist, öffnet sich der Süßigkeitenschatz"
              ];
var antworten = ["", 
                 "kunitzburg", 
                 "rautal",            //l
                 "closewitz",
                 "linde",
                 "schweine",
                 "esche",
                 "sportplatz",        //a 
                 "grünspecht",        //g
                 "kolkrabe",          //e
                 "eichelhäher",       //r
                 "fliegenpilz",       //f
                 "nein",              
                 "pfifferling",
                 "ja",
                 "eiche",
                 "tümpel",            //e
                 "libelle",
                 "schleuderzunge",    //uer
                 "lagerfeuer"];    


var ergebnisTexte = ["", 
                 "Super, das ist richtig!", 
                 "Richtig, merke Dir bitte den letzten Buchstaben.",
                 "Super, das ist richtig!",
                 "Super, das ist richtig!",
                 "Super, das ist richtig!",
                 "Super, das ist richtig!",
                 "Richtig, merke Dir bitte den achten Buchstaben.",        //a 
                 "Richtig, merke Dir bitte den ersten Buchstaben.",        //g
                 "Richtig, merke Dir bitte den letzten Buchstaben.",          //e
                 "Richtig, merke Dir bitte den letzten Buchstaben.",       //r
                 "Richtig, merke Dir bitte den ersten Buchstaben.",       //f
                 "Super, das ist richtig!",              
                 "Super, das ist richtig!",
                 "Super, das ist richtig!",
                 "Super, das ist richtig!",
                 "Richtig, merke Dir bitte den fünften Buchstaben.",      //e
                 "Super, das ist richtig!",
                 "Richtig, merke Dir bitte die Buchstaben 6, 8 und 9.",   //uer
                 "Hurra, das war richtig! Lasst es Euch schmecken!"];    


function getImage(index) {
  var imagesrc = "images/frage" + index + ".jpg";
  return {src: imagesrc, scale: 2};
}

var frage = tabris.create("TextView", {
  layoutData: {left: 10, top: 360, right: 10},
  text: fragen[aktuelleAufgabe],
  alignment: "left"
}).appendTo(page);


var antwort = new tabris.TextInput({
  layoutData: {top: 440, left: "10%", right: "10%"},
  message: "Antwort"
}).appendTo(page);



var button = new tabris.Button({
  layoutData: {top: 490, left: "10%", right: "10%"},
  text: "Prüfe Antwort"
}).on("select", function() {
  pruefeAntwort();

}).appendTo(page);


var ergebnis = tabris.create("TextView", {
  layoutData: {top: 550, left: "10%", right: "10%"},
  text: "",
  alignment: "left"
}).appendTo(page);


var buttonRestart = new tabris.Button({
  layoutData: {top: 590, left: "10%", right: "10%"},
  text: "Von vorne"
}).on("select", function() {
  aktuelleAufgabe = 0;
  pruefeAntwort();
  console.log(tabris.app.getResourceLocation("audio/rosa.mp3"));
}).appendTo(page);


function getMp3URL(filename) {

    var path = tabris.app.getResourceLocation("audio/"+filename);
    console.log(path);
  // According to Media plugin documentation the media path must be
  // relative to the "www" folder under iOS
  if (tabris.device.get("platform") === "iOS" && path.indexOf("/www/") > 0) {
    path = path.substr(path.indexOf("/www/") + 5);
  }
  console.log(path);
  return path;
}

function playSound(filename) {
      media.stop();
      media = new Media(getMp3URL(filename));
      media.play();
}


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
      playSound("falsch.mp3");
    } else {
      // antwort richtig
      ergebnis.set("text",ergebnisTexte[aktuelleAufgabe]);
      if (aktuelleAufgabe == 19) {
        playSound("cheerleader.mp3");
        button.dispose();
      } else {
        button.set("text","Weiter");
        playSound("richtig.mp3");
      }
    }
  } 
}



page.open();