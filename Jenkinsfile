pipeline {
  agent none
  stages {
    stage('Build') {
      agent {
        docker {
          image 'amaysim/serverless:1.27.1'
        }
      }
      steps {
        sh 'npm install'
        sh '$(npm bin)/ng build'
      }
    }
    stage('Deploy - Dev') {
      agent {
        docker {
          image 'amaysim/serverless:1.27.1'
        }
      }
      steps {
        withAWS(credentials:'diligentsoft') {
          sh 'sls client deploy --stage dev'
        }
      }
    }
    stage('Acceptance Test - Dev') {
      agent {
        docker {
          image 'jobteaser/docker-capybara-chrome-headless'
        }
      }
      steps {
        dir('acceptance') {
          sh 'bundle install'
          sh 'ENVIRONMENT=dev cucumber features/registration.feature'
        }
      }
    }
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
