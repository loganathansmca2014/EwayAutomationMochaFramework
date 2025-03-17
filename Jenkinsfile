pipeline {
    agent any

    environment {
        NODEJS_VERSION = '23.10.0'  // Change to match your project
    }
 stages {
        stage('Check Git Installation') {
            steps {
                script {
                    def gitInstalled = bat(script: 'where git', returnStatus: true) == 0
                    if (!gitInstalled) {
                        error "Git is not installed or not found in PATH."
                    }
                }
            }
        }

        stage('Clone Repository') {
            steps {
                git(
                    branch: 'master',
                    url: 'https://github.com/loganathansmca2014/EwayAutomationMochaFramework.git'
                )
            }
        }

        stage('Check Node.js Installation') {
            steps {
                script {
                    def nodeInstalled = bat(script: 'node -v', returnStatus: true) == 0
                    if (!nodeInstalled) {
                        error "Node.js is not installed or not found in PATH."
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
                bat 'npx wdio wdio.conf.ts'
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
