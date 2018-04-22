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

;; _ を単語の区切りとする
(add-hook 'python-mode-hook #'superword-mode)

;; flycheck
(defun tnoda/turn-on-flycheck-mode ()
  (flycheck-mode 1))
(add-hook 'python-mode-hook 'tnoda/turn-on-flycheck-mode)

;; C-t でコード折りたたむ、は 99_keybind.el に記述
;; なんかうまく動かん

;; *Python* ウィンドウが邪魔なのをなんとかする
(custom-set-variables '(py-keep-windows-configuration (quote t)))
