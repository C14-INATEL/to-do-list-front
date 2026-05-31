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
                sh 'npm test'
            }
        }
        stage('Package Frontend') {
            steps {
                sh '''
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
                sh 'docker build -t to-do-list-front:latest .'
            }
        }
        stage('Smoke Test') {
            steps {
                sh '''
                    docker rm -f to-do-list-front-test || true

                    docker run -d \
                        --name to-do-list-front-test \
                        -p 8081:80 \
                        to-do-list-front:latest

                    sleep 5

                    curl -f http://localhost:8081

                    docker rm -f to-do-list-front-test
                '''
            }
        }
        stage('Deploy Simulation') {
            steps {
                echo 'Deploy simulado realizado com sucesso.'
            }
        }
    }
    post {
        success {
            echo 'Pipeline inicial do frontend executada com sucesso!'
        }
        failure {
            echo 'Pipeline inicial do frontend falhou. Verifique os logs.'
        }
    }
}