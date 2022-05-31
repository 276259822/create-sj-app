#! /usr/bin/env node

const ora = require("ora");
const download = require("download-git-repo");
const symbols = require("log-symbols");
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const templates = require("../template.json");
const utils = require("./utils");

chalk.level = 1;

const options = [
  {
    name: "name",
    type: "input",
    message: "请输入项目名称：",
  },
  {
    name: "template",
    type: "list",
    message: "请选择项目模版：",
    choices: templates.map((template) => template.name),
  },
];

const run = () => {
  console.log(chalk.green("\n 欢迎使用 SJ APP \n"));

  inquirer.prompt(options).then((answers) => {
    const projectName = answers["name"];
    const templateName = answers["template"];

    const template = templates.find(
      (template) => template.name === templateName
    );

    figlet("sj-distributor", function (err, data) {
      if (err) {
        console.log(chalk.red(symbols.error), chalk.red(`Error: ${err}`));
        return;
      }
      console.clear();
      console.log(data);

      console.log("\n");
      console.log(
        chalk.dim(
          `Template can be found at ${chalk.underline.green(template.url)}\n`
        )
      );

      const spinner = ora("Downloading...");
      spinner.start();

      download(template.template, projectName, (err) => {
        if (err) {
          spinner.fail();
          console.log(
            chalk.red(symbols.error),
            chalk.red(`Generation failed. ${err}`)
          );
          return;
        }

        spinner.succeed();
        console.log(
          chalk.green(symbols.success),
          chalk.green("Generation completed!")
        );
        console.log("\nDone. Now run:\n");
        console.log(`    cd ${projectName}`);
        console.log(`    yarn`);
        console.log(`    yarn dev\n`);

        utils.replacePackageName(projectName, template.packageName);
      });
    });
  });
};

run();
