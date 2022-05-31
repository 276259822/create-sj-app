const path = require("path");
const fs = require("fs");

const replacePackageName = (projectName, packageName) => {
  const packagePath = path.join(process.cwd(), projectName, "package.json");
  let packagefile = fs.readFileSync(packagePath, "utf8");
  packagefile = packagefile.replace(packageName, projectName);
  fs.writeFileSync(packagePath, packagefile, "utf8");
};

exports.replacePackageName = replacePackageName;
