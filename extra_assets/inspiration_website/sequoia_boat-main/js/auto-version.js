(function () {
    const V = window.APP_VERSION || 'dev';
    function needsVersion(url) {
        return url && !url.startsWith('http') && !url.includes('?v=');
    }
    function appendVersion(url) {
        return url + (url.includes('?') ? `&v=${V}` : `?v=${V}`);
    }
    function process() {
        const selector = 'link[rel="stylesheet"], script[src], img[src], source[src], video[src]';
        document.querySelectorAll(selector).forEach(el => {
            const attr = el.tagName.toLowerCase() === 'link' ? 'href' : 'src';
            let val = el.getAttribute(attr);
            if (needsVersion(val)) {
                el.setAttribute(attr, appendVersion(val));
            }
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', process);
    } else {
        process();
    }
})(); 