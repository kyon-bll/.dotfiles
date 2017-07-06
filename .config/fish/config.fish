# pyenv fish
set -gx PYENV_ROOT "$HOME/.pyenv"
set -x PATH $PATH "$PYENV_ROOT/bin"
status --is-interactive; and . (pyenv init - | psub)

# emacs alias
alias e="emacs -nw"

# peco
function peco_select_history
    if set -q $argv
        history | peco | read line; commandline $line
    else
        history | peco --query $argv | read line; commandline $line
    end
end

function fish_user_key_bindings
    bind \cr peco_select_history
end

# rmでゴミ箱へ移す
alias rm=trash

# git alias
alias g=git
alias ga='git add'
alias ga.='git add .'
alias gaA='git add -A'
alias gcm='git commit -m'
alias gcam='git commit -a -m'
alias gs='git status'
alias gp='git push'
alias gd='git diff'
alias gb='git branch'
alias gc='git checkout'
alias gl='git pull'
function zubora -d "zubora 'commit message' [files to add;optional]"
    if test (count $argv) -gt 1
        set_color -o; echo -n '\$ git ' ; set_color normal; set_color cyan; echo add $argv[2..-1]  
        set_color normal; git add $argv[2..-1]
    else
        set_color -o; echo -n '\$ git ' ; set_color normal; set_color cyan; echo add -A
        set_color normal; git add -A
    end
    set_color -o; echo -n '\$ git ' ; set_color normal; set_color cyan; echo -n 'commit -m '; set_color yellow; echo "'"$argv[1]"'"
    set_color normal; git commit -m $argv[1]
    set_color -o; echo -n '\$ git ' ; set_color normal; set_color cyan; echo push
    set_color normal; git push
end
