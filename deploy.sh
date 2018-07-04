#!/bin/bash
#!/bin/scp
#!/usr/bin/expect -f
#rm -rf dist/
#npm run build
echo "****************ng build completed****************"
cd dist
expect -c "
  spawn scp -r . root@180.76.109.229:/data/nginx/html/
  expect {
    \"*assword\" {set timeout 300; send \"123qwe!!!\r\";}
    \"yes/no\" {send \"yes\r\"; exp_continue;}
  }
  expect eof"
echo "****************scp 结束 ********************"
cd ../
