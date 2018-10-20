pipeline {
  agent {
    docker {
      image 'amaysim/serverless:1.27.1'
    }
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh '$(npm bin)/ng build'
      }
    }
    stage('Deploy - Dev') {
      steps {
        withAWS(credentials:'diligentsoft') {
          sh 'sls client deploy --stage dev --no-confirm'
        }
      }
    }
    stage('Sanity check') {
      steps {
        input "Does the dev environment look ok? Deploy to prod?"
      }
    }
    stage('Deploy - Prod') {
      steps {
        sh '$(npm bin)/ng build -prod'
        withAWS(credentials:'diligentsoft') {
          sh 'sls client deploy --stage prod --no-confirm'
        }
      }
    }
  }
}
