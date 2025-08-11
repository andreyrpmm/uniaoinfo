
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
