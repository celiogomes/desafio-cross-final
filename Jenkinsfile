pipeline {
    agent any
    stages{

        stage('Build'){
            steps {
                sh "docker build . -t test:${env.BUILD_ID}"
            }
        }

        stage('Deploy'){
            steps {
                sh "docker run --name test -td -p 3000:3000 test:${env.BUILD_ID}"
            }
        }
    }
}
