(function () {
	const menuToggles = document.querySelectorAll('.elementor-menu-toggle');
	const langToggle = document.getElementById('lang-toggle');
	const storageKey = 'kenbarbershopLang';
	const translations = {
		"en": {
			"Přejít k obsahu": "Skip to content",
			"Domů": "Home",
			"O nás": "About",
			"About Us": "About Us",
			"Ceník": "Pricing",
			"Galerie": "Gallery",
			"Kontakt": "Contact",
			"Rezervace": "Book now",
			"Zobrazit podrobnosti": "View details",
			"Online rezervace termínu": "Online appointment booking",
			"Termín lze snadno rezervovat online a změnit či zrušit přes e-mail, který obdržíte po rezervaci": "An appointment can be easily booked online and changed or canceled via the email you receive after booking.",
			"Vyškolení profesionálové": "Trained professionals",
			"V ceně zahrnuto vše": "Everything included",
			"Občerstvení zdarma": "Free refreshments",
			"Naše pobočky": "Our branches",
			"Vzhledem k velké vytíženosti naší prvni pobočky SuperHairo, doporučujeme rezervovat termín na naší novou pobočku SuperHairo Modern, která se nachází pouze pár kroků od naší první. Děkujeme a budeme se těšit": "Due to the high demand at our first branch SuperHairo, we recommend booking an appointment at our new branch SuperHairo Modern, which is only a few steps away from our first one. Thank you and we look forward to seeing you.",
			"Naši barbeři jsou vyškolení profesionálové s mnohaletými zkušenostmi": "Our barbers are trained professionals with many years of experience.",
			"Telefon:": "Phone:",
			"Otevírací doba:": "Opening hours:",
			"Adresa:": "Address:",
			"Vítejte v Ken Barbershop  Epředním holičství v Praze!": "Welcome to Ken Barbershop — Prague's premier barbershop!",
			"Ken Barbershop Vintage": "Ken Barbershop Vintage",
			"Ken Barbershop Vintage  EÚtulné, klasické prostředí, specializující se na střih vlasů a holení vousů, poskytující prvotřídní zážitek.": "Ken Barbershop Vintage — A warm, classic atmosphere specializing in haircuts and beard grooming, delivering a premium experience.",
			"Ken Barbershop Modern": "Ken Barbershop Modern",
			"Ken Barbershop Modern  EModerní a dynamické prostředí, které kromāEstříhání a úpravy vousů nabízí i kreativní experimenty s účesy díky službám trvalé a barvení. Abyste předešli záměně mezi pobočkami, doporučujeme si před návštěvou pečlivě zkontrolovat adresu.": "Ken Barbershop Modern — A modern and dynamic environment that, in addition to haircuts and beard grooming, offers creative hairstyle experiments with perm and coloring services. To avoid confusion between branches, we recommend carefully checking the address before your visit.",
			"Stříhy": "Haircuts",
			"SuperHairo Vintage": "SuperHairo Vintage",
			"SuperHairo Modern": "SuperHairo Modern",
			"Střih Vlasů / MEN'S HAIRCUT": "Men's Haircut",
			"Střih Vlasů": "Haircut",
			"Úprava obočí": "Eyebrow shaping",
			"Mytí vlasů": "Hair wash",
			"Barvení vousů": "Beard coloring",
			"Dlouhé vlasy": "Long hair",
			"Combo Vip": "Combo Vip",
			"Úprava obočí ( navíc) : +50 Kč. Mytí vlasů ( navíc) : +100 Kč.... Zobrazit podrobnosti": "Eyebrow shaping (extra): +50 CZK. Hair wash (extra): +100 CZK.... View details",
			"Stříhání & Úprava Vousů / Haircut & Beard Trim": "Haircut & Beard Trim",
			"ÚÚprava obočí ( navíc) : +50 Kč Mytí vlasů ( navíc)... Zobrazit podrobnosti": "Eyebrow shaping (extra): +50 CZK. Hair wash (extra)... View details",
			"Střih Vlasů – Děti ( od 5 do 10 let )": "Children's haircut (from 5 to 10 years old)",
			"Úprava Vousů / Beard Trim Úprava obočí..........................................50...": "Beard trim / Beard maintenance Eyebrow shaping..........................................50...",
			"Dlouhé vlasy - Nebo s jenom nůžkama / Long hair or with scissors": "Long hair - Or with scissors",
			"Dlouhé vlasy - Nebo s jenom nůžkama / Long hair or with scissors Úprava obočí ( navíc) : +50 Kč Mytí vlasů ( navíc)...": "Long hair - Or with scissors. Eyebrow shaping (extra): +50 CZK. Hair wash (extra)...",
			"Combo Vip (Stříhání & Úprava Vousů + Mytí vlasů + Úprava obočí)": "Combo Vip (Haircut & Beard Trim + Hair wash + Eyebrow shaping)",
			"Střih vlasů + Mytí vlasů / Haircut + Hair Wash": "Haircut + Hair Wash",
			"Střih vlasů + Mytí vlasů / Haircut + Hair Wash Úprava obočí ( navíc) : +50 Kč Barvení vousů (navíc) : +400 Kč": "Haircut + Hair Wash. Eyebrow shaping (extra): +50 CZK. Beard coloring (extra): +400 CZK",
			"Po – Pá | 9:45 – 20:00": "Mon – Fri | 9:45 – 20:00",
			"Sobota | 9:45 – 18:45": "Saturday | 9:45 – 18:45",
			"Neděle | 9:45 – 18:15": "Sunday | 9:45 – 18:15"
		}
	};
	translations.en['Dom\u016f'] = 'Home';
	translations.en['O n\u00e1s'] = 'About';
	translations.en['Cen\u00edk'] = 'Pricing';
	translations.cs = Object.fromEntries(Object.entries(translations.en).map(([cs, en]) => [en, cs]));
	translations.cs.Home = 'Dom\u016f';
	translations.cs.About = 'O n\u00e1s';
	translations.cs.Pricing = 'Cen\u00edk';
	const normalizeText = (text) => text.replace(/\s+/g, ' ').trim();
	const replaceAllText = (text, search, replace) => {
		if (!search) return text;
		return text.split(search).join(replace);
	};
	const translateText = (element, lang) => {
		if (!element || element.id === 'lang-toggle') return;
		let text = normalizeText(element.textContent || '');
		const map = translations[lang];
		if (!map) return;
		Object.keys(map)
			.sort((a, b) => b.length - a.length)
			.forEach((source) => {
				const normalizedSource = normalizeText(source);
				if (text.includes(normalizedSource)) {
					text = replaceAllText(text, normalizedSource, map[source]);
				}
			});
		if (text !== normalizeText(element.textContent || '')) {
			element.textContent = text;
		}
	};
	const translatePage = (lang) => {
		const elements = document.querySelectorAll('a, button, span, h1, h2, h3, h4, h5, h6, p, strong');
		elements.forEach((element) => translateText(element, lang));
		document.documentElement.lang = lang === 'en' ? 'en' : 'cs';
		if (langToggle) {
			langToggle.textContent = lang === 'en' ? 'CZ' : 'EN';
		}
	};
	const setLanguage = (lang) => {
		const normalized = lang === 'en' ? 'en' : 'cs';
		localStorage.setItem(storageKey, normalized);
		translatePage(normalized);
	};
	const initLanguage = () => {
		const savedLang = localStorage.getItem(storageKey);
		const initialLang = savedLang === 'en' ? 'en' : 'cs';
		if (initialLang === 'en') {
			translatePage('en');
		}
		if (langToggle) {
			langToggle.addEventListener('click', () => {
				setLanguage(document.documentElement.lang === 'en' ? 'cs' : 'en');
			});
		}
	};
	const hydrateMobileMenu = () => {
		const items = [
			{ label: 'Dom\u016f', href: 'index.html', active: true },
			{ label: 'O n\u00e1s', href: 'index.html#o-nas', anchor: true },
			{ label: 'Cen\u00edk', href: 'index.html#cenik', anchor: true },
			{ label: 'Galerie', href: 'index.html#galerie', anchor: true },
			{ label: 'Kontakt', href: 'index.html#kontakt', anchor: true }
		];
		const renderMenu = (list, isDropdown) => {
			if (!list) return;
			list.innerHTML = '';
			items.forEach((item) => {
				const li = document.createElement('li');
				li.className = 'menu-item menu-item-type-custom menu-item-object-custom';
				const link = document.createElement('a');
				link.href = item.href;
				link.textContent = item.label;
				link.className = `elementor-item${item.active ? ' elementor-item-active' : ''}${item.anchor ? ' elementor-item-anchor' : ''}`;
				if (item.active) {
					link.setAttribute('aria-current', 'page');
				}
				if (isDropdown) {
					link.setAttribute('tabindex', '-1');
				}
				li.appendChild(link);
				list.appendChild(li);
			});
		};
		renderMenu(document.getElementById('menu-1-8a984bc'), false);
		renderMenu(document.getElementById('menu-2-8a984bc'), true);
	};
	const galleryLinks = document.querySelectorAll('[data-elementor-open-lightbox="yes"]');
	hydrateMobileMenu();
	initLanguage();
	const mapLinks = document.querySelectorAll('a[href*="maps.app.goo.gl"], a[href*="google.com/maps"], a[href*="maps.google.com"]');
	const lightbox = document.createElement('div');
	const lightboxImage = document.createElement('img');
	const lightboxClose = document.createElement('button');

	lightbox.className = 'static-lightbox';
	lightbox.setAttribute('aria-hidden', 'true');
	lightboxClose.className = 'static-lightbox__close';
	lightboxClose.type = 'button';
	lightboxClose.setAttribute('aria-label', 'Close gallery');
	lightboxClose.textContent = '×';
	lightboxImage.className = 'static-lightbox__image';

	lightbox.appendChild(lightboxClose);
	lightbox.appendChild(lightboxImage);
	document.body.appendChild(lightbox);

	const closeLightbox = () => {
		lightbox.classList.remove('is-visible');
		lightbox.setAttribute('aria-hidden', 'true');
		lightboxImage.removeAttribute('src');
		lightboxImage.removeAttribute('alt');
		document.body.style.overflow = '';
	};

	menuToggles.forEach((toggle) => {
		const dropdown = toggle.nextElementSibling;
		if (!dropdown || !dropdown.classList.contains('elementor-nav-menu--dropdown')) {
			return;
		}

		toggle.addEventListener('click', () => {
			const isOpen = toggle.classList.toggle('is-open');
			toggle.setAttribute('aria-expanded', String(isOpen));
			dropdown.setAttribute('aria-hidden', String(!isOpen));
		});

		dropdown.querySelectorAll('a').forEach((link) => {
			link.addEventListener('click', () => {
				toggle.classList.remove('is-open');
				toggle.setAttribute('aria-expanded', 'false');
				dropdown.setAttribute('aria-hidden', 'true');
			});
		});
	});

	galleryLinks.forEach((link) => {
		link.addEventListener('click', (event) => {
			event.preventDefault();
			lightboxImage.src = link.getAttribute('href');
			lightboxImage.alt = link.getAttribute('data-elementor-lightbox-title') || '';
			lightbox.classList.add('is-visible');
			lightbox.setAttribute('aria-hidden', 'false');
			document.body.style.overflow = 'hidden';
		});
	});

	mapLinks.forEach((link) => {
		link.setAttribute('target', '_blank');
		link.setAttribute('rel', 'noopener noreferrer');
	});

	document.querySelectorAll('a[href*="Seifertova%2067"]').forEach((link) => {
		link.setAttribute('target', '_blank');
		link.setAttribute('rel', 'noopener noreferrer');
	});

	lightbox.addEventListener('click', (event) => {
		if (event.target === lightbox || event.target === lightboxClose) {
			closeLightbox();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			closeLightbox();
		}
	});
})();
