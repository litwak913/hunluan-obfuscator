import i18next from "i18next" 
const i=i18next
import inquirer from "inquirer"
import I18nextCLILanguageDetector from "i18next-cli-language-detector"
import zh from "./locale/zh.json" assert {type: "json"}
import en from "./locale/en.json" assert {type: "json"}
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
console.log(i.t("hint"))
const answer = await inquirer.prompt([
    {
        name:"input_file_path",
        type:"input",
        message:i.t("input_path")
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
console.log(answer)
const args=await inquirer.prompt([
    {
        name:"height",
        type:"number",
        message:i.t("img_height"),
        when:() => {return answer.type=="img"}
    },
    {
        name:"width",
        type:"number",
        message:i.t("img_width"),
        when:() => {return answer.type=="img"}
    },
    {
        name:"output_path",
        type:"input",
        message:i.t("output_path")
    }
])
console.log(args)
