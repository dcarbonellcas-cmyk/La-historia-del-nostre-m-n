const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../education/content.js'),'utf8'),context);
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../education/extension.js'),'utf8'),context);
const school=context.window.SCHOOL;
test('Every course has all its expected areas and no empty units',()=>{
  assert.equal(school.courses.length,9);
  for(const c of school.courses){
    const expected=c.cycle==='inf'?['autonomia','comunicacio','descoberta','convivencia']:['cat','cast','eng','mat','medi','art','ef','val'];
    for(const subject of expected)assert.ok(school.units.some(u=>u.cycle===c.cycle&&u.subject===subject&&(!u.courses||u.courses.includes(c.id))),`${c.id}: missing ${subject}`);
  }
  const ids=new Set();
  for(const u of school.units){assert.ok(!ids.has(u.id));ids.add(u.id);
    for(const key of ['title','goal','theory','writing','model','life','observe'])assert.ok(u[key]?.trim(),`${u.id}: ${key}`);
    assert.equal(u.questions.length,2);
    for(const q of u.questions){assert.equal(q.options.length,3);assert.equal(new Set(q.options).size,3);assert.ok(q.options[q.correct]);assert.ok(q.why);}
    if(u.game==='sentence')assert.ok(u.sentence);
  }
});
test('Base bridges remain separate from curricular cycles',()=>{
  const bridges=school.units.filter(u=>u.cycle==='base');
  assert.ok(bridges.some(u=>u.subject==='cat'));assert.ok(bridges.some(u=>u.subject==='mat'));
  assert.ok(school.sources.every(s=>s.url.startsWith('https://')));
});

test('Learning routes reference valid units and include all courses',()=>{
  assert.equal(school.units.length,144);
  const ids=new Set(school.units.map(u=>u.id));
  for(const route of school.routes){assert.ok(route.ids.length>=4);for(const id of route.ids)assert.ok(ids.has(id),`${route.id}: missing ${id}`);}
  for(const course of school.courses)assert.ok(school.routes.some(r=>r.courses.includes(course.id)));
  for(const subject of ['cat','cast'])assert.ok(school.units.some(u=>u.topic==='ortografia'&&u.subject===subject));
});
