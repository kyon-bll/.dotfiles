(require 'csharp-mode)
(add-hook 'csharp-mode-hook
          '(lambda ()
             (setq indent-tabs-mode nil)
             (setq c-basic-offset 4)
             (c-set-offset 'substatement-open 0)
             (flycheck-mode 1)
             (omnisharp-mode)))

(require 'omnisharp)
(setq omnisharp-server-executable-path (expand-file-name "/Users/kyon/Playground/omnisharp-server/OmniSharp/bin/Debug/OmniSharp.exe"))

(require 'flycheck)
(setq flycheck-check-syntax-automatically '(mode-enabled save idle-change))
(setq flycheck-idle-change-delay 2)

;; (eval-after-load
;;   'company
;;   '(add-to-list 'company-backends #'company-omnisharp))

;; (defun my-csharp-mode-setup ()
;;   (omnisharp-mode)
;;   (company-mode)
;;   (flycheck-mode)

;;   (setq indent-tabs-mode nil)
;;   (setq c-syntactic-indentation t)
;;   (c-set-style "ellemtel")
;;   (setq c-basic-offset 4)
;;   (setq truncate-lines t)
;;   (setq tab-width 4)
;;   (setq evil-shift-width 4)

;;   ;csharp-mode README.md recommends this too
;;   ;(electric-pair-mode 1)       ;; Emacs 24
;;   (electric-pair-local-mode 1) ;; Emacs 25

;;   ;; (local-set-key (kbd "C-c r r") 'omnisharp-run-code-action-refactoring)
;;   ;; (local-set-key (kbd "C-c C-c") 'recompile))

;; (add-hook 'csharp-mode-hook 'my-csharp-mode-setup t)
