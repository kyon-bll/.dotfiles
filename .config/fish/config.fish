# pyenv fish
set -gx PYENV_ROOT "$HOME/.pyenv"
set -x PATH $PATH "$PYENV_ROOT/bin"
status --is-interactive; and . (pyenv init - | psub)

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

# emacs alias
alias e="emacs -nw ."
alias sue='sudo emacs -nw'

# tmux alias
alias t="tmux"

# rmでゴミ箱へ移す
alias rm=trash

########################
#        macOS         #
########################

# androidstudio
set -x  PATH $PATH "$HOME/Library/Android/sdk/platform-tools"

# nodebrew
set -x  PATH $PATH "$HOME/.nodebrew/current/bin"

# postgres
set -g fish_user_paths "/usr/local/opt/postgresql@9.6/bin" $fish_user_paths

########################

# git alias
alias g=git
alias ga='git add'
alias ga.='git add .'
alias gaA='git add -A'
alias gc-m='git commit -m'
alias gcam='git commit -a -m'
alias gs='git status'
alias gp='git push'
alias gd='git diff'
alias gb='git branch'
alias gba='git branch -a'
alias gm='git merge'
alias gc='git checkout'
alias gcm='git checkout master'
alias gcd='git checkout develop'
alias gmm='git merge master'
alias gcb='git checkout -b'
alias gf='git fetch'
alias gl='git pull'
