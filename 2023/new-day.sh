echo "Creating new day: $1";

mkdir $1;
cd $1;
touch input.txt;
touch instructions.txt;

printf "Part 1\n\n\nAnswer: \n\n" >> instructions.txt;
printf "%s\n" "--------------------------------------------" >> instructions.txt;
printf "Part 2\n\n\nAnswer: \n" >> instructions.txt;

touch solution.ts;
touch test-input.txt;

echo "$1 created."