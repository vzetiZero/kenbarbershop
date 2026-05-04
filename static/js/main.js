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
		}
	};
	const normalizeText = (text) => text.replace(/\s+/g, ' ').trim();
	const replaceAllText = (text, search, replace) => {
		if (!search) return text;
		return text.split(search).join(replace);
	};
	const translateText = (element, lang) => {
		if (!element || element.id === 'lang-toggle') return;
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
			cs: '<p class="contact-payment-notice"><strong>Doporu\u010dujeme z\u00e1kazn\u00edk\u016fm platit v hotovosti. Pokud u sebe nem\u00e1te hotovost, m\u016f\u017eete platit kartou. D\u011bkujeme.</strong></p><p><strong>Telefon:</strong><br>+420 773 919 789</p><p><strong>Otev\u00edrac\u00ed doba:</strong><br>Pond\u011bl\u00ed | 09:00 \u2013 19:30<br>\u00dater\u00fd | 09:00 \u2013 19:30<br>St\u0159eda | 09:00 \u2013 19:30<br>\u010ctvrtek | 09:00 \u2013 19:30<br>P\u00e1tek | 09:00 \u2013 19:30<br>Sobota | 09:00 \u2013 19:30<br>Ned\u011ble | Zav\u0159eno</p><p><strong>Adresa:</strong><br>Seifertova 595/67<br>Praha 3</p>',
			en: '<p class="contact-payment-notice"><strong>We encourage customers to pay in cash. If you do not have cash with you, you can pay by card. Thank you.</strong></p><p><strong>Phone:</strong><br>+420 773 919 789</p><p><strong>Opening hours:</strong><br>Monday | 09:00 \u2013 19:30<br>Tuesday | 09:00 \u2013 19:30<br>Wednesday | 09:00 \u2013 19:30<br>Thursday | 09:00 \u2013 19:30<br>Friday | 09:00 \u2013 19:30<br>Saturday | 09:00 \u2013 19:30<br>Sunday | Closed</p><p><strong>Address:</strong><br>Seifertova 595/67<br>Praha 3</p>',
			vi: '<p class="contact-payment-notice"><strong>Ch\u00fang t\u00f4i khuy\u1ebfn kh\u00edch kh\u00e1ch h\u00e0ng thanh to\u00e1n b\u1eb1ng ti\u1ec1n m\u1eb7t. N\u1ebfu kh\u00f4ng mang theo ti\u1ec1n m\u1eb7t, b\u1ea1n c\u00f3 th\u1ec3 thanh to\u00e1n b\u1eb1ng th\u1ebb. Xin c\u1ea3m \u01a1n.</strong></p><p><strong>\u0110i\u1ec7n tho\u1ea1i:</strong><br>+420 773 919 789</p><p><strong>Gi\u1edd m\u1edf c\u1eeda:</strong><br>Th\u1ee9 Hai | 09:00 \u2013 19:30<br>Th\u1ee9 Ba | 09:00 \u2013 19:30<br>Th\u1ee9 T\u01b0 | 09:00 \u2013 19:30<br>Th\u1ee9 N\u0103m | 09:00 \u2013 19:30<br>Th\u1ee9 S\u00e1u | 09:00 \u2013 19:30<br>Th\u1ee9 B\u1ea3y | 09:00 \u2013 19:30<br>Ch\u1ee7 Nh\u1eadt | \u0110\u00f3ng c\u1eeda</p><p><strong>\u0110\u1ecba ch\u1ec9:</strong><br>Seifertova 595/67<br>Praha 3</p>'
		};
		contact.innerHTML = content[lang] || content.cs;
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
		document.documentElement.lang = lang === 'vi' ? 'vi' : lang === 'en' ? 'en' : 'cs';
		if (langToggle) {
			langToggle.textContent = lang === 'en' ? 'CZ' : 'EN';
		}
	};
	const setLanguage = (lang) => {
		const normalized = ['cs', 'en', 'vi'].includes(lang) ? lang : 'cs';
		localStorage.setItem(storageKey, normalized);
		translatePage(normalized);
	};
	const initLanguage = () => {
		const savedLang = localStorage.getItem(storageKey);
		const initialLang = savedLang === 'en' ? 'en' : 'cs';
		if (initialLang === 'en') {
			translatePage('en');
		} else {
			applyStructuredTranslations('cs');
			updateBranchContact('cs');
		}
		if (langToggle) {
			langToggle.addEventListener('click', () => {
				setLanguage(document.documentElement.lang === 'en' ? 'cs' : 'en');
			});
		}
		document.querySelectorAll('[data-lang-option]').forEach((option) => {
			option.addEventListener('click', () => {
				setLanguage(option.getAttribute('data-lang-option'));
			});
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
