//pipeline

pipeline {
    agent any

    triggers {
        githubPush()  // This enables webhook-based triggering
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/loganathansmca2014/EwayAutomationMochaFramework.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                bat 'npm install'  // Example for Node.js projects
            }
        }

        stage('Test') {
            steps {
                echo 'Running Tests...'
                bat 'npx wdio wdio.conf.ts'  // Example test command
            }
            post {
                always {
                    archiveArtifacts artifacts: '**/reports/**/*', allowEmptyArchive: true
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Application...'
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
