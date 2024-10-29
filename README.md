## Steps:

1. After cloning the repo, please do npm install
2. To run the app, do npm run dev
3. To run the json db server, npx json-server ./db/db.json

## Info:

- you might face the some issue, please try to restart the db server - npx json-server ./db/db.json
- sample scenerio: when we add a new todo, and try to delete that todo, it will say todo not found
- the db server is not properly listening, in that case, you might need to restart the server