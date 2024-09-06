echo "Creating new day: $1";

mkdir $1;
cd $1;
touch input.txt;
touch instructions.txt;
touch solution.ts;
touch test-input.txt;

echo "$1 created."