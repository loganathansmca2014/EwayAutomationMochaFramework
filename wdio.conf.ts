stages:
  - build
  - test
  - archive
  - notify

variables:
  NODE_VERSION: "18"
  DEBIAN_FRONTEND: noninteractive  # Prevent interactive prompts
before_script:
  - apt-get update && apt-get install -y wget gnupg2
  - wget -q -O - https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
  - mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
  - sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge.list'
  - apt-get update
  - apt-get install -y microsoft-edge-stable
  - npm install

build:
  stage: build
  image: node:18
  script:
    - echo "Building project..."

test:
  stage: test
  image: node:18
  script:
    - echo "Running tests..."
    - npm ci  # Ensure dependencies are installed before testing
    - npx wdio wdio.conf.ts
  artifacts:
    when: always
    paths:
      - '**/reports/**/*'

archive:
  stage: archive
  image: node:18
  script:
    - echo "Archiving test reports..."
  artifacts:
    when: always
    paths:
      - '**/reports/**/*'

notify:
  stage: notify
  image: node:18
  script:
    - echo "Sending email notification..."
    - |
      if [ "$CI_JOB_STATUS" == "success" ]; then
        curl --url 'smtp://smtp.gmail.com:587' --ssl-reqd \
          --mail-from "$SMTP_USER" \
          --mail-rcpt "$NOTIFY_EMAIL" \
          --user "$SMTP_USER:$SMTP_PASS" \
          -T <(echo -e "Subject: Build Success\n\nThe build was successful!")
      fi
