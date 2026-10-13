# La història del nostre món

Aplicació estàtica en català amb 30 relats introductoris, 2.802 lectures cronològiques, 177 territoris acolorits i 14 llocs destacats. Els textos s’obren dins de la pàgina amb apartats desplegables, opcions per obrir-los i plegar-los i lectura en veu alta quan el dispositiu disposa d’una veu catalana.

## Obrir-la

Serviu aquesta carpeta amb un servidor de fitxers estàtics, per exemple `python3 -m http.server 8765`, i obriu http://localhost:8765. No cal instal·lar dependències ni compilar. GitHub Pages publica la branca main amb el flux existent. La proposta de canvis continua en una branca separada; no s’ha fusionat automàticament.

## Lectures internes

Les 2.730 fitxes del catàleg inicial, 72 lectures temàtiques, 177 territoris del mapa i 14 llocs disposen de textos locals a `data/readings/`. El manifest associa cada identificador amb un paquet de lectures. Només es descarrega el paquet necessari per obrir un text.

Els textos de consulta de la Viquipèdia catalana es reutilitzen sota CC BY-SA 4.0, amb autoria, historial, revisió i llicència als crèdits de cada lectura. Es reformaten en apartats; no inclouen les imatges ni les taules originals. La introducció d’Egipte s’ha corregit contrastant fonts museístiques i s’hi indica la modificació. Els 30 relats introductoris es distingeixen dels textos de referència. No cal obrir cap enllaç extern per llegir els continguts.

La col·lecció no és una història universal exhaustiva i les fitxes importades no estan totes revisades individualment. El catàleg inicial està dominat per conflictes i tractats. Les lectures afegides cobreixen també ciència, art, vida quotidiana, idees i drets. Els temes que abasten molts segles tenen un període general de referència a la cronologia; una sola data no indica que tot el tema pertanyi a aquell any.

## Mapa i imatges

Els polígons de Natural Earth són de domini públic i representen les fronteres actuals, que no equivalen a les històriques. La resolució simplificada no inclou tots els microestats. El cursor, el tacte i el teclat permeten seleccionar una zona i obrir-ne una lectura interna. Els marcadors i les targetes de llocs obren lectures locals.

Set portades i escenes d’ambientació creades amb IA es desen a `assets/`; els textos dels encàrrecs consten a `assets/prompts-imatges-ia.json`. No són reconstruccions arqueològiques verificades. Uruk utilitza una imatge real ASTER de NASA/JPL. Les altres fotografies remotes són d’ambientació. El mapa necessita Leaflet, que es carrega des d’un servei extern.

## Validació

Comprovació de sintaxi JavaScript, correspondència de totes les lectures amb el manifest i presència de text per als 2.993 registres locals. Prova al navegador de la lectura de Hastings, els controls per obrir i plegar els 18 apartats i la lectura d’Egipte des del mapa. La disponibilitat de veu catalana depèn del navegador i del dispositiu.

Versió privada publicada: https://la-historia-del-nostre-mon-diana.wiryrose64.chatgpt.site
