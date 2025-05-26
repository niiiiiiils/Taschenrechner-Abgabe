const display = document.getElementById('display');
/*https://developer.mozilla.org/de/docs/Web/API/Document/querySelectorAll
er selected alles mit dem tag ".cs-btn", das wo ich das design her habe
speichert es als node liste (https://developer.mozilla.org/de/docs/Web/API/NodeList)
ist ein bisschen wie ein array aber hat nicht alle funktionen, funktioniert hier aber
*/
//const buttons = document.querySelectorAll('.cs-btn');
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
      //das else ist dann für alle zalen die da dazugeschrieben werden
      else {
        input += wert;
        display.textContent = input;
      }
    });
});