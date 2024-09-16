pipeline {
    agent any
    
    tools {
        maven "mvn_wsl_from_windows"
    }

    stages {        
        stage('Build') {
            steps {
                echo "building JAR"
		dir("contacts-backend") {
                    sh "mvn clean package -DskipTests"
                }
                echo "JAR built"
            }
        }

        stage('Build images'){
          steps{
            echo "Building images"
	    sh "sudo docker-compose build"
	    echo "Images built"
          }
        }

        stage('Deploy'){
          steps{
                  // before running, stop and remove the previously launched instance.
		  // note that we are not removing the volume used by database service.
                  sh 'sudo docker-compose down || true'
            sh "sudo docker-compose up -d"
            echo "Deployed successfully!"
          }
        }
      
    }
}
