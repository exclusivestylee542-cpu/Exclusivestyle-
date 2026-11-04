(function () {
  'use strict';

  /* ---------- utilidades ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var money = function (n) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: STORE.currency, maximumFractionDigits: 0 }).format(n);
  };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var CATS = { sneakers: 'Sneakers', ropa: 'Ropa', relojes: 'Relojes', accesorios: 'Accesorios' };
  var toastTimer;
  function toast(msg) {
    var t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }

  /* ---------- WhatsApp ---------- */
  var waReady = /^\d{8,15}$/.test(String(STORE.whatsapp));
  function waUrl(text) {
    var base = waReady ? 'https://wa.me/' + STORE.whatsapp : 'https://wa.me/';
    return base + '?text=' + encodeURIComponent(text);
  }
  $('contactWa').href = waReady ? waUrl('Hola EXC., quiero más información sobre la colección.') : '#';
  // Las redes solo aparecen cuando se configuran sus URLs reales en products.js.
  [['instagramLink', STORE.instagram], ['facebookLink', STORE.facebook]].forEach(function (item) {
    var link = $(item[0]);
    if (link && item[1]) { link.href = item[1]; link.hidden = false; }
  });

  /* ---------- menú móvil ---------- */
  var menuBtn = $('menuBtn'), menu = $('mobileMenu');
  menuBtn.addEventListener('click', function () {
    menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', menu.classList.contains('open'));
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); });
  });
  $('year').textContent = new Date().getFullYear();

  /* ---------- carrito (se guarda en el navegador) ---------- */
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem('exc_cart')) || []; } catch (e) { cart = []; }
  // descarta productos que ya no existen en el catálogo
  cart = cart.filter(function (i) { return PRODUCTS.some(function (p) { return p.id === i.id; }); });
  function persist() { try { localStorage.setItem('exc_cart', JSON.stringify(cart)); } catch (e) {} }
  function product(id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; }

  /* ---------- catálogo ---------- */
  var picked = {};          // talla elegida por producto
  var filter = 'todo';

  function visual(p, cls) {
    return p.image
      ? '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy">'
      : '<span class="ph" aria-hidden="true">EXC.</span>';
  }

  function renderProducts() {
    var list = PRODUCTS.filter(function (p) { return filter === 'todo' || (filter === 'nuevo' ? p.new : p.category === filter); });
    $('productGrid').innerHTML = list.map(function (p) {
      var sizes = p.sizes.map(function (s) {
        var on = picked[p.id] === s;
        return '<button type="button" class="size" data-size="' + esc(s) + '" aria-pressed="' + on + '">' + esc(s) + '</button>';
      }).join('');
      return '<article class="product" data-id="' + p.id + '">' +
        (p.new ? '<span class="new-tag">New</span>' : '') +
        '<div class="product-img">' + visual(p) + '</div>' +
        '<div class="product-info">' +
          '<span class="product-cat">' + CATS[p.category] + '</span>' +
          '<h3 class="product-name">' + esc(p.name) + '</h3>' +
          '<span class="product-price">' + money(p.price) + '</span>' +
          '<div class="sizes" role="group" aria-label="Talla">' + sizes + '</div>' +
          '<button type="button" class="add-btn">Agregar al carrito</button>' +
        '</div></article>';
    }).join('');
  }

  function setFilter(f) {
    filter = f;
    document.querySelectorAll('.chip').forEach(function (c) {
      c.classList.toggle('is-active', c.dataset.filter === f);
    });
    renderProducts();
  }
  document.querySelectorAll('.chip').forEach(function (c) {
    c.addEventListener('click', function () { setFilter(c.dataset.filter); });
  });
  document.querySelectorAll('[data-filter-link]').forEach(function (a) {
    a.addEventListener('click', function () { setFilter(a.dataset.filterLink); });
  });

  $('productGrid').addEventListener('click', function (e) {
    var card = e.target.closest('.product');
    if (!card) return;
    var p = product(card.dataset.id);
    var sizeBtn = e.target.closest('.size');
    if (sizeBtn) {
      picked[p.id] = sizeBtn.dataset.size;
      card.querySelector('.sizes').classList.remove('needs');
      card.querySelectorAll('.size').forEach(function (b) {
        b.setAttribute('aria-pressed', b === sizeBtn);
      });
      return;
    }
    if (e.target.closest('.add-btn')) {
      var size = picked[p.id] || (p.sizes.length === 1 ? p.sizes[0] : null);
      if (!size) {
        var box = card.querySelector('.sizes');
        box.classList.remove('needs'); void box.offsetWidth; box.classList.add('needs');
        toast('Elige una talla para ' + p.name);
        return;
      }
      addToCart(p.id, size);
      toast('Agregado al carrito');
    }
  });

  function addToCart(id, size) {
    var line = cart.filter(function (i) { return i.id === id && i.size === size; })[0];
    if (line) line.qty += 1; else cart.push({ id: id, size: size, qty: 1 });
    persist(); renderCart();
  }

  function renderCart() {
    var count = cart.reduce(function (n, i) { return n + i.qty; }, 0);
    var total = cart.reduce(function (n, i) { return n + product(i.id).price * i.qty; }, 0);
    $('cartCount').textContent = count;
    $('cartTotal').textContent = money(total);
    $('cartFoot').style.display = cart.length ? '' : 'none';

    if (!cart.length) {
      $('cartItems').innerHTML = '<div class="cart-empty"><strong>Tu carrito está vacío</strong>Agrega piezas de la colección para armar tu pedido.</div>';
      return;
    }
    $('cartItems').innerHTML = cart.map(function (i, idx) {
      var p = product(i.id);
      return '<div class="cart-item" data-idx="' + idx + '">' +
        '<div class="cart-thumb">' + visual(p) + '</div>' +
        '<div><h3 class="ci-name">' + esc(p.name) + '</h3>' +
          '<div class="ci-meta">Talla ' + esc(i.size) + '</div>' +
          '<div class="qty"><button type="button" data-act="minus" aria-label="Quitar una unidad">−</button><span>' + i.qty + '</span><button type="button" data-act="plus" aria-label="Agregar una unidad">+</button></div>' +
        '</div>' +
        '<div class="ci-right"><span class="ci-price">' + money(p.price * i.qty) + '</span>' +
          '<button type="button" class="ci-remove" data-act="remove">Quitar</button></div>' +
      '</div>';
    }).join('');
  }

  $('cartItems').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-act]');
    if (!btn) return;
    var idx = +btn.closest('.cart-item').dataset.idx;
    var act = btn.dataset.act;
    if (act === 'plus') cart[idx].qty += 1;
    if (act === 'minus') cart[idx].qty -= 1;
    if (act === 'remove' || cart[idx].qty < 1) cart.splice(idx, 1);
    persist(); renderCart();
  });

  $('clearCart').addEventListener('click', function () { cart = []; persist(); renderCart(); });

  /* ---------- abrir / cerrar carrito ---------- */
  var lastFocus;
  function openCart() {
    lastFocus = document.activeElement;
    $('toast').classList.remove('show');
    $('overlay').hidden = false;
    requestAnimationFrame(function () { $('overlay').classList.add('show'); });
    $('cart').classList.add('open');
    $('cart').setAttribute('aria-hidden', 'false');
    $('closeCart').focus();
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    $('overlay').classList.remove('show');
    setTimeout(function () { $('overlay').hidden = true; }, 250);
    $('cart').classList.remove('open');
    $('cart').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  $('openCart').addEventListener('click', openCart);
  $('closeCart').addEventListener('click', closeCart);
  $('overlay').addEventListener('click', closeCart);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && $('cart').classList.contains('open')) closeCart();
  });

  /* ---------- pedido por WhatsApp ---------- */
  $('checkoutBtn').addEventListener('click', function () {
    if (!cart.length) return;
    var total = 0;
    var lines = cart.map(function (i, n) {
      var p = product(i.id), sub = p.price * i.qty;
      total += sub;
      return (n + 1) + '. ' + p.name + ' — Talla ' + i.size + ' — x' + i.qty + ' — ' + money(sub);
    });
    var name = $('custName').value.trim();
    var city = $('custCity').value.trim();
    var phone = $('custPhone').value.trim();
    var payment = $('custPayment').value;
    var msg = 'Hola EXC., quiero hacer este pedido:\\n\\n' + lines.join('\\n') +
      '\\n\\nTotal productos: ' + money(total) +
      '\\nForma de pago preferida: ' + payment +
      '\\nNombre: ' + (name || '(por confirmar)') +
      '\\nTeléfono: ' + (phone || '(por confirmar)') +
      '\\nCiudad y dirección: ' + (city || '(por confirmar)');
    if (!waReady) { toast('Configura tu WhatsApp real en products.js antes de recibir pedidos.'); return; }
    window.open(waUrl(msg), '_blank', 'noopener');
  });

  /* ---------- inicio ---------- */
  renderProducts();
  renderCart();
})();
