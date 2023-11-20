echo 'Start installing route-builder';

ROOT=$(pwd);

LOCKFILE="lockfile_client"

echo '_____________ INITIAL FOLDER STATE _____________'
ls -al
echo '_____________ INITIAL FOLDER STATE _____________'

echo "Download latest eve systems and routes";
if [ -d "$ROOT/eveData" ]; then
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

npm run start:dev