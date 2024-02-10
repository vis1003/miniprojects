# Museum Management System

Frontend - AngularJS\
API - NodeJs\
Backend - MySQL

## Setting up Visual Studio

```
npm install -g @angular/cli
```
---
Create new application **[DO NOT RUN AGAIN]**
```
ng new --minimal --no-standalone --ssr=false --routing --style=scss Museum-app
```
---
To enable your system to execute script in PowerShell
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
```
npm install
```
To import bulma css
```
npm install --save bulma
```
> Get the path of bulma.css from *node_modules -> bulma -> css -> bulma.css* and paste the path in *angular.json -> styles section*

Start the application 
```
ng serve
```
To create new component (in Museum-app)
```
ng generate component <component-name>
```
To create a service to get API data
```
ng g service services/<service-name>
```