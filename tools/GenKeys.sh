#!/usr/bin/env bash
# Generate a key pair for the server
ssh-keygen -t rsa -b 4096 -m PEM -f ../regi.key
# Don't add passphrase
openssl rsa -in ../regi.key -pubout -outform PEM -out ../regi.key.pub
