pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                nvm(nvmInstallURL: 'https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh',
                nvmIoJsOrgMirror: 'https://iojs.org/dist',
                nvmNodeJsOrgMirror: 'https://nodejs.org/dist',
                version: '22.13.0')
                // Get some code from a GitHub repository
                {
                    sh "npm install -g @angular/cli@19.1.3"
                    sh "npm i --legacy-peer-deps"
                    sh "ng b"
                }
            }
            post {
                // If Maven was able to run the tests, even if some of the test
                // failed, record the test results and archive the jar file.
                success {
                    sh "rsync -avh dist/d247-admin/ ubuntu@11.0.10.203:/var/www/html/webagent/ --delete"
                }
            }
            //...
        }
    }
}
