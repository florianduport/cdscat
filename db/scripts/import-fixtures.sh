for filename in ../fixtures/*; do mongoimport -d cdscat -c $filename  done
