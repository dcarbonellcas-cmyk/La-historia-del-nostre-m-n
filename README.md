# La història del nostre món

Aplicació estàtica en català, amb 30 relats introductoris organitzats en 30 volums i 6 etapes, un mapa OpenStreetMap amb 14 llocs, fitxes en finestres, cerca i preguntes.

## Obrir-la

Serviu aquesta carpeta amb qualsevol servidor de fitxers estàtics, per exemple `python3 -m http.server 8765`, i obriu http://localhost:8765. No cal instal·lar dependències ni executar una compilació. GitHub Pages publica la branca main amb el flux existent.

## Contingut i limitacions

Els relats són introduccions, no històries exhaustives. Els nous relats inclouen enllaços a les fonts al lector. S’han conservat els 15 relats originals i s’hi han afegit 15 introduccions. El mapa té 14 llocs seleccionats; els punts sense relat ho indiquen. Xcaret, Egipte i Uruk tenen fites locals específiques. Les altres fitxes ofereixen el context conegut i les lectures pendents.

La veu requereix una veu catalana al dispositiu i un navegador amb Speech Synthesis. No són audiollibres gravats. Les fotografies remotes són d’ambientació; les imatges de portada i d’èpoques són creades amb IA, es desen localment i no representen reconstruccions arqueològiques verificades. El mapa i les fotografies necessiten connexió; si una foto falla es mostra una il·lustració local.

## Validació

Sintaxi de JavaScript, cobertura dels 30 volums i comprovació al navegador del lector, de les fonts, del joc, de la cerca i de la finestra de Xcaret. Disseny revisat en amplada petita. La disponibilitat d’una veu catalana depèn del dispositiu.

## Imatges creades amb IA

Set imatges creades amb l’eina integrada de generació d’imatges: portada amb un atles imaginari, Terra des de l’espai, piràmides, ciutat medieval, caravel·la, ciutat industrial i ciutat contemporània. Els prompts complets s’inclouen a `assets/prompts-imatges-ia.json`. Les fotografies remotes originals continuen sent imatges d’ambientació.

## Ampliació cronològica i mapa acolorit

La biblioteca conserva 30 relats. El catàleg afegeix 2.730 fitxes breus procedents de Wikidata, totes amb article de la Viquipèdia catalana, organitzades en les sis etapes i ordenades cronològicament. Inclou sobretot batalles, guerres i tractats, amb revolucions, expedicions i moviments socials. No és un catàleg exhaustiu ni ha rebut una verificació editorial individual. Les fitxes no es compten com a relats desenvolupats.

La consulta reproduïble és a `data/history-query.rq`. Les dades estructurades són CC0. Es conserva la precisió i el calendari original de les dates, es converteix la numeració astronòmica dels anys BCE i es mostren les datacions alternatives. Alguns episodis tradicionals coneguts s’etiqueten explícitament com a historicitat discutida; aquesta selecció d’etiquetes tampoc és exhaustiva.

El mapa utilitza 177 formes territorials simplificades de Natural Earth (domini públic), una paleta de set colors i previsualització en passar el cursor, en tocar o amb el teclat. No inclou tots els microestats i les formes no equivalen a fronteres històriques. Hi ha context local relacionat amb deu territoris. En altres zones, es busca un fragment d’una pàgina d’història en català; el fragment identifica la Viquipèdia i la seva llicència CC BY-SA. Si no hi ha resposta o relat, la fitxa ho indica i ofereix les fonts.

Validació addicional: cobertura i ordenació de les 2.730 fitxes, anys BCE, cerca dins d’una etapa, obertura de fonts, 177 zones accessibles, context d’Egipte i consulta de França, imatges en mòbil i ordinador.
