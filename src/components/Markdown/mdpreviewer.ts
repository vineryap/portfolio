(window as Window).onload = () => {
  (async () => {
    const { initialContent: initial, parseMarkdown } = await import(
      './mdhelpers'
    );

    function init(): void {
      const Editor = document.querySelector('#editor');
      const Preview = document.querySelector('#preview');

      Editor.innerHTML = initial;
      Preview.innerHTML = parseMarkdown(initial);

      Editor.addEventListener('input', (event) => {
        Preview.innerHTML = parseMarkdown(
          (event.target as HTMLTextAreaElement).value
        );
      });
    }
    init();
  })();
};
