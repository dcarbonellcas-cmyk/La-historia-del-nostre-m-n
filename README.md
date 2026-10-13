# La història del nostre món + Reforç escolar

Web estàtica en català, sense Base44 ni eines de compilació. Dos espais principals comparteixen una pàgina:

- **La història del nostre món**: biblioteca, mapa, veu i descoberta del projecte original.
- **Reforç escolar** (`#reforc`): materials d’I3 a 6è, ponts de bases, pràctica, fitxes, jocs i espai docent.

## Obrir i publicar

Es pot obrir `index.html` o servir aquesta carpeta amb un servidor estàtic. Per publicar a GitHub Pages, configura la font de publicació amb la branca que contingui els canvis i la carpeta arrel. No cal executar cap build. Les rutes d’`education/` són relatives i funcionen sota el nom del repositori.

## Banc de reforç inicial

66 unitats originals: 12 d’infantil, 6 ponts de bases i 16 per cada cicle de primària. Cada unitat té explicació, dues preguntes amb retorn, una producció i una aplicació pràctica. Totes tenen orientacions de revisió i observació. Algunes incorporen jocs de frases o quantitats. Aquest és un primer banc, **no tot el currículum**.

Les unitats de primària són compartides entre els cursos del cicle. «Comencem», «Practiquem» i «Ho apliquem» canvien l’acompanyament recomanat; no són proves estandarditzades ni tres temaris diferents. A infantil l’adult llegeix i s’accepten respostes orals, gestuals o amb dibuix.

## Dades i privacitat

Les respostes i observacions es desen a `localStorage` en el navegador. El registre és compartit pel dispositiu: no hi ha comptes ni perfils individuals d’alumnes, sincronització o servidor de dades. No s’hi han d’introduir dades personals. El seguiment es pot descarregar en JSON i esborrar. Si l’emmagatzematge no està disponible, es pot treballar i imprimir, però no es garanteix persistència.

El reforç no necessita connexions externes per mostrar materials. El mapa, les fotografies i les fonts oficials del projecte històric sí que necessiten Internet. La lectura de veu depèn de les veus instal·lades; les explicacions d’anglès s’acompanyen en català i la pronúncia dels exemples s’ha de revisar amb l’educador.

## Currículum i ampliació

Vegeu [criteris pedagògics i fonts](docs/criteris-pedagogics.md). La vinculació és orientativa, no una homologació. No hi ha cap actualització automàtica de normativa. La revisió detallada d’activitats, sabers i criteris d’avaluació l’ha de fer un professional educatiu abans d’utilitzar-ho com a programació completa.

## Comprovacions

Amb Node.js: `node --test tests/content.test.cjs`.

Amb Playwright i Chromium disponibles: `node tests/browser.cjs`. Aquesta comprovació crea un servidor temporal i prova el recorregut complet sense necessitar un servei extern.
