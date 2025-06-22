pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
        NODE_ENV = 'test'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Node.js') {
            steps {
                script {
                    // Install Node.js if not available
                    sh 'which node || (curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs)'
                    sh 'node --version'
                    sh 'npm --version'
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                script {
                    // Run tests with proper error handling
                    try {
                        sh 'npm test'
                        echo 'All tests passed!'
                    } catch (Exception e) {
                        echo 'Tests failed!'
                        currentBuild.result = 'FAILURE'
                        error('Tests failed - check the test output above')
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    // Ensure all files are present
                    sh 'ls -la'
                    sh 'echo "Build completed successfully"'
                }
            }
        }
        
        stage('Deploy to Render') {
            steps {
                script {
                    // This stage will trigger deployment to Render
                    // Render will automatically deploy when it detects changes
                    echo 'Deployment to Render will be triggered automatically'
                    echo 'Make sure your Render service is configured to deploy from this repository'
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed'
        }
        success {
            echo 'Pipeline succeeded! All tests passed and deployment is ready.'
        }
        failure {
            echo 'Pipeline failed! Tests failed or deployment issues occurred.'
            // Email notification for test failures
            emailext (
                subject: "Pipeline Failed: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
                body: """
                Pipeline failed for job: ${env.JOB_NAME}
                Build number: ${env.BUILD_NUMBER}
                Build URL: ${env.BUILD_URL}
                
                Please check the Jenkins console output for more details.
                """,
                to: 'your-email@example.com'  // Replace with your actual email
            )
        }
    }
} 