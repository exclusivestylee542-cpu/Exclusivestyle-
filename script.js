const menuBtn=document.getElementById('menuBtn');
const menu=document.getElementById('mobileMenu');
menuBtn.addEventListener('click',()=>{menu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',menu.classList.contains('open')?'true':'false')});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>menu.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('notifyBtn').addEventListener('click',()=>{const message=encodeURIComponent('Hola, quiero conocer la colección EXC. Exclusive Style cuando esté disponible.');window.open('https://wa.me/?text='+message,'_blank','noopener')});
