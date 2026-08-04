pipeline {

    agent any

    tools {
        nodejs 'Node26'
    }

    stages {

        stage('Checkout') {

            steps {
                checkout scm
            }

        }

        stage('Install Dependencies') {

            steps {
                bat 'npm install'
            }

        }

        stage('Build') {

            steps {
                bat 'npm run build'
            }

        }

        stage('Run PlayGenAI') {

            steps {
                bat 'npm run playgenai'
            }

        }

    }

    post {

        always {

            archiveArtifacts artifacts: '**/*', fingerprint: true

        }

    }

}