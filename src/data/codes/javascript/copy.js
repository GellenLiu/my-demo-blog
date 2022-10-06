export default `copy(text: string, fcb: Function, errCb: Function) {
    if (!navigator.clipboard) {
        let textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            fcb && fcb();
        } catch (err) {
            errCb && errCb();
        }
        document.body.removeChild(textArea);
        return;
    }
    navigator.clipboard.writeText(text).then(
        function () {
            fcb && fcb();
        },
        function (err) {
            errCb && errCb();
        }
    );
}`