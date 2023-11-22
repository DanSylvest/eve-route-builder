echo 'Start installing route-builder';

ROOT=$(pwd);

echo 'Install nestjs'
npm i -g @nestjs/cli

echo '_____________ INITIAL FOLDER STATE _____________'
ls -al
echo '_____________ INITIAL FOLDER STATE _____________'

echo "Download latest eve systems and routes";
if [ ! -d "$ROOT/eveData" ]; then
  mkdir -p "$ROOT/eveData";
fi


cd "$ROOT/eveData" || exit;
rm -rf .


latestURLSystems='https://www.fuzzwork.co.uk/dump/latest/mapSolarSystems.csv';
latestURLJumps='https://www.fuzzwork.co.uk/dump/latest/mapSolarSystemJumps.csv';

echo '_____________ Download Systems _____________'
curl -O "${latestURLSystems}";
echo '_____________ Download Jumps _____________'
curl -O "${latestURLJumps}";

echo " _____________ DUMP ----------------"
ls -al
echo " _____________ DUMP ----------------"

cd "$ROOT" || exit;

echo '_____________ BUILDER INSTALL NPM START _____________'
npm install;
echo '_____________ BUILDER INSTALL NPM FINISH _____________'

echo '_____________ INSTALL NPM FINISH _____________'
npm run start:debug