import libpub from "libnpmpublish";
import * as fs from 'fs';
import * as path from 'path';

const main = async () => {
  const token = core.getInput("npm-token");
  const npmPath = path.resolve(path.join(__dirname, "."));
  const packageJson = JSON.parse(fs.readFileSync(`${npmPath}/package.json`, 'utf-8'));

  try {
    await libpub.publish(npmPath, packageJson, {
      token,
    });
    console.log("Published!");
  } catch (err) { 
    console.error(err.message);
    process.exit(1);
  }

}

main();
