"use strict";
// ちょっとしたミスの書き方もエラーとして厳しくチェックする指示

/* JavaScriptではCSSと同じコメントアウトも使える */

document.addEventListener("DOMContentLoaded", () => {
	// HTMLの読み込みが完了したあとに実行したい処理をここに書く
});


// ダークモードの設定、body要素内全体で変化をかける
// 1. すべてのトグルボタンとbodyを取得
const toggleButtons = document.querySelectorAll('.mode-toggle');
const bodyElement = document.body;

// 2. それぞれのボタンにクリックイベントを設定
toggleButtons.forEach((button) => {
	button.addEventListener('click', () => {
		// bodyのダークモードクラス「dark-mode」をつけ外し
		bodyElement.classList.toggle('dark-mode');

		// 現在ダークモードかどうかを判定
		const isDarkMode = bodyElement.classList.contains('dark-mode');

		// 画面にあるすべてのトグルボタンの状態を一斉に更新する
		toggleButtons.forEach((btn) => {
			/* const iconSpan = btn.querySelector('.btn-icon');変更：画像管理はCSSのみにしてコメントアウト */
			const textSpan = btn.querySelector('.btn-text');

			// ① アイコン（絵文字）が存在すれば切り替える→変更：画像管理はCSSのみにしてコメントアウト
			/* if (iconSpan) {
				iconSpan.textContent = isDarkMode ? '☀️' : '🌙';
			} */

			// ② テキスト（span.btn-text）が存在する場合のみ、文字を切り替える
			if (textSpan) {
				textSpan.textContent = isDarkMode ? 'Light Mode' : 'Night Mode';
			}
		});
	});
});


// ハンバーガーボタンの設定、header要素内で変化をかける
const menuBtn = document.getElementById('menu-btn'); // メニューボタン要素を取得
const headerElement = document.querySelector('header'); // 親要素を取得

menuBtn.addEventListener('click', () => {
	// ヘッダーにクラス「is-active」をつけ外しするだけで、中の要素も連動させられる
	headerElement.classList.toggle('is-active');
});


// 各要素のフェードインアニメーションの設定、fade-inのクラス名が付いた要素に変化をかける
// 1. .fade-in がついている要素をすべて見つける
const fadeElements = document.querySelectorAll('.fade-in');

// 2. 監視ルールの設定
const observerOptions = {
	root: null, // ビューポート（画面全体）を基準にする
	rootMargin: '0px 0px -100px 0px', // 画面の下から100px手前に入ったら発火する
	threshold: 0 // 要素が少しでも見えたら発火
};

// 3. 監視がヒットしたときの処理
const observerCallback = (entries, observer) => {
	entries.forEach(entry => {
		// 画面内に入ってきたとき！
		if (entry.isIntersecting) {
			// 対象の要素自身に 'is-show' クラスを追加する
			entry.target.classList.add('is-show');
			// 一度ふわっと表示されたら、もう監視をやめる（負荷軽減のため）
			observer.unobserve(entry.target);
		}
	});
};

// 4. オブザーバー（監視員）を生成してスタート
const observer = new IntersectionObserver(observerCallback, observerOptions);

// すべての .fade-in 要素を監視対象に登録する
fadeElements.forEach(element => {
	observer.observe(element);
});