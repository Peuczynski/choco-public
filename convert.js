const fs = require('fs');

try {
    let data = fs.readFileSync('raw.css', 'utf8');
    const separator = '================================';

    data = data.replace(/==+\n\n(.(?!\.pl))+\n([^=]|=(?="))+(?=\n\n==)/g, '');
    const sites = data.split(separator);

    const entries = {};

    for (const siteData of sites) {
        const lines = siteData.split('\n').filter((l) => l.length);
        const name = lines[0];
        const fileName = name == '*' ? 'globul.css' : name[0].toString();
        // const entry = {
        //     name,
        //     fileName,
        //     data: lines,
        // };

        if (!Object.keys(entries).includes(fileName)) {
            entries[fileName] = [];
        }

        entries[fileName].push(lines);
    }

    for (const fileName of Object.keys(entries)) {
        console.log(fileName);
        // console.log(entries[fileName].join(separator));
        fs.writeFileSync(fileName, entries[fileName].join(separator));
    }
} catch (err) {
    console.error(err);
}
