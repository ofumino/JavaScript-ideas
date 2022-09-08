const tabBtns = document.querySelectorAll('.js-tabButton');

tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // クリックしたタブボタンに対応するタブパネルを取得する
    let ariaControls = btn.getAttribute('aria-controls');
    let targetPanel = document.getElementById(ariaControls);

    // クリックしたタブボタン、タブパネルの親要素を取得 // 複数タブに対応するため
    let btnParent = btn.closest('.js-tabList');
    let panelParent = document.getElementById(ariaControls).closest('.js-tabContents');

    // アクティブのタブボタン、タブパネルを取得
    let activeBtn = btnParent.querySelector('.js-tabButton[aria-expanded="true"]');
    let activePanel = panelParent.querySelector('.js-tabPanel[aria-hidden="false"]');

    // アクティブのタブボタンを非アクティブに
    activeBtn.setAttribute('aria-expanded', 'false');
    // アクティブのタブパネルを非アクティブに
    activePanel.setAttribute('aria-hidden', 'true');

    // クリックしたタブボタンをアクティブに
    btn.setAttribute('aria-expanded', 'true');
    // クリックしたタブボタンに対応するタブパネルをアクティブに
    targetPanel.setAttribute('aria-hidden', 'false');

  })
});
