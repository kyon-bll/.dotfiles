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
alias gcm='git commit -m'
alias gcam='git commit -a -m'
alias gs='git status'
alias gp='git push'
alias gd='git diff'

# ssh-add
ssh-add -k ~/.ssh/id_rsa.github
ssh-add -k ~/.ssh/id_rsa.bitbucket
