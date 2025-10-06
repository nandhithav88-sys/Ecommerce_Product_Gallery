// ====== SHARED UTILITIES: CART, TOAST, THEME, DEBOUNCE ======
(function(){
  // ====== CART FUNCTIONS ======
  function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function updateCartCount() {
    const count = getCart().reduce((sum, item) => sum + item.qty, 0);
    const el = document.getElementById('cartCount');
    if(el) el.textContent = count;
  }

  function addToCart(product, qty = 1) {
    const cart = getCart();
    const existing = cart.find(i => i.id === product.id);
    if(existing) existing.qty += qty;
    else cart.push({...product, qty});
    setCart(cart);
  }

  function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(i => i.id !== id);
    setCart(cart);
  }

  function changeQty(id, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if(!item) return;
    item.qty += delta;
    if(item.qty <= 0) cart.splice(cart.indexOf(item), 1);
    setCart(cart);
  }

  function clearCart() {
    setCart([]);
  }

  // ====== TOAST NOTIFICATION ======
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  // ====== THEME TOGGLE ======
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

  const themeButton = document.getElementById('themeToggle');
  if(themeButton){
    themeButton.addEventListener('click', ()=>{
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // ====== DEBOUNCE HELPER ======
  function debounce(fn, delay) {
    let timer;
    return function(...args){
      clearTimeout(timer);
      timer = setTimeout(()=>fn.apply(this,args), delay);
    };
  }

  // ====== EXPORT TO WINDOW ======
  window.getCart = getCart;
  window.setCart = setCart;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.changeQty = changeQty;
  window.clearCart = clearCart;
  window.updateCartCount = updateCartCount;
  window.showToast = showToast;
  window.debounce = debounce;
})();
