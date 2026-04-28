/**
 * TEMPLATE LOADER
 * This script loads dynamic content from config.json into your HTML template
 * Include this at the end of your HTML file before </body>
 * 
 * Usage: <script src="template-loader.js"></script>
 */

let pageConfig = {};

// Load configuration on page load
document.addEventListener('DOMContentLoaded', function() {
    loadConfiguration().then(() => {
        applyConfiguration();
    });
});

// Fetch and load config.json
function loadConfiguration() {
    return fetch('config.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load config.json');
            return response.json();
        })
        .then(data => {
            pageConfig = data;
            console.log('Configuration loaded successfully');
            return data;
        })
        .catch(error => {
            console.error('Error loading configuration:', error);
            // Fallback to empty config
            pageConfig = {};
        });
}

// Apply configuration to page elements
function applyConfiguration() {
    // Update site title
    if (pageConfig.siteInfo?.siteName) {
        const titleElement = document.querySelector('title');
        if (titleElement) {
            titleElement.textContent = pageConfig.siteInfo.siteName + ' – barbershop';
        }
    }
    
    // Update meta description
    updateMetaTag('description', pageConfig.siteInfo?.description);
    updateMetaTag('og:title', pageConfig.siteInfo?.siteName);
    updateMetaTag('og:description', pageConfig.siteInfo?.description);
    
    // Update favicon
    if (pageConfig.siteInfo?.faviconUrl) {
        const faviconLink = document.querySelector('link[rel="icon"]');
        if (faviconLink) {
            faviconLink.href = pageConfig.siteInfo.faviconUrl;
        }
    }
    
    // Update logo images
    if (pageConfig.siteInfo?.logo) {
        document.querySelectorAll('img[alt="logo"]').forEach(img => {
            img.src = pageConfig.siteInfo.logo;
        });
    }
    
    // Update navigation menus
    updateNavigationMenu('primary');
    updateNavigationMenu('secondary');
    
    // Update branch information
    updateBranchInformation();
    
    // Update contact information
    updateContactInformation();
    
    // Update social links in footer
    updateSocialLinks();
}

/**
 * Update meta tags dynamically
 */
