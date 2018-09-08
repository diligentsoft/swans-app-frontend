pipeline {
  agent any
  stages {
    stage('Build') {
      agent {
        docker {
          image 'angular/ngcontainer:0.5.0'
        }
      }
      steps {
        sh 'ng build'
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
          sh 'npm install serverless-finch --save-dev'
          sh 'sls deploy --stage dev'
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
        withAWS(credentials:'diligentsoft') {
          sh 'sls deploy --stage prod'
        }
      }
    }
  }
}
