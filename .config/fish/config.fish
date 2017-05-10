########################################
# 環境変数
#set -x LANG=ja_JP.UTF-8

# emacs 風キーバインドにする
#bindkey -e

# emacs起動
alias e='emacs -nw'
alias ex='emacs'

# pyenv zsh,bash
#set -x PYENV_ROOT="$HOME/.pyenv"
#set -x PATH="$PYENV_ROOT/bin:$PATH"
#eval "(pyenv init -)"

# pyenv fish
set -gx PYENV_ROOT "$HOME/.pyenv"
set -x PATH $PATH "$PYENV_ROOT/bin"
status --is-interactive; and . (pyenv init - | psub)

# virtualenv
#source /usr/local/bin/virtualenvwrapper.sh
#set -x WORKON_HOME=~/.virtualenvs
#set -x PATH="/home/kyon/.cask/bin:$PATH"

set fish_theme agnoster

function fish_prompt
    ~/powerline-shell/powerline-shell.py $status --shell bare ^/dev/null
end

#peco
# function fish_user_key_bindings
#     bind \cr peco_select_history
# end

set fish_plugins theme peco

function fish_user_key_bindings
  bind \cr peco_select_history # Bind for prco history to Ctrl+r
  end

## rmで {$HOME}/.trash に入れる
alias rm='mv --backup=numbered --target-directory={$HOME}/.trash'