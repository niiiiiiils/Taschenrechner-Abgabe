const wrong = false;
const display = document.getElementById('display');
//20 minuten lebenszeit weil die globale variable display heisst 
var displayprozent = document.getElementById("ProzentDisplay");
/*https://developer.mozilla.org/de/docs/Web/API/Document/querySelectorAll
er selected alles mit dem tag ".cs-btn", das wo ich das design her habe
speichert es als node liste (https://developer.mozilla.org/de/docs/Web/API/NodeList)
ist ein bisschen wie ein array aber hat nicht alle funktionen, funktioniert hier aber
*/
const buttons = document.querySelectorAll('.cs-btn');
let input = '';
    /*Mit der NodeList hier funktioniert das foreach nur in neueren Browsern(scheinbar???)
    andernfalls hätte man es auch in ein array umwandeln können, so:
    const buttons = Array.from(document.querySelectorAll('.cs-btn'));
    oder:
    (Keine ahnung ob die punkte wichtig sind oder nicht)
    const buttons = [...document.querySelectorAll('.cs-btn')];
    */
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      /*https://developer.mozilla.org/de/docs/Web/API/Node/textContent
      innerHTML gibt elemente als html element wieder und man könnte theoretisch attribute an das html anfügen wenn man = <i>Text</i> oder so macht
      textContent macht es nur als string und ist deshalb auch schneller usw 
      Chatgpt Beispiel:
        element.innerHTML = "<b>Hallo</b>";
        // Ergebnis: Hallo (fett)
        element.textContent = "<b>Hallo</b>";
        // Ergebnis: <b>Hallo</b> (als Text sichtbar, nicht fett)
      */
      const wert = button.textContent;
      //input leeren
      if (wert === 'C') {
        input = '';
        //wir schreiben 0 wenn leer 
        display.textContent = '0';

      } //hier schauen wir ob eine der error nachrichten da ist und löschen das ganze wenn eins da ist      
        else if (wert === '←' && (input === 'Infinity' || input === 'Fehler') ){
        input = '';
        display.textContent = '0';
      } else if (wert === '←') {
        //https://developer.mozilla.org/de/docs/Web/API/Blob/slice
        input = input.slice(0, -1);
        //Falls input leer dann 0??? 
        display.textContent = input || '0';
      } else if (wert === '=') {
        
        //noch ein if um zu sehen ob wir mit prozent oder normal arbeiten
        if(wrong == true)
        {
          Prozentrechnung();
        }
        else 
        {      
          //Try um sicher zu gehen das kein fehler kommt
          try {
            //eval ist eine fürchterliche lösung wenn man das input feld nicht schützt
            input = eval(input).toString();
            display.textContent = input;
          } 
          //errors fangen 
          catch {
            display.textContent = 'Fehler';
            input = '';
          }
        }
      }
      else if (wert === 'x^2') {
        const ops = ["+", "-", "*", "/"];
        let pos = Math.max(
          input.lastIndexOf("+"),
          input.lastIndexOf("-"),
          input.lastIndexOf("*"),
          input.lastIndexOf("/")
        );
        let zahl = pos === -1 ? input : input.slice(pos + 1);
        let num = parseFloat(zahl);
      
        if (isNaN(num)) {
          display.textContent = "Fehler: Keine Zahl zum Quadrieren";
        } else {
          let quad = (num * num).toString();
          // Intern input mit Ergebnis ersetzen
          input = (pos === -1 ? "" : input.slice(0, pos + 1)) + quad;
        
          // Im Display schön anzeigen: (Zahl)^2
          display.textContent = (pos === -1 ? "" : input.slice(0, pos + 1)) + `(${zahl})^2`;
        }
      }

      else if (wert === '%')
      {
          Prozentumbau();
      }

      //das else ist dann für alle zalen die da dazugeschrieben werden
      else {
        input += wert;
        display.textContent = input;
      }
    });
});


function Prozentumbau() {
  var displaynormal = document.getElementById("display");
  var displayprozent = document.getElementById("ProzentDisplay");
  var Überschrift = document.getElementById("Ueberschrift");
  
  
  if(displaynormal.style.display !== "none") {
    displaynormal.style.display = "none";
    displayprozent.style.display = "flex"; // wichtig: flex für Zentrierung!
    Überschrift.style.display = "flex";
    wrong = true;
    selected();
  } else {
    displaynormal.style.display = "block";
    displayprozent.style.display = "none";
    Überschrift.style.display = "none";
    display2.style.display = "none";
    wrong = false;
  }
}
function selected(){
  var Überschrift = document.getElementById("Ueberschrift");
  var selection = document.getElementById("prozentselect").value;

  //sowas wie wie viel sind 50% von 200
  if (selection === "prozentvon")
  {
    Überschrift.textContent = "Wie viel sind x% von y"
  }
  //sowas wie wie viel sind 50 von 200 in prozent
  else if(selection === "inprozent")
  {
    Überschrift.textContent = "Was sind x von y in %"
  }
  else
  {
    throw new Error(alert("error"))
  }
}
function Prozentrechnung()
{
  const ProzentDisplay = document.getElementById("ProzentDisplay");
  const display2 = document.getElementById("display2");
  const selection = document.getElementById("prozentselect").value;
  const input1 = parseFloat(document.getElementById("input1").value);
  const input2 = parseFloat(document.getElementById("input2").value);
  let ergebenis;
  if (selection === "prozentvon")
  {
    result = (input1 / 100) * input2;
  }
  //sowas wie wie viel sind 50 von 200 in prozent
  else if(selection === "inprozent")
  {
    Überschrift.textContent = "Was sind x von y in %"
  }

    // Ergebnis anzeigen
  display2.textContent = result.toString();

  // mergen
  ProzentDisplay.classList.add("merged");
  display2.classList.add("merged");
  display2.style.display = "block";
}
