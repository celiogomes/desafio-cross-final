pipeline {
    agent any
    stages{

        stage('Build'){
            steps {
                sh "docker build . -t portal:${env.BUILD_ID}"
            }
        }

        stage('Deploy'){
            steps {
                sh "docker run --name portal_previpalmas -td -p 3000:3000 portal:${env.BUILD_ID}"
            }
        }
    }
}
