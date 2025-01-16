const { spawn, execSync } = require('child_process')

const functionName = 'api'
const entryPoint = 'api'
const projectId = 'lestido-renting'
const trigger = '--trigger-http'



const secrets = ['NODE_ENV', 'APP_SECRET', 'API_URL','TYPEORM_CONNECTION', 'TYPEORM_HOST', 'TYPEORM_PORT', 'TYPEORM_USERNAME', 'TYPEORM_PASSWORD', 'TYPEORM_DATABASE', 'TYPEORM_ENTITIES', 'TYPEORM_SUBSCRIBERS', 'TYPEORM_MIGRATIONS', 'TYPEORM_SYNCHRONIZE', 'TYPEORM_LOGGING', 'EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_SECURE', 'EMAIL_USER', 'EMAIL_PASS']

let commandParts = {
    deployCommand: `cd dist && gcloud alpha functions deploy ${functionName}`,
    gen2: '--gen2',
    region: '--region=us-central1',
    runtime: '--runtime=nodejs20',
    source: '--source=.',
    entryPoint: `--entry-point=${entryPoint}`,
    trigger,
    project: `--project=${projectId}`,
    allowUnauthenticated: '--allow-unauthenticated',
    setSecrets: `--set-secrets='${secrets.map((secret) => `${secret}=${secret}:latest`).join(',')}'`,
}
// execute commandParts with spawn
const command = Object.values(commandParts).join(' ')
const deploy = spawn(command, {
    shell: true,
    stdio: 'inherit',
})

deploy.on('close', (code) => {
    console.log(`DONE! code ${code}`)
    // console.log(`child process exited with code ${code}`)
})

deploy.on('error', (error) => {
    console.error(`Error ejecutando el comando: ${error.message}`)
})
deploy.on('exit', (code) => {
    // console.log(`child process exited with code ${code}`)
})
deploy.on('message', (message) => {
    console.log(`child process message: ${message}`)
})
