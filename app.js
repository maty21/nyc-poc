const {config,cover} = require('istanbul-api');
const path = require('path');
const outputDir   = path.resolve(__dirname, 'coverage');
const lcovParse = require('lcov-parse');
//const codeRoot = 'C:/dev/hkube/algorithm-queue';
const codeRoot = 'C:/dev/hkube/producer-consumer.hkube';


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
_nyc.addAllFiles();
let bla = _nyc.report()
lcovParse(`${codeRoot}/coverage/lcov.info`,(err,data)=>{
    console.log(data);
})
console.log(bla);