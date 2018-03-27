(add-hook 'after-init-hook 'global-flycheck-mode)

;; M-n M-p でエラー箇所へ
(global-set-key "\M-n" 'flycheck-next-error)
(global-set-key "\M-p" 'flycheck-previous-error)

;; エラー表示までの時間を変更
(setq flycheck-display-errors-delay 0.3)
