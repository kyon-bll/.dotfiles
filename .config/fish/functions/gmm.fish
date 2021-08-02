# Defined in - @ line 1
function gmm --wraps='git merge master' --wraps='git merge main' --description 'alias gmm=git merge main'
  git merge main $argv;
end
