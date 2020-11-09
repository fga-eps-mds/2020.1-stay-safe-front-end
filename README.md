<a href="https://codeclimate.com/github/fga-eps-mds/2020.1-stay-safe-front-end/maintainability"><img src="https://api.codeclimate.com/v1/badges/c5428703a3271e848d6e/maintainability" /></a>
# 2020.1-stay-safe-front-end

## Installation

### Install nvm

* <code>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash</code>

Close the terminal and run the following command:
* <code>command -v nvm</code>

It should print 'nvm' if the installation was successful

### Install node with nvm

* <code>nvm install node</code>

### Install expo

* <code>npm install expo-cli --global</code>

### Possible problems

#### System limit for number of file watchers reached 

* <code>echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p</code>

## Usage

### Start project
* <code>expo start</code>

### Run ESLint
* <code>npx eslint src/** --fix --no-error-on-unmatched-pattern</code>

### Run Sonarqube
```bash
$ docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest
$ docker run -ti -v $(pwd):/usr/src --link sonarqube newtmitch/sonar-scanner -Dsonar.projectName="Frontend" -Dsonar.projectKey=frontend
```
Link to see the scans projects: http://localhost:9000/projects
