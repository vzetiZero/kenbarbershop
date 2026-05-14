/**
 * SUPABASE CONFIGURATION
 */

var supabaseUrl = 'https://xjpxjbmpsimnkzwnlmxp.supabase.co';
var supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHhqYm1wc2ltbmt6d25sbXhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNTUzNjQsImV4cCI6MjA5MzczMTM2NH0.3jHlF-_e1cUveKSPblWPuPqfoXVPSCh2bqWZUxWCu4c';
var supabaseSecretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHhqYm1wc2ltbmt6d25sbXhwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODE1NTM2NCwiZXhwIjoyMDkzNzMxMzY0fQ.sI_GYkzBScxuZ2KJzMh_uGbbpcaVzVXyt0GQEGjFaFU';

// Settings keys
const SETTINGS_KEY = 'kenbarbershop_banner_settings';

// Default settings
const defaultSettings = {
    autoSlide: true,
    slideInterval: 5,
    parallax: false,
    showArrows: true,
    showDots: true
};

// Save settings to localStorage
function saveSettingsLocal(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// Load settings from localStorage
function loadSettingsLocal() {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? JSON.parse(saved) : defaultSettings;
}

// Supabase fetch wrappers - use service_role key to bypass RLS
async function supabaseFetch(endpoint, options = {}) {
    var url = supabaseUrl + '/rest/v1/' + endpoint;
    var key = supabaseSecretKey || supabaseKey;
    var headers = {
        'Content-Type': 'application/json',
        'apikey': key,
        'Authorization': 'Bearer ' + key,
        ...options.headers
    };

    console.log('Fetching:', url);
    console.log('Using key:', key ? 'YES' : 'NO');

    var response = await fetch(url, { ...options, headers });
    console.log('Response status:', response.status);
    if (!response.ok) {
        var error = await response.text();
        console.error('Fetch error:', error);
        throw new Error(error);
    }
    return response.json();
}

// CRUD operations - all use service_role to bypass RLS
async function getBanners() {
    return supabaseFetch('banners?select=*&order=sort_order.asc');
}

async function addBanner(banner) {
    return supabaseFetch('banners', {
        method: 'POST',
        body: JSON.stringify(banner)
    });
}

async function updateBanner(id, updates) {
    return supabaseFetch(`banners?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
    });
}

async function deleteBanner(id) {
    return supabaseFetch(`banners?id=eq.${id}`, {
        method: 'DELETE'
    });
}
