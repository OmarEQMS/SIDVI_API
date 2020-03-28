let jsyaml = require('js-yaml');
let path = require('path');
let fs = require('fs');
let dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, '.env')});

//Open API production
let spec = jsyaml.safeLoad(fs.readFileSync(path.resolve(__dirname, "..", "specification", "SIDVI.yaml"), 'utf8'));
spec.host = process.env.HOST
if(process.env.API_PORT!=80)
    spec.host = spec.host + ":" + process.env.API_PORT;
spec.basePath = process.env.BASE;
let strSpec = jsyaml.dump(spec);
fs.writeFileSync(path.join(__dirname, "..", "build","specification", "SIDVI.yaml"), strSpec, 'utf8');
