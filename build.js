const fs = require('fs');
const Mustache = require('mustache');

const imgDir = './img';

const readdirSortTime = (dir = './img') => {
  return (
    fs.readdirSync(imgDir)
    .map(name => {
      const filename = name.substring(0, name.lastIndexOf('.'));
      return { name, filename }
    })
    .sort((a, b) => b.filename - a.filename)
    .map(item => item.name)
  )
};

const tpl = `
  {{#files}}
  > {{.}}
  
  ![{{.}}](./img/{{.}})
  {{/files}}
`;

function main() {
  const files = readdirSortTime();
  const output = Mustache.render(tpl, { files });
  fs.writeFile('README.md', output, err => {
    if (err) {
      console.log(err);
    }
  })
}

main()