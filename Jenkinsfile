pipeline {

    agent any

    tools {
        nodejs 'Node26'
    }

    stages {

        stage('Display Parameters') {

    steps {

        echo "Jira URL: ${params.JIRA_URL}"

        echo "Browser: ${params.BROWSER}"

        echo "LLM Provider: ${params.LLM_PROVIDER}"

        echo "Headed: ${params.HEADED}"

    }

}

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

        stage('Install Playwright Browsers') {

    steps {

        bat 'npx playwright install'

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