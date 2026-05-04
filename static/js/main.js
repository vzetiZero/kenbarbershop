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
			"Ken Barbershop Vintage": "Ken Barbershop Vintage",
			"Ken Barbershop Modern": "Ken Barbershop Modern",
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
	translations.en['V\u00edtejte v Ken Barbershop, p\u0159edn\u00edm holi\u010dstv\u00ed v Praze!'] = 'Welcome to Ken Barbershop, a leading barbershop in Prague!';
	translations.en['Ken Barbershop nab\u00edz\u00ed \u00fatuln\u00e9 a klasick\u00e9 prost\u0159ed\u00ed, specializuje se na st\u0159ih vlas\u016f a \u00fapravu vous\u016f a poskytuje prvot\u0159\u00eddn\u00ed z\u00e1\u017eitek.'] = 'Ken Barbershop offers a warm, classic atmosphere, specializes in haircuts and beard grooming, and delivers a premium experience.';
	translations.en['Modern\u00ed a dynamick\u00e9 prost\u0159ed\u00ed krom\u011b st\u0159\u00edh\u00e1n\u00ed a \u00fapravy vous\u016f nab\u00edz\u00ed tak\u00e9 kreativn\u00ed experimenty s \u00fa\u010desy d\u00edky slu\u017eb\u00e1m trval\u00e9 a barven\u00ed. P\u0159ed n\u00e1v\u0161t\u011bvou si pros\u00edm pe\u010dliv\u011b zkontrolujte adresu.'] = 'The modern and dynamic environment offers not only haircuts and beard grooming, but also creative hairstyle options through perm and coloring services. Please check the address carefully before your visit.';
	translations.en['Na\u0161e pobo\u010dky'] = 'Our branches';
	translations.en['Vyberte pobo\u010dku'] = 'Choose a branch';
	translations.en['Vzhledem k velk\u00e9 vyt\u00ed\u017eenosti na\u0161\u00ed prvni pobo\u010dky Ken Barber, doporu\u010dujeme rezervovat term\u00edn na na\u0161\u00ed novou pobo\u010dku Ken Barber Modern, kter\u00e1 se nach\u00e1z\u00ed pouze p\u00e1r krok\u016f od na\u0161\u00ed prvn\u00ed. D\u011bkujeme a budeme se t\u011b\u0161it'] = 'Due to the high demand at our first Ken Barber branch, we recommend booking an appointment at our new Ken Barber Modern branch, which is only a few steps away from the first one. Thank you, and we look forward to seeing you.';
	translations.en['Vzhledem k velkﾃｩ vytﾃｭﾅｾenosti naﾅ｡ﾃｭ prvni poboﾄ耕y Ken Barber, doporuﾄ講jeme rezervovat termﾃｭn na naﾅ｡ﾃｭ novou poboﾄ耕u Ken Barber Modern, kterﾃ｡ se nachﾃ｡zﾃｭ pouze pﾃ｡r krokﾅｯ od naﾅ｡ﾃｭ prvnﾃｭ. Dﾄ嫐ujeme a budeme se tﾄ崘｡it'] = 'Due to the high demand at our first Ken Barber branch, we recommend booking an appointment at our new Ken Barber Modern branch, which is only a few steps away from the first one. Thank you, and we look forward to seeing you.';
	translations.cs = Object.fromEntries(Object.entries(translations.en).map(([cs, en]) => [en, cs]));
	translations.cs.Home = 'Dom\u016f';
	translations.cs.About = 'O n\u00e1s';
	translations.cs.Pricing = 'Cen\u00edk';
	translations.cs['Welcome to Ken Barbershop, a leading barbershop in Prague!'] = 'V\u00edtejte v Ken Barbershop, p\u0159edn\u00edm holi\u010dstv\u00ed v Praze!';
	translations.cs['Ken Barbershop offers a warm, classic atmosphere, specializes in haircuts and beard grooming, and delivers a premium experience.'] = 'Ken Barbershop nab\u00edz\u00ed \u00fatuln\u00e9 a klasick\u00e9 prost\u0159ed\u00ed, specializuje se na st\u0159ih vlas\u016f a \u00fapravu vous\u016f a poskytuje prvot\u0159\u00eddn\u00ed z\u00e1\u017eitek.';
	translations.cs['The modern and dynamic environment offers not only haircuts and beard grooming, but also creative hairstyle options through perm and coloring services. Please check the address carefully before your visit.'] = 'Modern\u00ed a dynamick\u00e9 prost\u0159ed\u00ed krom\u011b st\u0159\u00edh\u00e1n\u00ed a \u00fapravy vous\u016f nab\u00edz\u00ed tak\u00e9 kreativn\u00ed experimenty s \u00fa\u010desy d\u00edky slu\u017eb\u00e1m trval\u00e9 a barven\u00ed. P\u0159ed n\u00e1v\u0161t\u011bvou si pros\u00edm pe\u010dliv\u011b zkontrolujte adresu.';
	translations.cs['Our branches'] = 'Na\u0161e pobo\u010dky';
	translations.cs['Choose a branch'] = 'Vyberte pobo\u010dku';
	translations.cs['Due to the high demand at our first Ken Barber branch, we recommend booking an appointment at our new Ken Barber Modern branch, which is only a few steps away from the first one. Thank you, and we look forward to seeing you.'] = 'Vzhledem k velk\u00e9 vyt\u00ed\u017eenosti na\u0161\u00ed prvni pobo\u010dky Ken Barber, doporu\u010dujeme rezervovat term\u00edn na na\u0161\u00ed novou pobo\u010dku Ken Barber Modern, kter\u00e1 se nach\u00e1z\u00ed pouze p\u00e1r krok\u016f od na\u0161\u00ed prvn\u00ed. D\u011bkujeme a budeme se t\u011b\u0161it';
	const normalizeText = (text) => text.replace(/\s+/g, ' ').trim();
	const replaceAllText = (text, search, replace) => {
		if (!search) return text;
		return text.split(search).join(replace);
	};
	const translateText = (element, lang) => {
		if (!element || element.id === 'lang-toggle') return;
		if (element.closest('.elementor-element-38a3bfd')) return;
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
	const updateBranchContact = (lang) => {
		const contact = document.querySelector('.elementor-element-38a3bfd');
		if (!contact) return;
		contact.innerHTML = lang === 'en'
			? '<p><strong>Phone:</strong><br>+420 773 919 789</p><p><strong>Opening hours:</strong><br>Monday | 09:00 \u2013 19:30<br>Tuesday | 09:00 \u2013 19:30<br>Wednesday | 09:00 \u2013 19:30<br>Thursday | 09:00 \u2013 19:30<br>Friday | 09:00 \u2013 19:30<br>Saturday | 09:00 \u2013 19:30<br>Sunday | Closed</p><p><strong>Address:</strong><br>Seifertova 595/67<br>Praha 3</p>'
			: '<p><strong>Telefon:</strong><br>+420 773 919 789</p><p><strong>Otev\u00edrac\u00ed doba:</strong><br>Pond\u011bl\u00ed | 09:00 \u2013 19:30<br>\u00dater\u00fd | 09:00 \u2013 19:30<br>St\u0159eda | 09:00 \u2013 19:30<br>\u010ctvrtek | 09:00 \u2013 19:30<br>P\u00e1tek | 09:00 \u2013 19:30<br>Sobota | 09:00 \u2013 19:30<br>Ned\u011ble | Zav\u0159eno</p><p><strong>Adresa:</strong><br>Seifertova 595/67<br>Praha 3</p>';
	};
	const translatePage = (lang) => {
		const elements = document.querySelectorAll('a, button, span, h1, h2, h3, h4, h5, h6, p, strong');
		elements.forEach((element) => translateText(element, lang));
		updateBranchContact(lang);
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
		} else {
			updateBranchContact('cs');
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
