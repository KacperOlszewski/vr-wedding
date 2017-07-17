server {
        listen 80;
        server_name vr.pl;

        location / {
                root /Users/kacperolszewski/Desktop/React/weddingSite/vr/build;
                try_files $uri $uri/ /index.html =404;
        }

        location /vr {
                alias /Users/kacperolszewski/Desktop/React/weddingSite/vr/build;
                try_files $uri $uri/ /index.html =404;
        }
}
