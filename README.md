# Handle large file upload with nodejs

This is a practice for optimizing server storage on receiving large datas, 
some bunch of modules directly load whole file in memory even if it's size is big and may lead to server failure

But here we receive small parts of your file in terms of streams until it is wholly fetched and stored on server side

## Required
1. [Node](https://nodejs.org/en/) installed
2. [Git](https://git-scm.com/downloads) installed
2. Internet ofcourse 😁

## Installation & preparation
01. Make working directory:
```bash
mkdir upload-large-files-nodejs
```
02. Move to created directory:
```bash
cd upload-large-files-nodejs
```
03. Clone my repository:
```bash
git clone https://github.com/riyoneri/upload-large-files-nodejs.git
```
04. Open terminal in same folder

![Screenshot (153)](https://user-images.githubusercontent.com/113932119/214582481-a93c478a-5b59-4da8-a684-25680394ce46.png)

05. Install required dependencies in terminal
```bash
npm i
```
06. After installation, start server in terminal
```bash
npm start
```
07. Wait for server to listen

![Screenshot_20230125_161538](https://user-images.githubusercontent.com/113932119/214586959-a3a76569-2254-45c3-8c12-2abe7dc61358.png)

08. After server listening, Open your browser on port [8080](http://localhost:8080/) and your good to go 🏹

![Screenshot (155)](https://user-images.githubusercontent.com/113932119/214584689-991103c5-b5d3-45a4-b4e6-6ddf2011e00b.png)

## Usage
You can upload any file with any size you want and forget about server failure

> **Note**
> Uploaded files are stored in uploads folder, in the same directory
