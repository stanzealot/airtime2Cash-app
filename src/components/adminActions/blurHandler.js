export default function blurHandler(
  listening, setListening, elRef, close
) {
  return () => {
    if (listening) return;
    if (!elRef.current) return;
    setListening(true);
    ['click', 'touchstart'].forEach((_) => {
      document.addEventListener('click', (event) => {
        try {
          const current = elRef.current;
          const target = event.target;
          if (current?.contains(target)) return;
          close()
        } catch (e) {}
      });
    })
  }
}