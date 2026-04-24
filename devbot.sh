#!/usr/bin/env bash

PS3='Please enter your choice: '

options=( \
"Quit" \
"[Expo] Run on iPhone" \
"[Expo] Run on iPad" \
"[Expo] Build iOS" \
"[Expo] Submit iOS" \
"[Expo] Clean Prebuild" \
"[Expo] Run Tests" \
"[Web] Run Tests" \
"[Web] Run Dev" \
"[Web] Build Next" \
"[Web] Deploy Next" \
"[Web] Deploy Certbot" \
"[Web] Deploy Apache" \
)

select opt in "${options[@]}"
do
    case $opt in

        "Quit")
            break
            ;;

        "[Expo] Run on iPhone")
            echo "Run on iPhone"
            (cd expo && npx expo run:ios --device "iPhone 17")
            ;;

        "[Expo] Run on iPad")
            echo "Run on iPad"
            (cd expo && npx expo run:ios --device "iPad")
            ;;

        "[Expo] Build iOS")
            echo "Build iOS"
            (cd expo && EXPO_NO_CAPABILITY_SYNC=1 npx eas-cli build -p ios --clear-cache)
            ;;

        "[Expo] Submit iOS")
            echo "Submit iOS"
            (cd expo && npx eas-cli submit -p ios --latest)
            ;;

        "[Expo] Clean Prebuild")
            echo "Clean & Prebuild Expo"
            (cd expo && npx expo prebuild --clean)
            ;;

        "[Expo] Run Tests")
            echo "Run Expo Tests"
            (cd expo && npx jest --no-coverage)
            ;;

        "[Web] Run Tests")
            echo "Run Web Tests"
            (cd web && npm test)
            ;;

        "[Web] Run Dev")
            echo "Run Dev"
            (cd web && npm run dev)
            ;;

        "[Web] Build Next")
            echo "Build Next"
            docker build -t appboiler/web:latest --platform=linux/amd64 .
            ;;

        "[Web] Deploy Next")
            echo "Deploy Next"
            docker save appboiler/web:latest | bzip2 | ssh somehost docker load
            scp ./web/deployment/compose.yml somehost:/root
            ssh somehost "docker compose up -d next"
            ;;

        "[Web] Deploy Certbot")
            echo "Deploy Certbot"
            scp ./web/deployment/compose.yml somehost:/root
            ssh somehost "docker stop apache | true "
            ssh somehost "docker compose up --force-recreate certbot-standalone"
            ssh somehost "docker start apache"
            ;;

        "[Web] Deploy Apache")
            echo "Deploy Apache"
            docker build -t appboiler/apache:latest --platform=linux/amd64 ./web/deployment/apache
            docker save appboiler/apache:latest | bzip2 | ssh somehost docker load
            scp ./web/deployment/compose.yml somehost:/root
            ssh somehost "docker compose up -d apache"
            ;;

        *) echo "invalid option $REPLY";;

    esac
done
