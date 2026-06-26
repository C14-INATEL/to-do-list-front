pipeline {
    agent any

    environment {
        ARTIFACT_NAME = 'to-do-list-front.zip'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Environment') {
            steps {
                sh '''
                    echo "Node:"
                    node -v

                    echo "NPM:"
                    npm -v

                    echo "ZIP:"
                    zip -v | head -n 2

                    echo "Docker:"
                    docker --version

                    echo "Curl:"
                    curl --version | head -n 1
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Jest Tests') {
            steps {
                sh 'npm run test:ci'
            }

            post {
                always {
                    junit 'test-results/junit.xml'

                    archiveArtifacts artifacts: 'test-results/junit.xml, coverage/**', fingerprint: true

                    publishHTML(target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'coverage/lcov-report',
                        reportFiles: 'index.html',
                        reportName: 'Coverage Report'
                    ])
                }
            }
        }

        stage('Package Frontend') {
            steps {
                sh '''
                    set -e

                    rm -f $ARTIFACT_NAME

                    zip -r $ARTIFACT_NAME \
                        index.html \
                        css \
                        js \
                        img \
                        pages \
                        package.json \
                        package-lock.json \
                        jest.config.js \
                        tests

                    ls -lh $ARTIFACT_NAME
                '''

                archiveArtifacts artifacts: '*.zip', fingerprint: true
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    set -e
                    docker build -t to-do-list-front:latest .
                '''
            }
        }

        stage('Smoke Test') {
            steps {
                sh '''
                    set -e

                    docker rm -f to-do-list-front-test || true

                    docker run -d \
                        --name to-do-list-front-test \
                        --network to-do-list-front-ci \
                        to-do-list-front:latest

                    sleep 5

                    echo "Verificando se o container está rodando..."
                    docker ps | grep to-do-list-front-test

                    echo "Logs do container:"
                    docker logs to-do-list-front-test || true

                    echo "Testando aplicação via rede Docker..."
                    curl -f http://to-do-list-front-test
                '''
            }
        }

        stage('Deploy Simulation') {
            steps {
                sh '''
                    set -e

                    echo "Iniciando deploy simulado..."

                    rm -rf deploy-simulation
                    mkdir -p deploy-simulation

                    cp $ARTIFACT_NAME deploy-simulation/

                    echo "Arquivos disponíveis no ambiente simulado:"
                    ls -lh deploy-simulation/

                    echo "Deploy simulado realizado com sucesso."
                '''
            }
        }
    }

    post {
        always {
            sh 'docker rm -f to-do-list-front-test || true'
        }

        success {
            echo 'Pipeline inicial do frontend executada com sucesso!'
        }

        failure {
            echo 'Pipeline inicial do frontend falhou. Verifique os logs.'
        }
    }
}