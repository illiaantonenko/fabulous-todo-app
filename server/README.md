# Tasker
####Before this installation you need pre-installed apps:
- PHP 8.0
- Composer
- VirtualBox
- Vagrant

####Copy .env file. Populate .env file with your credentials
```bash
cp .env.example .env
```
### Install composer packages
```bash
composer update
```
### Create homstead setup file
```bash
./vendor/laravel/homestead/bin/homestead make
```
Change mysql to false and postgresql to true
### Create and run VM
```bash
vagrant up
```
### Connect to your VM via SSH and go to project files
```bash
vagrant ssh
cd code
```
### Create app key
```bash
php artisan key:generate
```
### Create passport keys
```bash
php artisan passport:keys
```
### Give permissions to public directories
```bash
chmod -R 777 storage/ public/
```
### Apply migrations and run seeder
```bash
php artisan migrate --seed
exit
```
### OAuth login
In order to run OAuth on localhost add record to your hosts file
```
192.168.10.10 localhost.tasker.com
```
The project will be available at http://localhost.tasker.com

## To stop your VM run
```bash
vagrant halt
```
## Make something amazing!
