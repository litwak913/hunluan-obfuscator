import i18next from "i18next" 
const i=i18next
import inquirer from "inquirer"
import I18nextCLILanguageDetector from "i18next-cli-language-detector"
import zh from "./locale/zh.json" assert {type: "json"}
import en from "./locale/en.json" assert {type: "json"}
import { obfuscatorImg,deobfuscatorImg } from "./img.js"
import { existsSync } from "fs"
import { deobfuscatorFile, obfuscatorFile } from "./file.js"
i.use(I18nextCLILanguageDetector).init({
    fallbackLng: "en",
    resources: {
        "en": {
            translation: en
        },
        "zh": {
            translation: zh
        }

    }
})
console.log(i.t("cwd")+process.cwd())
console.log(i.t("hint"))
const answer = await inquirer.prompt([
    {
        name:"inputpath",
        type:"input",
        message:i.t("input_path"),
        validate(v){
            return existsSync(v) ? true : i.t("path_error")
        }
    },
    {
        name:"mode",
        type:"list",
        message:i.t("mode"),
        choices:[
            {name:i.t("obfuscator"),value:"obfuscator"},
            {name:i.t("deobfuscator"),value:"deobfuscator"}
        ],
        default:0
    },
    {
        name:"type",
        type:"list",
        message:i.t("type"),
        default:0,
        choices:[
            {name:i.t("type_img"),value:"img"},
            {name:i.t("type_file"),value:"file"}
        ]
    }
]);
const args=await inquirer.prompt([
    {
        name:"width",
        type:"number",
        message:i.t("img_width"),
        when(){
            return answer.type==="img" && answer.mode=="deobfuscator"
        },
        validate(v){
            return isNaN(v) ? i.t("num_error") : true
        }
    },
    {
        name:"height",
        type:"number",
        message:i.t("img_height"),
        when(){
            return answer.type=="img" && answer.mode=="deobfuscator"
        },
        validate(v){
            return isNaN(v) ? i.t("num_error") : true
        }
    },
    {
        name:"outputpath",
        type:"input",
        message:i.t("output_path")
    }
])
if(answer.type=="img"){
    if(answer.mode=="obfuscator"){
        obfuscatorImg(answer.inputpath,args.outputpath)
    } else if(answer.mode=="deobfuscator"){
        deobfuscatorImg(answer.inputpath,args.outputpath,args.width,args.height)
    }
} else if(answer.type=="file"){
    if(answer.mode=="obfuscator"){
        obfuscatorFile(answer.inputpath,args.outputpath)
    } else if(answer.mode=="deobfuscator"){
        deobfuscatorFile(answer.inputpath,args.outputpath)
    }
}
