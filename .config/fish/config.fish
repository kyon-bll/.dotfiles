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
    if test (count $argv) -gt 1 # 引数が1より多いかどうかでaddの挙動を分岐
        # "> git add -n [files]; git add [files]" を出力
        set_color white   ; echo -n "> ";
        set_color -o      ; echo -n "git "; set_color normal; 
        set_color cyan    ; echo -n "add -n $argv[2..-1]"
        set_color magenta ; echo -n "; "
        set_color -o white; echo -n "git "; set_color normal; 
        set_color cyan    ; echo    "add $argv[2..-1]"
        # git add -n [files]; git add [files] を実行
        set_color normal; git add -n $argv[2..-1]; git add $argv[2..-1]
    else
        # "> git add -n -A; git add -A" を出力
        set_color white   ; echo -n "> ";
        set_color -o      ; echo -n "git " ; set_color normal;
        set_color cyan    ; echo    "add -n -A"
        set_color magenta ; echo -n "; "
        set_color -o white; echo -n "git "; set_color normal; 
        set_color cyan    ; echo    "add -A"
        # git add -n -A; git add -A を実行
        set_color normal; git add -n -A; git add -A
    end
    # "> git commit -m 'コミットメッセージ'" を出力
    set_color white ; echo -n "> ";
    set_color -o    ; echo -n "git " ; set_color normal;
    set_color cyan  ; echo -n "commit -m ";
    set_color yellow; echo    "'$argv[1]'"
    # git commit -m 'コミットメッセージ' を実行
    set_color normal; git commit -m $argv[1]

    # "> git push" を出力
    set_color white; echo -n "> ";
    set_color -o   ; echo -n "git " ; set_color normal;
    set_color cyan ; echo    "push"
    # > git push を実行
    set_color normal; git push
end
