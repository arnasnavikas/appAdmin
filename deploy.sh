#!/bin/bash
ssh arnas@139.59.134.47 << 'ENDSSH'
cd /home/arnas/appBackend_v2/admin
find . -type f -name styles\* -delete
find . -type f -name main\* -delete
find . -type f -name polyfills\* -delete
find . -type f -name inline\* -delete
ENDSSH
ng build --prod --aot
scp -r dist/* arnas@139.59.134.47:"/home/arnas/appBackend_v2/admin/"