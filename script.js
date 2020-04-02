// TODO: make path to config configurable in CLI
const CONFIG = require('./dev/polyglot.config').default;
const chalk = require('chalk');
const POLYGLOT_API_ORIGIN = 'http://localhost:3000';

const axios = require('axios').default;

async function updateDefault(params) {
  const {pathToDefault, username, password} = CONFIG;
  const DEFAULT_PHRASES = await require(pathToDefault);
  const client = axios.create({
    baseURL: POLYGLOT_API_ORIGIN,
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
  });
    function loginUser() {
      client.post('api/sign_in', {
        user: {
          email: username,
          password,
        }
      }).then(data => {
        const AUTH_TOKEN = data.headers.authorization
        client.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        console.log(chalk.blue('Authenticated successfully with polyglot api'))
        updateDefaults()
      }).catch(e => {
        console.log(chalk.red('An error has ocurred while authenticating with polyglot'))
        console.log(chalk.red(e.message))
      })
    }
    function updateDefaults() {
      client.patch('api/localized_strings/update_default', {default_strings: DEFAULT_PHRASES}).then(data => {

        console.log(chalk.green('Updated default phrases with ', pathToDefault))
      }).catch(e => {
        console.log(chalk.red('An error has ocurred while updating your default phrases'))
        console.log(chalk.red(e.message))
      })
    }
    loginUser()
  // TODO: Use these params to trigger update only on target branch
  // console.log("test params", params)
}
updateDefault(process.argv)
