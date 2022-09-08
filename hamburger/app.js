const body = document.body;
const btn = document.getElementById('js-hamburger');
// const isExpanded = btn.getAttribute('aria-expanded');
const ariaControls = btn.getAttribute('aria-controls');
const targetDrawer = document.getElementById(ariaControls);
let navLinks = targetDrawer.querySelectorAll('a[href]');

// 背景のマスクを作成する
const maskElement = document.createElement('div');
maskElement.setAttribute('id', 'js-mask');

// フォーカストラップを作成
const focusTrap = document.createElement('div');
focusTrap.setAttribute('id', 'js-focusTrap');
focusTrap.setAttribute('tabindex', '0');

// bodyスクロール関係
let scrollTop;
let scrollTopBack;


btn.addEventListener('click', function () {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // ハンバーガーボタンを押したら
  if (btn.getAttribute('aria-expanded') == 'false') {
    btn.setAttribute('aria-expanded', 'true');
    targetDrawer.setAttribute('aria-hidden', 'false');
    body.classList.add('is-drawerActive');
    // マスクを挿入
    body.appendChild(maskElement);
    // フォーカストラップを挿入
    targetDrawer.appendChild(focusTrap);
    focusTrap.addEventListener("focus", () => {
      btn.focus();
    });
    // bodyのスクロールを禁止
    body.style.top = -scrollTop + "px";
    scrollTopBack = scrollTop;

    // ドロワー展開時に閉じるボタンを押したら
  } else {
    drawerClose();
  }
});

// ドロワー展開時にドロワーコンテンツ以外をクリックしたら
document.addEventListener('click', (c) => {
  if (c.target.getAttribute('id') == 'js-mask') {
    // ドロワーを非アクティブに
    drawerClose();
  }
});

// ドロワー展開時にエスケープキーが押されたら
window.addEventListener("keydown", (event) => { //escキー押下でメニューを閉じられるように
  if (event.key === "Escape") {
    // ドロワーを非アクティブに
    drawerClose();
  }
});

// ドロワー内のリンクをクリックしたら
navLinks.forEach((navLink) => {
  navLink.addEventListener('click', () => {
    drawerClose();
  });
})


// ドロワーを閉じる動き
const drawerClose = () => {
  body.classList.remove('is-drawerActive');
  btn.setAttribute('aria-expanded', 'false');
  targetDrawer.setAttribute('aria-hidden', 'true');
  // マスクを取り除く
  maskElement.remove();
  // フォーカストラップを取り除く
  focusTrap.remove();
  // bodyのスクロールを可能にする
  window.scrollTo(0, scrollTopBack);
}
