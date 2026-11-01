(function(){
  document.documentElement.classList.add('js');
  var C=window.SITE_CONFIG||{};
  var orderUrl=C.GOOGLE_FORM_URL||C.INSTAGRAM_URL||'https://www.instagram.com/bestillandrise/';
  document.querySelectorAll('.order-link').forEach(function(a){a.href=orderUrl;});

  function parseCSV(t){var rows=[],row=[],f='',q=false;
    for(var i=0;i<t.length;i++){var c=t[i];
      if(q){if(c=='"'){if(t[i+1]=='"'){f+='"';i++;}else q=false;}else f+=c;}
      else if(c=='"')q=true;else if(c==','){row.push(f);f='';}
      else if(c=='\n'||c=='\r'){if(c=='\r'&&t[i+1]=='\n')i++;row.push(f);rows.push(row);row=[];f='';}
      else f+=c;}
    if(f||row.length){row.push(f);rows.push(row);}
    var h=rows.shift().map(function(s){return s.trim().toLowerCase();});
    return rows.filter(function(r){return r.join('').trim();}).map(function(r){var o={};h.forEach(function(k,j){o[k]=(r[j]||'').trim();});return o;});}
  function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
  function render(items){var g=document.getElementById('menu-grid');g.innerHTML='';
    items.forEach(function(it){if(!it.name)return;
      var av=(it.available||'yes').toLowerCase();if(av==='hide')return;
      var c=el('article','card fade'+(/^(no|false|0|sold out)$/.test(av)?' soldout':''));
      var ph=el('div','ph');
      if(it.photo_url){var im=el('img','photo');im.src=it.photo_url;im.alt=it.name;im.loading='lazy';ph.appendChild(im);}
      else{var s=el('div','seal');s.setAttribute('aria-hidden','true');s.appendChild(el('span',null,'Be Still & Rise'));ph.appendChild(s);}
      c.appendChild(ph);var b=el('div','body');b.appendChild(el('h3',null,it.name));
      b.appendChild(el('p','price',it.price||'Ask for price'));
      if(it.description)b.appendChild(el('p',null,it.description));
      if(c.classList.contains('soldout'))b.appendChild(el('p','tag','Sold out for now'));
      c.appendChild(b);g.appendChild(c);});
    var cards=g.querySelectorAll('.card.fade');
    if(!('IntersectionObserver' in window)){cards.forEach(function(c){c.classList.add('in');});return;}
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.15});
    cards.forEach(function(c,i){c.style.transitionDelay=(i%4)*80+'ms';io.observe(c);});
    setTimeout(function(){cards.forEach(function(c){c.classList.add('in');});},2500);}
  function load(url){return fetch(url,{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.text();}).then(parseCSV);}
  (C.SHEET_CSV_URL?load(C.SHEET_CSV_URL).catch(function(){return load('menu.csv');}):load('menu.csv'))
    .then(render).catch(function(){document.getElementById('menu-note').textContent='Menu is loading slowly. Please check Instagram for today\'s flavors.';});
})();