function updateMetaTag(name, content) {
    if (!content) return;
    
    let meta = document.querySelector(`meta[name="${name}"]`) || 
               document.querySelector(`meta[property="${name}"]`);
    
    if (!meta) {
        meta = document.createElement('meta');
        const isOgTag = name.startsWith('og:');
        if (isOgTag) {
            meta.setAttribute('property', name);
        } else {
            meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
}

/**
 * Update navigation menus
 */
function updateNavigationMenu(menuType) {
    if (!pageConfig.menu || !pageConfig.menu[menuType]) return;
    
    // Find menu containers (adjust selectors based on your HTML structure)
    const menuSelectors = {
        primary: [
            'nav.elementor-nav-menu--main ul',
            'nav.navbar ul',
            '.main-menu ul',
            'ul#menu-primary'
        ],
        secondary: [
            'nav.elementor-nav-menu--main ul:nth-of-type(2)',
            'nav.navbar ul:nth-of-type(2)',
            '.secondary-menu ul',
            'ul#menu-secondary'
        ]
    };
    
    const menuItems = pageConfig.menu[menuType];
    
    // Try to find and update menu using standard selectors
    menuSelectors[menuType].forEach(selector => {
        const menuElement = document.querySelector(selector);
        if (menuElement) {
            menuElement.innerHTML = '';
            menuItems.forEach((item, index) => {
                const li = document.createElement('li');
                li.className = 'menu-item';
                
                const a = document.createElement('a');
                a.textContent = item.label;
                a.href = item.link || '#';
                if (item.anchor) {
                    a.classList.add('elementor-item-anchor');
                }
                
                li.appendChild(a);
                menuElement.appendChild(li);
            });
        }
    });
}

/**
 * Update branch information on page
 */
function updateBranchInformation() {
    if (!pageConfig.branches) return;
    
    pageConfig.branches.forEach((branch, index) => {
        // Update branch names in headings
        const headings = document.querySelectorAll('h2');
        headings.forEach(h => {
            if (h.textContent.includes('SuperHairo') || h.textContent.includes('Barbershop')) {
                if (index === 0 && h.textContent.includes('Vintage')) {
                    h.textContent = branch.name;
                } else if (index === 1 && h.textContent.includes('Modern')) {
                    h.textContent = branch.name;
                }
            }
        });
        
        // Update addresses
        const addressElements = document.querySelectorAll('p');
        addressElements.forEach(p => {
            if (p.textContent.includes('Bělehradská 288') && index === 0) {
                p.innerHTML = `${branch.address}<br />${branch.city}`;
            } else if (p.textContent.includes('Bělehradská 235') && index === 1) {
                p.innerHTML = `${branch.address}<br>${branch.city}`;
            }
        });
        
        // Update phone numbers
        const links = document.querySelectorAll('a[href^="tel:"]');
        if (index < links.length) {
            const phoneLink = links[index];
            phoneLink.href = `tel:${branch.phone.replace(/\s/g, '')}`;
            phoneLink.textContent = branch.phone;
        }
        
        // Update map links
        const mapLinks = document.querySelectorAll('a[href*="maps.app.goo.gl"]');
        if (index < mapLinks.length) {
            mapLinks[index].href = branch.mapLink;
        }
        
        // Update booking links
        const bookingLinks = document.querySelectorAll('a[href*="setmore.com"]');
        if (index < bookingLinks.length) {
            bookingLinks[index].href = branch.bookingLink;
        }
    });
}

/**
 * Update contact information in footer or contact section
 */
function updateContactInformation() {
    if (!pageConfig.contact) return;
    
    const contact = pageConfig.contact;
    
    // Update email
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        if (contact.email) {
            link.href = `mailto:${contact.email}`;
            link.textContent = contact.email;
        }
    });
    
    // Update phone in footer
    const phoneElements = document.querySelectorAll('a[href^="tel:"]');
    phoneElements.forEach((link, index) => {
        if (contact.phone && index === 0) {
            link.href = `tel:${contact.phone.replace(/\s/g, '')}`;
            link.textContent = contact.phone;
        }
    });
    
    // Update address
    const addressPattern = /Bělehradská \d+/;
    document.querySelectorAll('p, span, div').forEach(element => {
        if (addressPattern.test(element.textContent) && contact.address) {
            if (element.textContent.length < 100) { // Ensure it's not a large block
                element.textContent = contact.address;
            }
        }
    });
    
    // Update business hours (if footer has hours section)
    const hoursElements = document.querySelectorAll('[class*="hours"], [class*="timing"]');
    if (hoursElements.length > 0 && contact.hours) {
        // This depends on your HTML structure
        console.log('Business hours can be updated if HTML markup has specific classes');
    }
}

/**
 * Update social media links
 */
function updateSocialLinks() {
    if (!pageConfig.social) return;
    
    const social = pageConfig.social;
    
    // Update social links in footer or social section
    document.querySelectorAll('a[href*="facebook.com"]').forEach(link => {
        if (social.facebook) link.href = social.facebook;
    });
    
    document.querySelectorAll('a[href*="instagram.com"]').forEach(link => {
        if (social.instagram) link.href = social.instagram;
    });
    
    document.querySelectorAll('a[href*="maps.app.goo.gl"]').forEach((link, index) => {
        if (index === 0 && social.google) {
            link.href = social.google;
        }
    });
}

/**
 * UTILITY FUNCTIONS
 * Helper functions for advanced users
 */

/**
 * Get a specific configuration value
 * Usage: getConfigValue('siteInfo.siteName')
 */
function getConfigValue(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], pageConfig);
}

/**
 * Update configuration on the fly (useful for dynamic changes)
 * This doesn't persist to config.json - only for current session
 */
function updateConfigValue(path, value) {
    const keys = path.split('.');
    let obj = pageConfig;
    for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    applyConfiguration();
}

/**
 * Reload configuration from file (useful after admin changes)
 */
function reloadConfiguration() {
    loadConfiguration().then(() => {
        applyConfiguration();
        console.log('Configuration reloaded');
    });
}

// Optional: Set up periodic refresh (e.g., every 5 minutes)
// Uncomment if you want auto-refresh
/*
setInterval(() => {
    reloadConfiguration();
}, 5 * 60 * 1000); // 5 minutes
*/

console.log('Template Loader initialized');
