name: CI

on:
  push:
    branches:
      - master
  pull_request:
    branches:
      - master

jobs:
  build:
    runs-on: windows-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v4.2.2

    - name: Set up Node.js
      uses: actions/setup-node@v4.3.0
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm install

    - name: Run tests
      run: npx wdio wdio.conf.ts

    - name: Archive test reports
      if: always()
      uses: actions/upload-artifact@v4.6.1
      with:
        name: test-reports
        path: '**/reports/**/*'

    - name: Send email notification
      if: success()
      uses: dawidd6/action-send-mail@v3
      with:
        server_address: smtp.example.com
        server_port: 587
        username: ${{ secrets.SMTP_USERNAME }}
        password: ${{ secrets.SMTP_PASSWORD }}
        subject: Build Success
        to: recipient@example.com
        from: sender@example.com
        body: The build was successful!