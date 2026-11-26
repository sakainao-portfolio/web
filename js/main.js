"use strict";

// オープニングアニメーションの設定
const openingBox = document.querySelector('.opening-box');
const openingBlack = document.querySelector('.opening-black');
const hasPlayedOpening = sessionStorage.getItem('openingPlayed');

if (openingBox) {
	if (!hasPlayedOpening) {
		document.body.classList.add('is-opening-active');
		sessionStorage.setItem('openingPlayed', 'true');

		const finishOpening = () => {
			document.body.classList.remove('is-opening-active');
		};

		if (openingBlack) {
			openingBlack.addEventListener('animationend', finishOpening, { once: true });
		}
		setTimeout(finishOpening, 10200);
	} else {
		openingBox.classList.add('is-skipped');
		document.body.classList.remove('is-opening-active');
	}
}


// ダークモードの設定
const toggleButtons = document.querySelectorAll('.mode-toggle');
const bodyElement = document.body;

toggleButtons.forEach((button) => {
	button.addEventListener('click', () => {
		bodyElement.classList.toggle('dark-mode');

		const isDarkMode = bodyElement.classList.contains('dark-mode');

		toggleButtons.forEach((btn) => {
			const textSpan = btn.querySelector('.btn-text');

			if (textSpan) {
				textSpan.textContent = isDarkMode ? 'Light Mode' : 'Night Mode';
			}
		});
	});
});


// ハンバーガーボタンの設定
const menuBtn = document.getElementById('menu-btn');
const headerElement = document.querySelector('header');

menuBtn.addEventListener('click', () => {
	headerElement.classList.toggle('is-active');
});

const navLinks = headerElement.querySelectorAll('.nav-item a');

navLinks.forEach(link => {
	link.addEventListener('click', () => {
		headerElement.classList.remove('is-active');
	});
});


// 各要素のフェードインアニメーションの設定
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
	root: null,
	rootMargin: '0px 0px -100px 0px',
	threshold: 0
};

const observerCallback = (entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('is-show');
			observer.unobserve(entry.target);
		}
	});
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

fadeElements.forEach(element => {
	observer.observe(element);
});


// ギャラリーページのカテゴリ絞り込み（フィルター）設定
const filterBtns = document.querySelectorAll('.filter-button');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		filterBtns.forEach(b => b.classList.remove('is-active'));
		btn.classList.add('is-active');

		const target = btn.dataset.filter;

		galleryItems.forEach(item => {
			if (target === 'all' || item.dataset.category === target) {
				item.style.display = 'block';
				} else {
					item.style.display = 'none';
				}
		});
	});
});


// ギャラリーページのモーダルウィンドウ設定
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const closeBtn = document.getElementById('close-btn');

document.querySelectorAll('.gallery-item').forEach(item => {
	item.addEventListener('click', () => {
		modalImg.src = item.dataset.img;
		modalTitle.textContent = item.dataset.title;
		modal.showModal();
	});
});

closeBtn.addEventListener('click', () => modal.close());

modal.addEventListener('click', (e) => {
	if (e.target === modal) modal.close();
});