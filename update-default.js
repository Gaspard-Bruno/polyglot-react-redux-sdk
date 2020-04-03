const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const axios = require("axios").default;

const POLYGLOT_API_ORIGIN = "http://localhost:3000";
const DEFAULT_CONFIG = {
  username: "",
  password: "",
  pathToDefault: "",
  targetBranch: "master"
};

async function updateDefault(polyglotConfig) {
  const configFileExists = fs.existsSync(polyglotConfig);
  if (configFileExists) {
    const configPath = path.join("../..", polyglotConfig);
    const CONFIG = await require(configPath).default;

    const {
      pathToDefault = DEFAULT_CONFIG.pathToDefault,
      username = DEFAULT_CONFIG.username,
      password = DEFAULT_CONFIG.password,
      targetBranch = DEFAULT_CONFIG.targetBranch
    } = CONFIG;
    const pathToDefaultPhrases = path.join("../..", pathToDefault);
    const DEFAULT_PHRASES = await require(pathToDefaultPhrases);

    const client = axios.create({
      baseURL: POLYGLOT_API_ORIGIN,
      timeout: 1000,
      headers: { "Content-Type": "application/json" }
    });

    function authenticateUser() {
      if (username && password) {
        client
          .post("api/sign_in", {
            user: {
              email: username,
              password
            }
          })
          .then(data => {
            const AUTH_TOKEN = data.headers.authorization;
            client.defaults.headers.common["Authorization"] = AUTH_TOKEN;
            console.log(
              chalk.blue("Authenticated successfully with polyglot api")
            );
            updateDefaultStrings();
          })
          .catch(e => {
            console.log(
              chalk.red(
                "An error has ocurred while authenticating with polyglot"
              )
            );
            console.log(chalk.red(e.message));
          });
      } else {
        console.log(chalk.red("username or password not set in config"));
      }
    }

    function updateDefaultStrings() {
      if (DEFAULT_PHRASES) {
        client
          .patch("api/localized_strings/update_default", {
            default_strings: DEFAULT_PHRASES
          })
          .then(() => {
            console.log(
              chalk.green("Updated default phrases with ", pathToDefault)
            );
          })
          .catch(e => {
            console.log(
              chalk.red(
                "An error has ocurred while updating your default phrases"
              )
            );
            console.log(chalk.red(e.message));
          });
      }
    }
    const gitBranchIs = require("git-branch-is");
    gitBranchIs(targetBranch).then(isTargetBranch => {
      if (isTargetBranch) {
        authenticateUser();
      } else {
        console.log(
          chalk.blue(
            "Skipped update to defaultPhrases because not currently on target branch"
          )
        );
      }
    });
  } else {
    console.log(chalk.red("Config file not found in ", polyglotConfig));
  }
}

export default updateDefault;
