def Notify(msg) {
    // NOTIF_GROUP="Binance Smart Chain"
    sh """
        curl --location "$NOTIF_URL" \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode "name=$NOTIF_GROUP" \
        --data-urlencode "message=${msg}"
    """
}

pipeline {
    agent any
    environment {
        CI_GITLAB_USER='strongpapazola'
        BRANCH="staging"
        APPNAME="app-kayaroll-fe"
        HOST="kayaroll.nikici.com"
        SERVER="stag-kayaroll-fe-01"
        GITCRED="strongpapazola-github"
        REGCRED="strongpapazola-dockerhub"
        GITPROJECT="https://github.com/Sagara-X-Kayaroll/com.kayaroll.fe.git"
        GITSECRET="https://github.com/Sagara-X-Kayaroll/com.kayaroll.secrets.git"
        DIRPROJECT="com.kayaroll.fe"
        DIRSECRET="com.kayaroll.secrets"
        //       RELEASE_NOTES = sh (script: """git log --format="medium" -1 ${GIT_COMMIT}""", returnStdout:true)
        RELEASE_NOTES = sh (script: """git log --pretty=format:"%h %s [%an]" -1 ${GIT_COMMIT}""", returnStdout:true)

    }
    stages {
        stage('Build') {
            when {
                expression { env.BUILD.toBoolean() == true }
            }
            steps {
                dir("$DIRPROJECT") {
                    git branch: "${env.BRANCH}", credentialsId: "$GITCRED", url: "$GITPROJECT"
                }
                dir("$DIRSECRET") {
                    git branch: "${env.BRANCH}", credentialsId: "$GITCRED", url: "$GITSECRET"
                }
                script {
                    try {
                        sh """
                            pwd
                            ls -lah *
                            cp $DIRSECRET/.env-kayaroll-fe $DIRPROJECT/.env
                            docker-compose -f $DIRSECRET/sonar-kayaroll-fe.yml up > sonarlogs.txt 2>&1
                            cat sonarlogs.txt                    
                        """
                            // def commitMessage = sh(script: 'git log --format=%B -n 1 ${env.GIT_COMMIT}', returnStdout: true).trim()
                        dir("$DIRPROJECT") {
                            // Build the Docker image
                            // sh "docker build -t $BASE_IMG:$APPNAME-${env.BRANCH}-${env.BUILD_NUMBER} ."
                            sh "docker build -t $BASE_IMG:$APPNAME-${env.BRANCH} ."
                        }
                    } catch (e) {
                        Notify("Failed Build for $JOB_NAME. ${commitMessage}")
                        exit 1
                    }
                }
            }
        }
        stage('Push') {
            when {
                expression { env.PUSH.toBoolean() == true }
            }
            steps {
                script {
                    try {
                        withCredentials([usernamePassword(credentialsId: "$REGCRED", usernameVariable: 'DOCKERHUB_CREDENTIALS_USR', passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW')]) {
                            sh 'docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}'
                            // sh "docker push $BASE_IMG:$APPNAME-${env.BRANCH}-${env.BUILD_NUMBER}"
                            sh "docker push $BASE_IMG:$APPNAME-${env.BRANCH}"
                            sh "docker logout"
                        }
                        sh "docker images"
                        // sh "docker rmi $BASE_IMG:$APPNAME-${env.BRANCH}-${env.BUILD_NUMBER}"
                        sh "docker rmi $BASE_IMG:$APPNAME-${env.BRANCH}"
                        sh "docker images"
                    } catch (e) {
                        Notify("Failed Push for Pipeline job $JOB_NAME.")
                        exit 1
                    }
                }
            }
        }
        stage('Deploy') {
            when {
                expression { env.DEPLOY.toBoolean() == true }
            }
            steps {
                script {
                    try {
                        withCredentials([sshUserPrivateKey(credentialsId: "$SERVER", keyFileVariable: 'SSH_KEY_FILE', passphraseVariable: 'SSH_KEY_PASSPHRASE', usernameVariable: 'SSH_USERNAME')]) {
                            withCredentials([usernamePassword(credentialsId: "$REGCRED", usernameVariable: 'DOCKERHUB_CREDENTIALS_USR', passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW')]) {
                                sh """
                                    ssh -i ${SSH_KEY_FILE} \
                                        -o StrictHostKeyChecking=no \
                                        ${SSH_USERNAME}@$HOST \
                                        -p 65022 "docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW} \
                                        && docker pull $BASE_IMG:$APPNAME-${env.BRANCH} \
                                        && docker logout \
                                        ; docker rm -f $APPNAME-${env.BRANCH} || true \
                                        ; docker run -d --restart always -p 3000:3000 --name $APPNAME-${env.BRANCH} ${BASE_IMG}:$APPNAME-${env.BRANCH} npm start
                                        "
                                """
                            }
                        }
                    } catch (e) {
                        Notify("Failed Deploy for Pipeline job $JOB_NAME.")
                        exit 1
                    }
                }
            }
        }
        stage('Notif') {
            when {
                expression { env.NOTIF.toBoolean() == true }
            }
            steps {
                sh """
                    ANALYSIS_MESSAGE=\$(grep "EXECUTION" sonarlogs.txt | tail -n 1);
                    curl --location "$NOTIF_URL" \
                    --header 'Content-Type: application/x-www-form-urlencoded' \
                    --data-urlencode "name=$NOTIF_GROUP" \
                    --data-urlencode "message=Update From $JOB_NAME \n $RELEASE_NOTES \n \$ANALYSIS_MESSAGE"
                """
            }
        }
    }
}
