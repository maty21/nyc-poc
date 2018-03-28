const {config,cover} = require('istanbul-api');
const {resolve,join} = require('path');
const outputDir   = resolve(__dirname, 'coverage');
const lcovParse = require('lcov-parse');
const {spawn}= require('child_process')
const { platform }=require('os');
var wrap = require('spawn-wrap')
//const codeRoot = 'C:/dev/hkube/algorithm-queue';
//const codeRoot = 'C:/dev/hkube/producer-consumer.hkube';
const codeRoot = '/home/matyz/dev/hkube-common/etcd.hkube'

const nyc = require('nyc');

 const conf = config.loadObject({
    verbose: false,
    instrumentation: {
        root: codeRoot,
        'include-all-sources': true
    },
    reporting: {
        dir: outputDir
    }
},null)



// cover.getCoverFunctions(conf,(err,data)=>{
//     console.log(data);
//     data.hookFn()
//      require('C:/dev/hkube/algorithm-queue/test/test.js');
//      data.exitFn()
//      data.unhookFn();
// })
let c ={
 //   "nyc": {
cwd:`${codeRoot}`,
reporter:['lcov','text-lcov'],
include:'lib/**/*.js',
recursive:true
//instrument: false
 //  reporter:['text']
 //  cache:true

   //   include: [`${codeRoot}/test/*.js`]
//    }
  }
let _nyc= new nyc(c);


// process.stdout.on('data', function(chunk) {
//     lines = chunk.split("\n");

//     lines[0] = lingeringLine + lines[0];
//     lingeringLine = lines.pop();

//     lines.forEach(processLine);
// });

// process.stdout.on('end', function() {
//     processLine(lingeringLine);
// });
// process.stdout.write=(data)=>{

//     console.log(data);
// }
// process.stdin.read=(data)=>{

//     console.log(data);
// }

// _nyc.addAllFiles();
// //_nyc.instrumentAllFiles()
// _nyc.wrap()

// (new nyc(config)).wrap()
//let ls = spawn('/home/matyz/dev/nyc-poc/node_modules/nyc/bin/nyc.js',['--reporter=lcov','--reporter=text','--all','mocha' ],{cwd:codeRoot})
//let ls = spawn('/home/matyz/dev/nyc-poc/node_modules/nyc/bin/nyc.js',['mocha' ],{cwd:codeRoot})
const command = (platform() === 'win32' ? 'cmd.exe' : 'sh');
const args = (platform() === 'win32' ? ['/s', '/c'] : ['-c']);
const __nyc = join(__dirname, '../node_modules/.bin/nyc');
const mochaBin ='mocha'
const cmd = `/home/matyz/dev/nyc-poc/node_modules/nyc/bin/nyc.js  --all --reporter=html --exclude=**/bla.js --reporter=text --reporter=lcov ${mochaBin} --exit `;

const cp = spawn(command, args.concat([cmd]), {
    cwd:codeRoot
   // stdio: 'inherit',
  });

  cp.on('close', (code) => {
    process.exit(code);
  });
  cp.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
cp.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  cp.on('exit', () => {
    if (config.coverage) {
      console.log();
      console.log('You can see more detail in coverage/index.html');
      console.log();
    }
  });
// ls.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
//   });
  
//   ls.stderr.on('data', (data) => {
//     console.log(`stderr: ${data}`);
//   });
  
//   ls.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
//   });
//sw.runMain()
// let bla = _nyc.report()
// lcovParse(`${codeRoot}/coverage/lcov.info`,(err,data)=>{
//     console.log(data);
// })
 //console.log(bla);