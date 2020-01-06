# anyenv
# set -x PATH $HOME/.anyenv/bin $PATH
# status --is-interactive; and source (anyenv init -|psub)
# なんかエラー出るからコメントアウト

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
#       aliases        #
########################

# emacs alias
alias e="emacs -nw ."
alias sue='sudo emacs -nw'

# tmux alias
alias t=tmux
alias ta='tmux attach'

# rmでゴミ箱へ
alias rm=trash

# bundle exec
alias be="bundle exec"

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
alias gcdl='git checkout develop; git pull'
alias gc.='git checkout .'
alias gmm='git merge master'
alias gmd='git merge develop'
alias gcb='git checkout -b'
alias gf='git fetch'
alias gl='git pull'

########################
#       startup        #
########################

# mldb コマンド追加
# exec bash -c "source $HOME/MagicLeap/mlsdk/v0.23.0/envsetup.sh; exec fish"

# tmux 起動
ta; t
