pipeline {

    agent any

    tools {
        nodejs 'Node26'
    }

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(
            numToKeepStr: '20',
            artifactNumToKeepStr: '20'
        ))
    }

    parameters {

        string(
            name: 'JIRA_URL',
            defaultValue: 'https://company.atlassian.net/browse/AUTO-123',
            description: 'Enter the Jira Story or Epic URL'
        )

        choice(
            name: 'BROWSER',
            choices: [
                'chromium',
                'firefox',
                'webkit'
            ],
            description: 'Select the browser'
        )

        choice(
            name: 'LLM_PROVIDER',
            choices: [
                'MOCK',
                'OPENAI',
                'GEMINI',
                'CLAUDE'
            ],
            description: 'Select the AI Provider'
        )

        booleanParam(
            name: 'HEADED',
            defaultValue: true,
            description: 'Run Playwright in headed mode'
         )

    }

    stages {

        stage('Checkout Source') {

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

        stage('Build Project') {

            steps {
                bat 'npm run build'
            }

        }

        stage('Display Parameters') {

            steps {

                echo "======================================"
                echo "PlayGenAI Build Parameters"
                echo "======================================"

                echo "Jira URL      : ${params.JIRA_URL}"
                echo "Browser       : ${params.BROWSER}"
                echo "LLM Provider  : ${params.LLM_PROVIDER}"
                echo "Headed        : ${params.HEADED}"

                echo "======================================"

            }

        }

        stage('Run PlayGenAI') {

            environment {

                JIRA_URL = "${params.JIRA_URL}"
                BROWSER = "${params.BROWSER}"
                LLM_PROVIDER = "${params.LLM_PROVIDER}"
                HEADED = "${params.HEADED}"

            }

            steps {

                bat 'npm run playgenai'

            }

        }

    }

    post {

        always {

            archiveArtifacts(
                artifacts: '**/*',
                fingerprint: true
            )

        }

        success {

            echo 'PlayGenAI pipeline completed successfully.'

        }

        failure {

            echo 'PlayGenAI pipeline failed.'

        }

    }

}