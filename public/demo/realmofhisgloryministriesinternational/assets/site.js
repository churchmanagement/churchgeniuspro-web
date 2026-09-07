/* Realm of His Glory Ministries International — site behaviour */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header state on scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header && !header.classList.contains('is-solid')) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- mobile drawer ---------- */
  var burger = document.querySelector('.burger');
  var drawer = document.getElementById('drawer');
  if (burger && drawer) {
    var setOpen = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      drawer.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
      drawer.setAttribute('aria-hidden', String(!open));
    };
    burger.addEventListener('click', function () {
      setOpen(burger.getAttribute('aria-expanded') !== 'true');
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1000) setOpen(false);
    });
  }

  /* ---------- scroll reveal ---------- */
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return init();
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  init();

  function init() {
    contactForm();
    givingForm();
    year();
  }

  /* ---------- footer year ---------- */
  function year() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ---------- contact form ---------- */
  function contactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var success = document.getElementById('contact-success');

    var rules = {
      name: function (v) { return v.trim().length >= 2 || 'Please tell us your name.'; },
      email: function (v) {
        return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()) || 'Please enter a valid email address.';
      },
      message: function (v) { return v.trim().length >= 10 || 'Please write at least a short message.'; }
    };

    function validateField(input) {
      var rule = rules[input.name];
      if (!rule) return true;
      var res = rule(input.value);
      var wrap = input.closest('.field');
      var err = wrap.querySelector('.field__error');
      if (res === true) {
        wrap.classList.remove('has-error');
        input.removeAttribute('aria-invalid');
        return true;
      }
      wrap.classList.add('has-error');
      input.setAttribute('aria-invalid', 'true');
      if (err) err.textContent = res;
      return false;
    }

    Object.keys(rules).forEach(function (n) {
      var input = form.elements[n];
      if (!input) return;
      input.addEventListener('blur', function () { validateField(input); });
      input.addEventListener('input', function () {
        if (input.closest('.field').classList.contains('has-error')) validateField(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, first = null;
      Object.keys(rules).forEach(function (n) {
        var input = form.elements[n];
        if (input && !validateField(input)) { ok = false; first = first || input; }
      });
      if (!ok) { if (first) first.focus(); return; }

      var btn = form.querySelector('[type="submit"]');
      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      var endpoint = form.getAttribute('data-endpoint');
      var done = function () {
        form.hidden = true;
        if (success) {
          success.classList.add('is-visible');
          success.setAttribute('tabindex', '-1');
          success.focus();
          success.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
        }
      };

      if (endpoint) {
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form).entries()))
        }).then(done).catch(done);
      } else {
        window.setTimeout(done, 700);
        if (btn) window.setTimeout(function () { btn.disabled = false; btn.textContent = label; }, 700);
      }
    });
  }

  /* ---------- giving form (demo) ---------- */
  function givingForm() {
    var give = document.getElementById('give-form');
    if (!give) return;

    var custom = give.querySelector('#give-amount');
    give.querySelectorAll('.amount').forEach(function (b) {
      b.addEventListener('click', function () {
        give.querySelectorAll('.amount').forEach(function (x) {
          x.classList.remove('is-active');
          x.setAttribute('aria-pressed', 'false');
        });
        b.classList.add('is-active');
        b.setAttribute('aria-pressed', 'true');
        if (custom) custom.value = b.getAttribute('data-amount') || '';
      });
    });
    if (custom) {
      custom.addEventListener('input', function () {
        give.querySelectorAll('.amount').forEach(function (x) {
          var match = x.getAttribute('data-amount') === custom.value;
          x.classList.toggle('is-active', match);
          x.setAttribute('aria-pressed', String(match));
        });
      });
    }

    give.querySelectorAll('.seg').forEach(function (seg) {
      seg.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () {
          seg.querySelectorAll('button').forEach(function (x) {
            x.classList.remove('is-active');
            x.setAttribute('aria-pressed', 'false');
          });
          b.classList.add('is-active');
          b.setAttribute('aria-pressed', 'true');
        });
      });
    });

    give.addEventListener('submit', function (e) {
      e.preventDefault();
      var panel = document.getElementById('give-success');
      give.hidden = true;
      if (panel) {
        panel.classList.add('is-visible');
        panel.setAttribute('tabindex', '-1');
        panel.focus();
      }
    });
  }
})();
