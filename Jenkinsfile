pipeline {
    agent any

    environment {
        NODEJS_VERSION = '23.10.0'  // Change to match your project
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/loganathansmca2014/EwayAutomationMochaFramework.git'
            }
        }

        stage('Setup Node.js') {
            steps {
                script {
                    def nodeInstalled = sh(script: 'node -v', returnStatus: true) == 0
                    if (!nodeInstalled) {
                        error "Node.js is not installed. Install it and try again."
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
        bat 'npm install'
            }
        }

        stage('Run WebdriverIO Tests') {
            steps {
sh "bat 'npx wdio wdio.conf.ts'"

            }
            post {
                always {
                    archiveArtifacts artifacts: '**/reports/**/*', allowEmptyArchive: true
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline Execution Completed!"
        }
        failure {
            echo "Pipeline Failed! Check the logs."
        }
    }
}
