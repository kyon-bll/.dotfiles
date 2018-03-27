(require 'web-mode)
(add-to-list 'auto-mode-alist '("\\.phtml\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.tpl\\.php\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.[gj]sp\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.as[cp]x\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.erb\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.mustache\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.djhtml\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.html?\\'" . web-mode))
(add-to-list 'ac-modes 'web-mode)
(add-hook 'web-mode-hook
          '(lambda ()
             (defun web-mode-buffer-refresh ()
               (interactive)
               (web-mode-scan-buffer)
               )
             ))
(setq web-mode-engines-alist
      '(
        ("php"    . "\\.phtml\\'")
        ("blade"  . "\\.blade\\.")
        ("django" . "\\.html\\'")
        ))
(setq web-mode-auto-close-style 1)
(setq web-mode-tag-auto-close-style t)
;;djangoのテンプレート{% %}の挙動が変なのでコメントアウト
;; (setq web-mode-enable-auto-pairing t)

;; indent 2<->4
(defun web-mode-indent (num)
  (interactive "nIndent: ")
  (setq web-mode-markup-indent-offset num)
  (setq web-mode-css-indent-offset num)
  (setq web-mode-style-padding num)
  (setq web-mode-code-indent-offset num)
  (setq web-mode-script-padding num)
  (setq web-mode-block-padding num)
  )
(web-mode-indent 2)

;; emmet-mode ; div TAB で <div>|</div>とか html>div TAB とか
(require 'emmet-mode)
(add-hook 'sgml-mode-hook 'emmet-mode)
(add-hook 'php-mode-hook 'emmet-mode)
(add-hook 'web-mode-hook 'emmet-mode)
(add-hook 'emmet-mode-hook (lambda () (setq emmet-indentation 2)))
(define-key emmet-mode-keymap (kbd "C-C C-i") 'emmet-expand-line)
