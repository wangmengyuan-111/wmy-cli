const {version} = require('./constants')

// 获取版本号
const program = require("commander")
// 配置三个指定命令
const mapActions = {
  create: {
    alias:'c',
    description: "create a project",
    examples: ["wmy-cli create <project-name>"],
  },
  config: {
    alias:'conf',
    description: "config project variable",
    examples: ["wmy-cli config set <k><v>","wmy-cli config get <k>"],
  },
  "*": {
    alias:'',
    description: "command not find",
    examples: [],
  }
}
// 循环创建命令
Reflect.ownKeys(mapActions).forEach((action)=>{
  program
  .command(action) //配置命令的名称
  .alias(mapActions[action].alias)//配置命令的别名
  .description(mapActions[action].description) //配置命令对应的描述
  .action(()=>{
    if(action === "*") {
      // 访问不到对应的命令
      console.log(mapActions[action].description);
    } else {
      console.log(action);
    }
  })
})

// 监听用户的help事件
program.on("--help",()=>{
  console.log("\nExamples:");
  Reflect.ownKeys(mapActions).forEach((action)=>{
    mapActions[action].examples.forEach((example)=>{
      console.log(example);
    })
  })
})


program.version(version).parse(process.argv)