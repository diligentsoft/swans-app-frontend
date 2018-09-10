pipeline {
  agent none
  stages {
    stage('Build & Deploy Dev') {
      agent {
        docker {
          image 'amaysim/serverless:1.27.1'
        }
      }
      steps {
        sh 'npm install'
        sh '$(npm bin)/ng build'
        withAWS(credentials:'diligentsoft') {
          sh 'sls client deploy --stage dev'
        }
      }
    }
    stage('Smoke Test - Dev') {
      agent any
      steps {
        sh 'curl https://dev.swans.app | grep \'<title>Swans.app</title>\''
      }
    }
//    stage('Acceptance Test - Dev') {
//      agent {
//        docker {
//          image 'jobteaser/docker-capybara-chrome-headless'
//        }
//      }
//      steps {
//        dir('acceptance') {
//          sh 'bundle install'
//          sh 'ENVIRONMENT=dev cucumber features/registration.feature'
//        }
//      }
//    }
    stage('Sanity check') {
      steps {
        input "Does the dev environment look ok? Deploy to prod?"
      }
    }
    stage('Deploy - Prod') {
      agent {
        docker {
          image 'amaysim/serverless:1.27.1'
        }
      }
      steps {
        sh '$(npm bin)/ng build -prod'
        withAWS(credentials:'diligentsoft') {
          sh 'sls client deploy --stage prod'
        }
      }
    }
  }
}
