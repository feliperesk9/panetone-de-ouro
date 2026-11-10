// Script da Landing Page Panetone de Ouro™

document.addEventListener('DOMContentLoaded', () => {
  // 1. FAQ Accordion Interativo
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Fecha todos os outros itens
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });
      
      // Abre o clicado se não estava aberto
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Abre o primeiro item do FAQ por padrão para instigar a leitura
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
    const firstAnswer = faqItems[0].querySelector('.faq-answer');
    if (firstAnswer) {
      firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
    }
  }

  // 2. Rolagem Suave para a Oferta ao Clicar em CTAs
  const ctaButtons = document.querySelectorAll('a[href^="#"]');
  ctaButtons.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    });
  });

  // 3. Prova Social Dinâmica e Discreta (Social Proof Toast)
  const recentBuyers = [
    { name: "Luciana Santos", city: "São Paulo/SP", time: "há 3 minutos" },
    { name: "Carla Silveira", city: "Belo Horizonte/MG", time: "há 6 minutos" },
    { name: "Juliana Moreira", city: "Curitiba/PR", time: "há 11 minutos" },
    { name: "Aline Cristina", city: "Rio de Janeiro/RJ", time: "há 14 minutos" },
    { name: "Patricia Fonseca", city: "Campinas/SP", time: "há 18 minutos" },
    { name: "Renata Vasconcelos", city: "Goiânia/GO", time: "há 22 minutos" }
  ];

  const toast = document.getElementById('social-toast');
  const toastText = document.getElementById('toast-message');
  const toastTime = document.getElementById('toast-time');

  let buyerIndex = 0;

  function showToast() {
    if (!toast || !toastText || !toastTime) return;
    
    const buyer = recentBuyers[buyerIndex];
    toastText.innerHTML = `<strong>${buyer.name}</strong> (${buyer.city}) acabou de garantir sua vaga no <strong>Panetone de Ouro™</strong>!`;
    toastTime.textContent = buyer.time;
    
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);

    buyerIndex = (buyerIndex + 1) % recentBuyers.length;
  }

  // Primeiro disparo após 5 segundos, depois a cada 18 segundos
  setTimeout(() => {
    showToast();
    setInterval(showToast, 18000);
  }, 5000);
});
