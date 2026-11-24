(function(){
  "use strict";
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Header shadow ---- */
  var hdr = document.getElementById('hdr');
  window.addEventListener('scroll', function(){
    hdr.classList.toggle('is-stuck', window.scrollY > 8);
  }, {passive:true});

  /* ---- Services dropdown + appliance sub-reveal ---- */
  var svcItem = document.getElementById('svcItem');
  var svcBtn  = document.getElementById('svcBtn');
  var svcDrop = document.getElementById('svcDrop');
  var applRow = document.getElementById('applianceRow');

  function openDrop(){ svcDrop.classList.add('is-open'); svcBtn.setAttribute('aria-expanded','true'); }
  function closeDrop(){ svcDrop.classList.remove('is-open','show-sub'); svcBtn.setAttribute('aria-expanded','false'); }

  svcBtn.addEventListener('click', function(e){
    e.stopPropagation();
    svcDrop.classList.contains('is-open') ? closeDrop() : openDrop();
  });
  svcItem.addEventListener('mouseenter', function(){ if(window.innerWidth > 900) openDrop(); });
  svcItem.addEventListener('mouseleave', function(){ if(window.innerWidth > 900) closeDrop(); });

  // Sub-services appear only while the Appliance Installation row is hovered/focused
  document.querySelectorAll('.drop-main > ul > li').forEach(function(row){
    var isAppliance = row === applRow;
    row.addEventListener('mouseenter', function(){ svcDrop.classList.toggle('show-sub', isAppliance); });
    row.addEventListener('focusin',    function(){ svcDrop.classList.toggle('show-sub', isAppliance); });
  });
  svcDrop.addEventListener('mouseleave', function(){ svcDrop.classList.remove('show-sub'); });

  document.addEventListener('click', function(e){ if(!svcDrop.contains(e.target) && e.target !== svcBtn) closeDrop(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeDrop(); });

  /* ---- Mobile drawer ---- */
  var burger = document.getElementById('burger');
  var burgerIcon = document.getElementById('burgerIcon');
  var drawer = document.getElementById('drawer');
  burger.addEventListener('click', function(){
    var open = drawer.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    burgerIcon.className = open ? 'bi bi-x-lg' : 'bi bi-list';
    document.body.style.overflow = open ? 'hidden' : '';
  });
  drawer.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      drawer.classList.remove('is-open');
      burger.setAttribute('aria-expanded','false');
      burgerIcon.className = 'bi bi-list';
      document.body.style.overflow = '';
    });
  });

  /* ---- Drawer two-level accordion (tap to reveal appliance sub-services) ---- */
  function bindAcc(btnId, panelId){
    var btn = document.getElementById(btnId), panel = document.getElementById(panelId);
    if(!btn || !panel) return;
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var open = panel.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  bindAcc('mSvc','mSvcPanel');
  bindAcc('mAppl','mApplPanel');

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click', function(){
      var panel = q.nextElementSibling;
      var isOpen = panel.classList.contains('is-open');
      document.querySelectorAll('.faq-a').forEach(function(p){ p.classList.remove('is-open'); });
      document.querySelectorAll('.faq-q').forEach(function(b){ b.setAttribute('aria-expanded','false'); });
      if(!isOpen){ panel.classList.add('is-open'); q.setAttribute('aria-expanded','true'); }
    });
  });

  /* ---- HERO CAROUSEL ---- */
  var slides  = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  if(slides.length){   // hero carousel only exists on the homepage
  var photos  = Array.prototype.slice.call(document.querySelectorAll('.hero-media .ph'));
  var bgs     = Array.prototype.slice.call(document.querySelectorAll('.hero-bg'));
  var dotsBox = document.getElementById('dots');
  var curNum  = document.getElementById('curNum');
  var hero    = document.getElementById('hero');
  var DURATION = 3500;
  var idx = 0, timer = null, names = ['Appliance Installation','TV Wall Mounting','Mobile Auto Detailing'];

  slides.forEach(function(s, i){
    var b = document.createElement('button');
    b.className = 'dot-btn' + (i === 0 ? ' is-active' : '');
    b.setAttribute('role','tab');
    b.setAttribute('aria-label', names[i]);
    b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    b.innerHTML = '<i></i>';
    b.addEventListener('click', function(){ go(i); restart(); });
    dotsBox.appendChild(b);
  });
  var dots = Array.prototype.slice.call(dotsBox.children);

  function go(n){
    idx = (n + slides.length) % slides.length;
    slides.forEach(function(s,i){ s.classList.toggle('is-active', i === idx); });
    photos.forEach(function(p,i){ p.classList.toggle('is-active', i === idx); });
    bgs.forEach(function(b,i){ b.classList.toggle('is-active', i === idx); });
    dots.forEach(function(d,i){
      d.classList.toggle('is-active', i === idx);
      d.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });
    curNum.textContent = String(idx + 1).padStart(2,'0');
  }
  function next(){ go(idx + 1); }
  function prev(){ go(idx - 1); }
  function start(){ if(reduced) return; stop(); timer = setInterval(next, DURATION); }
  function stop(){ if(timer){ clearInterval(timer); timer = null; } }
  function restart(){ start(); }

  document.getElementById('nextBtn').addEventListener('click', function(){ next(); restart(); });
  document.getElementById('prevBtn').addEventListener('click', function(){ prev(); restart(); });

  // pause while hovering or focusing the hero
  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', start);
  hero.addEventListener('focusin', stop);
  hero.addEventListener('focusout', start);

  // keyboard arrows when hero has focus
  hero.addEventListener('keydown', function(e){
    if(e.key === 'ArrowRight'){ next(); restart(); }
    if(e.key === 'ArrowLeft'){ prev(); restart(); }
  });

  // swipe on touch devices
  var x0 = null;
  hero.addEventListener('touchstart', function(e){ x0 = e.touches[0].clientX; stop(); }, {passive:true});
  hero.addEventListener('touchend', function(e){
    if(x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if(Math.abs(dx) > 48){ dx < 0 ? next() : prev(); }
    x0 = null; start();
  }, {passive:true});

  // pause when the tab is hidden
  document.addEventListener('visibilitychange', function(){ document.hidden ? stop() : start(); });

  go(0); start();
  } // end hero carousel

  /* ---- Scroll reveal ---- */
  if('IntersectionObserver' in window && !reduced){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.rv').forEach(function(el,i){
      el.style.transitionDelay = (i % 3) * 70 + 'ms';
      io.observe(el);
    });
  } else {
    document.querySelectorAll('.rv').forEach(function(el){ el.classList.add('in'); });
  }

  /* ---- Quote form ---- */
  var form = document.getElementById('quoteForm');
  var msg  = document.getElementById('formMsg');
  var btn  = document.getElementById('formBtn');
  if(form) form.addEventListener('submit', function(e){
    e.preventDefault();
    msg.className = 'form-msg';
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending…';
    var fd = new FormData(form);
    var emailVal = (fd.get('email') || '').toString().trim();
    if(emailVal && !fd.has('_replyto')) fd.append('_replyto', emailVal);
    var endpoint = form.getAttribute('data-ajax') || form.action;
    var mailBody =
      'Name: ' + (fd.get('name') || '') + '\n' +
      'Phone: ' + (fd.get('phone') || '') + '\n' +
      'Email: ' + emailVal + '\n' +
      'Service: ' + (fd.get('service') || '') + '\n' +
      'City / Neighbourhood: ' + (fd.get('city') || '') + '\n\n' +
      'Details:\n' + (fd.get('details') || '');
    var mailtoHref = 'mailto:info@daynight24.ca?subject=' +
      encodeURIComponent('Quote Request — ' + (fd.get('service') || 'DayNight24') + ' (' + (fd.get('name') || 'Customer') + ')') +
      '&body=' + encodeURIComponent(mailBody);

    fetch(endpoint, {method:'POST', body:fd, headers:{'Accept':'application/json'}})
      .then(function(res){
        return res.json().catch(function(){ return {}; }).then(function(data){
          return { ok: res.ok, data: data };
        });
      })
      .then(function(out){
        var accepted = out.ok && (out.data.success === undefined || out.data.success === true || out.data.success === 'true');
        if(!accepted) throw new Error((out.data && out.data.message) || 'bad response');
        form.reset();
        msg.innerHTML = '<i class="bi bi-check-circle-fill"></i> Request sent to info@daynight24.ca. We will get back to you with a price shortly.';
        msg.className = 'form-msg ok';
      })
      .catch(function(){
        msg.innerHTML = '<i class="bi bi-exclamation-triangle-fill"></i> <span>Automatic web delivery could not complete right now. <a href="' + mailtoHref + '" target="_blank" rel="noopener" style="text-decoration:underline;font-weight:700">Click here to send directly to info@daynight24.ca</a> or call 780-399-9609.</span>';
        msg.className = 'form-msg err';
      })
      .finally(function(){
        btn.disabled = false;
        btn.innerHTML = '<i class="bi bi-send-fill"></i> Send my request';
      });
  });

  var yrEl = document.getElementById('yr');
  if(yrEl) yrEl.textContent = new Date().getFullYear();
})();
