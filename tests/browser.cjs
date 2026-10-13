/* Run with Playwright installed, e.g. node tests/browser.cjs. No external server required. */
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css'};
const server=http.createServer((req,res)=>{const name=decodeURIComponent(req.url.split('?')[0]);const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(file,(e,data)=>{if(e){res.writeHead(404);return res.end();}res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(data);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  try{browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
    // Offline educational resources must work even when the existing history integrations are unavailable.
    await page.route('https://**/*',route=>route.abort());
    const url=`http://127.0.0.1:${server.address().port}/`;
    await page.goto(url);await page.locator('[data-workspace=school]').click();
    assert.equal(await page.locator('#historia').isVisible(),false);
    assert.equal(await page.locator('.school-card').count(),28);
    await page.locator('#school-course').selectOption('I3');assert.equal(await page.locator('.school-card').count(),11);
    assert.equal(await page.locator('#school-subject option').count(),5);
    await page.locator('#school-course').selectOption('6');assert.equal(await page.locator('.school-card').count(),28);
    await page.locator('#school-path').selectOption('base');assert.equal(await page.locator('.school-card').count(),6);
    await page.locator('#school-search').fill('frase');assert.equal(await page.locator('.school-card').count(),1);
    await page.locator('[data-school-unit]').first().click();
    const choices=page.locator('.school-quiz-question').first().locator('button');
    await choices.filter({hasText:'L’aigua'}).click();assert.match(await page.locator('#school-feedback-0').innerText(),/Torna/);
    await choices.filter({hasText:'La nena'}).click();assert.match(await page.locator('#school-feedback-0').innerText(),/Bona feina/);
    await page.locator('#school-writing').fill('<img src=x onerror=alert(1)> La meva frase.');
    await page.locator('#school-observe').selectOption('help');
    await page.reload();await page.locator('#school-path').selectOption('base');await page.locator('#school-search').fill('frase');await page.locator('[data-school-unit]').first().click();
    assert.match(await page.locator('#school-writing').inputValue(),/<img/);assert.equal(await page.locator('#school-writing img').count(),0);
    assert.equal(await page.locator('#school-observe').inputValue(),'help');
    await page.locator('[data-school-level=apply]').click();assert.equal(await page.locator('#school-writing').inputValue(),'<img src=x onerror=alert(1)> La meva frase.');
    await page.emulateMedia({media:'print'});assert.equal(await page.locator('.worksheet-only').first().isVisible(),true);assert.equal(await page.locator('#school-writing').isVisible(),false);assert.equal(await page.locator('.workspace-nav').isVisible(),false);
    await page.emulateMedia({media:'screen'});
    await page.locator('[data-school-unit-game]').click();
    for(let i=0;i<4;i++)await page.locator(`[data-school-token="${i}"]`).click();
    await page.locator('[data-school-check-sentence]').click();assert.match(await page.locator('#school-game-feedback').innerText(),/té sentit/);
    await page.locator('[data-school-undo]').click();assert.equal(await page.locator('[data-school-token="3"]').isEnabled(),true);
    await page.locator('[data-school-game-back]').click();assert.equal(await page.locator('#school-writing').isVisible(),true);
    await page.locator('[data-school-view=progress]').click();assert.equal(await page.locator('.school-progress-row').count(),1);
    const download=page.waitForEvent('download');await page.locator('[data-school-export]').click();assert.equal((await download).suggestedFilename(),'registre-reforc-escolar.json');
    page.once('dialog',d=>d.accept());await page.locator('[data-school-clear]').click();assert.equal(await page.locator('.school-progress-row').count(),0);
    await page.locator('[data-school-view=games]').click();await page.locator('[data-school-game=number]').click();await page.locator('#school-game-mode').selectOption('sum');await page.locator('#school-game-limit').selectOption('30');
    await page.locator('[data-school-number]').first().click();assert.ok(await page.locator('#school-game-feedback').innerText());
    await page.locator('[data-school-view=teacher]').click();assert.equal(await page.locator('.school-table tbody tr').count(),16);
    await page.locator('[data-school-view=routes]').click();assert.equal(await page.locator('.school-route-list').count(),4);
    await page.locator('#school-route-course').selectOption('I3');assert.equal(await page.locator('.school-route-list').count(),1);
    await page.locator('#school-route-course').selectOption('2');
    await page.locator('[data-school-unit="ca2-apostrof"]').click();
    await page.locator('[data-school-plan-add]').click();assert.match(await page.locator('#school-plan-status').innerText(),/afegida/);
    await page.locator('[data-school-spelling-game]').click();
    await page.locator('[data-school-spelling-answer]').filter({hasText:'L’escola'}).click();assert.match(await page.locator('#school-game-feedback').innerText(),/^Sí/);
    await page.locator('[data-school-game-back]').click();await page.locator('[data-school-back]').click();assert.equal(await page.locator('#school-route-course').isVisible(),true);
    await page.locator('[data-school-unit="ca2-c-qu"]').click();await page.locator('[data-school-plan-add]').click();
    await page.locator('[data-school-view=teacher]').click();assert.equal(await page.locator('#school-plan li').count(),2);
    await page.locator('[data-school-plan-move="1:-1"]').click();assert.match(await page.locator('#school-plan li').first().innerText(),/C i qu/);
    await page.reload();await page.locator('[data-school-view=teacher]').click();assert.match(await page.locator('#school-plan li').first().innerText(),/C i qu/);
    await page.evaluate(()=>{window.print=()=>{};});await page.locator('[data-school-plan-print]').click();await page.emulateMedia({media:'print'});
    assert.equal(await page.locator('#school-session-sheets').isVisible(),true);assert.equal(await page.locator('#school-plan').isVisible(),false);
    assert.equal(await page.locator('.school-session-sheet').count(),2);
    await page.pdf({path:'/private/tmp/reforc-session-qa.pdf',format:'A4',printBackground:true,margin:{top:'12mm',bottom:'12mm',left:'14mm',right:'14mm'}});
    await page.emulateMedia({media:'screen'});await page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));
    await page.locator('[data-school-plan-remove="ca2-c-qu"]').click();assert.equal(await page.locator('#school-plan li').count(),1);
    await page.locator('[data-school-view=games]').click();await page.locator('[data-school-game=spelling]').click();await page.locator('#school-spelling-language').selectOption('cast');
    await page.locator('[data-school-spelling-answer]').filter({hasText:'Es aguda y termina en n'}).click();assert.match(await page.locator('#school-game-feedback').innerText(),/^Sí/);
    await page.locator('[data-school-view=games]').click();await page.locator('[data-school-game=number]').click();
    // Check generated arithmetic rounds against the question itself, including exact division and zero differences.
    for(const mode of ['sum','subtract','multiply','divide']){
      await page.locator('#school-game-mode').selectOption(mode);
      for(let round=0;round<8;round++){
        const text=await page.locator('#school-game-body h3').innerText();const nums=text.match(/\d+/g).map(Number);
        const correct=mode==='sum'?nums[0]+nums[1]:mode==='subtract'?nums[0]-nums[1]:mode==='multiply'?nums[0]*nums[1]:nums[0]/nums[1];
        assert.ok(Number.isInteger(correct)&&correct>=0&&correct<=10);
        await page.locator(`[data-school-number="${correct}"]`).click();assert.match(await page.locator('#school-game-feedback').innerText(),/^Sí/);
        await page.locator('[data-school-next-game]').click();
      }
    }
    await page.locator('[data-school-view=catalog]').click();await page.locator('#school-course').selectOption('3');await page.locator('#school-path').selectOption('course');
    await page.locator('[data-school-unit="u041"]').click();await page.locator('[data-school-unit-game]').click();assert.equal(await page.locator('#school-game-mode').inputValue(),'multiply');
    await page.setViewportSize({width:390,height:844});await page.locator('[data-school-view=catalog]').click();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true);
    const screenshot=process.env.SCHOOL_SCREENSHOT;if(screenshot)await page.screenshot({path:screenshot,fullPage:true});
    await page.locator('[data-workspace=history]').click();assert.equal(await page.locator('#school').isVisible(),false);assert.equal(await page.locator('#historia').isVisible(),true);
    await page.locator('[data-tab=descobreix]').click();assert.equal(await page.locator('#quiz').isVisible(),true);
    assert.deepEqual(errors,[]);console.log('Browser checks passed: navigation, all courses, base bridges, retry, persistence, escaping, print, games, export, reset, mobile, history, routes, session planning, combined worksheets, spelling and four arithmetic modes.');
  }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
