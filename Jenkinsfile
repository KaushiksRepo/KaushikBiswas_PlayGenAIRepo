pipeline {

    agent any

    tools {
        nodejs 'Node26'
    }

    environment {

    JIRA_BASE_URL = credentials('JIRA_BASE_URL')

    JIRA_EMAIL = credentials('JIRA_EMAIL')

    JIRA_API_TOKEN = credentials('JIRA_API_TOKEN')

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

        choice(
            name: 'REQUIREMENT_SOURCE',
            choices: [
                'JIRA',
                'AZURE_DEVOPS',
                'TEXT_FILE'
            ],
            description: 'Select the requirement source'
        )

        string(
            name: 'REQUIREMENT_LOCATION',
            defaultValue: '',
            description: 'Requirement Location (Jira URL, Azure DevOps URL or Text File Path)'
        )

        string(
            name: 'PROJECT_ROOT',
            defaultValue: 'sample-playwright-project',
            description: 'Playwright Project Root'
        )

        choice(
            name: 'BROWSER',
            choices: [
                'chromium',
                'firefox',
                'webkit'
            ],
            description: 'Browser'
        )

        choice(
            name: 'LLM_PROVIDER',
            choices: [
                'MOCK',
                'OPENAI',
                'GEMINI',
                'CLAUDE'
            ],
            description: 'AI Provider'
        )

        string(
            name: 'WORKERS',
            defaultValue: '1',
            description: 'Number of Playwright Workers'
        )

        string(
            name: 'RETRIES',
            defaultValue: '0',
            description: 'Number of Retries'
        )

        string(
            name: 'TIMEOUT',
            defaultValue: '30000',
            description: 'Execution Timeout (ms)'
        )

        booleanParam(
            name: 'HEADED',
            defaultValue: true,
            description: 'Run browser in headed mode'
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

                echo "========================================"
                echo "PlayGenAI Build Parameters"
                echo "========================================"

                echo "Requirement Source   : ${params.REQUIREMENT_SOURCE}"
                echo "Requirement Location : ${params.REQUIREMENT_LOCATION}"
                echo "Project Root         : ${params.PROJECT_ROOT}"
                echo "Browser              : ${params.BROWSER}"
                echo "LLM Provider         : ${params.LLM_PROVIDER}"
                echo "Workers              : ${params.WORKERS}"
                echo "Retries              : ${params.RETRIES}"
                echo "Timeout              : ${params.TIMEOUT}"
                echo "Headed               : ${params.HEADED}"

                echo "========================================"

            }

        }

        stage('Run PlayGenAI') {

            steps {

                bat """
                npx tsx src/RunFramework.ts ^
                --source=${params.REQUIREMENT_SOURCE} ^
                --location="${params.REQUIREMENT_LOCATION}" ^
                --project="${params.PROJECT_ROOT}" ^
                --browser=${params.BROWSER} ^
                --provider=${params.LLM_PROVIDER} ^
                --workers=${params.WORKERS} ^
                --retries=${params.RETRIES} ^
                --timeout=${params.TIMEOUT} ^
                --headed=${params.HEADED}
                """

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

            echo '========================================'
            echo 'PlayGenAI Pipeline Completed Successfully'
            echo '========================================'

        }

        failure {

            echo '========================================'
            echo 'PlayGenAI Pipeline Failed'
            echo '========================================'

        }

    }

}