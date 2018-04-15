;; python.el でなく、 python-mode.el を使う
(autoload 'python-mode "python-mode" "Python editing mode." t)

;; インデント設定
(setq-default tab-width 4)
(setq-default indent-tabs-mode nil)

;; jedi
;; http://blog.shibayu36.org/entry/2017/04/02/193000
(require 'jedi)
(add-hook 'python-mode-hook 'jedi:setup)
(setq jedi:complete-on-dot t)

;; C-t でコード折りたたむ、は 99_keybind.el に記述
;; なんかうまく動かん
