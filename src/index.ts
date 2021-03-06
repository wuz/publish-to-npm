import libpub from "libnpmpublish";
import * as fs from 'fs';
import * as path from 'path';
import * as core from '@actions/core';

const main = async () => {
  const token = core.getInput("npm-token");
  const workingDir = process.env.GITHUB_WORKSPACE || '.';
  const npmPath = path.resolve(workingDir);
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
