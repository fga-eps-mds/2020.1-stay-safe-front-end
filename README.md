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

## Starting the project

* <code>expo start</code>

## Useful libraries

* [React Native Elements](https://react-native-elements.github.io/react-native-elements/)
* [Native Base](https://nativebase.io)
* [React Navigation](https://reactnavigation.org)

### Possible problems

#### System limit for number of file watchers reached 

* <code>echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p</code>
