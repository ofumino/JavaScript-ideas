const body = document.body;
const openBtns = document.querySelectorAll('.js-modalOpen');
const closeBtns = document.querySelectorAll('.js-modalClose');
const modals = document.querySelectorAll('.js-modalContent');

// 背景のマスクを作成する
let maskElement = document.createElement('div');
maskElement.setAttribute('id', 'js-mask');

// フォーカストラップを作成
const focusTrap = document.createElement('div');
focusTrap.setAttribute('id', 'js-focusTrap');
focusTrap.setAttribute('tabindex', '0');

// bodyスクロール関係
let scrollTop;
let scrollTopBack;


openBtns.forEach((elm) => {

  elm.addEventListener('click', () => {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    body.classList.add('is-modalActive');

    // クリックしたモーダルボタンに対応するモーダルを取得する
    let ariaControls = elm.getAttribute('aria-controls');
    let targetModal = document.getElementById(ariaControls);
    // モーダルに対応する開くボタン・閉じるボタンを取得する
    let targetBtns = document.querySelectorAll(`[aria-controls="${ariaControls}"]`)

    // モーダルに対応する開くボタン・閉じるボタンをアクティブに
    targetBtns.forEach((targetBtn) => {
      targetBtn.setAttribute('aria-expanded', 'true');
    });
    // モーダルをアクティブに
    targetModal.setAttribute('aria-hidden', 'false');
    targetModal.setAttribute('aria-modal', 'true');


    // クリックしたモーダルボタン,モーダルの親要素を取得
    let modalBtnParent = elm.closest('.js-modal');
    // マスクを挿入
    modalBtnParent.after(maskElement);
    // フォーカストラップを挿入
    targetModal.appendChild(focusTrap);
    focusTrap.addEventListener("focus", () => {
      targetModal.querySelector('.js-modalClose').focus();
    });
    // bodyのスクロールを禁止
    body.style.top = -scrollTop + "px";
    scrollTopBack = scrollTop;
  })
});


// モーダル展開時にモーダルを閉じるボタンをクリックしたら
closeBtns.forEach((elm) => {
  elm.addEventListener('click', () => {
    modalClose(elm); // forEach重複してる
  })
});


// モーダル展開時にモーダルコンテンツ以外をクリックしたら
document.addEventListener('click', (w) => {
  if (w.target.getAttribute('id') === 'js-mask') {
    // モーダルを非アクティブに
    closeBtns.forEach((elm) => { //冗長？
      modalClose(elm);
    });
  }
});

// モーダル展開時にエスケープキーが押されたら
window.addEventListener("keydown", (event) => { //escキー押下でメニューを閉じられるように
  if (event.key === "Escape") {
    // モーダルを非アクティブに
    closeBtns.forEach((elm) => { //冗長？
      modalClose(elm);
    });
  }
});


// モーダルを閉じる動き
const modalClose = (e) => {
  body.classList.remove('is-modalActive');

  // クリックしたモーダルボタンに対応するモーダルを取得する
  let ariaControls = e.getAttribute('aria-controls');
  // モーダルに対応する開くボタン・閉じるボタンを取得する
  let targetBtns = document.querySelectorAll(`[aria-controls="${ariaControls}"]`)

  // モーダルに対応する開くボタン・閉じるボタンを非アクティブに
  targetBtns.forEach((targetBtn) => {
    targetBtn.setAttribute('aria-expanded', 'false');
  });

  modals.forEach((modal) => {
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-modal', 'false');
  });

  // マスクを取り除く
  maskElement.remove();
  // フォーカストラップを取り除く
  focusTrap.remove();
  // bodyのスクロールを可能にする
  window.scrollTo(0, scrollTopBack);
}
