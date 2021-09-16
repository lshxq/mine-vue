rm -rf dist dist.tar
npm run build
tar -cvf dist.tar dist
scp dist.tar root@121.40.72.215:/root/docker-data/nginx/www/