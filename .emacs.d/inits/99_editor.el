;; タブにスペースを使用する
(setq-default tab-width 4 indent-tabs-mode nil)

;; キャメルケースで単語区切り
(global-subword-mode 1)

;; 閉じカッコ自動挿入
(require 'flex-autopair)
(flex-autopair-mode 1)
;; %, 'も自動挿入
(defun web-hook-function ()
  (add-to-list 'flex-autopair-pairs '(?\% . ?\%))
  (add-to-list 'flex-autopair-pairs '(?\' . ?\'))
  (add-to-list 'flex-autopair-pairs '(?\< . ?\>)))
(add-hook 'web-mode-hook 'web-hook-function)
(defun python-hook-function ()
  (add-to-list 'flex-autopair-pairs '(?\' . ?\')))
(add-hook 'web-mode-hook 'python-hook-function)

;; editorconfig
(editorconfig-mode 1)
