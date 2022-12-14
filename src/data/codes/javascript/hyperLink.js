export default `function htmlDecode(str: string): string {
    let s = '';
    if (str.length == 0) return '';
    s = str.replace(/&amp;/g, '&');
    s = s.replace(/&lt;/g, '<');
    s = s.replace(/&gt;/g, '>');
    s = s.replace(/&nbsp;/g, ' ');
    s = s.replace(/&#39;/g, "'");
    s = s.replace(/&quot;/g, '"');
    s = s.replace(/&ldquo;/g, '“');
    s = s.replace(/&rdquo;/g, '”');
    s = s.replace(/&yen;/g, '¥');
    return s;
}

function htmlEncode(str) {
    let s = '';
    if (str.length == 0) return '';
    s = s.replace(/</g, '&lt;');
    s = s.replace(/>/g, '&gt;');
    s = s.replace(/ /g, '&nbsp;');
    s = s.replace(/\'/g, '&#39;');
    s = s.replace(/\"/g, '&quot;');
    s = s.replace(/“/g, '&ldquo;');
    s = s.replace(/”/g, '&rdquo;');
    s = s.replace(/¥/g, '&yen;');
    s = str.replace(/&/g, '&amp;');
    return s;
}
fixLink(str: string) {
    if (!str.startsWith('http')) {
        return '//' + str;
    }
    return str;
}

/**
 * 将文本中的链接识别出来并转为JSON
 */
transformLinks(str: string) {
    const that = this;
    /** 这里可以这样判定当前信息是否为图片是因为信息为图片时是一条单独的信息，且不会被转义, 若是用户输入的内容会被转义 */
    if (str.startsWith('<img')) return str;

    const normalStr = that.htmlDecode(str);
    /** 正常匹配url正则即可 */
    const urlReg =
        /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(com|edu|gov|int|net|org|info|cn|mo|tw|hk|io){1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=;]*)/g;
    const urls: string[] = [];
    const link = normalStr.replace(urlReg, function ($0) {
        urls.push($0);
        return LINK_IDENTIFICATION;
    });
    const encodeStr = this.htmlEncode(link);
    const reg = new RegExp(LINK_IDENTIFICATION, 'g');
    return encodeStr.replace(reg, function () {
        const url = urls.shift() || '';` + 
        'return `<a href="${that.fixLink(url)}" target="_blank" class="msg-link">${url}</a>`;' + `
    });
}
`

