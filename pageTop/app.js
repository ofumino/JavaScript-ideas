const pagetopBtn = document.getElementById('js-pageTop');

pagetopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
