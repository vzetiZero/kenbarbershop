(function () {
	// Banner Slider System - Fetches from Supabase
	const SETTINGS_KEY = 'kenbarbershop_banner_settings';
	const pageBanner = document.getElementById('page-banner');

	function getBannerSettings() {
		const defaults = {
			autoSlide: true,
			slideInterval: 5,
			parallax: false,
			showArrows: true,
			showDots: true
		};
		const saved = localStorage.getItem(SETTINGS_KEY);
		const settings = saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
		settings.parallax = false;
		return settings;
	}

	async function fetchBannersFromSupabase() {
		try {
			const response = await fetch(`${supabaseUrl}/rest/v1/banners?select=*&order=sort_order.asc&active=eq.true`, {
				headers: {
					'apikey': supabaseSecretKey || supabaseKey,
					'Authorization': `Bearer ${supabaseSecretKey || supabaseKey}`
				}
			});
			if (!response.ok) throw new Error('Failed to fetch banners');
			return await response.json();
		} catch (error) {
			console.warn('Failed to fetch banners from Supabase:', error);
			return [];
		}
	}

	async function createBannerSlider() {
		if (!pageBanner) return;

		const banners = await fetchBannersFromSupabase();
		if (banners.length === 0) {
			pageBanner.style.display = 'none';
			return;
		}

		const settings = getBannerSettings();
		const hasMultipleBanners = banners.length > 1;

		const escapeHtml = (value) => String(value ?? '')
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');

		const bannerSocialHTML = `
			<div class="banner-social-links" aria-label="Social links">
				<a class="banner-social-links__item banner-social-links__item--instagram"
					href="https://www.instagram.com/kenbarbershop.cz" target="_blank" rel="noopener noreferrer"
					aria-label="Instagram Ken Barbershop">
					<svg class="banner-social-links__icon" viewBox="0 0 24 24" aria-hidden="true">
						<rect x="3" y="3" width="18" height="18" rx="5"></rect>
						<circle cx="12" cy="12" r="4"></circle>
						<circle cx="17.5" cy="6.5" r="1"></circle>
					</svg>
				</a>
				<a class="banner-social-links__item banner-social-links__item--facebook"
					href="https://www.facebook.com/people/Ken-Barbershop/100090907493887/" target="_blank" rel="noopener noreferrer"
					aria-label="Facebook Ken Barbershop">
					<svg class="banner-social-links__icon" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M15.12 8.1H13.4c-.72 0-.95.36-.95 1.16v1.42h2.6l-.34 2.64h-2.26V20H9.72v-6.68H7.45v-2.64h2.27V9.04C9.72 6.78 11.08 5.5 13.08 5.5c.96 0 1.78.07 2.04.1v2.5z"></path>
					</svg>
				</a>
				<a class="banner-social-links__item banner-social-links__item--tiktok"
					href="https://www.tiktok.com/@kenbarbershop.cz" target="_blank" rel="noopener noreferrer"
					aria-label="TikTok Ken Barbershop">
					<svg class="banner-social-links__icon banner-social-links__icon--tiktok" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M15.6 3.4c.34 2.15 1.54 3.47 3.72 3.62v2.42c-1.26.08-2.36-.28-3.64-1.04v4.53c0 5.75-6.28 7.55-8.8 3.43-1.62-2.65-.63-7.3 4.58-7.48v2.56c-.41.07-.85.17-1.25.31-1.2.41-1.88 1.18-1.69 2.53.37 2.58 5.1 3.34 4.7-1.7V3.4h2.38z"></path>
					</svg>
				</a>
			</div>
		`;

		let sliderHTML = '<div class="banner-slider">';
		banners.forEach((banner, index) => {
			const imageUrl = escapeHtml(banner.url);
			sliderHTML += `
				<div class="banner-slide" data-index="${index}" style="background-image: url('${imageUrl}')">
					<img src="${imageUrl}" alt="${escapeHtml(banner.alt || 'Banner ' + (index + 1))}">
				</div>
			`;
		});
		sliderHTML += '</div>';
		sliderHTML += bannerSocialHTML;

		if (settings.showArrows && hasMultipleBanners) {
			sliderHTML += `
				<button class="banner-nav prev" aria-label="Previous">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M15 18l-6-6 6-6"/>
					</svg>
				</button>
				<button class="banner-nav next" aria-label="Next">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M9 18l6-6-6-6"/>
					</svg>
				</button>
			`;
		}

		if (settings.showDots && hasMultipleBanners) {
			sliderHTML += '<div class="banner-dots">';
			banners.forEach((_, index) => {
				sliderHTML += `<span class="banner-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`;
			});
			sliderHTML += '</div>';
		}

		pageBanner.classList.remove('parallax');

		pageBanner.innerHTML = sliderHTML;
		pageBanner.style.display = 'block';
		updateBannerAspect();

		if (hasMultipleBanners) {
			initSlider(settings);
		}
	}

	function updateBannerAspect(index = 0) {
		const images = pageBanner.querySelectorAll('.banner-slide img');
		const image = images[index];
		if (!image) return;

		const setAspect = () => {
			if (!image.naturalWidth || !image.naturalHeight) return;
			const rawAspect = image.naturalWidth / image.naturalHeight;
			const fittedAspect = Math.min(Math.max(rawAspect, 0.72), 3.2);
			pageBanner.style.setProperty('--banner-aspect', fittedAspect.toFixed(4));
		};

		if (image.complete) {
			setAspect();
		} else {
			image.addEventListener('load', setAspect, { once: true });
		}
	}

	function initSlider(settings) {
		const slider = pageBanner.querySelector('.banner-slider');
		const slides = pageBanner.querySelectorAll('.banner-slide');
		const dots = pageBanner.querySelectorAll('.banner-dot');
		const prevBtn = pageBanner.querySelector('.banner-nav.prev');
		const nextBtn = pageBanner.querySelector('.banner-nav.next');

		let currentIndex = 0;
		let autoPlayInterval = null;
		const totalSlides = slides.length;

		function goToSlide(index) {
			if (index < 0) index = totalSlides - 1;
			if (index >= totalSlides) index = 0;

			currentIndex = index;
			slider.style.transform = `translateX(-${index * 100}%)`;
			updateBannerAspect(index);

			// Update dots
			dots.forEach((dot, i) => {
				dot.classList.toggle('active', i === index);
			});
		}

		function nextSlide() {
			goToSlide(currentIndex + 1);
		}

		function prevSlide() {
			goToSlide(currentIndex - 1);
		}

		function startAutoPlay() {
			if (!settings.autoSlide) return;
			stopAutoPlay();
			autoPlayInterval = setInterval(nextSlide, settings.slideInterval * 1000);
		}

		function stopAutoPlay() {
			if (autoPlayInterval) {
				clearInterval(autoPlayInterval);
				autoPlayInterval = null;
			}
		}

		// Event listeners
		if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoPlay(); prevSlide(); startAutoPlay(); });
		if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoPlay(); nextSlide(); startAutoPlay(); });

		dots.forEach(dot => {
			dot.addEventListener('click', () => {
				stopAutoPlay();
				goToSlide(parseInt(dot.dataset.index));
				startAutoPlay();
			});
		});

		// Start autoplay
		startAutoPlay();
	}

	// Initialize on load
	if (pageBanner) {
		createBannerSlider();
	}

	const menuToggles = document.querySelectorAll('.elementor-menu-toggle');
	const langToggle = document.getElementById('lang-toggle');
	const langSwitcher = document.getElementById('lang-switcher');
	const langMenu = document.getElementById('lang-menu');
	const storageKey = 'kenbarbershopLang';
	const supportedLanguages = ['cs', 'en', 'uk', 'de', 'es', 'ru'];
	const languageFlagClasses = {
		cs: 'language-flag--czech',
		en: 'language-flag--english',
		uk: 'language-flag--ukraine',
		de: 'language-flag--germany',
		es: 'language-flag--spain',
		ru: 'language-flag--russia'
	};
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
			"Interiér Ken Barber": "Ken Barber Interior",
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
	translations.en['Modern\u00ed a dynamick\u00e9 prost\u0159ed\u00ed krom\u011b st\u0159\u00edh\u00e1n\u00ed a \u00fapravy vous\u016f nab\u00edz\u00ed tak\u00e9 kreativn\u00ed experimenty s \u00fa\u010desy d\u00edky slu\u017eb\u00e1m trval\u00e9 a barven\u00ed. P\u0159ed n\u00e1v\u0161t\u011bvou si pros\u00edm pe\u010dliv\u011b zkontrolujte adresu.'] = 'The modern and dynamic environment offers not only haircuts and beard grooming, but also creative hairstyle options through perm and coloring services. Please check the address carefully before your visit.';
	translations.en['Na\u0161e pobo\u010dky'] = 'Our branches';
	translations.en['Vyberte pobo\u010dku'] = 'Choose a branch';
	translations.en['Interi\u00e9r Ken Barber'] = 'Ken Barber Interior';
	translations.en['Vzhledem k velk\u00e9 vyt\u00ed\u017eenosti na\u0161\u00ed prvni pobo\u010dky Ken Barber, doporu\u010dujeme rezervovat term\u00edn na na\u0161\u00ed novou pobo\u010dku Ken Barber Modern, kter\u00e1 se nach\u00e1z\u00ed pouze p\u00e1r krok\u016f od na\u0161\u00ed prvn\u00ed. D\u011bkujeme a budeme se t\u011b\u0161it'] = 'Due to the high demand at our first Ken Barber branch, we recommend booking an appointment at our new Ken Barber Modern branch, which is only a few steps away from the first one. Thank you, and we look forward to seeing you.';
	translations.en['Vzhledem k velkﾃｩ vytﾃｭﾅｾenosti naﾅ｡ﾃｭ prvni poboﾄ耕y Ken Barber, doporuﾄ講jeme rezervovat termﾃｭn na naﾅ｡ﾃｭ novou poboﾄ耕u Ken Barber Modern, kterﾃ｡ se nachﾃ｡zﾃｭ pouze pﾃ｡r krokﾅｯ od naﾅ｡ﾃｭ prvnﾃｭ. Dﾄ嫐ujeme a budeme se tﾄ崘｡it'] = 'Due to the high demand at our first Ken Barber branch, we recommend booking an appointment at our new Ken Barber Modern branch, which is only a few steps away from the first one. Thank you, and we look forward to seeing you.';
	translations.cs = Object.fromEntries(Object.entries(translations.en).map(([cs, en]) => [en, cs]));
	translations.cs.Home = 'Dom\u016f';
	translations.cs.About = 'O n\u00e1s';
	translations.cs.Pricing = 'Cen\u00edk';
	translations.cs['The modern and dynamic environment offers not only haircuts and beard grooming, but also creative hairstyle options through perm and coloring services. Please check the address carefully before your visit.'] = 'Modern\u00ed a dynamick\u00e9 prost\u0159ed\u00ed krom\u011b st\u0159\u00edh\u00e1n\u00ed a \u00fapravy vous\u016f nab\u00edz\u00ed tak\u00e9 kreativn\u00ed experimenty s \u00fa\u010desy d\u00edky slu\u017eb\u00e1m trval\u00e9 a barven\u00ed. P\u0159ed n\u00e1v\u0161t\u011bvou si pros\u00edm pe\u010dliv\u011b zkontrolujte adresu.';
	translations.cs['Our branches'] = 'Na\u0161e pobo\u010dky';
	translations.cs['Choose a branch'] = 'Vyberte pobo\u010dku';
	translations.cs['Ken Barber Interior'] = 'Interi\u00e9r Ken Barber';
	translations.cs['Due to the high demand at our first Ken Barber branch, we recommend booking an appointment at our new Ken Barber Modern branch, which is only a few steps away from the first one. Thank you, and we look forward to seeing you.'] = 'Vzhledem k velk\u00e9 vyt\u00ed\u017eenosti na\u0161\u00ed prvni pobo\u010dky Ken Barber, doporu\u010dujeme rezervovat term\u00edn na na\u0161\u00ed novou pobo\u010dku Ken Barber Modern, kter\u00e1 se nach\u00e1z\u00ed pouze p\u00e1r krok\u016f od na\u0161\u00ed prvn\u00ed. D\u011bkujeme a budeme se t\u011b\u0161it';
	translations.uk = {};
	translations.de = {};
	translations.es = {};
	translations.ru = {};
	const phraseTranslations = {
		cs: {
			home: 'Dom\u016f',
			about: 'O n\u00e1s',
			pricing: 'Cen\u00edk',
			gallery: 'Galerie',
			contact: 'Kontakt',
			skip: 'P\u0159ej\u00edt k obsahu',
			bookNow: 'Rezervace',
			topRatedGoogle: 'Top #1 Barbershop v Praze podle Googlu',
			topRated: 'Top #1 Barbershop v Praze podle',
			interior: 'Interi\u00e9r Ken Barber',
			shopHaircuts: 'St\u0159ihy',
			shopHaircutsAlt: 'St\u0159\u00edhy',
			video: 'Video',
			branches: 'Na\u0161e pobo\u010dky',
			branchIntro: 'Vzhledem k velk\u00e9 vyt\u00ed\u017eenosti na\u0161\u00ed prvni pobo\u010dky Ken Barber, doporu\u010dujeme rezervovat term\u00edn na na\u0161\u00ed novou pobo\u010dku Ken Barber Modern, kter\u00e1 se nach\u00e1z\u00ed pouze p\u00e1r krok\u016f od na\u0161\u00ed prvn\u00ed. D\u011bkujeme a budeme se t\u011b\u0161it',
			languages: 'Jazyky:',
			writeUs: 'Napi\u0161te n\u00e1m',
			name: 'Jm\u00e9no & P\u0159\u00edjmen\u00ed',
			message: 'Zpr\u00e1va',
			sendMessage: 'Odeslat zpr\u00e1vu'
		},
		en: {
			home: 'Home',
			about: 'About',
			pricing: 'Pricing',
			gallery: 'Gallery',
			contact: 'Contact',
			skip: 'Skip to content',
			bookNow: 'Book now',
			topRatedGoogle: 'Top #1 Barbershop in Prague according to Google',
			topRated: 'Top #1 Barbershop in Prague according to',
			interior: 'Ken Barber Interior',
			shopHaircuts: 'Haircuts',
			shopHaircutsAlt: 'Haircuts',
			video: 'Video',
			branches: 'Our branches',
			branchIntro: 'Due to the high demand at our first Ken Barber branch, we recommend booking an appointment at our new Ken Barber Modern branch, which is only a few steps away from the first one. Thank you, and we look forward to seeing you.',
			languages: 'Languages:',
			writeUs: 'Write to us',
			name: 'First & Last Name',
			message: 'Message',
			sendMessage: 'Send message'
		},
		de: {
			home: 'Startseite',
			about: '\u00dcber uns',
			pricing: 'Preise',
			gallery: 'Galerie',
			contact: 'Kontakt',
			skip: 'Zum Inhalt springen',
			bookNow: 'Reservieren',
			topRatedGoogle: 'Top #1 Barbershop in Prag laut Google',
			topRated: 'Top #1 Barbershop in Prag laut',
			interior: 'Ken Barber Interieur',
			shopHaircuts: 'Haarschnitte',
			shopHaircutsAlt: 'Haarschnitte',
			video: 'Video',
			branches: 'Unsere Filialen',
			branchIntro: 'Wegen der hohen Auslastung unserer ersten Ken Barber Filiale empfehlen wir, einen Termin in unserer neuen Filiale Ken Barber Modern zu buchen, die nur wenige Schritte von der ersten entfernt ist. Vielen Dank, wir freuen uns auf Sie.',
			languages: 'Sprachen:',
			writeUs: 'Schreiben Sie uns',
			name: 'Vor- und Nachname',
			message: 'Nachricht',
			sendMessage: 'Nachricht senden'
		},
		es: {
			home: 'Inicio',
			about: 'Sobre nosotros',
			pricing: 'Precios',
			gallery: 'Galeria',
			contact: 'Contacto',
			skip: 'Saltar al contenido',
			bookNow: 'Reservar',
			topRatedGoogle: 'Top #1 barberia en Praga segun Google',
			topRated: 'Top #1 barberia en Praga segun',
			interior: 'Interior de Ken Barber',
			shopHaircuts: 'Cortes de pelo',
			shopHaircutsAlt: 'Cortes de pelo',
			video: 'Video',
			branches: 'Nuestras sucursales',
			branchIntro: 'Debido a la alta demanda en nuestra primera sucursal Ken Barber, recomendamos reservar una cita en nuestra nueva sucursal Ken Barber Modern, que esta a solo unos pasos de la primera. Gracias, esperamos verle pronto.',
			languages: 'Idiomas:',
			writeUs: 'Escribanos',
			name: 'Nombre y apellido',
			message: 'Mensaje',
			sendMessage: 'Enviar mensaje'
		},
		ru: {
			home: '\u0413\u043b\u0430\u0432\u043d\u0430\u044f',
			about: '\u041e \u043d\u0430\u0441',
			pricing: '\u0426\u0435\u043d\u044b',
			gallery: '\u0413\u0430\u043b\u0435\u0440\u0435\u044f',
			contact: '\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b',
			skip: '\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a \u0441\u043e\u0434\u0435\u0440\u0436\u0430\u043d\u0438\u044e',
			bookNow: '\u0417\u0430\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f',
			topRatedGoogle: '\u0422\u043e\u043f #1 \u0431\u0430\u0440\u0431\u0435\u0440\u0448\u043e\u043f \u0432 \u041f\u0440\u0430\u0433\u0435 \u043f\u043e \u0432\u0435\u0440\u0441\u0438\u0438 Google',
			topRated: '\u0422\u043e\u043f #1 \u0431\u0430\u0440\u0431\u0435\u0440\u0448\u043e\u043f \u0432 \u041f\u0440\u0430\u0433\u0435 \u043f\u043e \u0432\u0435\u0440\u0441\u0438\u0438',
			interior: '\u0418\u043d\u0442\u0435\u0440\u044c\u0435\u0440 Ken Barber',
			shopHaircuts: '\u0421\u0442\u0440\u0438\u0436\u043a\u0438',
			shopHaircutsAlt: '\u0421\u0442\u0440\u0438\u0436\u043a\u0438',
			video: '\u0412\u0438\u0434\u0435\u043e',
			branches: '\u041d\u0430\u0448\u0438 \u0444\u0438\u043b\u0438\u0430\u043b\u044b',
			branchIntro: '\u0418\u0437-\u0437\u0430 \u0432\u044b\u0441\u043e\u043a\u043e\u0439 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d\u043d\u043e\u0441\u0442\u0438 \u043d\u0430\u0448\u0435\u0433\u043e \u043f\u0435\u0440\u0432\u043e\u0433\u043e \u0444\u0438\u043b\u0438\u0430\u043b\u0430 Ken Barber \u0440\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0435\u043c \u0437\u0430\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f \u0432 \u043d\u043e\u0432\u044b\u0439 \u0444\u0438\u043b\u0438\u0430\u043b Ken Barber Modern, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u043d\u0430\u0445\u043e\u0434\u0438\u0442\u0441\u044f \u0432\u0441\u0435\u0433\u043e \u0432 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u0438\u0445 \u0448\u0430\u0433\u0430\u0445 \u043e\u0442 \u043f\u0435\u0440\u0432\u043e\u0433\u043e. \u0421\u043f\u0430\u0441\u0438\u0431\u043e, \u0431\u0443\u0434\u0435\u043c \u0440\u0430\u0434\u044b \u0432\u0430\u0441 \u0432\u0438\u0434\u0435\u0442\u044c.',
			languages: '\u042f\u0437\u044b\u043a\u0438:',
			writeUs: '\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043d\u0430\u043c',
			name: '\u0418\u043c\u044f \u0438 \u0444\u0430\u043c\u0438\u043b\u0438\u044f',
			message: '\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435',
			sendMessage: '\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c'
		},
		uk: {
			home: '\u0413\u043e\u043b\u043e\u0432\u043d\u0430',
			about: '\u041f\u0440\u043e \u043d\u0430\u0441',
			pricing: '\u041f\u0440\u0430\u0439\u0441',
			gallery: '\u0413\u0430\u043b\u0435\u0440\u0435\u044f',
			contact: '\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u0438',
			skip: '\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0434\u043e \u0432\u043c\u0456\u0441\u0442\u0443',
			bookNow: '\u0411\u0440\u043e\u043d\u044e\u0432\u0430\u0442\u0438',
			topRatedGoogle: '\u0422\u043e\u043f #1 \u0431\u0430\u0440\u0431\u0435\u0440\u0448\u043e\u043f \u0443 \u041f\u0440\u0430\u0437\u0456 \u0437\u0430 \u0432\u0435\u0440\u0441\u0456\u0454\u044e Google',
			topRated: '\u0422\u043e\u043f #1 \u0431\u0430\u0440\u0431\u0435\u0440\u0448\u043e\u043f \u0443 \u041f\u0440\u0430\u0437\u0456 \u0437\u0430 \u0432\u0435\u0440\u0441\u0456\u0454\u044e',
			interior: '\u0406\u043d\u0442\u0435\u0440\u02bc\u0454\u0440 Ken Barber',
			shopHaircuts: '\u0421\u0442\u0440\u0438\u0436\u043a\u0438',
			shopHaircutsAlt: '\u0421\u0442\u0440\u0438\u0436\u043a\u0438',
			video: '\u0412\u0456\u0434\u0435\u043e',
			branches: '\u041d\u0430\u0448\u0456 \u0444\u0456\u043b\u0456\u0457',
			branchIntro: '\u0427\u0435\u0440\u0435\u0437 \u0432\u0435\u043b\u0438\u043a\u0443 \u0437\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0435\u043d\u0456\u0441\u0442\u044c \u043d\u0430\u0448\u043e\u0457 \u043f\u0435\u0440\u0448\u043e\u0457 \u0444\u0456\u043b\u0456\u0457 Ken Barber \u0440\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0454\u043c\u043e \u0431\u0440\u043e\u043d\u044e\u0432\u0430\u0442\u0438 \u0432\u0456\u0437\u0438\u0442 \u0443 \u043d\u0430\u0448\u0456\u0439 \u043d\u043e\u0432\u0456\u0439 \u0444\u0456\u043b\u0456\u0457 Ken Barber Modern, \u044f\u043a\u0430 \u0437\u043d\u0430\u0445\u043e\u0434\u0438\u0442\u044c\u0441\u044f \u043b\u0438\u0448\u0435 \u0437\u0430 \u043a\u0456\u043b\u044c\u043a\u0430 \u043a\u0440\u043e\u043a\u0456\u0432 \u0432\u0456\u0434 \u043f\u0435\u0440\u0448\u043e\u0457. \u0414\u044f\u043a\u0443\u0454\u043c\u043e \u0456 \u0431\u0443\u0434\u0435\u043c\u043e \u0440\u0430\u0434\u0456 \u0432\u0430\u0441 \u0431\u0430\u0447\u0438\u0442\u0438.',
			languages: '\u041c\u043e\u0432\u0438:',
			writeUs: '\u041d\u0430\u043f\u0438\u0448\u0456\u0442\u044c \u043d\u0430\u043c',
			name: "\u0406\u043c'\u044f \u0442\u0430 \u043f\u0440\u0456\u0437\u0432\u0438\u0449\u0435",
			message: '\u041f\u043e\u0432\u0456\u0434\u043e\u043c\u043b\u0435\u043d\u043d\u044f',
			sendMessage: '\u041d\u0430\u0434\u0456\u0441\u043b\u0430\u0442\u0438'
		}
	};
	Object.keys(phraseTranslations).forEach((targetLang) => {
		Object.keys(phraseTranslations).forEach((sourceLang) => {
			Object.keys(phraseTranslations[sourceLang]).forEach((key) => {
				translations[targetLang][phraseTranslations[sourceLang][key]] = phraseTranslations[targetLang][key];
			});
		});
	});
	const structuredTranslations = {
		cs: {
			aboutTitle: 'O n\u00e1s',
			aboutBody: '<p>V\u00edtejte v Ken Barbershop, p\u0159edn\u00edm holi\u010dstv\u00ed v Praze!</p><p>Ken Barbershop - \u00datuln\u00e9, klasick\u00e9 prost\u0159ed\u00ed, specializuj\u00edc\u00ed se na st\u0159ih vlas\u016f a holen\u00ed vous\u016f, poskytuj\u00edc\u00ed prvot\u0159\u00eddn\u00ed z\u00e1\u017eitek.</p><p>Ken Barbershop je m\u00edsto, kde se propojuje profesion\u00e1ln\u00ed holi\u010dsk\u00e9 \u0159emeslo s modern\u00edm stylem. Nab\u00edz\u00edme precizn\u00ed st\u0159ihy, \u00fapravu vous\u016f a osobn\u00ed p\u0159\u00edstup ke ka\u017ed\u00e9mu z\u00e1kazn\u00edkovi. Na\u0161\u00edm c\u00edlem je, abyste odch\u00e1zeli sebev\u011bdom\u00ed a spokojen\u00ed s vlastn\u00edm vzhledem.</p>',
			cashPaymentNote: 'Doporu\u010dujeme platbu v hotovosti. A pokud nem\u016f\u017eete zaplatit kartou, d\u011bkujeme.',
			pricingTitle: 'Cen\u00edk',
			pricingMensHaircut: 'St\u0159ih vlas\u016f',
			pricingHaircutBeard: 'St\u0159\u00edh\u00e1n\u00ed a \u00faprava vous\u016f',
			pricingKidsHaircut: 'D\u011btsk\u00fd st\u0159ih (5-10 let)',
			pricingBeardTrim: '\u00daprava vous\u016f',
			pricingLongHair: 'Dlouh\u00e9 vlasy nebo st\u0159ih pouze n\u016f\u017ekami',
			pricingComboVip: 'Combo VIP (st\u0159\u00edh\u00e1n\u00ed a \u00faprava vous\u016f + myt\u00ed vlas\u016f + \u00faprava obo\u010d\u00ed)',
			pricingHaircutWash: 'St\u0159ih vlas\u016f + myt\u00ed vlas\u016f',
			pricingExtraEyebrows: '\u00daprava obo\u010d\u00ed (nav\u00edc): +50 K\u010d',
			pricingExtraWash: 'Myt\u00ed vlas\u016f (nav\u00edc): +100 K\u010d',
			pricingExtraBeardColoring: 'Barven\u00ed vous\u016f (nav\u00edc): +400 K\u010d',
			featurePaymentTitle: 'Zp\u016fsob platby',
			featurePaymentText: 'Doporu\u010dujeme z\u00e1kazn\u00edk\u016fm platit v hotovosti. Pokud u sebe nem\u00e1te hotovost, m\u016f\u017eete platit kartou. D\u011bkujeme.',
			featureBookingTitle: 'Online rezervace term\u00ednu',
			featureBookingText: 'Term\u00edn lze snadno rezervovat online a zm\u011bnit \u010di zru\u0161it p\u0159es e-mail, kter\u00fd obdr\u017e\u00edte po rezervaci',
			featureProfessionalsTitle: 'Vy\u0161kolen\u00ed profesion\u00e1lov\u00e9',
			featureProfessionalsText: 'Na\u0161i barbe\u0159i jsou vy\u0161kolen\u00ed profesion\u00e1lov\u00e9 s mnohalet\u00fdmi zku\u0161enostmi',
			featureIncludedTitle: 'V cen\u011b zahrnuto v\u0161e',
			featureIncludedText: 'Na\u0161e ceny jsou transparentn\u00ed a zahrnuj\u00ed v\u0161e, \u017e\u00e1dn\u00e9 skryt\u00e9 p\u0159\u00edplatky',
			featureRefreshmentsTitle: 'Ob\u010derstven\u00ed zdarma',
			featureRefreshmentsText: 'Dop\u0159ejte si n\u00e1poje zdarma v na\u0161\u00ed samoobslu\u017en\u00e9 lednici',
			price250: '250 K\u010d',
			price300: '300 K\u010d',
			price350: '350 K\u010d',
			price450: '450 K\u010d',
			price550: '550 K\u010d',
			price750: '750 K\u010d'
		},
		en: {
			aboutTitle: 'About Us',
			aboutBody: '<p>Welcome to Ken Barbershop, the leading barbershop in Prague!</p><p>Ken Barbershop offers a cozy, classic environment, specializes in hair cutting and beard shaving, and provides a first-class experience.</p><p>Ken Barbershop is a place where professional barbering combines with modern style. We offer precise cuts, beard styling and a personal approach to each customer. Our goal is for you to leave confident and satisfied with your own appearance.</p>',
			cashPaymentNote: 'We encourage you to pay with cash. And if you are unable to pay by card, thank you.',
			pricingTitle: 'Pricing',
			pricingMensHaircut: "Men's Haircut",
			pricingHaircutBeard: 'Haircut & Beard Trim',
			pricingKidsHaircut: "Children's Haircut (ages 5-10)",
			pricingBeardTrim: 'Beard Trim',
			pricingLongHair: 'Long Hair or Scissors-Only Cut',
			pricingComboVip: 'Combo VIP (Haircut & Beard Trim + Hair Wash + Eyebrow Shaping)',
			pricingHaircutWash: 'Haircut + Hair Wash',
			pricingExtraEyebrows: 'Eyebrow shaping (extra): +50 CZK',
			pricingExtraWash: 'Hair wash (extra): +100 CZK',
			pricingExtraBeardColoring: 'Beard coloring (extra): +400 CZK',
			featurePaymentTitle: 'Payment Method',
			featurePaymentText: 'We encourage customers to pay in cash. If you do not have cash with you, you can pay by card. Thank you.',
			featureBookingTitle: 'Online Appointment Booking',
			featureBookingText: 'Appointments can be booked online easily and changed or canceled through the email you receive after booking.',
			featureProfessionalsTitle: 'Trained Professionals',
			featureProfessionalsText: 'Our barbers are trained professionals with many years of experience.',
			featureIncludedTitle: 'Everything Included',
			featureIncludedText: 'Our prices are transparent and include everything, with no hidden surcharges.',
			featureRefreshmentsTitle: 'Free Refreshments',
			featureRefreshmentsText: 'Enjoy free drinks from our self-service refrigerator.',
			price250: '250 CZK',
			price300: '300 CZK',
			price350: '350 CZK',
			price450: '450 CZK',
			price550: '550 CZK',
			price750: '750 CZK'
		},
		vi: {
			aboutTitle: 'V\u1ec1 ch\u00fang t\u00f4i',
			aboutBody: '<p>Ch\u00e0o m\u1eebng b\u1ea1n \u0111\u1ebfn Ken Barbershop, m\u1ed9t trong nh\u1eefng ti\u1ec7m barber h\u00e0ng \u0111\u1ea7u t\u1ea1i Prague!</p><p>Ken Barbershop mang \u0111\u1ebfn kh\u00f4ng gian \u1ea5m c\u00fang, c\u1ed5 \u0111i\u1ec3n, chuy\u00ean v\u1ec1 c\u1eaft t\u00f3c v\u00e0 c\u1ea1o, t\u1ea1o n\u00ean tr\u1ea3i nghi\u1ec7m ch\u0103m s\u00f3c cao c\u1ea5p.</p><p>Ken Barbershop l\u00e0 n\u01a1i tay ngh\u1ec1 barber chuy\u00ean nghi\u1ec7p k\u1ebft h\u1ee3p v\u1edbi phong c\u00e1ch hi\u1ec7n \u0111\u1ea1i. Ch\u00fang t\u00f4i mang \u0111\u1ebfn nh\u1eefng ki\u1ec3u t\u00f3c ch\u00ednh x\u00e1c, t\u1ea1o ki\u1ec3u r\u00e2u v\u00e0 s\u1ef1 ch\u0103m s\u00f3c ri\u00eang cho t\u1eebng kh\u00e1ch h\u00e0ng. M\u1ee5c ti\u00eau c\u1ee7a ch\u00fang t\u00f4i l\u00e0 \u0111\u1ec3 b\u1ea1n r\u1eddi \u0111i v\u1edbi s\u1ef1 t\u1ef1 tin v\u00e0 h\u00e0i l\u00f2ng v\u1edbi di\u1ec7n m\u1ea1o c\u1ee7a m\u00ecnh.</p>',
			cashPaymentNote: 'Ch\u00fang t\u00f4i khuy\u1ebfn kh\u00edch b\u1ea1n thanh to\u00e1n b\u1eb1ng ti\u1ec1n m\u1eb7t. N\u1ebfu b\u1ea1n kh\u00f4ng th\u1ec3 thanh to\u00e1n b\u1eb1ng th\u1ebb, xin c\u1ea3m \u01a1n.',
			pricingTitle: 'B\u1ea3ng gi\u00e1',
			pricingMensHaircut: 'C\u1eaft t\u00f3c nam',
			pricingHaircutBeard: 'C\u1eaft t\u00f3c v\u00e0 t\u1ec9a r\u00e2u',
			pricingKidsHaircut: 'C\u1eaft t\u00f3c tr\u1ebb em (5-10 tu\u1ed5i)',
			pricingBeardTrim: 'T\u1ec9a r\u00e2u',
			pricingLongHair: 'T\u00f3c d\u00e0i ho\u1eb7c c\u1eaft ch\u1ec9 b\u1eb1ng k\u00e9o',
			pricingComboVip: 'Combo VIP (c\u1eaft t\u00f3c v\u00e0 t\u1ec9a r\u00e2u + g\u1ed9i \u0111\u1ea7u + ch\u1ec9nh l\u00f4ng m\u00e0y)',
			pricingHaircutWash: 'C\u1eaft t\u00f3c + g\u1ed9i \u0111\u1ea7u',
			pricingExtraEyebrows: 'Ch\u1ec9nh l\u00f4ng m\u00e0y (th\u00eam): +50 CZK',
			pricingExtraWash: 'G\u1ed9i \u0111\u1ea7u (th\u00eam): +100 CZK',
			pricingExtraBeardColoring: 'Nhu\u1ed9m r\u00e2u (th\u00eam): +400 CZK',
			featurePaymentTitle: 'Ph\u01b0\u01a1ng th\u1ee9c thanh to\u00e1n',
			featurePaymentText: 'Ch\u00fang t\u00f4i khuy\u1ebfn kh\u00edch kh\u00e1ch h\u00e0ng thanh to\u00e1n b\u1eb1ng ti\u1ec1n m\u1eb7t. N\u1ebfu kh\u00f4ng mang theo ti\u1ec1n m\u1eb7t, b\u1ea1n c\u00f3 th\u1ec3 thanh to\u00e1n b\u1eb1ng th\u1ebb. Xin c\u1ea3m \u01a1n.',
			featureBookingTitle: '\u0110\u1eb7t l\u1ecbch online',
			featureBookingText: 'B\u1ea1n c\u00f3 th\u1ec3 d\u1ec5 d\u00e0ng \u0111\u1eb7t l\u1ecbch online v\u00e0 thay \u0111\u1ed5i ho\u1eb7c h\u1ee7y l\u1ecbch qua email nh\u1eadn \u0111\u01b0\u1ee3c sau khi \u0111\u1eb7t.',
			featureProfessionalsTitle: 'Chuy\u00ean gia \u0111\u01b0\u1ee3c \u0111\u00e0o t\u1ea1o',
			featureProfessionalsText: 'C\u00e1c barber c\u1ee7a ch\u00fang t\u00f4i l\u00e0 nh\u1eefng chuy\u00ean gia \u0111\u01b0\u1ee3c \u0111\u00e0o t\u1ea1o v\u1edbi nhi\u1ec1u n\u0103m kinh nghi\u1ec7m.',
			featureIncludedTitle: 'Gi\u00e1 \u0111\u00e3 bao g\u1ed3m t\u1ea5t c\u1ea3',
			featureIncludedText: 'Gi\u00e1 c\u1ee7a ch\u00fang t\u00f4i minh b\u1ea1ch v\u00e0 bao g\u1ed3m t\u1ea5t c\u1ea3, kh\u00f4ng c\u00f3 ph\u1ee5 ph\u00ed \u1ea9n.',
			featureRefreshmentsTitle: '\u0110\u1ed3 u\u1ed1ng mi\u1ec5n ph\u00ed',
			featureRefreshmentsText: 'H\u00e3y th\u01b0\u1edfng th\u1ee9c \u0111\u1ed3 u\u1ed1ng mi\u1ec5n ph\u00ed trong t\u1ee7 l\u1ea1nh t\u1ef1 ph\u1ee5c v\u1ee5 c\u1ee7a ch\u00fang t\u00f4i.',
			price250: '250 CZK',
			price300: '300 CZK',
			price350: '350 CZK',
			price450: '450 CZK',
			price550: '550 CZK',
			price750: '750 CZK'
		},
		de: {
			aboutTitle: '\u00dcber uns',
			aboutBody: '<p>Willkommen bei Ken Barbershop, einem der fuehrenden Barbershops in Prag!</p><p>Ken Barbershop bietet eine gemuetliche, klassische Umgebung, spezialisiert auf Haarschnitte und Bartpflege, mit einem erstklassigen Erlebnis.</p><p>Ken Barbershop ist ein Ort, an dem professionelles Barber-Handwerk auf modernen Stil trifft. Wir bieten praezise Schnitte, Bartstyling und persoenliche Betreuung fuer jeden Kunden. Unser Ziel ist, dass Sie selbstbewusst und zufrieden mit Ihrem Aussehen nach Hause gehen.</p>',
			cashPaymentNote: 'Wir empfehlen die Zahlung in bar. Wenn Sie nicht mit Karte zahlen koennen, danken wir Ihnen.',
			pricingTitle: 'Preise',
			pricingMensHaircut: 'Herrenhaarschnitt',
			pricingHaircutBeard: 'Haarschnitt & Bartpflege',
			pricingKidsHaircut: 'Kinderhaarschnitt (5-10 Jahre)',
			pricingBeardTrim: 'Bartpflege',
			pricingLongHair: 'Langes Haar oder Schnitt nur mit Schere',
			pricingComboVip: 'Combo VIP (Haarschnitt & Bartpflege + Haarwaesche + Augenbrauenkorrektur)',
			pricingHaircutWash: 'Haarschnitt + Haarwaesche',
			pricingExtraEyebrows: 'Augenbrauenkorrektur (extra): +50 CZK',
			pricingExtraWash: 'Haarwaesche (extra): +100 CZK',
			pricingExtraBeardColoring: 'Bartfaerbung (extra): +400 CZK',
			featurePaymentTitle: 'Zahlungsmethode',
			featurePaymentText: 'Wir empfehlen unseren Kunden, in bar zu bezahlen. Wenn Sie kein Bargeld dabei haben, koennen Sie mit Karte bezahlen. Vielen Dank.',
			featureBookingTitle: 'Online-Terminbuchung',
			featureBookingText: 'Termine koennen einfach online gebucht und ueber die E-Mail, die Sie nach der Buchung erhalten, geaendert oder storniert werden.',
			featureProfessionalsTitle: 'Ausgebildete Profis',
			featureProfessionalsText: 'Unsere Barbiere sind ausgebildete Profis mit langjaehriger Erfahrung.',
			featureIncludedTitle: 'Alles im Preis enthalten',
			featureIncludedText: 'Unsere Preise sind transparent und enthalten alles, ohne versteckte Zuschlaege.',
			featureRefreshmentsTitle: 'Kostenlose Erfrischungen',
			featureRefreshmentsText: 'Geniessen Sie kostenlose Getraenke aus unserem Selbstbedienungskuehlschrank.',
			price250: '250 CZK',
			price300: '300 CZK',
			price350: '350 CZK',
			price450: '450 CZK',
			price550: '550 CZK',
			price750: '750 CZK'
		},
		es: {
			aboutTitle: 'Sobre nosotros',
			aboutBody: '<p>Bienvenido a Ken Barbershop, una de las barberias lideres en Praga.</p><p>Ken Barbershop ofrece un ambiente acogedor y clasico, especializado en cortes de pelo y arreglo de barba, con una experiencia de primera clase.</p><p>Ken Barbershop es un lugar donde la barberia profesional se combina con el estilo moderno. Ofrecemos cortes precisos, arreglo de barba y atencion personal para cada cliente. Nuestro objetivo es que salga con confianza y satisfecho con su imagen.</p>',
			cashPaymentNote: 'Recomendamos pagar en efectivo. Si no puede pagar con tarjeta, gracias.',
			pricingTitle: 'Precios',
			pricingMensHaircut: 'Corte de pelo para hombre',
			pricingHaircutBeard: 'Corte de pelo y arreglo de barba',
			pricingKidsHaircut: 'Corte infantil (5-10 anos)',
			pricingBeardTrim: 'Arreglo de barba',
			pricingLongHair: 'Pelo largo o corte solo con tijeras',
			pricingComboVip: 'Combo VIP (corte de pelo y arreglo de barba + lavado + cejas)',
			pricingHaircutWash: 'Corte de pelo + lavado',
			pricingExtraEyebrows: 'Arreglo de cejas (extra): +50 CZK',
			pricingExtraWash: 'Lavado de pelo (extra): +100 CZK',
			pricingExtraBeardColoring: 'Coloracion de barba (extra): +400 CZK',
			featurePaymentTitle: 'Metodo de pago',
			featurePaymentText: 'Recomendamos a los clientes pagar en efectivo. Si no lleva efectivo, puede pagar con tarjeta. Gracias.',
			featureBookingTitle: 'Reserva online',
			featureBookingText: 'Las citas se pueden reservar facilmente online y cambiar o cancelar mediante el correo electronico que recibe despues de reservar.',
			featureProfessionalsTitle: 'Profesionales formados',
			featureProfessionalsText: 'Nuestros barberos son profesionales formados con muchos anos de experiencia.',
			featureIncludedTitle: 'Todo incluido en el precio',
			featureIncludedText: 'Nuestros precios son transparentes e incluyen todo, sin recargos ocultos.',
			featureRefreshmentsTitle: 'Bebidas gratis',
			featureRefreshmentsText: 'Disfrute de bebidas gratis de nuestra nevera de autoservicio.',
			price250: '250 CZK',
			price300: '300 CZK',
			price350: '350 CZK',
			price450: '450 CZK',
			price550: '550 CZK',
			price750: '750 CZK'
		},
		ru: {
			aboutTitle: '\u041e \u043d\u0430\u0441',
			aboutBody: '<p>\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 Ken Barbershop, \u043e\u0434\u0438\u043d \u0438\u0437 \u0432\u0435\u0434\u0443\u0449\u0438\u0445 \u0431\u0430\u0440\u0431\u0435\u0440\u0448\u043e\u043f\u043e\u0432 \u0432 \u041f\u0440\u0430\u0433\u0435!</p><p>Ken Barbershop \u043f\u0440\u0435\u0434\u043b\u0430\u0433\u0430\u0435\u0442 \u0443\u044e\u0442\u043d\u0443\u044e \u043a\u043b\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043a\u0443\u044e \u0430\u0442\u043c\u043e\u0441\u0444\u0435\u0440\u0443, \u0441\u0442\u0440\u0438\u0436\u043a\u0438 \u0438 \u0443\u0445\u043e\u0434 \u0437\u0430 \u0431\u043e\u0440\u043e\u0434\u043e\u0439, \u0430 \u0442\u0430\u043a\u0436\u0435 \u0441\u0435\u0440\u0432\u0438\u0441 \u0432\u044b\u0441\u043e\u043a\u043e\u0433\u043e \u0443\u0440\u043e\u0432\u043d\u044f.</p><p>Ken Barbershop - \u044d\u0442\u043e \u043c\u0435\u0441\u0442\u043e, \u0433\u0434\u0435 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0435 \u0431\u0430\u0440\u0431\u0435\u0440\u0441\u043a\u043e\u0435 \u0440\u0435\u043c\u0435\u0441\u043b\u043e \u0441\u043e\u0447\u0435\u0442\u0430\u0435\u0442\u0441\u044f \u0441 \u0441\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u044b\u043c \u0441\u0442\u0438\u043b\u0435\u043c. \u041c\u044b \u0434\u0435\u043b\u0430\u0435\u043c \u0442\u043e\u0447\u043d\u044b\u0435 \u0441\u0442\u0440\u0438\u0436\u043a\u0438, \u043e\u0444\u043e\u0440\u043c\u043b\u044f\u0435\u043c \u0431\u043e\u0440\u043e\u0434\u0443 \u0438 \u043f\u043e\u0434\u0445\u043e\u0434\u0438\u043c \u043a \u043a\u0430\u0436\u0434\u043e\u043c\u0443 \u043a\u043b\u0438\u0435\u043d\u0442\u0443 \u0438\u043d\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043b\u044c\u043d\u043e.</p>',
			cashPaymentNote: '\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0435\u043c \u043e\u043f\u043b\u0430\u0442\u0443 \u043d\u0430\u043b\u0438\u0447\u043d\u044b\u043c\u0438. \u0415\u0441\u043b\u0438 \u0443 \u0432\u0430\u0441 \u043d\u0435\u0442 \u043d\u0430\u043b\u0438\u0447\u043d\u044b\u0445, \u043c\u043e\u0436\u043d\u043e \u043e\u043f\u043b\u0430\u0442\u0438\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0439. \u0421\u043f\u0430\u0441\u0438\u0431\u043e.',
			pricingTitle: '\u0426\u0435\u043d\u044b',
			pricingMensHaircut: '\u041c\u0443\u0436\u0441\u043a\u0430\u044f \u0441\u0442\u0440\u0438\u0436\u043a\u0430',
			pricingHaircutBeard: '\u0421\u0442\u0440\u0438\u0436\u043a\u0430 \u0438 \u043a\u043e\u0440\u0440\u0435\u043a\u0446\u0438\u044f \u0431\u043e\u0440\u043e\u0434\u044b',
			pricingKidsHaircut: '\u0414\u0435\u0442\u0441\u043a\u0430\u044f \u0441\u0442\u0440\u0438\u0436\u043a\u0430 (5-10 \u043b\u0435\u0442)',
			pricingBeardTrim: '\u041a\u043e\u0440\u0440\u0435\u043a\u0446\u0438\u044f \u0431\u043e\u0440\u043e\u0434\u044b',
			pricingLongHair: '\u0414\u043b\u0438\u043d\u043d\u044b\u0435 \u0432\u043e\u043b\u043e\u0441\u044b \u0438\u043b\u0438 \u0441\u0442\u0440\u0438\u0436\u043a\u0430 \u0442\u043e\u043b\u044c\u043a\u043e \u043d\u043e\u0436\u043d\u0438\u0446\u0430\u043c\u0438',
			pricingComboVip: 'Combo VIP (\u0441\u0442\u0440\u0438\u0436\u043a\u0430 \u0438 \u0431\u043e\u0440\u043e\u0434\u0430 + \u043c\u044b\u0442\u044c\u0435 \u0433\u043e\u043b\u043e\u0432\u044b + \u043a\u043e\u0440\u0440\u0435\u043a\u0446\u0438\u044f \u0431\u0440\u043e\u0432\u0435\u0439)',
			pricingHaircutWash: '\u0421\u0442\u0440\u0438\u0436\u043a\u0430 + \u043c\u044b\u0442\u044c\u0435 \u0433\u043e\u043b\u043e\u0432\u044b',
			pricingExtraEyebrows: '\u041a\u043e\u0440\u0440\u0435\u043a\u0446\u0438\u044f \u0431\u0440\u043e\u0432\u0435\u0439 (\u0434\u043e\u043f.): +50 CZK',
			pricingExtraWash: '\u041c\u044b\u0442\u044c\u0435 \u0433\u043e\u043b\u043e\u0432\u044b (\u0434\u043e\u043f.): +100 CZK',
			pricingExtraBeardColoring: '\u041e\u043a\u0440\u0430\u0448\u0438\u0432\u0430\u043d\u0438\u0435 \u0431\u043e\u0440\u043e\u0434\u044b (\u0434\u043e\u043f.): +400 CZK',
			featurePaymentTitle: '\u0421\u043f\u043e\u0441\u043e\u0431 \u043e\u043f\u043b\u0430\u0442\u044b',
			featurePaymentText: '\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0435\u043c \u043a\u043b\u0438\u0435\u043d\u0442\u0430\u043c \u043f\u043b\u0430\u0442\u0438\u0442\u044c \u043d\u0430\u043b\u0438\u0447\u043d\u044b\u043c\u0438. \u0415\u0441\u043b\u0438 \u0443 \u0432\u0430\u0441 \u043d\u0435\u0442 \u043d\u0430\u043b\u0438\u0447\u043d\u044b\u0445, \u043c\u043e\u0436\u043d\u043e \u043e\u043f\u043b\u0430\u0442\u0438\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0439. \u0421\u043f\u0430\u0441\u0438\u0431\u043e.',
			featureBookingTitle: '\u041e\u043d\u043b\u0430\u0439\u043d-\u0437\u0430\u043f\u0438\u0441\u044c',
			featureBookingText: '\u0417\u0430\u043f\u0438\u0441\u044c \u043c\u043e\u0436\u043d\u043e \u043b\u0435\u0433\u043a\u043e \u0441\u0434\u0435\u043b\u0430\u0442\u044c \u043e\u043d\u043b\u0430\u0439\u043d, \u0430 \u0442\u0430\u043a\u0436\u0435 \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u0438\u043b\u0438 \u043e\u0442\u043c\u0435\u043d\u0438\u0442\u044c \u0447\u0435\u0440\u0435\u0437 email \u043f\u043e\u0441\u043b\u0435 \u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f.',
			featureProfessionalsTitle: '\u041e\u0431\u0443\u0447\u0435\u043d\u043d\u044b\u0435 \u043f\u0440\u043e\u0444\u0438',
			featureProfessionalsText: '\u041d\u0430\u0448\u0438 \u0431\u0430\u0440\u0431\u0435\u0440\u044b - \u043e\u0431\u0443\u0447\u0435\u043d\u043d\u044b\u0435 \u043f\u0440\u043e\u0444\u0438 \u0441 \u043c\u043d\u043e\u0433\u043e\u043b\u0435\u0442\u043d\u0438\u043c \u043e\u043f\u044b\u0442\u043e\u043c.',
			featureIncludedTitle: '\u0412\u0441\u0435 \u0432\u043a\u043b\u044e\u0447\u0435\u043d\u043e \u0432 \u0446\u0435\u043d\u0443',
			featureIncludedText: '\u041d\u0430\u0448\u0438 \u0446\u0435\u043d\u044b \u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u044b \u0438 \u0432\u043a\u043b\u044e\u0447\u0430\u044e\u0442 \u0432\u0441\u0435, \u0431\u0435\u0437 \u0441\u043a\u0440\u044b\u0442\u044b\u0445 \u0434\u043e\u043f\u043b\u0430\u0442.',
			featureRefreshmentsTitle: '\u0411\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0435 \u043d\u0430\u043f\u0438\u0442\u043a\u0438',
			featureRefreshmentsText: '\u041d\u0430\u0441\u043b\u0430\u0434\u0438\u0442\u0435\u0441\u044c \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u043c\u0438 \u043d\u0430\u043f\u0438\u0442\u043a\u0430\u043c\u0438 \u0438\u0437 \u043d\u0430\u0448\u0435\u0433\u043e \u0445\u043e\u043b\u043e\u0434\u0438\u043b\u044c\u043d\u0438\u043a\u0430.',
			price250: '250 CZK',
			price300: '300 CZK',
			price350: '350 CZK',
			price450: '450 CZK',
			price550: '550 CZK',
			price750: '750 CZK'
		},
		uk: {
			aboutTitle: 'Про нас',
			aboutBody: '<p>Ласкаво просимо до Ken Barbershop, одного з провідних барбершопів у Празі!</p><p>Ken Barbershop - затишна класична атмосфера, спеціалізація на чоловічих стрижках і голінні бороди, першокласний досвід.</p><p>Ken Barbershop - це місце, де професійне перукарське ремесло поєднується з сучасним стилем. Ми пропонуємо точні стрижки, догляд за бородою та індивідуальний підхід до кожного клієнта. Наша мета - щоб ви виходили впевненими й задоволеними власним виглядом.</p>',
			cashPaymentNote: 'Ми рекомендуємо оплачувати готівкою. Якщо у вас немає готівки, можна оплатити карткою. Дякуємо.',
			pricingTitle: 'Прайс',
			pricingMensHaircut: 'Чоловіча стрижка',
			pricingHaircutBeard: 'Стрижка та догляд за бородою',
			pricingKidsHaircut: 'Дитяча стрижка (5-10 років)',
			pricingBeardTrim: 'Догляд за бородою',
			pricingLongHair: 'Довге волосся або стрижка лише ножицями',
			pricingComboVip: 'Combo VIP (стрижка та догляд за бородою + миття волосся + корекція брів)',
			pricingHaircutWash: 'Стрижка + миття волосся',
			pricingExtraEyebrows: 'Корекція брів (додатково): +50 CZK',
			pricingExtraWash: 'Миття волосся (додатково): +100 CZK',
			pricingExtraBeardColoring: 'Фарбування бороди (додатково): +400 CZK',
			featurePaymentTitle: 'Спосіб оплати',
			featurePaymentText: 'Ми рекомендуємо клієнтам оплачувати готівкою. Якщо у вас немає готівки, можна оплатити карткою. Дякуємо.',
			featureBookingTitle: 'Онлайн бронювання',
			featureBookingText: 'Запис можна легко забронювати онлайн, а також змінити або скасувати через email, який ви отримаєте після бронювання.',
			featureProfessionalsTitle: 'Підготовлені професіонали',
			featureProfessionalsText: 'Наші барбери - підготовлені професіонали з багаторічним досвідом.',
			featureIncludedTitle: 'Усе включено у вартість',
			featureIncludedText: 'Наші ціни прозорі та включають усе, без прихованих доплат.',
			featureRefreshmentsTitle: 'Безкоштовні напої',
			featureRefreshmentsText: 'Скористайтеся безкоштовними напоями в нашому холодильнику самообслуговування.',
			price250: '250 CZK',
			price300: '300 CZK',
			price350: '350 CZK',
			price450: '450 CZK',
			price550: '550 CZK',
			price750: '750 CZK'
		}
	};
	const normalizeText = (text) => text.replace(/\s+/g, ' ').trim();
	const replaceAllText = (text, search, replace) => {
		if (!search) return text;
		return text.split(search).join(replace);
	};
	const translateText = (element, lang) => {
		if (!element || element.id === 'lang-toggle') return;
		if (element.closest('.lang-switcher')) return;
		if (element.closest('.elementor-element-38a3bfd')) return;
		if (element.closest('[data-i18n], [data-i18n-html]')) return;
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
		const content = {
			de: '<p class="contact-payment-notice"><strong>Wir empfehlen unseren Kunden, in bar zu bezahlen. Wenn Sie kein Bargeld dabei haben, koennen Sie mit Karte bezahlen. Vielen Dank.</strong></p><p><strong>Telefon:</strong><br>+420 773 919 789</p><p><strong>Oeffnungszeiten:</strong><br>Montag | 09:00 \u2013 19:30<br>Dienstag | 09:00 \u2013 19:30<br>Mittwoch | 09:00 \u2013 19:30<br>Donnerstag | 09:00 \u2013 19:30<br>Freitag | 09:00 \u2013 19:30<br>Samstag | 09:00 \u2013 19:30<br>Sonntag | Geschlossen</p><p><strong>Adresse:</strong><br>Seifertova 595/67<br>Praha 3</p>',
			es: '<p class="contact-payment-notice"><strong>Recomendamos a los clientes pagar en efectivo. Si no lleva efectivo, puede pagar con tarjeta. Gracias.</strong></p><p><strong>Telefono:</strong><br>+420 773 919 789</p><p><strong>Horario:</strong><br>Lunes | 09:00 \u2013 19:30<br>Martes | 09:00 \u2013 19:30<br>Miercoles | 09:00 \u2013 19:30<br>Jueves | 09:00 \u2013 19:30<br>Viernes | 09:00 \u2013 19:30<br>Sabado | 09:00 \u2013 19:30<br>Domingo | Cerrado</p><p><strong>Direccion:</strong><br>Seifertova 595/67<br>Praha 3</p>',
			ru: '<p class="contact-payment-notice"><strong>\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0435\u043c \u043a\u043b\u0438\u0435\u043d\u0442\u0430\u043c \u043f\u043b\u0430\u0442\u0438\u0442\u044c \u043d\u0430\u043b\u0438\u0447\u043d\u044b\u043c\u0438. \u0415\u0441\u043b\u0438 \u0443 \u0432\u0430\u0441 \u043d\u0435\u0442 \u043d\u0430\u043b\u0438\u0447\u043d\u044b\u0445, \u043c\u043e\u0436\u043d\u043e \u043e\u043f\u043b\u0430\u0442\u0438\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0439. \u0421\u043f\u0430\u0441\u0438\u0431\u043e.</strong></p><p><strong>\u0422\u0435\u043b\u0435\u0444\u043e\u043d:</strong><br>+420 773 919 789</p><p><strong>\u0427\u0430\u0441\u044b \u0440\u0430\u0431\u043e\u0442\u044b:</strong><br>\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a | 09:00 \u2013 19:30<br>\u0412\u0442\u043e\u0440\u043d\u0438\u043a | 09:00 \u2013 19:30<br>\u0421\u0440\u0435\u0434\u0430 | 09:00 \u2013 19:30<br>\u0427\u0435\u0442\u0432\u0435\u0440\u0433 | 09:00 \u2013 19:30<br>\u041f\u044f\u0442\u043d\u0438\u0446\u0430 | 09:00 \u2013 19:30<br>\u0421\u0443\u0431\u0431\u043e\u0442\u0430 | 09:00 \u2013 19:30<br>\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435 | \u0417\u0430\u043a\u0440\u044b\u0442\u043e</p><p><strong>\u0410\u0434\u0440\u0435\u0441:</strong><br>Seifertova 595/67<br>Praha 3</p>',
			cs: '<p class="contact-payment-notice"><strong>Doporu\u010dujeme z\u00e1kazn\u00edk\u016fm platit v hotovosti. Pokud u sebe nem\u00e1te hotovost, m\u016f\u017eete platit kartou. D\u011bkujeme.</strong></p><p><strong>Telefon:</strong><br>+420 773 919 789</p><p><strong>Otev\u00edrac\u00ed doba:</strong><br>Pond\u011bl\u00ed | 09:00 \u2013 19:30<br>\u00dater\u00fd | 09:00 \u2013 19:30<br>St\u0159eda | 09:00 \u2013 19:30<br>\u010ctvrtek | 09:00 \u2013 19:30<br>P\u00e1tek | 09:00 \u2013 19:30<br>Sobota | 09:00 \u2013 19:30<br>Ned\u011ble | Zav\u0159eno</p><p><strong>Adresa:</strong><br>Seifertova 595/67<br>Praha 3</p>',
			en: '<p class="contact-payment-notice"><strong>We encourage customers to pay in cash. If you do not have cash with you, you can pay by card. Thank you.</strong></p><p><strong>Phone:</strong><br>+420 773 919 789</p><p><strong>Opening hours:</strong><br>Monday | 09:00 \u2013 19:30<br>Tuesday | 09:00 \u2013 19:30<br>Wednesday | 09:00 \u2013 19:30<br>Thursday | 09:00 \u2013 19:30<br>Friday | 09:00 \u2013 19:30<br>Saturday | 09:00 \u2013 19:30<br>Sunday | Closed</p><p><strong>Address:</strong><br>Seifertova 595/67<br>Praha 3</p>',
			vi: '<p class="contact-payment-notice"><strong>Ch\u00fang t\u00f4i khuy\u1ebfn kh\u00edch kh\u00e1ch h\u00e0ng thanh to\u00e1n b\u1eb1ng ti\u1ec1n m\u1eb7t. N\u1ebfu kh\u00f4ng mang theo ti\u1ec1n m\u1eb7t, b\u1ea1n c\u00f3 th\u1ec3 thanh to\u00e1n b\u1eb1ng th\u1ebb. Xin c\u1ea3m \u01a1n.</strong></p><p><strong>\u0110i\u1ec7n tho\u1ea1i:</strong><br>+420 773 919 789</p><p><strong>Gi\u1edd m\u1edf c\u1eeda:</strong><br>Th\u1ee9 Hai | 09:00 \u2013 19:30<br>Th\u1ee9 Ba | 09:00 \u2013 19:30<br>Th\u1ee9 T\u01b0 | 09:00 \u2013 19:30<br>Th\u1ee9 N\u0103m | 09:00 \u2013 19:30<br>Th\u1ee9 S\u00e1u | 09:00 \u2013 19:30<br>Th\u1ee9 B\u1ea3y | 09:00 \u2013 19:30<br>Ch\u1ee7 Nh\u1eadt | \u0110\u00f3ng c\u1eeda</p><p><strong>\u0110\u1ecba ch\u1ec9:</strong><br>Seifertova 595/67<br>Praha 3</p>',
			uk: '<p class="contact-payment-notice"><strong>Ми рекомендуємо клієнтам оплачувати готівкою. Якщо у вас немає готівки, можна оплатити карткою. Дякуємо.</strong></p><p><strong>Телефон:</strong><br>+420 773 919 789</p><p><strong>Години роботи:</strong><br>Понеділок | 09:00 – 19:30<br>Вівторок | 09:00 – 19:30<br>Середа | 09:00 – 19:30<br>Четвер | 09:00 – 19:30<br>П&#39;ятниця | 09:00 – 19:30<br>Субота | 09:00 – 19:30<br>Неділя | Зачинено</p><p><strong>Адреса:</strong><br>Seifertova 595/67<br>Praha 3</p>'
		};
		contact.innerHTML = content[lang] || content.cs;
		contact.innerHTML = contact.innerHTML.replace(/\+420 773 919 789/g, '<a href="tel:+420773919789">+420 773 919 789</a>');
	};
	const updateContactForm = (lang) => {
		const map = phraseTranslations[lang];
		if (!map) return;
		const form = document.querySelector('[data-contact-form]');
		if (!form) return;
		const nameInput = form.querySelector('#form-field-name');
		const messageInput = form.querySelector('#form-field-message');
		const nameLabel = form.querySelector('label[for="form-field-name"]');
		const messageLabel = form.querySelector('label[for="form-field-message"]');
		if (nameInput) nameInput.setAttribute('placeholder', map.name);
		if (messageInput) messageInput.setAttribute('placeholder', map.message);
		if (nameLabel) nameLabel.textContent = map.name;
		if (messageLabel) messageLabel.textContent = map.message;
	};
	const applyStructuredTranslations = (lang) => {
		const map = structuredTranslations[lang] || structuredTranslations.cs;
		document.querySelectorAll('[data-i18n]').forEach((element) => {
			const key = element.getAttribute('data-i18n');
			if (map[key]) {
				element.textContent = map[key];
			}
		});
		document.querySelectorAll('[data-i18n-html]').forEach((element) => {
			const key = element.getAttribute('data-i18n-html');
			if (map[key]) {
				element.innerHTML = map[key];
			}
		});
	};
	const translatePage = (lang) => {
		applyStructuredTranslations(lang);
		const elements = document.querySelectorAll('a, button, span, h1, h2, h3, h4, h5, h6, p, strong');
		elements.forEach((element) => translateText(element, lang));
		applyStructuredTranslations(lang);
		updateBranchContact(lang);
		updateContactForm(lang);
		document.documentElement.lang = supportedLanguages.includes(lang) ? lang : 'cs';
		if (langToggle) {
			const flag = langToggle.querySelector('.language-flag');
			if (flag) {
				flag.className = `language-flag ${languageFlagClasses[lang] || languageFlagClasses.cs}`;
			}
		}
		document.querySelectorAll('.lang-menu__option').forEach((option) => {
			option.classList.toggle('is-active', option.getAttribute('data-lang-option') === lang);
		});
	};
	const setLanguage = (lang) => {
		const normalized = supportedLanguages.includes(lang) ? lang : 'cs';
		localStorage.setItem(storageKey, normalized);
		translatePage(normalized);
	};
	const initLanguage = () => {
		const savedLang = localStorage.getItem(storageKey);
		const initialLang = supportedLanguages.includes(savedLang) ? savedLang : 'cs';
		translatePage(initialLang);
		if (langToggle) {
			langToggle.addEventListener('click', (event) => {
				event.stopPropagation();
				if (!langMenu) return;
				const isOpen = !langMenu.hidden;
				langMenu.hidden = isOpen;
				langToggle.setAttribute('aria-expanded', String(!isOpen));
			});
		}
		document.querySelectorAll('[data-lang-option]').forEach((option) => {
			option.addEventListener('click', () => {
				setLanguage(option.getAttribute('data-lang-option'));
				if (option.closest('.lang-menu') && langMenu && langToggle) {
					langMenu.hidden = true;
					langToggle.setAttribute('aria-expanded', 'false');
				}
			});
		});
		document.addEventListener('click', (event) => {
			if (!langMenu || !langSwitcher || langMenu.hidden) return;
			if (!langSwitcher.contains(event.target)) {
				langMenu.hidden = true;
				if (langToggle) langToggle.setAttribute('aria-expanded', 'false');
			}
		});
		document.addEventListener('keydown', (event) => {
			if (event.key !== 'Escape' || !langMenu || langMenu.hidden) return;
			langMenu.hidden = true;
			if (langToggle) langToggle.setAttribute('aria-expanded', 'false');
		});
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
	const wrapperLinks = document.querySelectorAll('[data-wrapper-href]');
	hydrateMobileMenu();
	initLanguage();
	const contactForm = document.querySelector('[data-contact-form]');
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

	if (contactForm) {
		const status = contactForm.querySelector('[data-contact-form-status]');
		contactForm.addEventListener('submit', (event) => {
			event.preventDefault();

			if (!contactForm.reportValidity()) {
				return;
			}

			const formData = new FormData(contactForm);
			const name = String(formData.get('name') || '').trim();
			const email = String(formData.get('email') || '').trim();
			const message = String(formData.get('message') || '').trim();
			const subject = encodeURIComponent(`Zpráva z webu Ken Barbershop - ${name || 'Kontakt'}`);
			const body = encodeURIComponent(
				`Jméno: ${name}\nE-mail: ${email}\n\nZpráva:\n${message}`
			);

			window.location.href = `mailto:kenbarbershopcz@gmail.com?subject=${subject}&body=${body}`;

			if (status) {
				status.textContent = 'Otevřeli jsme e-mailovou aplikaci. Zkontrolujte zprávu a odešlete ji.';
			}
		});
	}

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

	wrapperLinks.forEach((wrapper) => {
		const href = wrapper.getAttribute('data-wrapper-href');
		if (!href) return;
		wrapper.setAttribute('role', 'link');
		wrapper.setAttribute('tabindex', '0');
		wrapper.addEventListener('click', (event) => {
			if (event.target.closest('a')) return;
			window.open(href, '_blank', 'noopener,noreferrer');
		});
		wrapper.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				window.open(href, '_blank', 'noopener,noreferrer');
			}
		});
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
