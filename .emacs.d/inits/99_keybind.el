;; カーソルキー ウィンドウ間を移動
(define-key global-map (kbd "<up>") 'windmove-up)
(define-key global-map (kbd "<down>") 'windmove-down)
(define-key global-map (kbd "<right>") 'windmove-right)
(define-key global-map (kbd "<left>") 'windmove-left)

;; C-t でコード折りたたむ
(add-hook 'python-mode-hook
          '(lambda ()
             (hs-minor-mode 1)))
(add-hook 'web-mode-hook
          '(lambda ()
             (hs-minor-mode 1)))
(define-key global-map (kbd "C-t") 'hs-toggle-hiding)

;; C-M-i 一括インデント
(defun all-indent ()
  (interactive)
  (mark-whole-buffer)
  (indent-region (region-beginning) (region-end))
  (point-undo))
(global-set-key (kbd  "C-M-i") 'all-indent)

;; 行頭C-k 改行文字も削除する
(setq kill-whole-line t)

;; M-y browse-kill-ring
(global-set-key (kbd "M-y") 'browse-kill-ring)

;; C-\でredo
(global-set-key (kbd "C-\\") 'redo)

;; C-M-k カーソル位置から行頭まで削除する
(defun backward-kill-line (arg)
  "Kill chars backward until encountering the end of a line."
  (interactive "p")
  (kill-line 0))
(global-set-key (kbd "C-M-k") 'backward-kill-line)

;; C-x C-b で便利なバッファリスト
(global-set-key (kbd "C-x C-b") 'bs-show)
