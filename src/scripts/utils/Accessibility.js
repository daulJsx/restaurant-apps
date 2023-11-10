const Accessibility = () => {
  // Event listener untuk mendengarkan event "keydown" pada dokumen
  document.addEventListener('keydown', (event) => {
    // Cek apakah event key adalah "Tab" (kode 9)
    if (event.key === 'Tab') {
      // Periksa elemen yang memiliki fokus saat ini
      const focusedElement = document.activeElement;

      // Hapus class "active-hover" dari semua elemen dengan class "navbar__start"
      const menuItems = document.querySelectorAll(
        '.navbar__start a, .navbar__end a',
      );
      menuItems.forEach((item) => {
        item.classList.remove('active-hover');
      });

      // Jika ada elemen yang memiliki fokus, tambahkan class "active-hover" ke elemen tersebut
      if (
        (focusedElement
          && focusedElement.classList.contains('navbar__start'))
        || focusedElement.classList.contains('navbar__end')
      ) {
        focusedElement.classList.add('active-hover');
      }
    }
  });
};

export default Accessibility;
