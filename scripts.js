
// scripts mínimos: busca no acervo e navegação suave
document.addEventListener('DOMContentLoaded', function(){
    const searchInput = document.getElementById('searchInput');
    if(searchInput){
        searchInput.addEventListener('input', function(){
            const q = this.value.toLowerCase();
            document.querySelectorAll('.book').forEach(b => {
                const title = b.querySelector('h4').innerText.toLowerCase();
                const author = b.querySelector('.meta').innerText.toLowerCase();
                b.style.display = (title.includes(q) || author.includes(q)) ? 'block' : 'none';
            });
        });
    }
    // smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
        a.addEventListener('click', function(e){
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
        });
    });
});
// Obtém os elementos checkbox do HTML pelo ID
const checkbox1 = document.getElementById('checkbox1');
const checkbox2 = document.getElementById('checkbox2');

// Adiciona um "listener" para o evento 'change' do primeiro checkbox
checkbox1.addEventListener('change', function() {
  if (this.checked) {
    // Se o checkbox1 estiver marcado, desabilita o checkbox2
    checkbox2.disabled = true;
  } else {
    // Se o checkbox1 for desmarcado, habilita o checkbox2
    checkbox2.disabled = false;
  }
});

// Adiciona um "listener" para o evento 'change' do segundo checkbox
checkbox2.addEventListener('change', function() {
  if (this.checked) {
    // Se o checkbox2 estiver marcado, desabilita o checkbox1
    checkbox1.disabled = true;
  } else {
    // Se o checkbox2 for desmarcado, habilita o checkbox1
    checkbox1.disabled = false;
  }
});