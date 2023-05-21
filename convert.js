const fs = require('fs');

try {
    let data = fs.readFileSync('raw.css', 'utf8');
    const separator = '================================';

    // data = data.replace(/==+\n\n(.(?!\.pl))+\n([^=]|=(?="))+(?=\n\n==)/g, ''); just polish sites filter
    const sites = data.split(separator);

    const entries = {};

    for (const siteData of sites) {
        const lines = siteData.split('\n').filter((l) => l.length);
        const name = lines[0].replace('*.', '');
        const fileName = name == '*' ? 'css-cdn/globul.css' : `css-cdn/${name[0]}.css`;
        // const entry = {
        //     name,
        //     fileName,
        //     data: lines,
        // };

        if (!Object.keys(entries).includes(fileName)) {
            entries[fileName] = [];
        }

        entries[fileName].push(lines.join('\n'));
    }

    for (const fileName of Object.keys(entries)) {
        console.log(fileName);
        // console.log(entries[fileName].join(separator));
        fs.writeFileSync(fileName, entries[fileName].join(separator));
    }
} catch (err) {
    console.error(err);
}
