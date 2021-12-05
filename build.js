const fs = require('fs');
const Mustache = require('mustache');

const imgDir = './img';

const readdirSortTime = (dir = './img') => {
  return (
    fs.readdirSync(imgDir)
    .map(name => ({
      name,
      time: fs.statSync(`${dir}/${name}`).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time)
    .map(item => item.name)
  )
};

const tpl = `
  ## 图片日常搜集
  {{#files}}
  * ![{{.}}](./img/{{.}})
  {{/files}}
`;

function createReadme() {
  const files = readdirSortTime();
  const output = Mustache.render(tpl, { files });
  fs.writeFile('README.md', output, err => {
    console.log(err);
  })
}

console.log(createReadme());