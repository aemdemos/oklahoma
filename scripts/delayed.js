// add delayed functionality here

// Initialize Google Translate functionality
export default function initGoogleTranslate() {
  // Initialize Google Translate
  const script = document.createElement('script');
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);

  // Google Translate initialization callback
  // eslint-disable-next-line func-names
  window.googleTranslateElementInit = function () {
    /* global google */
    const translator = new google.translate.TranslateElement({
      pageLanguage: 'en',
      layout: google.translate.TranslateElement.InlineLayout.DROPDOWN,
      autoDisplay: false,
    }, 'google-translate-element');
    return translator;
  };

  // Add click handler to show/hide the translation dropdown
  const translateGroup = document.querySelector('.translate-group');
  if (translateGroup) {
    translateGroup.addEventListener('click', () => {
      const translateElement = document.getElementById('google-translate-element');
      const selectElement = document.querySelector('.goog-te-combo');

      if (translateElement && selectElement) {
        translateElement.style.display = 'block';
        selectElement.click();
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!translateGroup.contains(e.target)) {
        const translateElement = document.getElementById('google-translate-element');
        if (translateElement) {
          translateElement.style.display = 'none';
        }
      }
    });
  }
}
